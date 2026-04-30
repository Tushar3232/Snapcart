"use client"
import { RootState } from '@/redux/store';
import { ArrowLeft, Building2, CreditCard, Home, LocateFixed, MapPin, Navigation, Phone, Search, Truck, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import L, { LatLngExpression, } from 'leaflet';
import axios from 'axios';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

const markerIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40]
})

const Checkout = () => {
    const router = useRouter()
    const { userData } = useSelector((state: RootState) => state.user)
    const { subTotal, deliveryFee, finalTotal, cartData } = useSelector((state: RootState) => state.cart)
    const [address, setAddress] = useState({
        fullName: "",
        mobile: "",
        town: "",
        state: "",
        pincode: "",
        fullAddress: ""
    })
    const [searchQuery, setSearchQueary] = useState("")
    const [position, setPosition] = useState<[number, number] | null>(null)
    const [paymentMethod, setPaymentMathode] = useState<"cod" | "online">("cod")

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const { latitude, longitude } = pos.coords
                setPosition([latitude, longitude])
            }, (error) => { console.log("location error", error) }, {
                enableHighAccuracy: true, maximumAge: 0,
                timeout: 10000
            })
        }
    }, [])

    useEffect(() => {
        if (userData) {
            setAddress(prev => ({
                ...prev,
                fullName: userData.name || "",
                mobile: userData.mobile || ""
            }));
        }
    }, [userData])

    const DraggableMarker: React.FC = () => {
        const map = useMap()
        useEffect(() => {
            map.setView(position as LatLngExpression, 15, { animate: true })
        }, [position, map])

        return <Marker
            icon={markerIcon}
            position={position as LatLngExpression}
            draggable={true}
            eventHandlers={{
                dragend: (e: L.LeafletEvent) => {
                    const marker = e.target as L.Marker
                    const { lat, lng } = marker.getLatLng()
                    setPosition([lat, lng])
                }
            }}
        />
    }

    const handleSearchQuery = async () => {
        const provider = new OpenStreetMapProvider()
        const results = await provider.search({ query: searchQuery });
        console.log(results)
        if (results) {
            setPosition([results[0].y, results[0].x])
        }
    }

    useEffect(() => {
        const fetchAddress = async () => {
            if (!position) return
            try {
                const result = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${position[0]}&lon=${position[1]}&format=json`)
                console.log(result.data)
                const locationData = result.data.address
                setAddress((prev) => ({
                    ...prev,
                    town: locationData.city ||
                        locationData.town ||
                        locationData.village ||
                        locationData.county ||
                        "",
                    state: locationData.state || "",
                    pincode: locationData.postcode || "",
                    fullAddress: result.data.display_name

                }))
            } catch (error) {
                console.log(error)
            }
        }
        fetchAddress()
    }, [position])

    const handleCod = async () => {
        if (!position) {
            return null
        }
        try {
            const result = await axios.post("/api/user/order", {
                userId: userData?._id,
                items: cartData.map(item => (
                    {
                        grocery: item._id,
                        name: item.name,
                        price: item.price,
                        unit: item.unit,
                        quantity: item.quantity,
                        image: item.image

                    }
                )),
                totalAmount: finalTotal,
                address: {
                    ...address,
                    latitude: position[0],
                    longitude: position[1]

                },
                paymentMethod
            })

           router.push("/user/order-success")
        } catch (error) {
            console.log(error)
        }
    }

    const handleCurrentLotaction = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const { latitude, longitude } = pos.coords
                setPosition([latitude, longitude])
            }, (error) => { console.log("location error", error) }, {
                enableHighAccuracy: true, maximumAge: 0,
                timeout: 10000
            })
        }
    }

    return (
        <div className='w-[92%] md:w-[80%] mx-auto py-10 relative'>
            <motion.button
                onClick={() => router.push("/user/cart")}
                whileTap={{ scale: 0.97 }}
                className=' absolute left-0 top-2 flex items-center gap-2 text-green-700 hover:text-green-800 font-semibold'
            >
                <ArrowLeft />
                <span>Back to cart</span>
            </motion.button>

            <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className=' text-3xl md:text-4xl font-bold text-green-700 text-center mb-10'>
                Chackout
            </motion.h1>

            <div className=' grid md:grid-cols-2 gap-8 items-start'>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className=' bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100'
                >
                    <h2 className=' text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2'>
                        <MapPin /> Delivery Address
                    </h2>
                    <div className=' space-y-4'>
                        <div className=' relative'>
                            <User className=' absolute left-3 top-3 text-gray-600' size={18} />
                            <input
                                type="text"
                                value={address.fullName}
                                onChange={(e) => setAddress((prev) => ({ ...prev, fullName: e.target.value || "" }))}
                                className=' pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50'
                            />
                        </div>

                        <div className=' relative'>
                            <Phone className=' absolute left-3 top-3 text-gray-600' size={18} />
                            <input
                                type="text"
                                value={address.mobile}
                                onChange={(e) => setAddress((prev) => ({ ...prev, mobile: e.target.value || "" }))}

                                className=' pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50'
                            />
                        </div>

                        <div className=' relative'>
                            <Home className=' absolute left-3 top-3 text-gray-600' size={18} />
                            <input
                                type="text"
                                value={address.fullAddress}
                                placeholder='Full address'
                                onChange={(e) => setAddress((prev) => ({ ...prev, fullAddress: e.target.value || "" }))}

                                className=' pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50'
                            />
                        </div>

                        <div className=' grid grid-cols-3 gap-3'>

                            <div className=' relative'>
                                <Building2 className=' absolute left-3 top-3 text-gray-600' size={18} />
                                <input
                                    type="text"
                                    value={address.town}
                                    placeholder='city'
                                    onChange={(e) => setAddress((prev) => ({ ...prev, town: e.target.value || "" }))}

                                    className=' pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50'
                                />
                            </div>

                            <div className=' relative'>
                                <Navigation className=' absolute left-3 top-3 text-gray-600' size={18} />
                                <input
                                    type="text"
                                    value={address.state}
                                    placeholder='state'
                                    onChange={(e) => setAddress((prev) => ({ ...prev, state: e.target.value || "" }))}

                                    className=' pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50'
                                />
                            </div>

                            <div className=' relative'>
                                <Search className=' absolute left-3 top-3 text-gray-600' size={18} />
                                <input
                                    type="text"
                                    value={address.pincode}
                                    placeholder='pincode'
                                    onChange={(e) => setAddress((prev) => ({ ...prev, pincode: e.target.value || "" }))}

                                    className=' pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50'
                                />
                            </div>
                        </div>

                        <div className=' flex gap-2 mt-3' >
                            <input
                                type="text"
                                placeholder=' search city or area.. '
                                value={searchQuery}
                                onChange={(e) => setSearchQueary(e.target.value)}
                                className=' flex-1 border rounded-lg p-3 text-sm focus:ring-green-500 outline-none'
                            />
                            <button
                                onClick={handleSearchQuery}
                                className=' flex items-center bg-green-600 text-white px-5 rounded-lg hover:bg-green-700 transition-all font-medium'>
                                <Search />Search
                            </button>
                        </div>

                        {/* map  */}

                        <div className=' relative mt-6 h-82.5 rounded-xl overflow-hidden border border-gray-200 shadow-inner'>
                            {position &&
                                <MapContainer
                                    center={position as LatLngExpression}
                                    zoom={13}
                                    scrollWheelZoom={true}
                                    className=' w-full h-full'
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <DraggableMarker />
                                </MapContainer>
                            }
                            <motion.button
                                whileTap={{ scale: 0.6 }}
                                onClick={handleCurrentLotaction}
                                className=' absolute bottom-4 right-4 bg-green-600 text-white shadow-lg rounded-full p-3 hover:bg-green-700 transition-all flex items-center justify-center z-999'
                            >
                                <LocateFixed />
                            </motion.button>

                        </div>

                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className=' bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-gray-100'
                >
                    <h2 className=' text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2'>
                        <CreditCard className=' text-green-700' />  Payment Method
                    </h2>
                    <div className=' space-y-4 mb-6'>
                        <button
                            onClick={() => setPaymentMathode("online")}
                            className={`flex items-center gap-3 w-full border rounded-lg p-3 transition-all ${paymentMethod === "online"
                                ? "border-green-600 bg-green-50 shadow-sm"
                                : "hover:bg-gray-50"
                                }`}>
                            <CreditCard /> <span>Pay online (stripe)</span>
                        </button>

                        <button
                            onClick={() => setPaymentMathode("cod")}
                            className={`flex items-center gap-3 w-full border rounded-lg p-3 transition-all ${paymentMethod === "cod"
                                ? "border-green-600 bg-green-50 shadow-sm"
                                : "hover:bg-gray-50"
                                }`}>
                            <Truck /> <span>Cash on delivery (stripe)</span>
                        </button>
                    </div>
                    <div className=' border-t pt-4 text-gray-700 space-y-2 text-sm sm:text-base'>
                        <div className=' flex justify-between'>
                            <span className=' font-semibold'>subtotal</span>
                            <span className=' font-semibold text-green-600'> {subTotal} Tk </span>
                        </div>
                        <div className=' flex justify-between'>
                            <span className=' font-semibold'>Delivery Fee</span>
                            <span className=' font-semibold text-green-600'> {deliveryFee} Tk </span>
                        </div>
                        <div className=' flex justify-between font-bold border-t border-dashed pt-3'>
                            <span className=' font-semibold'>Final Total</span>
                            <span className=' font-semibold text-green-600'> {finalTotal} Tk </span>
                        </div>

                    </div>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                            if (paymentMethod == "cod") {
                                handleCod()
                            } else {
                                handleOnlineOrDer()
                            }

                        }}
                        className=' w-full mt-6 bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition-all font-semibold'
                    >
                        {
                            paymentMethod === "cod" ? "palace order" : "Pay & Place Order"
                        }
                    </motion.button>
                </motion.div>

            </div>


        </div>
    );
};

export default Checkout;