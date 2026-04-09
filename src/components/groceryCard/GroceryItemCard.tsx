'use client';
import { IGrocery } from '@/app/models/grocery.model';
import Image from 'next/image';
import { motion } from "motion/react";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { addToCart } from '@/redux/cartSlise';

const GroceryItemCard = ({ item }: { item: IGrocery }) => {
    const dispatch=useDispatch<AppDispatch>()
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.5 }}

            className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 flex flex-col h-full hover:shadow-2xl transition-all duration-300 group"
        >
            <div>
                {/* Image Container */}
                <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
                    <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Subtle overlay on hover */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Area */}
                <div className="p-5 flex flex-col flex-1">
                    <p className="text-xs text-gray-500 font-medium tracking-wide">
                        {item.category}
                    </p>

                    <h3 className="font-semibold text-lg text-gray-800 mt-1 leading-tight line-clamp-2">
                        {item.name}
                    </h3>

                    {/* Price and Unit */}
                    <div className="flex items-center justify-between mt-4">
                        <span className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                            {item.unit}
                        </span>
                        <span className="text-2xl font-bold text-green-700">
                            ৳{item.price}
                        </span>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                    onClick={()=>dispatch(addToCart({...item,quantity:1}))}
                        className="mt-6 bg-green-600 hover:bg-green-700 active:bg-green-800 
                               text-white font-semibold py-3.5 rounded-2xl transition-all 
                               duration-200 flex items-center justify-center gap-2 shadow-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to Cart
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default GroceryItemCard;