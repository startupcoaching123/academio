import { useState, useEffect, useCallback, useRef } from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import axios from "axios"
import Navbar from "../../components/Navbar"

const BACKENDURL = import.meta.env.VITE_BACKEND_URL

// --- MOCK DATA (Updated with IB & IGCSE Content) ---
const DUMMY_BLOGS = [
  {
    _id: "1",
    title: "Surviving the IB Diploma: A Starter Guide",
    slug: "surviving-ib-diploma-guide",
    metaDescription: "The International Baccalaureate (IB) is rigorous. Learn how to manage CAS, TOK, and your Extended Essay without burning out.",
    featuredImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
    author: "Academic Advisor",
    createdAt: "2024-03-10T10:00:00Z",
    categories: [{ name: "IB Diploma" }, { name: "Study Tips" }],
    content: "Content about IB..."
  },
  {
    _id: "2",
    title: "IGCSE vs. O-Levels: What is the Difference?",
    slug: "igcse-vs-olevels",
    metaDescription: "Confused about which path to take? We break down the curriculum differences, grading systems, and university recognition.",
    featuredImage: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800",
    author: "Sarah Jenkins",
    createdAt: "2024-03-08T09:30:00Z",
    categories: [{ name: "IGCSE" }, { name: "Education" }],
    content: "Content about IGCSE..."
  },
  {
    _id: "3",
    title: "Mastering IGCSE Sciences: Physics, Chemistry & Biology",
    slug: "mastering-igcse-sciences",
    metaDescription: "From memorizing physics formulas to understanding chemical bonding. Here is your ultimate guide to scoring A* in IGCSE Sciences.",
    featuredImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
    author: "Dr. Sarah Science",
    createdAt: "2024-02-15T10:00:00Z",
    categories: [{ name: "IGCSE" }, { name: "Science" }],
    content: "Dummy content..."
  },
  {
    _id: "4",
    title: "Top 5 Resources for IGCSE Mathematics",
    slug: "top-resources-igcse-math",
    metaDescription: "Stop struggling with calculus and algebra. Here are the best websites, textbooks, and past paper repositories for IGCSE Math.",
    featuredImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
    author: "Math Dept.",
    createdAt: "2024-03-05T11:00:00Z",
    categories: [{ name: "IGCSE" }, { name: "Mathematics" }],
    content: "Dummy content..."
  },
  {
    _id: "5",
    title: "How to Choose Your IB HL and SL Subjects",
    slug: "choosing-ib-subjects",
    metaDescription: "Your subject combination can determine your university prospects. A strategic guide to picking Higher Level and Standard Level courses.",
    featuredImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
    author: "Career Counselor",
    createdAt: "2024-03-01T16:45:00Z",
    categories: [{ name: "IB Diploma" }, { name: "Career" }],
    content: "Dummy content..."
  },
  {
    _id: "6",
    title: "Understanding Sustainable Catering",
    slug: "sustainable-catering-guide",
    metaDescription: "How we are minimizing food waste and using eco-friendly packaging for large scale weddings and parties.",
    featuredImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
    author: "Green Team",
    createdAt: "2024-02-08T11:00:00Z",
    categories: [{ name: "Sustainability" }, { name: "Catering" }],
    content: "Dummy content..."
  },
  {
    _id: "7",
    title: "Effective Note-Taking for High School",
    slug: "effective-note-taking",
    metaDescription: "Cornell method or Mind Mapping? Discover the note-taking strategies that help students retain information better.",
    featuredImage: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800",
    author: "Study Hub",
    createdAt: "2024-02-28T13:00:00Z",
    categories: [{ name: "Study Skills" }, { name: "Education" }],
    content: "Dummy content..."
  },
  {
    _id: "8",
    title: "Planning the Perfect Corporate Lunch",
    slug: "corporate-lunch-planning",
    metaDescription: "Impress your clients and boost team morale with these essential catering tips for your next corporate event.",
    featuredImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
    author: "Shaista Admin",
    createdAt: "2024-02-12T09:30:00Z",
    categories: [{ name: "Catering" }, { name: "Events" }],
    content: "Dummy content..."
  }
];

