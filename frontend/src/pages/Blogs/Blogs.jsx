import { useState, useEffect, useCallback, useRef } from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import axios from "axios"

const BACKENDURL = import.meta.env.VITE_BACKEND_URL

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
  const blogsPerPage = 10

  // Primary theme color
  const primaryColor = "#f54900"

  // Use ref for search timeout
  const searchTimeoutRef = useRef(null)

  // Search function
  const performSearch = useCallback(async (query = "", category = "", page = 1) => {
    setSearchLoading(true)
    try {
      const params = {
        page,
        limit: blogsPerPage,
        status: "published"
      }

      let response;

      // If there's a search query or category, use search endpoint
      if (query.trim() || category) {
        const searchParams = { ...params }
        if (query.trim()) searchParams.q = query
        if (category) searchParams.category = category

        response = await axios.get(`${BACKENDURL}/api/admin/blogs/search`, {
          params: searchParams
        })
      } else {
        // Use regular blogs endpoint for "All" view
        response = await axios.get(`${BACKENDURL}/api/admin/blogs/search`, {
          params
        })
      }

      setFilteredBlogs(response.data.blogs || [])
      setTotalPages(response.data.totalPages || 1)
      setTotalBlogs(response.data.total || 0)

      // If not searching and on first page, also update main blogs
      if (!query.trim() && !category && page === 1) {
        setBlogs(response.data.blogs || [])
      }

      setError(null)
    } catch (err) {
      console.error("Search error:", err)
      if (err.response?.status === 404) {
        setError("Unable to connect to the server. Please try again later.")
      } else {
        setError("Failed to load blogs. Please try again later.")
      }
      setFilteredBlogs([])
    } finally {
      setSearchLoading(false)
      setLoading(false)
    }
  }, [blogsPerPage])

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true)
        const [categoriesResponse] = await Promise.all([
          axios.get(`${BACKENDURL}/api/admin/categories`)
        ])
        setCategories(categoriesResponse.data || [])

        // Fetch initial blogs
        await performSearch("", "", 1)
      } catch (err) {
        console.error("Error fetching data:", err)
        if (err.response?.status === 404) {
          setError("API endpoint not found. Please check your backend server is running.")
        } else {
          setError("Failed to load blogs. Please try again later.")
        }
        setLoading(false)
      }
    }
    fetchInitialData()
  }, [performSearch])

  // Real-time search with debounce
  useEffect(() => {
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    // Set new timeout for debounced search
    searchTimeoutRef.current = setTimeout(() => {
      performSearch(searchQuery, selectedCategory, currentPage)
    }, 500) // 500ms debounce

    // Cleanup
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchQuery, selectedCategory, currentPage, performSearch])

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    setCurrentPage(1) // Reset to first page on new search
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? "" : category)
    setCurrentPage(1) // Reset to first page on category change
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
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  const generateStructuredData = () => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Shaista's Blog",
      "description": "Stay updated with Shaista’s Restaurant blog featuring Mughlai food trends, biryani specials, wedding catering guides, corporate events and event food ideas. ",
      "url": window.location.href,
      "publisher": {
        "@type": "Organization",
        "name": "Shaista's Blog",
        "logo": {
          "@type": "ImageObject",
          "url": `${window.location.origin}/logo.png`
        }
      },
      "blogPost": filteredBlogs.map(blog => ({
        "@type": "BlogPosting",
        "headline": blog.title,
        "description": blog.metaDescription,
        "image": blog.featuredImage,
        "author": {
          "@type": "Person",
          "name": blog.author || "Shaista's Blog Team"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Shaista's Blog"
        },
        "datePublished": blog.publishedAt || blog.createdAt,
        "dateModified": blog.updatedAt || blog.createdAt,
        "url": `${window.location.origin}/blogs/${blog.slug}`,
        "keywords": blog.keywords?.join(", ") || "",
        "articleSection": blog.categories?.map(cat => cat.name).join(", ") || ""
      }))
    }
    return JSON.stringify(structuredData)
  }

  // Generate pagination range with ellipsis
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
        if (i - l === 2) {
          rangeWithDots.push(l + 1)
        } else if (i - l !== 1) {
          rangeWithDots.push('...')
        }
      }
      rangeWithDots.push(i)
      l = i
    })

    return rangeWithDots
  }

  // Dynamic title generation
  const generateDynamicTitle = () => {
    if (loading) return "Shaista's Insights | Shaista's Blog";
    if (error) return "Error Loading Shaista's Blog | Shaista's Blog";
    if (searchQuery && !selectedCategory) return `${searchQuery} - Shaista's Insights | Shaista's Blog`;
    if (selectedCategory) return `${selectedCategory} | Shaista's Blog`;
    return "Shaista's Blog - Food & Catering in Greater Noida | Shaista’s Restaurant";
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>{generateDynamicTitle()}</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: primaryColor }}></div>
            <p className="text-gray-600 text-lg">Loading blog posts...</p>
          </div>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Helmet>
          <title>{generateDynamicTitle()}</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 rounded-lg text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: primaryColor }}
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>{generateDynamicTitle()}</title>
        <meta
          name="description"
          content="Stay updated with Shaista’s Restaurant blog featuring Mughlai food trends, biryani specials, wedding catering guides, corporate events and event food ideas."
        />
        <meta
          name="keywords"
          content="Stay updated with Shaista’s Restaurant blog featuring Mughlai food trends, biryani specials, wedding catering guides, corporate events and event food ideas. "
        />
        <meta property="og:title" content={generateDynamicTitle()} />
        <meta property="og:description" content="Stay updated with Shaista’s Restaurant blog featuring Mughlai food trends, biryani specials, wedding catering guides, corporate events and event food ideas." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content={`${window.location.origin}/blog-og-image.jpg`} />
        <meta property="og:site_name" content="Shaista's Blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={generateDynamicTitle()} />
        <meta name="twitter:description" content="Stay updated with Shaista’s Restaurant blog featuring Mughlai food trends, biryani specials, wedding catering guides, corporate events and event food ideas." />
        <meta name="twitter:image" content={`${window.location.origin}/blog-og-image.jpg`} />
        <link rel="canonical" href={window.location.href} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="Shaista's Blog Team" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <script type="application/ld+json">
          {generateStructuredData()}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="text-white py-12" style={{ backgroundColor: primaryColor }}>
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Shaista's Blog</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Discover recipes, food stories, and behind-the-scenes kitchen insights.
              Written for food lovers who enjoy flavour beyond the plate.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mt-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Food Stories & Recipes"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full px-6 py-4 pl-12 text-gray-900 bg-white rounded-full focus:outline-none focus:ring-4 shadow-lg text-lg"
                  style={{ '--tw-ring-color': `${primaryColor}40` }}
                />
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                {searchLoading && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2" style={{ borderColor: primaryColor }}></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white border-b border-gray-200 py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Filter by category:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleCategoryChange("")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === ""
                        ? "text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    style={selectedCategory === "" ? { backgroundColor: primaryColor } : {}}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category._id}
                      onClick={() => handleCategoryChange(category.name)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category.name
                          ? "text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      style={selectedCategory === category.name ? { backgroundColor: primaryColor } : {}}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {(searchQuery || selectedCategory) && (
                <button
                  onClick={clearFilters}
                  className="text-sm font-medium hover:opacity-80 transition-colors"
                  style={{ color: primaryColor }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <div className="container mx-auto px-4 py-12">
          {/* Results Info */}
          <div className="mb-8 flex justify-between items-center">
            <p className="text-gray-600">
              {searchQuery || selectedCategory ? (
                <>
                  Found {totalBlogs} article{totalBlogs !== 1 ? 's' : ''}
                  {searchQuery && ` for "${searchQuery}"`}
                  {selectedCategory && ` in "${selectedCategory}"`}
                </>
              ) : (
                `Showing ${Math.min(totalBlogs, ((currentPage - 1) * blogsPerPage) + 1)}-${Math.min(currentPage * blogsPerPage, totalBlogs)} of ${totalBlogs} article${totalBlogs !== 1 ? 's' : ''}`
              )}
            </p>
            {searchLoading && (
              <div className="flex items-center text-gray-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 mr-2" style={{ borderColor: primaryColor }}></div>
                <span className="text-sm">Searching...</span>
              </div>
            )}
          </div>

          {filteredBlogs.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${primaryColor}15` }}>
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: primaryColor }}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Articles Found</h3>
              <p className="text-gray-600 text-lg mb-6">
                {searchQuery || selectedCategory
                  ? "Try adjusting your search terms or filters"
                  : "Check back soon for valuable content!"
                }
              </p>
              {(searchQuery || selectedCategory) && (
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 rounded-lg text-white hover:opacity-90 transition-colors"
                  style={{ backgroundColor: primaryColor }}
                >
                  View All Articles
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Blog Grid */}
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredBlogs.map((blog) => (
                  <Link key={blog._id} to={`/blogs/${blog.slug}`} className="group block h-full">
                    <article className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:-translate-y-1 h-full flex flex-col"
                      style={{ '--border-color': `${primaryColor}30` }}>
                      <div className="relative overflow-hidden h-48">
                        {blog.featuredImage ? (
                          <div className="relative w-full h-full">
                            <img
                              src={blog.featuredImage}
                              alt=""
                              className="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
                              aria-hidden="true"
                            />
                            <img
                              src={blog.featuredImage}
                              alt={blog.title}
                              className="relative z-10 w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: `${primaryColor}10` }}>
                            <svg
                              className="w-16 h-16"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              style={{ color: `${primaryColor}60` }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        {blog.categories && blog.categories.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {blog.categories.slice(0, 2).map((category, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 text-xs font-medium rounded-full"
                                style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                              >
                                {typeof category === 'object' ? category.name : category}
                              </span>
                            ))}
                          </div>
                        )}

                        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:transition-colors duration-200 line-clamp-3 flex-grow"
                          style={{ '--hover-color': primaryColor }}>
                          {blog.title}
                        </h2>

                        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed flex-grow">
                          {blog.metaDescription}
                        </p>

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-4">
                            <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                            <span>•</span>
                            <span>{calculateReadTime(blog.content)} min read</span>
                          </div>
                          {blog.author && (
                            <span className="font-medium" style={{ color: primaryColor }}>{blog.author}</span>
                          )}
                        </div>

                        <div className="flex items-center font-semibold group-hover:transition-colors mt-auto"
                          style={{ color: primaryColor }}>
                          <span>Read More</span>
                          <svg
                            className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            style={{ color: primaryColor }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>

                      <div className="h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                        style={{ backgroundColor: primaryColor }}></div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 mt-12 pt-8 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>

                    <div className="flex items-center space-x-1">
                      {getPaginationRange().map((pageNum, index) => (
                        pageNum === '...' ? (
                          <span key={`dots-${index}`} className="px-3 py-2 text-gray-500">
                            ...
                          </span>
                        ) : (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${currentPage === pageNum
                                ? "text-white"
                                : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                              }`}
                            style={currentPage === pageNum ? { backgroundColor: primaryColor } : {}}
                          >
                            {pageNum}
                          </button>
                        )
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default BlogPage