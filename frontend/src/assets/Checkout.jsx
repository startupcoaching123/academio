import { useState, useEffect, useCallback, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../AuthContext"
import Swal from "sweetalert2"
import {
    FaArrowLeft, FaSpinner, FaCheckCircle, FaTruck, FaStore,
    FaCreditCard, FaUser, FaPhoneAlt, FaMapMarkerAlt,
    FaReceipt, FaSearch, FaCrosshairs, FaSave, FaExclamationCircle,
    FaMapPin, FaHome, FaBriefcase
} from "react-icons/fa"
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api"
import axios from "axios"
import debounce from "lodash.debounce"
import CheckoutLoader from "./CheckoutLoader"

// Fallback to localhost if env variable is missing
const BACKENDURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

// --- CONFIGURATION: 7th Avenue, Gaur City ---
const RESTAURANT_LAT = 28.609556
const RESTAURANT_LNG = 77.436733
const DELIVERY_RADIUS_KM = 10

// --- GOOGLE MAPS LIBRARIES ---
const libraries = ["places"]

// --- UTILITY: Calculate Distance ---
const haversineDistanceKm = (lat1, lon1, lat2, lon2) => {
    const toRad = (v) => (v * Math.PI) / 180
    const R = 6371 // Radius of Earth in km
    const dLat = toRad(lat2 - lat1)
    const dLon = toRad(lon2 - lon1)
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
}

const Checkout = () => {
    const { user, token, loading: authLoading } = useAuth()
    const navigate = useNavigate()

    // --- GOOGLE MAPS LOADER ---
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        libraries: libraries
    })

    // --- STATE MANAGEMENT ---
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [isProcessing, setIsProcessing] = useState(false)
    const [razorpayKey, setRazorpayKey] = useState("")

    // Form Data
    const [orderType, setOrderType] = useState("delivery")
    const [selectedPayment, setSelectedPayment] = useState("cod")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")

    // Location Data
    const [deliveryLocation, setDeliveryLocation] = useState(null) // { lat, lng }
    const [addressText, setAddressText] = useState("")
    const [landmark, setLandmark] = useState("")
    const [saveLabel, setSaveLabel] = useState("Home")
    const [locationError, setLocationError] = useState("")
    const [distance, setDistance] = useState(null)

    // Search System
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [isLocating, setIsLocating] = useState(false)

    // Refs
    const searchContainerRef = useRef(null)
    const mapRef = useRef(null)

    // --- INIT: RESTORE STATE OR FETCH USER ---
    useEffect(() => {
        if (authLoading) return

        // 1. Load Cart & Saved State
        const storedCart = JSON.parse(localStorage.getItem("cart")) || []
        const savedState = localStorage.getItem("checkoutData")

        if (savedState) {
            try {
                const parsed = JSON.parse(savedState)
                setCartItems(parsed.cart || storedCart)
                setName(parsed.name || "")
                setPhone(parsed.phone || "")
                if (parsed.deliveryLocation) {
                    setDeliveryLocation(parsed.deliveryLocation)
                    setAddressText(parsed.addressText || "")
                    setLandmark(parsed.landmark || "")
                    const dist = haversineDistanceKm(RESTAURANT_LAT, RESTAURANT_LNG, parsed.deliveryLocation.lat, parsed.deliveryLocation.lng)
                    setDistance(dist)
                }
                localStorage.removeItem("checkoutData")
            } catch (e) { setCartItems(storedCart) }
        } else {
            setCartItems(storedCart)
            if (user) {
                setName(user.fullname || "")
                setPhone(user.phone || "")
                fetchSavedAddress()
            }
        }

        // 2. Fetch Razorpay
        axios.get(`${BACKENDURL}/api/petpooja/razorpay-key`)
            .then(res => setRazorpayKey(res.data?.key || ""))
            .catch(err => console.warn("Razorpay key fetch failed:", err.message))
            .finally(() => setLoading(false))

        // 3. Click Outside Listener
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setShowDropdown(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)

    }, [authLoading, user, token])

    // --- RE-CENTER MAP WHEN LOCATION CHANGES ---
    useEffect(() => {
        if (mapRef.current && deliveryLocation) {
            mapRef.current.panTo(deliveryLocation)
            mapRef.current.setZoom(16)
        }
    }, [deliveryLocation])

    // --- FETCH USER SAVED ADDRESS ---
    const fetchSavedAddress = async () => {
        if (!token) return
        try {
            const res = await axios.get(`${BACKENDURL}/api/user/location`, { headers: { Authorization: `Bearer ${token}` } })
            const saved = res.data?.savedLocation
            if (saved && saved.latitude && saved.longitude) {
                const dist = haversineDistanceKm(RESTAURANT_LAT, RESTAURANT_LNG, saved.latitude, saved.longitude)
                if (dist <= DELIVERY_RADIUS_KM) {
                    setDeliveryLocation({ lat: saved.latitude, lng: saved.longitude })
                    setAddressText(saved.address || "")
                    setLandmark(saved.landmark || "")
                    setSaveLabel(saved.label || "Home")
                    setDistance(dist)
                }
            }
        } catch (e) { console.log("No saved address or Backend down") }
    }

    // --- UPDATED GOOGLE MAPS SEARCH LOGIC ---
    const performSearch = useCallback(debounce((query) => {
        if (!query || query.length < 3 || !window.google) {
            setSearchResults([])
            return
        }
        setIsSearching(true)
        setShowDropdown(true)

        const autocompleteService = new window.google.maps.places.AutocompleteService()
        const geocoder = new window.google.maps.Geocoder()

        const request = {
            input: query,
            locationBias: {
                radius: DELIVERY_RADIUS_KM * 1000,
                center: { lat: RESTAURANT_LAT, lng: RESTAURANT_LNG }
            },
            componentRestrictions: { country: "in" },
        }

        autocompleteService.getPlacePredictions(request, async (predictions, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
                
                // Limit to top 5 to avoid geocoding rate limits and slowness
                const topPredictions = predictions.slice(0, 5)
                
                // We need to fetch coordinates for EACH result to calculate distance
                const detailedResults = await Promise.all(topPredictions.map(async (prediction) => {
                    return new Promise((resolve) => {
                        geocoder.geocode({ placeId: prediction.place_id }, (results, status) => {
                            if (status === 'OK' && results[0]) {
                                const lat = results[0].geometry.location.lat()
                                const lng = results[0].geometry.location.lng()
                                const dist = haversineDistanceKm(RESTAURANT_LAT, RESTAURANT_LNG, lat, lng)
                                
                                resolve({
                                    place_id: prediction.place_id,
                                    display_name: prediction.description,
                                    shortName: prediction.structured_formatting.main_text,
                                    lat: lat,
                                    lng: lng,
                                    distance: dist
                                })
                            } else {
                                resolve(null) // Failed to geocode
                            }
                        })
                    })
                }))

                // Filter out failed geocodes and sort by distance (nearest first)
                const validResults = detailedResults
                    .filter(item => item !== null)
                    .sort((a, b) => a.distance - b.distance)

                setSearchResults(validResults)
            } else {
                setSearchResults([])
            }
            setIsSearching(false)
        })
    }, 500), []) // Increased debounce to 500ms to reduce API calls

    useEffect(() => { performSearch(searchQuery) }, [searchQuery, performSearch])

    // --- LOCATION HANDLERS ---
    const handleSelectLocation = async (lat, lng, displayName = null, placeId = null) => {
        // Note: With the new search logic, we usually already have lat/lng from the search result object
        // But we keep this fallback logic for manual pin movement or "Locate Me"

        if (placeId && !lat && !lng) {
             // Fallback Geocoding (should rarely hit this now)
            const geocoder = new window.google.maps.Geocoder()
            try {
                const res = await geocoder.geocode({ placeId: placeId })
                if (res.results[0]) {
                    lat = res.results[0].geometry.location.lat()
                    lng = res.results[0].geometry.location.lng()
                    displayName = res.results[0].formatted_address
                }
            } catch (e) {
                Swal.fire("Map Error", "Could not fetch coordinates.", "error");
                return
            }
        }

        const dist = haversineDistanceKm(RESTAURANT_LAT, RESTAURANT_LNG, lat, lng)
        setDistance(dist)
        setDeliveryLocation({ lat, lng })
        setShowDropdown(false)
        setSearchQuery("")

        if (dist > DELIVERY_RADIUS_KM) {
            setLocationError(`Location is ${dist.toFixed(1)}km away. We only deliver within ${DELIVERY_RADIUS_KM}km.`)
        } else {
            setLocationError("")
        }

        if (displayName) {
            setAddressText(displayName)
        } else {
            setAddressText("Fetching address...")
            try {
                const geocoder = new window.google.maps.Geocoder()
                const res = await geocoder.geocode({ location: { lat, lng } })
                if (res.results[0]) {
                    setAddressText(res.results[0].formatted_address)
                }
            } catch (e) { setAddressText("") }
        }
    }

    const handleLocateMe = () => {
        if (!navigator.geolocation) {
            Swal.fire("Error", "Geolocation not supported", "error")
            return
        }
        setIsLocating(true)
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                handleSelectLocation(pos.coords.latitude, pos.coords.longitude)
                setIsLocating(false)
            },
            (err) => {
                setIsLocating(false)
                Swal.fire("Location Error", "Could not fetch location.", "error")
            },
            { enableHighAccuracy: true, timeout: 10000 }
        )
    }

    // --- CHECKOUT PROCESS ---
    const isFormValid = () => {
        if (!name.trim() || !phone.trim() || phone.length < 10) return false
        if (orderType === "delivery") {
            return deliveryLocation && !locationError && addressText.trim().length > 5
        }
        return true
    }

    const handlePlaceOrder = async () => {
        if (!token) {
            const stateData = { cart: cartItems, name, phone, deliveryLocation, addressText, landmark }
            localStorage.setItem("checkoutData", JSON.stringify(stateData))

            Swal.fire({
                title: "Login Required",
                text: "To save your address and track orders, please login.",
                icon: "info",
                showCancelButton: true,
                confirmButtonText: "Login & Continue",
                confirmButtonColor: "#ea580c"
            }).then((res) => {
                if (res.isConfirmed) navigate("/login", { state: { from: "/checkout" } })
            })
            return
        }

        setIsProcessing(true)
        try {
            if (user?.phone !== phone) {
                await axios.put(`${BACKENDURL}/api/user/profile`, { phone }, { headers: { Authorization: `Bearer ${token}` } }).catch(e => console.warn("Profile update failed"))
            }
            if (orderType === "delivery" && deliveryLocation) {
                await axios.put(`${BACKENDURL}/api/user/location`, {
                    label: saveLabel,
                    address: addressText,
                    landmark: landmark,
                    latitude: deliveryLocation.lat,
                    longitude: deliveryLocation.lng,
                    city: "Greater Noida", state: "UP", zipCode: "201318"
                }, { headers: { Authorization: `Bearer ${token}` } }).catch(e => console.warn("Location update failed"))
            }
        } catch (e) { console.error("Background update failed", e) }

        setTimeout(() => {
            setIsProcessing(false)
            Swal.fire({
                icon: 'success',
                title: 'Order Placed!',
                text: `Your ${selectedPayment === 'cod' ? 'Cash' : 'Online'} order has been received.`,
                timer: 2000
            })
        }, 1500)
    }

    // --- RENDER ---
    if (loading) return <CheckoutLoader status="loading" />

    const { subtotal } = cartItems.reduce((acc, item) => {
        const addonTotal = item.addons?.reduce((s, a) => s + a.price * a.quantity, 0) || 0
        acc.subtotal += (item.price * item.quantity) + addonTotal
        return acc
    }, { subtotal: 0 })
    const grandTotal = subtotal + (subtotal * 0.05) + 20

    return (
        <div className="min-h-screen bg-[#F4F6F8] pb-15 font-sans text-gray-800">
            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* TOP NAV */}
                <div className="flex items-center gap-4 mb-6">
                    <button onClick={() => navigate(-1)} className="h-10 w-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:text-orange-600 transition">
                        <FaArrowLeft className="text-lg" />
                    </button>
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Checkout</h1>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">

                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-7 space-y-6">

                        {/* DELIVERY MODE */}
                        <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-200 flex relative overflow-hidden">
                            <div className={`absolute top-2 bottom-2 w-[calc(50%-8px)] bg-black rounded-xl shadow transition-transform duration-300 ${orderType === 'takeaway' ? 'translate-x-[calc(100%+8px)]' : 'translate-x-0'}`} />
                            <button onClick={() => setOrderType("delivery")} className={`relative z-10 flex-1 py-3 font-bold text-sm flex items-center justify-center gap-2 transition-colors ${orderType === 'delivery' ? 'text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                                <FaTruck /> Delivery
                            </button>
                            <button onClick={() => setOrderType("takeaway")} className={`relative z-10 flex-1 py-3 font-bold text-sm flex items-center justify-center gap-2 transition-colors ${orderType === 'takeaway' ? 'text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                                <FaStore /> Takeaway
                            </button>
                        </div>

                        {/* PERSONAL DETAILS */}
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="bg-orange-100 p-2 rounded-full text-orange-600"><FaUser size={14} /></div>
                                <h2 className="font-bold text-gray-800">Personal Details</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Name</label>
                                    <input value={name} onChange={e => setName(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition" placeholder="Your Name" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Phone</label>
                                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} maxLength={10} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition" placeholder="10-digit Mobile" />
                                </div>
                            </div>
                        </div>

                        {/* DELIVERY LOCATION */}
                        {orderType === "delivery" && (
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden relative">
                                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-orange-100 p-2 rounded-full text-orange-600"><FaMapMarkerAlt size={14} /></div>
                                        <h2 className="font-bold text-gray-800">Delivery Address</h2>
                                    </div>
                                </div>

                                <div className="p-6 space-y-5">
                                    {/* SEARCH BAR */}
                                    <div className="relative z-10" ref={searchContainerRef}>
                                        <div className="flex items-center gap-2">
                                            <div className="relative flex-1">
                                                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    onFocus={() => { if (searchResults.length > 0) setShowDropdown(true) }}
                                                    className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none shadow-sm transition"
                                                    placeholder="Search landmark, sector, or area..."
                                                />
                                                {isSearching && <FaSpinner className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-orange-500" />}
                                            </div>
                                            <button
                                                onClick={handleLocateMe}
                                                disabled={isLocating}
                                                className="px-4 py-3.5 bg-orange-50 text-orange-700 font-bold rounded-xl hover:bg-orange-100 transition flex items-center gap-2 whitespace-nowrap"
                                            >
                                                {isLocating ? <FaSpinner className="animate-spin" /> : <FaCrosshairs />} Locate Me
                                            </button>
                                        </div>

                                        {/* SEARCH DROPDOWN */}
                                        {showDropdown && (
                                            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 max-h-[300px] overflow-y-auto z-[999]">
                                                {searchResults.length === 0 && !isSearching && searchQuery.length > 2 ? (
                                                    <div className="p-4 text-center text-gray-500 text-sm">No results found nearby. Try a broader search.</div>
                                                ) : (
                                                    searchResults.map((result) => (
                                                        <div
                                                            key={result.place_id}
                                                            onClick={() => handleSelectLocation(result.lat, result.lng, result.display_name, result.place_id)}
                                                            className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 flex items-start gap-3 transition-colors group"
                                                        >
                                                            <div className="mt-1 text-gray-400 group-hover:text-orange-500"><FaMapMarkerAlt /></div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex justify-between items-center">
                                                                    <p className="font-bold text-gray-800 text-sm truncate">{result.shortName}</p>
                                                                    
                                                                    {/* DISTANCE BADGE */}
                                                                    {result.distance && (
                                                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                                                                            result.distance > DELIVERY_RADIUS_KM 
                                                                            ? 'bg-red-100 text-red-600' 
                                                                            : 'bg-green-100 text-green-700'
                                                                        }`}>
                                                                            {result.distance.toFixed(1)} km
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <p className="text-xs text-gray-500 line-clamp-2">{result.display_name}</p>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* GOOGLE MAP AREA */}
                                    <div className="h-[280px] w-full rounded-2xl overflow-hidden border border-gray-200 relative shadow-inner bg-gray-100 z-0">
                                        {!isLoaded ? (
                                            <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-500">
                                                Loading Map...
                                            </div>
                                        ) : loadError ? (
                                            <div className="h-full w-full flex flex-col items-center justify-center bg-red-50 text-red-500 p-4 text-center">
                                                <FaExclamationCircle className="text-3xl mb-2" />
                                                <span className="font-bold">Map Failed to Load</span>
                                                <span className="text-xs mt-1">Please check API Key & Billing.</span>
                                            </div>
                                        ) : (
                                            <GoogleMap
                                                mapContainerStyle={{ width: '100%', height: '100%' }}
                                                center={deliveryLocation || { lat: RESTAURANT_LAT, lng: RESTAURANT_LNG }}
                                                zoom={13}
                                                onLoad={map => mapRef.current = map}
                                                onClick={(e) => handleSelectLocation(e.latLng.lat(), e.latLng.lng())}
                                                options={{
                                                    disableDefaultUI: true,
                                                    zoomControl: false,
                                                    mapId: "DEMO_MAP_ID"
                                                }}
                                            >
                                                {/* Restaurant Marker */}
                                                <MarkerF
                                                    position={{ lat: RESTAURANT_LAT, lng: RESTAURANT_LNG }}
                                                    icon={{
                                                        url: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                                                        scaledSize: new window.google.maps.Size(25, 41)
                                                    }}
                                                />
                                                {/* User Location Marker */}
                                                {deliveryLocation && (
                                                    <MarkerF position={{ lat: deliveryLocation.lat, lng: deliveryLocation.lng }} />
                                                )}
                                            </GoogleMap>
                                        )}

                                        {locationError && (
                                            <div className="absolute top-2 left-2 right-2 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold p-3 rounded-xl shadow-lg z-[400] text-center flex items-center justify-center gap-2">
                                                <FaExclamationCircle /> {locationError}
                                            </div>
                                        )}
                                        {!locationError && deliveryLocation && (
                                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-lg text-xs font-bold text-green-700 z-[400] flex items-center gap-2 border border-green-100">
                                                <FaCheckCircle /> Delivery Available ({distance?.toFixed(1)} km)
                                            </div>
                                        )}
                                    </div>

                                    {/* ADDRESS INPUTS */}
                                    <div className="grid md:grid-cols-2 gap-4 animate-fadeIn">
                                        <div className="md:col-span-2 space-y-1">
                                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Complete Address</label>
                                            <input value={addressText} onChange={e => setAddressText(e.target.value)} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition" placeholder="House / Flat No, Building Name, Street" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Landmark</label>
                                            <input value={landmark} onChange={e => setLandmark(e.target.value)} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition" placeholder="Near..." />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Label</label>
                                            <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-200 h-[50px]">
                                                {['Home', 'Work', 'Other'].map(l => (
                                                    <button key={l} onClick={() => setSaveLabel(l)} className={`flex-1 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${saveLabel === l ? 'bg-white shadow text-black' : 'text-gray-400 hover:text-gray-600'}`}>
                                                        {l === 'Home' && <FaHome />} {l === 'Work' && <FaBriefcase />} {l === 'Other' && <FaMapPin />} {l}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* PAYMENT */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                                <div className="flex items-center gap-2">
                                    <div className="bg-orange-100 p-2 rounded-full text-orange-600"><FaCreditCard size={14} /></div>
                                    <h2 className="font-bold text-gray-800">Payment Method</h2>
                                </div>
                            </div>
                            <div className="p-6 grid sm:grid-cols-2 gap-4">
                                <div onClick={() => setSelectedPayment("cod")} className={`relative cursor-pointer p-5 rounded-2xl border-2 transition-all flex items-start gap-4 ${selectedPayment === 'cod' ? 'border-orange-500 bg-orange-50/30' : 'border-gray-100 hover:border-orange-200'}`}>
                                    <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center mt-1 ${selectedPayment === 'cod' ? 'border-orange-500' : 'border-gray-300'}`}>
                                        {selectedPayment === 'cod' && <div className="h-3 w-3 rounded-full bg-orange-500" />}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800">Cash on Delivery</h3>
                                        <p className="text-xs text-gray-500 mt-1">Pay with cash upon arrival.</p>
                                    </div>
                                </div>
                                <div onClick={() => setSelectedPayment("online")} className={`relative cursor-pointer p-5 rounded-2xl border-2 transition-all flex items-start gap-4 ${selectedPayment === 'online' ? 'border-orange-500 bg-orange-50/30' : 'border-gray-100 hover:border-orange-200'}`}>
                                    <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center mt-1 ${selectedPayment === 'online' ? 'border-orange-500' : 'border-gray-300'}`}>
                                        {selectedPayment === 'online' && <div className="h-3 w-3 rounded-full bg-orange-500" />}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800">Pay Online</h3>
                                        <p className="text-xs text-gray-500 mt-1">UPI, Cards, Netbanking.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: BILL SUMMARY (Desktop) */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-32">
                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative">
                                <div className="h-1.5 bg-gradient-to-r from-orange-400 to-red-500"></div>
                                <div className="p-6">
                                    <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-800"><FaReceipt className="text-gray-400" /> Order Summary</h2>

                                    <div className="space-y-4 max-h-[350px] overflow-y-auto custom-scrollbar pr-2 mb-6">
                                        {cartItems.map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-start text-sm group">
                                                <div>
                                                    <div className="font-bold text-gray-700">{item.name}</div>
                                                    <div className="text-xs text-gray-400 mt-0.5">₹{item.price} x {item.quantity}</div>
                                                    {item.addons?.map((a, ai) => <div key={ai} className="text-[10px] text-gray-400 pl-2">+ {a.name}</div>)}
                                                </div>
                                                <div className="font-bold text-gray-800">₹{((item.price * item.quantity) + (item.addons?.reduce((s, a) => s + a.price * a.quantity, 0) || 0))}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm text-gray-600 mb-6">
                                        <div className="flex justify-between"><span>Item Total</span><span>₹{subtotal}</span></div>
                                        <div className="flex justify-between"><span>Taxes (5%)</span><span>₹{(subtotal * 0.05).toFixed(2)}</span></div>
                                        <div className="flex justify-between"><span>Delivery & Packing</span><span>₹20.00</span></div>
                                        <div className="border-t border-dashed border-gray-300 my-2"></div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-gray-900 text-lg">To Pay</span>
                                            <span className="font-extrabold text-orange-600 text-xl">₹{grandTotal.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handlePlaceOrder}
                                        disabled={!isFormValid() || isProcessing}
                                        className={`hidden lg:flex w-full py-4 rounded-xl font-bold text-lg items-center justify-center gap-2 shadow-lg transition-all active:scale-95 ${isFormValid() && !isProcessing ? 'bg-black text-white hover:bg-gray-900 shadow-xl' : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'}`}
                                    >
                                        {isProcessing ? <FaSpinner className="animate-spin" /> : (
                                            <>{selectedPayment === 'cod' ? 'Place Order' : 'Pay Now'} <FaArrowLeft className="rotate-180" /></>
                                        )}
                                    </button>

                                    {!isFormValid() && (
                                        <p className="hidden lg:flex text-center text-xs text-red-500 mt-3 font-medium items-center justify-center gap-1">
                                            <FaExclamationCircle /> Please fill Name, Phone & Valid Address
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MOBILE STICKY FOOTER */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-[1000] lg:hidden flex items-center gap-4">
                <div className="flex-1">
                    <p className="text-xs text-gray-500 font-bold uppercase">Total to Pay</p>
                    <p className="text-xl font-extrabold text-gray-900">₹{grandTotal.toFixed(2)}</p>
                </div>
                <button
                    onClick={handlePlaceOrder}
                    disabled={!isFormValid() || isProcessing}
                    className={`flex-1 py-3.5 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 ${isFormValid() && !isProcessing ? 'bg-black text-white hover:bg-gray-900 shadow-xl' : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'}`}
                >
                    {isProcessing ? <FaSpinner className="animate-spin" /> : (
                        <>{selectedPayment === 'cod' ? 'Place Order' : 'Pay'}</>
                    )}
                </button>
            </div>

        </div>
    )
}

export default Checkout