function BlogPage() {
  const [blogs, setBlogs] = useState([])
  const [filteredBlogs, setFilteredBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchLoading, setSearchLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalBlogs, setTotalBlogs] = useState(0)
  const blogsPerPage = 9 

  // Modern Teal Theme
  const primaryColor = "#0c514f"
  const secondaryColor = "#136d6a" 

  const searchTimeoutRef = useRef(null)

  const performSearch = useCallback(async (query = "", category = "", page = 1) => {
    setSearchLoading(true)
    try {
      const params = { page, limit: blogsPerPage, status: "published" }
      if (query.trim()) params.q = query
      if (category) params.category = category

      let response;
      try {
        response = await axios.get(`${BACKENDURL}/api/admin/blogs/search`, { params })
        
        if ((!response.data.blogs || response.data.blogs.length === 0) && !query && !category) {
           throw new Error("Empty API, using dummy");
        }
        setFilteredBlogs(response.data.blogs || [])
        setTotalPages(response.data.totalPages || 1)
        setTotalBlogs(response.data.total || 0)
        if (!query.trim() && !category && page === 1) setBlogs(response.data.blogs || [])

      } catch (apiError) {
        // --- FALLBACK TO MOCK DATA ---
        let mockData = [...DUMMY_BLOGS];
        
        if (category) {
            mockData = mockData.filter(b => b.categories.some(c => (typeof c === 'string' ? c : c.name) === category));
        }
        if (query) {
            const q = query.toLowerCase();
            mockData = mockData.filter(b => b.title.toLowerCase().includes(q) || b.metaDescription.toLowerCase().includes(q));
        }

        const start = (page - 1) * blogsPerPage;
        const end = start + blogsPerPage;
        
        setFilteredBlogs(mockData.slice(start, end));
        setTotalPages(Math.ceil(mockData.length / blogsPerPage));
        setTotalBlogs(mockData.length);
        if (!query.trim() && !category && page === 1) setBlogs(DUMMY_BLOGS);
      }
      setError(null)
    } catch (err) {
      console.error("Search error:", err)
      setError("Failed to load blogs.")
    } finally {
      setSearchLoading(false)
      setLoading(false)
    }
  }, [blogsPerPage])

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true)
        try {
            const categoriesResponse = await axios.get(`${BACKENDURL}/api/admin/categories`)
            setCategories(categoriesResponse.data || [])
        } catch (e) {
            // Updated Dummy Categories
            setCategories([
                {_id: '1', name: 'IB Diploma'}, 
                {_id: '2', name: 'IGCSE'}, 
                {_id: '3', name: 'Study Skills'},
                {_id: '4', name: 'Catering'}
            ])
        }
        await performSearch("", "", 1)
      } catch (err) {
        setLoading(false)
      }
    }
    fetchInitialData()
  }, [performSearch])

  // Search Debounce
  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
    searchTimeoutRef.current = setTimeout(() => {
      performSearch(searchQuery, selectedCategory, currentPage)
    }, 500)
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
    }
  }, [searchQuery, selectedCategory, currentPage, performSearch])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? "" : category)
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("")
    setCurrentPage(1)
  }

  const calculateReadTime = (content) => {
    if (!content) return 5
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length
    return Math.ceil(wordCount / 200)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  const generateDynamicTitle = () => {
    if (loading) return "Insights | Loading...";
    if (searchQuery) return `${searchQuery} - Search Results`;
    return "The Knowledge Hub - Study, Food & Lifestyle";
  };

  const getPaginationRange = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []
    let l

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i)
      }
    }
    range.forEach(i => {
      if (l) {
        if (i - l === 2) rangeWithDots.push(l + 1)
        else if (i - l !== 1) rangeWithDots.push('...')
      }
      rangeWithDots.push(i)
      l = i
    })
    return rangeWithDots
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: primaryColor }}></div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{generateDynamicTitle()}</title>
        <meta name="theme-color" content={primaryColor} />
      </Helmet>

      <Navbar backgroundColor={primaryColor} />

      <div className="min-h-screen bg-gray-50 font-sans selection:bg-teal-100 selection:text-teal-900">
        
        {/* COMPACT HERO SECTION */}
        <div className="relative pt-30 pb-24 md:pt-30 md:pb-32 px-4" style={{ backgroundColor: primaryColor }}>
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.05]" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>

            <div className="relative max-w-4xl mx-auto text-center z-10">
                <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                    The Knowledge Hub
                </h1>
                <p className="text-base md:text-lg text-teal-100/90 max-w-2xl mx-auto font-light">
                    Expert insights on <span className="font-semibold text-white">IB & IGCSE</span>, culinary arts, and lifestyle.
                </p>
            </div>
        </div>

        {/* FLOATING SEARCH & FILTERS */}
        <div className="container mx-auto px-4 -mt-10 relative z-20 mb-12">
            <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2 md:p-3 max-w-3xl mx-auto flex flex-col md:flex-row gap-2 items-center">
                 <div className="relative flex-grow w-full md:w-auto">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search for IB tips, recipes..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-sm font-medium"
                    />
                 </div>
                 <button 
                    onClick={() => performSearch(searchQuery, selectedCategory, 1)}
                    className="w-full md:w-auto px-8 py-3 text-white font-semibold rounded-lg shadow-md transition-all hover:brightness-110 active:scale-95 text-sm"
                    style={{ backgroundColor: primaryColor }}
                 >
                    Search
                 </button>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
                <button
                    onClick={() => handleCategoryChange("")}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all border ${
                        selectedCategory === "" 
                        ? "text-white border-transparent shadow-md" 
                        : "bg-white text-gray-600 border-gray-200 hover:border-teal-400"
                    }`}
                    style={selectedCategory === "" ? { backgroundColor: secondaryColor } : {}}
                >
                    All
                </button>
                {categories.map((category) => (
                    <button
                        key={category._id}
                        onClick={() => handleCategoryChange(category.name)}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all border ${
                            selectedCategory === category.name 
                            ? "text-white border-transparent shadow-md" 
                            : "bg-white text-gray-600 border-gray-200 hover:border-teal-400"
                        }`}
                        style={selectedCategory === category.name ? { backgroundColor: secondaryColor } : {}}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
        </div>

        {/* BLOG CONTENT */}
        <div className="container mx-auto px-4 pb-20">
            {/* Results Count */}
            <div className="flex justify-between items-end mb-6 border-b border-gray-200 pb-2">
                 <span className="text-gray-500 text-xs uppercase tracking-wider font-semibold">
                    {totalBlogs} Articles Published
                 </span>
            </div>

            {filteredBlogs.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                    <p className="text-gray-500">No articles found matching your criteria.</p>
                    <button onClick={clearFilters} className="mt-4 text-purple-600 hover:text-purple-700 hover:underline text-sm font-medium">Clear Search</button>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredBlogs.map((blog) => (
                        <Link key={blog._id} to={`/blogs/${blog.slug}`} className="group h-full block">
                            <article className="h-full bg-white rounded-xl overflow-hidden shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 border border-gray-100 flex flex-col">
                                
                                {/* Image Area */}
                                <div className="relative h-48 overflow-hidden">
                                    <img 
                                        src={blog.featuredImage || "https://via.placeholder.com/800x600"} 
                                        alt={blog.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                                    
                                    {/* Top Left Tag */}
                                    <div className="absolute top-3 left-3">
                                        <span className="px-2 py-1 bg-white/95 backdrop-blur text-[10px] font-bold uppercase tracking-wider rounded text-teal-900 shadow-sm">
                                            {blog.categories?.[0]?.name || blog.categories?.[0] || 'Article'}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-5 flex flex-col flex-grow">
                                    <div className="flex items-center text-[11px] text-gray-500 mb-2 font-medium uppercase tracking-wide">
                                        <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                                        <span className="mx-2">•</span>
                                        <span>{calculateReadTime(blog.content)} min read</span>
                                    </div>

                                    <h2 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-teal-700 transition-colors line-clamp-2">
                                        {blog.title}
                                    </h2>

                                    <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow leading-relaxed">
                                        {blog.metaDescription}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                                                {blog.author ? blog.author.charAt(0) : 'A'}
                                            </div>
                                            <span className="text-xs font-medium text-gray-500 truncate max-w-[100px]">{blog.author || "Editor"}</span>
                                        </div>
                                        <span className="text-xs font-bold text-purple-600 flex items-center group-hover:translate-x-1 transition-transform group-hover:text-purple-700">
                                            Read
                                            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                        </span>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-purple-400 ring-1 ring-inset ring-purple-300 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="sr-only">Previous</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                            </svg>
                        </button>
                        
                        {getPaginationRange().map((pageNum, index) => (
                            pageNum === '...' ? (
                                <span key={`dots-${index}`} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-purple-600 ring-1 ring-inset ring-purple-300 focus:outline-offset-0">...</span>
                            ) : (
                                <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus:outline-offset-0 ${
                                        currentPage === pageNum
                                        ? "z-10 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                        : "text-purple-600 ring-1 ring-inset ring-purple-300 hover:bg-purple-50"
                                    }`}
                                    style={currentPage === pageNum ? { backgroundColor: secondaryColor } : {}}
                                >
                                    {pageNum}
                                </button>
                            )
                        ))}

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-purple-400 ring-1 ring-inset ring-purple-300 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="sr-only">Next</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </nav>
                </div>
            )}
        </div>
      </div>
    </>
  )
}

export default BlogPage