"use client"
import { RootState } from '@/redux/store';
import { ArrowLeft, Building2, Home, MapPin, Navigation, Phone, Search, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Checkout = () => {
    const router = useRouter()
    const { userData } = useSelector((state: RootState) => state.user)
    const [address, setAddress] = useState({
        fullname: userData?.name,
        mobile: userData?.mobile,
        city: "",
        state: "",
        pincode: "",
        fulladdress: ""
    })
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
                                onChange={(e) => setAddress({ ...address, fullname: e.target.value })}
                                className=' pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50'
                            />
                        </div>

                        <div className=' relative'>
                            <Phone className=' absolute left-3 top-3 text-gray-600' size={18} />
                            <input
                                type="text"
                                value={address.mobile}
                                onChange={(e) => setAddress({ ...address, mobile: e.target.value })}

                                className=' pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50'
                            />
                        </div>

                        <div className=' relative'>
                            <Home className=' absolute left-3 top-3 text-gray-600' size={18} />
                            <input
                                type="text"
                                value={address.fulladdress}
                                placeholder='Full address'
                                onChange={(e) => setAddress({ ...address, fulladdress: e.target.value })}

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
                                    onChange={(e) => setAddress({ ...address, city: e.target.value })}

                                    className=' pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50'
                                />
                            </div>

                            <div className=' relative'>
                                <Navigation className=' absolute left-3 top-3 text-gray-600' size={18} />
                                <input
                                    type="text"
                                    value={address.state}
                                    placeholder='state'
                                    onChange={(e) => setAddress({ ...address, state: e.target.value })}

                                    className=' pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50'
                                />
                            </div>

                            <div className=' relative'>
                                <Search className=' absolute left-3 top-3 text-gray-600' size={18} />
                                <input
                                    type="text"
                                    value={address.pincode}
                                    placeholder='pincode'
                                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}

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
                            <button className=' flex items-center bg-green-600 text-white px-5 rounded-lg hover:bg-green-700 transition-all font-medium'><Search/>Search</button>
                        </div>

                    </div>
                </motion.div>



            </div>


        </div>
    );
};

export default Checkout;