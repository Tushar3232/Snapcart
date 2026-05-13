"use client"

import { IOrder } from '@/app/models/order.model';
import { CalendarDays, CreditCard, MapPin, Package, Phone } from 'lucide-react';
import { span } from 'motion/react-client';
import Image from 'next/image';
import React from 'react';

const UserOrderCard = ({ order }: { order: IOrder }) => {

    const firstItem = order.items?.[0]

    return (
        <div className='bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300'>

            {/* Top */}
            <div className='p-5 border-b border-gray-100 flex items-start justify-between gap-4'>

                <div>
                    <h2 className='text-lg font-bold text-gray-800'>
                        Order #{String(order._id).slice(-6)}
                    </h2>

                    <div className='flex items-center gap-2 mt-2 text-sm text-gray-500'>
                        <CalendarDays size={16} />
                        <p>
                            {new Date(order.createdAt!).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <div>
                    <span>
                        {order.isPaid? <span className='px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold capitalize'>Paid</span> :<span className='px-4 py-1.5 rounded-full bg-gray-200 text-yellow-700 text-sm font-semibold capitalize'>Unpaid</span>}
                    </span>
                    <span className='px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold capitalize'>
                        {order.status}
                    </span>
                </div>
            </div>

            {/* Product */}
            <div className='p-5 flex flex-col md:flex-row gap-5'>

                <div className='relative w-full md:w-32 h-32 rounded-2xl overflow-hidden bg-gray-100'>
                    <Image
                        src={firstItem?.image}
                        alt={firstItem?.name}
                        fill
                        className='object-cover'
                    />
                </div>

                <div className='flex-1'>

                    <h3 className='text-xl font-bold text-gray-800'>
                        {firstItem?.name}
                    </h3>

                    <div className='mt-3 flex flex-wrap gap-3'>

                        <div className='flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl'>
                            <Package size={18} className='text-green-700' />
                            <p className='text-sm text-gray-700'>
                                Qty: {firstItem?.quantity}
                            </p>
                        </div>

                        <div className='flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl'>
                            <CreditCard size={18} className='text-green-700' />
                            <p className='text-sm text-gray-700 uppercase'>
                                {order.paymentMethod}
                            </p>
                        </div>

                    </div>

                    <div className='mt-5'>
                        <h2 className='text-2xl font-bold text-green-700'>
                            ৳ {order.totalAmount}
                        </h2>
                    </div>

                </div>

            </div>

            {/* Address */}
            <div className='border-t border-gray-100 p-5 bg-gray-50'>

                <div className='flex items-start gap-3'>

                    <MapPin size={20} className='text-green-700 mt-1' />

                    <div>
                        <h3 className='font-semibold text-gray-800'>
                            Delivery Address
                        </h3>

                        <p className='text-sm text-gray-600 mt-1'>
                            {order.address?.fullAddress}
                        </p>
                    </div>

                </div>

                <div className='flex items-center gap-3 mt-4'>

                    <Phone size={18} className='text-green-700' />

                    <p className='text-sm text-gray-700'>
                        {order.address?.mobile}
                    </p>

                </div>

            </div>

        </div>
    );
};

export default UserOrderCard;