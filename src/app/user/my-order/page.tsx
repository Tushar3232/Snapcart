"use client"
import { IOrder } from '@/app/models/order.model';
import UserOrderCard from '@/components/userOrderCard/UserOrderCard';
import axios from 'axios';
import { ArrowLeft, LoaderIcon, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const MyOrder = () => {
    const router = useRouter()
    const [orders, setOrders] = useState<IOrder[]>([])
    const [loding, setLoding] = useState(true)

    useEffect(() => {
        const getMyorders = async () => {
            try {
                const result = await axios.get("/api/user/my-orders")
                console.log(result.data)
                setOrders(result.data)
                setLoding(false)
            } catch (error) {
                console.log("my order forntend error", error)
            }
        }
        getMyorders()
    }, [])

    if (loding) {
        return <div className='flex items-center justify-center min-h-screen'>
            <p>Loding your orders..</p>
            <LoaderIcon className=' animate-spin text-gray-600 ' />
        </div>
    }
    return (
        <div className=' bg-linear-to-b from-white to-gray-100 min-h-screen w-full'>
            <div className=' max-w-3xl mx-auto px-4 pt-16 pb-10 relative'>
                <div className=' fixed top-0 left-0 w-full backdrop-blur-lg bg-white/70 shadow-sm border-b z-50'>
                    <div className=' max-w-3xl mx-auto flex items-center gap-4 px-4 py-4'>
                        <button className=' p-2 bg-gray-100 rounded-full hover:bg-gray-200 active:scale-95 transition'>
                            <ArrowLeft size={24} className='text-green-700' />

                        </button>
                        <h1 className=' text-xl font-bold text-gray-800'>My Orders</h1>
                    </div>
                </div>

                <div>
                    {orders.length == 0 ? (
                        <div className='mt-20 flex flex-col items-center justify-center text-center py-16'>
                            <Package size={70} className='text-green-600 mb-4' />

                            <h2 className='text-2xl font-bold text-gray-700'>
                                No Orders Found
                            </h2>

                            <p className='text-gray-500 mt-2'>
                                Start shopping to view your orders here.
                            </p>
                        </div>
                    )
                        :
                        <div className=' mt-4 space-y-6'>
                            {orders?.map(order=>(
                                <div key={order._id?.toString()}>
<UserOrderCard order={order}></UserOrderCard>
                                </div>
                            ))}

                        </div>

                    }
                </div>
            </div>
        </div>
    );
};

export default MyOrder;