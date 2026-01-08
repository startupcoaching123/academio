"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"
import axios from "axios"
import Swal from "sweetalert2"
import { toast } from "react-hot-toast"

const BACKENDURL = import.meta.env.VITE_BACKEND_URL

function SingleBlogPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [relatedBlogs, setRelatedBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [readingProgress, setReadingProgress] = useState(0)
  const [email, setEmail] = useState("")
  const [newsletterLoading, setNewsletterLoading] = useState(false)
  const [readTime, setReadTime] = useState(5)
  const [tableOfContents, setTableOfContents] = useState([])

  // Primary theme color
  const primaryColor = "#f54900"

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${BACKENDURL}/api/admin/blogs/${slug}`)
        setBlog(response.data)

        // Calculate read time based on content length
        if (response.data.content) {
          const wordCount = response.data.content.replace(/<[^>]*>/g, "").split(/\s+/).length
          const minutes = Math.ceil(wordCount / 200)
          setReadTime(minutes)

          // Generate table of contents
          generateTableOfContents(response.data.content)
        }

        // Fetch related blogs based on categories - USE PUBLIC ENDPOINT
        try {
          const categoryIds = response.data.categories?.map((cat) => cat._id || cat) || []
          
          // Use the new public related endpoint
          const relatedResponse = await axios.get(`${BACKENDURL}/api/admin/blogs/related`, {
            params: {
              categories: categoryIds.join(","),
              exclude: response.data._id,
              limit: 4,
              status: "published",
            },
          })
          
          // Handle both array response and object response
          const relatedData = Array.isArray(relatedResponse.data) 
            ? relatedResponse.data 
            : relatedResponse.data.blogs || [];
            
          setRelatedBlogs(relatedData.filter((blog) => blog._id !== response.data._id).slice(0, 4))
        } catch (relatedErr) {
          console.log("Related blogs not available:", relatedErr.message)
        }

        setLoading(false)
      } catch (err) {
        console.error("Error fetching blog:", err)
        setError("Failed to load blog post. Please try again later.")
        setLoading(false)
      }
    }
    fetchBlog()
  }, [slug])

  const generateTableOfContents = (content) => {
    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = content
    const headings = tempDiv.querySelectorAll("h1, h2, h3, h4, h5, h6")

    const toc = Array.from(headings).map((heading, index) => ({
      id: `heading-${index}`,
      text: heading.textContent,
      level: Number.parseInt(heading.tagName.charAt(1)),
    }))

    setTableOfContents(toc)
  }

  // Reading progress tracker
  useEffect(() => {
    const updateReadingProgress = () => {
      const article = document.querySelector("article")
      if (article) {
        const scrollTop = window.scrollY
        const docHeight = article.offsetHeight
        const winHeight = window.innerHeight
        const scrollPercent = scrollTop / (docHeight - winHeight)
        const scrollPercentRounded = Math.round(scrollPercent * 100)
        setReadingProgress(Math.min(100, Math.max(0, scrollPercentRounded)))
      }
    }

    window.addEventListener("scroll", updateReadingProgress)
    return () => window.removeEventListener("scroll", updateReadingProgress)
  }, [blog])

  // Newsletter subscription handler
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) {
      Swal.fire({
        title: "Email Required",
        text: "Please enter your email address.",
        icon: "warning",
        confirmButtonColor: primaryColor,
      })
      return
    }

    setNewsletterLoading(true)

    try {
      const res = await axios.post(`${BACKENDURL}/api/admin/newsletter/subscribe`, {
        email: email.trim(),
      })

      Swal.fire({
        title: "Subscribed!",
        text: res.data.message || "You have successfully subscribed to our newsletter.",
        icon: "success",
        confirmButtonColor: primaryColor,
      })

      setEmail("")
    } catch (err) {
      if (err.response?.data?.message === "Email already subscribed.") {
        Swal.fire({
          title: "Already Subscribed",
          text: "This email is already registered for our newsletter.",
          icon: "warning",
          confirmButtonColor: primaryColor,
        })
      } else {
        Swal.fire({
          title: "Oops!",
          text: "Something went wrong. Please try again later.",
          icon: "error",
          confirmButtonColor: primaryColor,
        })
      }
    } finally {
      setNewsletterLoading(false)
    }
  }


  // Social sharing functions
  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank", "width=600,height=400")
  }

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(blog.title)
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank", "width=600,height=400")
  }

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank", "width=600,height=400")
  }

  const shareOnWhatsApp = () => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(`Check out this article: ${blog.title}`)
    window.open(`https://wa.me/?text=${text} ${url}`, "_blank")
  }

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        toast.success("Link Copied! The article link has been copied to your clipboard.", {
          duration: 2000,
          position: "top-center",
          style: {
            marginTop: "50px",
            background: "#1A1A1A",
            color: "#fff",
            border: `1px solid ${primaryColor}`,
          },
        })
      })
      .catch(() => {
        toast.error("Failed to copy the link.", {
          duration: 2000,
          position: "top-center",
          style: {
            marginTop: "80px",
            background: "#1A1A1A",
            color: "#fff",
            border: "1px solid red",
          },
        })
      })
  }

  // Process content to add IDs to headings and make tables responsive
  const processContent = (content) => {
    if (!content) return content

    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = content

    // Add IDs to headings for table of contents
    const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6')
    headings.forEach((heading, index) => {
      heading.id = `heading-${index}`
    })

    // Process images - ensure proper display
    const images = tempDiv.querySelectorAll('img')
    images.forEach((img, index) => {
      img.id = `content-image-${index}`

      // Ensure proper classes
      if (!img.classList.contains('inline-image')) {
        img.classList.add('inline-image')
      }

      // Add responsive and styling classes
      img.classList.add('mx-auto', 'my-6', 'rounded-lg', 'shadow-md', 'max-w-full', 'h-auto')

      // Ensure proper attributes
      img.setAttribute('loading', 'lazy')
      img.setAttribute('alt', img.getAttribute('alt') || 'Blog content image')
    })

    // Process tables - make them responsive
    const tables = tempDiv.querySelectorAll('table')
    tables.forEach((table) => {
      // Add responsive classes to table
      table.className = 'w-full border-collapse text-sm'

      // Style table headers
      const headers = table.querySelectorAll('th')
      headers.forEach((header) => {
        header.className = 'bg-gray-100 border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900'
      })

      // Style table cells
      const cells = table.querySelectorAll('td')
      cells.forEach((cell) => {
        cell.className = 'border border-gray-300 px-4 py-3 text-gray-700'
      })

      // Wrap table in responsive container if not already wrapped
      if (!table.parentElement.classList.contains('table-responsive-wrapper')) {
        const wrapper = document.createElement('div')
        wrapper.className = 'table-responsive-wrapper overflow-x-auto my-6 rounded-lg border border-gray-200 shadow-sm'
        table.parentNode.insertBefore(wrapper, table)
        wrapper.appendChild(table)
      }
    })

    // Process lists - ensure proper styling
    const lists = tempDiv.querySelectorAll('ul, ol')
    lists.forEach((list) => {
      if (list.tagName.toLowerCase() === 'ul') {
        // Remove any existing classes and add proper ones
        list.className = 'list-disc pl-6 my-4'
      } else if (list.tagName.toLowerCase() === 'ol') {
        list.className = 'list-decimal pl-6 my-4'
      }
    })

    // Process list items
    const listItems = tempDiv.querySelectorAll('li')
    listItems.forEach((li) => {
      li.className = 'my-2'
    })

    // Process paragraphs - preserve spacing
    const paragraphs = tempDiv.querySelectorAll('p')
    paragraphs.forEach((p) => {
      // Preserve empty paragraphs for spacing
      if (p.innerHTML.trim() === '' || p.innerHTML === '<br>') {
        p.style.minHeight = '1.5em'
      }
    })

    // Process links - ensure they open in new tab if external
    const links = tempDiv.querySelectorAll('a')
    links.forEach((link) => {
      const href = link.getAttribute('href')
      if (href) {
        // Check if it's an external link
        if (href.startsWith('http://') || href.startsWith('https://')) {
          link.setAttribute('target', '_blank')
          link.setAttribute('rel', 'noopener noreferrer')
        } else if (!href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('#')) {
          // Add https:// to relative URLs
          link.setAttribute('href', `https://${href}`)
          link.setAttribute('target', '_blank')
          link.setAttribute('rel', 'noopener noreferrer')
        }
      }
    })

    // Process headings - ensure proper styling
    const allHeadings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6')
    allHeadings.forEach((heading) => {
      heading.classList.add('font-bold', 'text-gray-900')
    })

    // Process blockquotes
    const blockquotes = tempDiv.querySelectorAll('blockquote')
    blockquotes.forEach((blockquote) => {
      blockquote.classList.add('border-l-4', 'pl-4', 'italic', 'my-4')
      blockquote.style.borderColor = primaryColor
    })

    // Process code blocks
    const codeBlocks = tempDiv.querySelectorAll('pre')
    codeBlocks.forEach((pre) => {
      pre.classList.add('bg-gray-900', 'text-white', 'p-4', 'rounded-lg', 'overflow-x-auto', 'my-4')
    })

    // Process inline code
    const inlineCodes = tempDiv.querySelectorAll('code:not(pre code)')
    inlineCodes.forEach((code) => {
      code.classList.add('bg-gray-100', 'px-2', 'py-1', 'rounded', 'text-sm', 'text-red-600')
    })

    return tempDiv.innerHTML
  }

  const generateStructuredData = () => {
    if (!blog) return ""

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.metaDescription,
      image: blog.featuredImage,
      author: {
        "@type": "Person",
        name: blog.author || "Shaista's Blog Team",
      },
      publisher: {
        "@type": "Organization",
        name: "Shaista's Blog",
        logo: {
          "@type": "ImageObject",
          url: `${window.location.origin}/logo.png`,
        },
      },
      datePublished: blog.publishedAt || blog.createdAt,
      dateModified: blog.updatedAt || blog.createdAt,
      url: window.location.href,
      keywords: blog.keywords?.join(", ") || "",
      articleSection: blog.categories?.map((cat) => (typeof cat === "object" ? cat.name : cat)).join(", ") || "",
      wordCount: blog.content ? blog.content.replace(/<[^>]*>/g, "").split(/\s+/).length : 0,
      timeRequired: `PT${readTime}M`,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": window.location.href,
      },
    }

    return JSON.stringify(structuredData)
  }

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Recipe & Taste Stories Business Article | Shaista's Blog</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="min-h-screen bg-gray-50">
          <div className="bg-white border-b border-gray-200">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="w-3/4 h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-full h-64 bg-gray-200 rounded animate-pulse"></div>
                <div className="space-y-3">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg border space-y-3">
                    <div className="w-full h-32 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Helmet>
          <title>Error Loading Business Article | Shaista's Blog</title>
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
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="space-x-4">
              <button
                onClick={() => window.location.reload()}
                className="text-white px-6 py-2 rounded-lg hover:opacity-90 transition-colors"
                style={{ backgroundColor: primaryColor }}
              >
                Try Again
              </button>
              <button
                onClick={() => navigate("/blogs")}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Back to Blogs
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (!blog) {
    return (
      <>
        <Helmet>
          <title>Business Article Not Found | Shaista's Blog</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Article Not Found</h3>
            <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been moved.</p>
            <Link
              to="/blogs"
              className="text-white px-6 py-2 rounded-lg hover:opacity-90 transition-colors inline-block"
              style={{ backgroundColor: primaryColor }}
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>{blog.title} | Shaista's Blog</title>
        <meta
          name="description"
          content={blog.metaDescription || "Food & Catering in Greater Noida | Shaista’s Restaurant."}
        />
        <meta
          name="keywords"
          content={blog.keywords ? blog.keywords.join(", ") : "Wedding catering services, Royal wedding catering, Nikah catering services, Reception catering in Noida, Engagement catering, Premium catering services"}
        />
        <meta name="author" content={blog.author || "Shaista's Blog Team"} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.metaDescription} />
        <meta property="og:image" content={blog.featuredImage} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:site_name" content="Shaista's Blog" />
        <meta property="article:published_time" content={blog.publishedAt || blog.createdAt} />
        <meta property="article:modified_time" content={blog.updatedAt || blog.createdAt} />
        <meta property="article:author" content={blog.author || "Shaista's Blog Team"} />
        {blog.categories &&
          blog.categories.map((category, index) => (
            <meta
              key={index}
              property="article:section"
              content={typeof category === "object" ? category.name : category}
            />
          ))}
        {blog.keywords &&
          blog.keywords.map((keyword, index) => <meta key={index} property="article:tag" content={keyword} />)}

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.metaDescription} />
        <meta name="twitter:image" content={blog.featuredImage} />

        {/* Additional SEO Tags */}
        <link rel="canonical" href={window.location.href} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />

        {/* Structured Data */}
        <script type="application/ld+json">{generateStructuredData()}</script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
          <div
            className="h-full transition-all duration-150 ease-out"
            style={{ width: `${readingProgress}%`, backgroundColor: primaryColor }}
          ></div>
        </div>

        {/* Navigation Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate("/blogs")}
                className="flex items-center space-x-2 text-gray-600 transition-colors group"
                style={{ '--hover-color': primaryColor }}
              >
                <svg
                  className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-medium group-hover:transition-colors">Back to Blog</span>
              </button>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500 hidden md:block">
                  {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <div className="flex space-x-1">
                  <button
                    onClick={shareOnFacebook}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Share on Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>

                  <button
                    onClick={shareOnTwitter}
                    className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Share on Twitter"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </button>

                  <button
                    onClick={shareOnLinkedIn}
                    className="p-2 text-gray-400 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Share on LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </button>

                  <button
                    onClick={shareOnWhatsApp}
                    className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Share on WhatsApp"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                  </button>

                  <button
                    onClick={copyToClipboard}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    title="Copy link"
                    style={{ '--hover-color': primaryColor }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Article Content */}
            <div className="lg:col-span-3">
              <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Featured Image */}
                {blog.featuredImage && (
                  <div className="relative w-full flex justify-center bg-black/5 rounded-lg overflow-hidden">
                    <img
                      src={blog.featuredImage || "/placeholder.svg"}
                      alt={blog.title}
                      className="w-full h-auto max-h-[600px] object-contain transition-transform duration-500 ease-in-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Article Header */}
                <div className="p-6 md:p-8">
                  <div className="mb-6">
                    {/* Categories */}
                    {blog.categories && blog.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.categories.slice(0, 3).map((category, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-sm font-medium rounded-full"
                            style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                          >
                            {typeof category === "object" ? category.name : category}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">{blog.title}</h1>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center text-gray-500 text-sm space-x-4 mb-4">
                      {blog.author && (
                        <>
                          <span className="font-medium" style={{ color: primaryColor }}>{blog.author}</span>
                          <span>•</span>
                        </>
                      )}
                      <span>
                        {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span>•</span>
                      <span>{readTime} min read</span>
                    </div>
                  </div>

                  {/* Article Content with Responsive Tables */}
                  <div
                    className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-blockquote:bg-gray-50 prose-blockquote:p-4 prose-blockquote:rounded-lg prose-img:rounded-lg prose-img:shadow-sm"
                    style={{
                      '--prose-a': primaryColor,
                      '--prose-blockquote-border': primaryColor,
                    }}
                    dangerouslySetInnerHTML={{ __html: processContent(blog.content) }}
                  />

                  {/* Article Footer */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">Share this article:</span>
                        <div className="flex space-x-2">
                          <button
                            onClick={shareOnFacebook}
                            className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                            title="Share on Facebook"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                          </button>
                          <button
                            onClick={shareOnTwitter}
                            className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-400 rounded-lg transition-colors"
                            title="Share on Twitter"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                            </svg>
                          </button>
                          <button
                            onClick={shareOnLinkedIn}
                            className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
                            title="Share on LinkedIn"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                          </button>
                          <button
                            onClick={shareOnWhatsApp}
                            className="p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-colors"
                            title="Share on WhatsApp"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                            </svg>
                          </button>
                          <button
                            onClick={copyToClipboard}
                            className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors"
                            title="Copy link"
                            style={{ '--hover-bg': `${primaryColor}15` }}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Related Posts */}
                {relatedBlogs.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{ color: primaryColor }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                        />
                      </svg>
                      Related Articles
                    </h3>
                    <div className="space-y-4">
                      {relatedBlogs.map((relatedBlog) => (
                        <Link key={relatedBlog._id} to={`/blogs/${relatedBlog.slug}`} className="block group">
                          <article className="flex space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-gray-900 group-hover:transition-colors line-clamp-2 mb-1"
                                style={{ '--hover-color': primaryColor }}>
                                {relatedBlog.title}
                              </h4>
                              <p className="text-xs text-gray-500">
                                {new Date(relatedBlog.publishedAt || relatedBlog.createdAt).toLocaleDateString("en-US")}
                              </p>
                            </div>
                          </article>
                        </Link>
                      ))}
                    </div>
                    <Link
                      to="/blogs"
                      className="block mt-4 text-center font-medium text-sm transition-colors hover:opacity-80"
                      style={{ color: primaryColor }}
                    >
                      View All Articles →
                    </Link>
                  </div>
                )}

                {/* Newsletter Signup */}
                {/* <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: primaryColor }}>
                  <div className="flex items-center mb-3">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <h3 className="text-lg font-bold">Stay Updated</h3>
                  </div>
                  <p className="text-opacity-90 text-sm mb-4">
                    Get the latest retirement insights and tips delivered to your inbox.
                  </p>
                  <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-2 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 border border-gray-200 bg-white transition-all"
                      style={{ '--tw-ring-color': `${primaryColor}40` }}
                      disabled={newsletterLoading}
                    />
                    <button
                      type="submit"
                      disabled={newsletterLoading}
                      className="w-full bg-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      style={{ color: primaryColor }}
                    >
                      {newsletterLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Subscribing...
                        </>
                      ) : (
                        "Subscribe"
                      )}
                    </button>
                  </form>
                  <p className="text-xs text-opacity-80 mt-2">No spam, unsubscribe at any time.</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleBlogPage