"use client"
import { Leaf, ShoppingBasket, Smartphone, Truck } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion"
import Image from 'next/image';
import { s } from 'motion/react-client';

const HeroSection = () => {
    const slides = [
        {
            id: 1,
            icon: <Leaf className="w-20 h-20 sm:w-28 sm:h-28 text-green-400 drop-shadow-lg" />,
            title: "Fresh Organic Groceries 🥕",
            subtitle: "Farm-fresh fruits, vegetables, and daily essentials delivered to you.",
            btnText: "Shop Now",
            bg: "https://media.istockphoto.com/id/1355133475/photo/fresh-vegetables-selling-at-local-market-in-dhaka.webp?a=1&b=1&s=612x612&w=0&k=20&c=PF5PKLd0V5CDsa1DLb2jAn8NvjvC43XTn_IJy1zjMfk="
        },
        {
            id: 2,
            icon: <Truck className="w-20 h-20 sm:w-28 sm:h-28 text-yellow-400 drop-shadow-lg" />,
            title: "Fast & Reliable Delivery 🚛",
            subtitle: "We ensure your groceries reach your doorstep in no time.",
            btnText: "Order Now",
            bg: "https://media.istockphoto.com/id/1059113186/photo/delivery-company-worker-holding-grocery-bag-food-order-supermarket-service.webp?a=1&b=1&s=612x612&w=0&k=20&c=jSont6AN1ctpHlIO32cSXiNE7E0h54xwyVvf2ftfVhg="
        },
        {
            id: 3,
            icon: <Smartphone className="w-20 h-20 sm:w-28 sm:h-28 text-blue-400 drop-shadow-lg" />,
            title: "Shop Anytime, Anywhere 📦",
            subtitle: "Easy and seamless online grocery shopping experience.",
            btnText: "Get Started",
            bg: "https://media.istockphoto.com/id/871227828/photo/unrecognizable-woman-shops-for-produce-in-supermarket.webp?a=1&b=1&s=612x612&w=0&k=20&c=TIlUlorZJPIYF6A58Rc6xz-t1grtjElxvIwm_4_xzZM="
        },
    ]

    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) =>  (prev + 1)% slides.length)
        }, 4000)
        return () => clearInterval(timer)
    }, )
    return (
        <div className=' relative w-[98%] mx-auto mt-32 h-[80vh] rounded-3xl overflow-hidden shadow-2xl'>
            <AnimatePresence mode='wait'>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    exit={{ opacity: 0 }}
                    key={current}
                    className=' absolute inset-0'
                >
                    <Image
                        src={slides[current]?.bg || "/fallback.jpg"}
                        fill
                        alt='slide'
                        priority
                        className=' object-cover'
                    />
                    <div className=' absolute inset-0 bg-black/50 backdrop-blur-[1px]'/>
                </motion.div>
            </AnimatePresence>

            <div className=' absolute inset-0 flex items-center justify-center text-center text-white px-6'>
                <motion.div
                initial={{y:30, opacity:0}}
                animate={{y:0, opacity:1}}
                transition={{duration:0.6}}
                className=' flex flex-col items-center justify-center gap-6 max-w-3xl'
                >
                    <div className=' bg-white/10 backdrop-blur-md p-6 rounded-full shadow-lg'>
                        {
                            slides[current]?.icon
                        }
                    </div>
                    <h1 className=' text-3xl sm:text-5xl font-extrabold tracking-tight drop-shadow-lg'>
                        {slides[current]?.title}
                    </h1>
                    <p className=' text-lg sm:text-xl text-gray-200 max-w-2xl'>
                        {slides[current]?.subtitle}
                    </p>
                    <button className=' mt-4 bg-white text-green-700 hover:bg-green-100 px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 flex items-center gap-2'>
                        <ShoppingBasket className=' h-5 w-5'/>
                        {
                           slides[current]?.btnText 
                        }
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroSection;