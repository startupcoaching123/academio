"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import BlogList from "../../components/Blogs/BlogList"
import { validateSession } from "../../utils/auth.js"
import BlogForm from "../../components/Blogs/BlogForm.jsx"

const BACKENDURL = import.meta.env.VITE_BACKEND_URL

function AdminPanel() {
  const [blogs, setBlogs] = useState([])
  const [filteredBlogs, setFilteredBlogs] = useState([])
  const [selectedBlog, setSelectedBlog] = useState(null)
  const [activeSection, setActiveSection] = useState("dashboard")
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stats, setStats] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    totalViews: 0,
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [categories, setCategories] = useState([])
  const [contacts, setContacts] = useState([])
  const [consultations, setConsultations] = useState([])
  const [newsletters, setNewsletters] = useState([])
  const [responses, setResponses] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [sendingId, setSendingId] = useState(null)

  // Primary theme color
  const primaryColor = "#1F3551"

  const navigate = useNavigate()

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // First validate the session
        const isValid = await validateSession();
        if (!isValid) {
          localStorage.removeItem("token");
          navigate("/admin/login");
          return;
        }

        // Only proceed with data fetching if validation passed
        if (activeSection === "dashboard" || activeSection === "blogs") {
          await fetchBlogs();
          await fetchCategories();
        }
        if (activeSection === "contacts") await fetchContacts();
        if (activeSection === "consultations") await fetchConsultations();
        if (activeSection === "newsletters") await fetchNewsletters();
        if (activeSection === "responses") await fetchResponses();

      } catch (error) {
        console.error("Error in initial data fetching:", error);
        // Handle token expiration during data fetching
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/admin/login");
        }
      }
    };

    checkAuthAndFetchData();
  }, [activeSection, navigate]);


  const handleTokenExpiration = async (error, navigate) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      const Swal = (await import("sweetalert2")).default;
      await Swal.fire({
        title: "Session Expired",
        text: "Your session has expired. Please login again.",
        icon: "warning",
        confirmButtonColor: primaryColor,
        confirmButtonText: "OK",
      });
      navigate("/admin/login");
      return true; // Indicates token was expired
    }
    return false; // Token was not expired
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BACKENDURL}/api/admin/blogs`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBlogs(response.data);
      setFilteredBlogs(response.data);
      setStats({
        totalBlogs: response.data.length,
        publishedBlogs: response.data.filter((blog) => blog.status === "published").length,
        draftBlogs: response.data.filter((blog) => blog.status === "draft").length,
        totalViews: response.data.reduce((sum, blog) => sum + (blog.views || 0), 0),
      });
    } catch (err) {
      console.error("Blog fetch error:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/admin/login");
      } else {
        toast.error("Failed to fetch blogs. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BACKENDURL}/api/admin/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data);
    } catch (err) {
      console.error("Category fetch error:", err);
      const isTokenExpired = await handleTokenExpiration(err, navigate);
      if (!isTokenExpired) {
        toast.error("Failed to fetch categories.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BACKENDURL}/api/contact`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Handle both array response and object response with data property
      const contactsData = Array.isArray(response.data)
        ? response.data
        : response.data.data || response.data.contacts || [];

      setContacts(contactsData);
    } catch (err) {
      console.error("Contact fetch error:", err);
      const isTokenExpired = await handleTokenExpiration(err, navigate);
      if (!isTokenExpired) {
        toast.error("Failed to fetch contacts.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchConsultations = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BACKENDURL}/api/consultation`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Handle both array response and object response with data property
      const consultationsData = Array.isArray(response.data)
        ? response.data
        : response.data.data || response.data.consultations || [];

      setConsultations(consultationsData);
    } catch (err) {
      console.error("Consultation fetch error:", err);
      const isTokenExpired = await handleTokenExpiration(err, navigate);
      if (!isTokenExpired) {
        toast.error("Failed to fetch consultations.");
      }
    } finally {
      setLoading(false);
    }
  };

const fetchNewsletters = async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BACKENDURL}/api/newsletter`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    // Handle both array response and object response with data property
    const newslettersData = Array.isArray(response.data) 
      ? response.data 
      : response.data.data || response.data.subscribers || response.data.newsletters || [];
      
    setNewsletters(newslettersData);
  } catch (err) {
    console.error("Newsletter fetch error:", err);
    const isTokenExpired = await handleTokenExpiration(err, navigate);
    if (!isTokenExpired) {
      toast.error("Failed to fetch newsletters.");
    }
  } finally {
    setLoading(false);
  }
};

const fetchResponses = async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BACKENDURL}/api/response`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    // Handle both array response and object response with data property
    const responsesData = Array.isArray(response.data) 
      ? response.data 
      : response.data.data || response.data.responses || [];
      
    setResponses(responsesData);
  } catch (err) {
    console.error("Response fetch error:", err);
    const isTokenExpired = await handleTokenExpiration(err, navigate);
    if (!isTokenExpired) {
      toast.error("Failed to fetch question responses.");
    }
  } finally {
    setLoading(false);
  }
};



  const handleSearch = (query) => {
    setSearchQuery(query)
    if (!query && !selectedCategory) {
      setFilteredBlogs(blogs)
      return
    }
    const filtered = blogs.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(query.toLowerCase()) ||
        blog.content.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = !selectedCategory ||
        (blog.categories && blog.categories.some(cat => cat.name === selectedCategory))
      return matchesSearch && matchesCategory
    })
    setFilteredBlogs(filtered)
  }

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category)
    if (!category && !searchQuery) {
      setFilteredBlogs(blogs)
      return
    }
    handleSearch(searchQuery)
  }

  const handleCreate = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${BACKENDURL}/api/admin/blogs`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Blog created successfully!");
      fetchBlogs();
      fetchCategories();
      setSelectedBlog(null);
    } catch (err) {
      console.error("Blog creation error:", err);
      const isTokenExpired = await handleTokenExpiration(err, navigate);
      if (!isTokenExpired) {
        toast.error(err.response?.data?.error || "Failed to create blog");
      }
    }
  };

  const handleUpdate = async (id, formData) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${BACKENDURL}/api/admin/blogs/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Blog updated successfully!");
      fetchBlogs();
      fetchCategories();
      setSelectedBlog(null);
    } catch (err) {
      console.error("Blog update error:", err);
      const isTokenExpired = await handleTokenExpiration(err, navigate);
      if (!isTokenExpired) {
        toast.error(err.response?.data?.error || "Failed to update blog");
      }
    }
  };

  const handleDelete = async (id) => {
    const Swal = (await import("sweetalert2")).default;
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: primaryColor,
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${BACKENDURL}/api/admin/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Blog deleted successfully!");
        fetchBlogs();
        Swal.fire("Deleted!", "Your blog has been deleted.", "success");
      } catch (err) {
        console.error("Blog deletion error:", err);
        const isTokenExpired = await handleTokenExpiration(err, navigate);
        if (!isTokenExpired) {
          toast.error(err.response?.data?.error || "Failed to delete blog");
        }
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/admin/login")
  }

  const downloadCSV = (data, filename, type) => {
    let csv = '';
    switch (type) {
      case 'contacts':
        csv = 'Name,Email,Phone,Age,Submitted At\n';
        csv += data.map(item =>
          `"${item.name || ''}","${item.email || ''}","${item.phone || ''}","${item.age || ''}","${new Date(item.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}"`
        ).join('\n');
        break;
      case 'consultations':
        csv = 'Name,Email,Phone,Age,Current Savings,Retirement Age,Consultation Type,Source,Submitted At\n';
        csv += data.map(item =>
          `"${item.name || ''}","${item.email || ''}","${item.phone || ''}","${item.age || ''}","${item.currentSavings || ''}","${item.retirementAge || ''}","${item.consultationType || ''}","${item.source || ''}","${new Date(item.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}"`
        ).join('\n');
        break;
      case 'newsletters':
        csv = 'Email,Subscribed At\n';
        csv += data.map(item =>
          `"${item.email || ''}","${new Date(item.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}"`
        ).join('\n');
        break;
      case 'responses':
        csv = 'Client Name,Email,MCQ Score,Personality Score,Total Score,Personality Type,Experience Level,Submitted At\n';
        csv += data.map(item =>
          `"${item.clientName || ''}","${item.email || ''}","${item.mcqScore || 0}","${item.personalityScore || 0}","${item.totalScore || 0}","${item.personalityType || ''}","${item.experienceLevel || ''}","${new Date(item.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}"`
        ).join('\n');
        break;
    }
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `${filename}.csv`);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const menuItems = [
    {
      id: "dashboard",
      name: "Dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
          />
        </svg>
      ),
    },
    {
      id: "blogs",
      name: "Blog Posts",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      id: "contacts",
      name: "Contacts",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: "consultations",
      name: "Consultations",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a2 2 0 00-2-2h-3m-2 4h-5v-2a2 2 0 012-2h3m-6-4V4h12v10m-6 4v2m-6-2h12"
          />
        </svg>
      ),
    },
    {
      id: "newsletters",
      name: "Newsletters",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      ),
    },
    {
      id: "responses",
      name: "Question Responses",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-center h-16 px-4" style={{ backgroundColor: primaryColor }}>
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
        </div>
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${activeSection === item.id
                  ? "text-white border-r-4"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                style={activeSection === item.id ? {
                  backgroundColor: primaryColor,
                  borderColor: `${primaryColor}80`
                } : {}}
              >
                {item.icon}
                <span className="ml-3 font-medium">{item.name}</span>
              </button>
            ))}
          </div>
        </nav>
        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="ml-3 font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h2 className="ml-4 text-2xl font-bold text-gray-900 capitalize">
                {activeSection === "dashboard" ? "Dashboard Overview" : activeSection}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            {activeSection === "dashboard" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: `${primaryColor}15` }}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: primaryColor }}>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Posts</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalBlogs}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Published</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.publishedBlogs}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Drafts</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.draftBlogs}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Views</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        setActiveSection("blogs")
                        setSelectedBlog({})
                      }}
                      className="flex items-center p-4 rounded-lg transition-colors group"
                      style={{ backgroundColor: `${primaryColor}15` }}
                    >
                      <div className="p-2 rounded-lg group-hover:opacity-90 transition-colors" style={{ backgroundColor: primaryColor }}>
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">Create New Post</p>
                        <p className="text-sm text-gray-600">Write a new blog post</p>
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveSection("blogs")}
                      className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                    >
                      <div className="p-2 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">Manage Posts</p>
                        <p className="text-sm text-gray-600">Edit existing posts</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "blogs" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Blog Management</h3>
                    <p className="text-gray-600">Create, edit, and manage your blog posts</p>
                  </div>
                  {selectedBlog === null && (
                    <button
                      onClick={() => {
                        setSelectedBlog({ status: 'published' })
                      }}
                      className="text-white px-6 py-3 rounded-lg hover:opacity-90 transition-colors flex items-center space-x-2"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Create New Blog</span>
                    </button>
                  )}
                </div>
                {selectedBlog === null && (
                  <>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="Search by title or content..."
                          value={searchQuery}
                          onChange={(e) => handleSearch(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                          style={{ '--tw-ring-color': primaryColor }}
                        />
                        <svg
                          className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
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
                      </div>
                      <select
                        value={selectedCategory}
                        onChange={(e) => handleCategoryFilter(e.target.value)}
                        className="pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                        style={{ '--tw-ring-color': primaryColor }}
                      >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                          <option key={category._id || category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <BlogList blogs={filteredBlogs} onEdit={setSelectedBlog} onDelete={handleDelete} />
                  </>
                )}
                {selectedBlog !== null && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-6">
                      <BlogForm
                        onSubmit={selectedBlog._id ? (data) => handleUpdate(selectedBlog._id, data) : handleCreate}
                        initialData={selectedBlog}
                        onCancel={() => setSelectedBlog(null)}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeSection === "contacts" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Contact Form Submissions</h3>
                    <p className="text-gray-600">View all contact form submissions</p>
                  </div>
                  <button
                    onClick={() => downloadCSV(contacts, 'contacts', 'contacts')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Download CSV</span>
                  </button>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  {loading ? (
                    <div className="flex items-center justify-center p-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: primaryColor }}></div>
                    </div>
                  ) : !contacts || contacts.length === 0 ? (
                    <p className="text-center py-8 text-gray-500">No contact submissions found.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted At</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {Array.isArray(contacts) && contacts.map((contact) => (
                            <tr
                              key={contact._id}
                              onClick={() => setSelectedItem({ type: 'contact', data: contact })}
                              className="cursor-pointer hover:bg-gray-50"
                            >
                              <td className="px-6 py-4 whitespace-nowrap">{contact.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{contact.email}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{contact.phone || 'N/A'}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{contact.age || 'N/A'}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {new Date(contact.createdAt || contact.submittedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
            {activeSection === "consultations" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Consultation Requests</h3>
                    <p className="text-gray-600">View all consultation requests</p>
                  </div>
                  <button
                    onClick={() => downloadCSV(consultations, 'consultations', 'consultations')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Download CSV</span>
                  </button>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  {loading ? (
                    <div className="flex items-center justify-center p-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: primaryColor }}></div>
                    </div>
                  ) : !consultations || consultations.length === 0 ? (
                    <p className="text-center py-8 text-gray-500">No consultation requests found.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Savings</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consultation Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted At</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {Array.isArray(consultations) && consultations.map((consultation) => (
                            <tr
                              key={consultation._id}
                              onClick={() => setSelectedItem({ type: 'consultation', data: consultation })}
                              className="cursor-pointer hover:bg-gray-50"
                            >
                              <td className="px-6 py-4 whitespace-nowrap">{consultation.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{consultation.email}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{consultation.phone}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{consultation.age}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{consultation.currentSavings}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{consultation.consultationType || 'N/A'}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {new Date(consultation.createdAt || consultation.submittedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

           {activeSection === "newsletters" && (
  <div className="space-y-6">
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Newsletter Subscriptions</h3>
        <p className="text-gray-600">View all newsletter subscriptions</p>
      </div>
      <button
        onClick={() => downloadCSV(newsletters, 'newsletters', 'newsletters')}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span>Download CSV</span>
      </button>
    </div>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: primaryColor }}></div>
        </div>
      ) : !newsletters || newsletters.length === 0 ? (
        <p className="text-center py-8 text-gray-500">No newsletter subscriptions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscribed At</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.isArray(newsletters) && newsletters.map((newsletter) => (
                <tr
                  key={newsletter._id}
                  onClick={() => setSelectedItem({ type: 'newsletter', data: newsletter })}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{newsletter.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(newsletter.createdAt || newsletter.subscribedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
)}

         {activeSection === "responses" && (
  <div className="space-y-6">
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Questionnaire Responses</h3>
        <p className="text-gray-600">View all questionnaire responses and results</p>
      </div>
      <button
        onClick={() => downloadCSV(responses, 'question_responses', 'responses')}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span>Download CSV</span>
      </button>
    </div>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: primaryColor }}></div>
        </div>
      ) : !responses || responses.length === 0 ? (
        <p className="text-center py-8 text-gray-500">No questionnaire responses found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MCQ Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Personality Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Personality Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted At</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.isArray(responses) && responses.map((response) => (
                <tr
                  key={response._id}
                  onClick={() => setSelectedItem({ type: 'response', data: response })}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{response.clientName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{response.email || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{response.mcqScore || 0}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{response.personalityScore || 0}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{response.totalScore || 0}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${response.personalityType === 'Conservative' ? 'bg-blue-100 text-blue-800' : 
                                     response.personalityType === 'Balanced' ? 'bg-green-100 text-green-800' : 
                                     response.personalityType === 'Aggressive' ? 'bg-yellow-100 text-yellow-800' : 
                                     'bg-gray-100 text-gray-800'}`}>
                      {response.personalityType || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${response.experienceLevel === 'Beginner' ? 'bg-red-100 text-red-800' : 
                                     response.experienceLevel === 'Intermediate' ? 'bg-orange-100 text-orange-800' : 
                                     response.experienceLevel === 'Advanced' ? 'bg-green-100 text-green-800' : 
                                     'bg-gray-100 text-gray-800'}`}>
                      {response.experienceLevel || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(response.createdAt || response.date).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
)}

            {/* Modal for Detailed View */}
            {selectedItem && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedItem.type === 'contact' && 'Contact Details'}
                      {selectedItem.type === 'consultation' && 'Consultation Details'}
                      {selectedItem.type === 'newsletter' && 'Newsletter Subscription Details'}
                      {selectedItem.type === 'response' && 'Questionnaire Response Details'}
                    </h3>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="space-y-4">
                    {selectedItem.type === 'contact' && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="font-medium">{selectedItem.data.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{selectedItem.data.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-medium">{selectedItem.data.phone || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Age</p>
                            <p className="font-medium">{selectedItem.data.age || 'N/A'}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Submitted At</p>
                          <p className="font-medium">{new Date(selectedItem.data.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
                        </div>
                      </>
                    )}
                    {selectedItem.type === 'consultation' && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="font-medium">{selectedItem.data.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{selectedItem.data.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-medium">{selectedItem.data.phone}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Age</p>
                            <p className="font-medium">{selectedItem.data.age}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Current Savings</p>
                            <p className="font-medium">{selectedItem.data.currentSavings}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Retirement Age</p>
                            <p className="font-medium">{selectedItem.data.retirementAge || 'Not provided'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Consultation Type</p>
                            <p className="font-medium">{selectedItem.data.consultationType || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Source</p>
                            <p className="font-medium">{selectedItem.data.source || 'N/A'}</p>
                          </div>
                        </div>
                        {selectedItem.data.message && (
                          <div>
                            <p className="text-sm text-gray-500">Message</p>
                            <div className="whitespace-pre-line bg-gray-50 p-3 rounded-lg mt-1">
                              {selectedItem.data.message}
                            </div>
                          </div>
                        )}
                        <div>
                          <p className="text-sm text-gray-500">Submitted At</p>
                          <p className="font-medium">{new Date(selectedItem.data.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
                        </div>
                      </>
                    )}
                    {selectedItem.type === 'newsletter' && (
                      <>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{selectedItem.data.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Subscribed At</p>
                          <p className="font-medium">{new Date(selectedItem.data.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
                        </div>
                      </>
                    )}
                    {selectedItem.type === 'response' && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Client Name</p>
                            <p className="font-medium">{selectedItem.data.clientName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{selectedItem.data.email || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">MCQ Score</p>
                            <p className="font-medium">{selectedItem.data.mcqScore || 0}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Personality Score</p>
                            <p className="font-medium">{selectedItem.data.personalityScore || 0}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Total Score</p>
                            <p className="font-medium">{selectedItem.data.totalScore || 0}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Personality Type</p>
                            <span className={`px-2 py-1 text-xs rounded-full ${selectedItem.data.personalityType === 'Conservative' ? 'bg-blue-100 text-blue-800' :
                              selectedItem.data.personalityType === 'Balanced' ? 'bg-green-100 text-green-800' :
                                selectedItem.data.personalityType === 'Aggressive' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-gray-100 text-gray-800'}`}>
                              {selectedItem.data.personalityType || 'N/A'}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Experience Level</p>
                            <span className={`px-2 py-1 text-xs rounded-full ${selectedItem.data.experienceLevel === 'Beginner' ? 'bg-red-100 text-red-800' :
                              selectedItem.data.experienceLevel === 'Intermediate' ? 'bg-orange-100 text-orange-800' :
                                selectedItem.data.experienceLevel === 'Advanced' ? 'bg-green-100 text-green-800' :
                                  'bg-gray-100 text-gray-800'}`}>
                              {selectedItem.data.experienceLevel || 'N/A'}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Submitted At</p>
                          <p className="font-medium">{new Date(selectedItem.data.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  )
}

export default AdminPanel