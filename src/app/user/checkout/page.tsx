"use client"
import { RootState } from '@/redux/store';
import { ArrowLeft, Building2, Home, MapPin, Navigation, Phone, Search, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngExpression, } from 'leaflet';

const Checkout = () => {
    const router = useRouter()
    const { userData } = useSelector((state: RootState) => state.user)
    const [address, setAddress] = useState({
        fullname: "",
        mobile: "",
        city: "",
        state: "",
        pincode: "",
        fulladdress: ""
    })
    const [position, setPosition] = useState<[number, number] | null>(null)

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const { latitude, longitude } = pos.coords
                setPosition([latitude, longitude])
            })
        }
    }, [])

    useEffect(() => {
        if (userData) {
            setAddress(prev => ({
                ...prev,
                fullname: userData.name || "",
                mobile: userData.mobile || ""
            }));
        }
    }, [userData])


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

            <div className=' grid md:grid-cols-2 gap-8'>
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
                                value={address.fullname}
                                onChange={() => setAddress((prev) => ({ ...prev, fullname: address.fullname || "" }))}
                                className=' pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50'
                            />
                        </div>

                        <div className=' relative'>
                            <Phone className=' absolute left-3 top-3 text-gray-600' size={18} />
                            <input
                                type="text"
                                value={address.mobile}
                                onChange={() => setAddress((prev) => ({ ...prev, fullname: address.mobile || "" }))}

                                className=' pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50'
                            />
                        </div>

                        <div className=' relative'>
                            <Home className=' absolute left-3 top-3 text-gray-600' size={18} />
                            <input
                                type="text"
                                value={address.fulladdress}
                                placeholder='Full address'
                                onChange={() => setAddress((prev) => ({ ...prev, fullname: address.fulladdress || "" }))}

                                className=' pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50'
                            />
                        </div>

                        <div className=' grid grid-cols-3 gap-3'>

                            <div className=' relative'>
                                <Building2 className=' absolute left-3 top-3 text-gray-600' size={18} />
                                <input
                                    type="text"
                                    value={address.city}
                                    placeholder='city'
                                    onChange={() => setAddress((prev) => ({ ...prev, fullname: address.city || "" }))}

                                    className=' pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50'
                                />
                            </div>

                            <div className=' relative'>
                                <Navigation className=' absolute left-3 top-3 text-gray-600' size={18} />
                                <input
                                    type="text"
                                    value={address.state}
                                    placeholder='state'
                                    onChange={() => setAddress((prev) => ({ ...prev, fullname: address.state || "" }))}

                                    className=' pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50'
                                />
                            </div>

                            <div className=' relative'>
                                <Search className=' absolute left-3 top-3 text-gray-600' size={18} />
                                <input
                                    type="text"
                                    value={address.pincode}
                                    placeholder='pincode'
                                    onChange={() => setAddress((prev) => ({ ...prev, fullname: address.pincode || "" }))}

                                    className=' pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50'
                                />
                            </div>
                        </div>

                        <div className=' flex gap-2 mt-3' >
                            <input
                                type="text"
                                placeholder=' search city or area.. '
                                className=' flex-1 border rounded-lg p-3 text-sm focus:ring-green-500 outline-none'
                            />
                            <button className=' flex items-center bg-green-600 text-white px-5 rounded-lg hover:bg-green-700 transition-all font-medium'><Search />Search</button>
                        </div>

                        {/* map  */}

                        <div className=' relative mt-6 h-82.5 rounded-xl overflow-hidden border border-gray-200 shadow-inner'>
                            {position &&
                                <MapContainer
                                    center={position as LatLngExpression}
                                    zoom={13}
                                    scrollWheelZoom={false}
                                    className=' w-full h-full'
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />

                                </MapContainer>
                            }

                        </div>

                    </div>
                </motion.div>



            </div>


        </div>
    );
};

export default Checkout;