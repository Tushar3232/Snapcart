'use client'
import { BabyIcon, ChevronLeft, ChevronRight, CoffeeIcon, CookieIcon, HeartIcon, HomeIcon, LeafIcon, MilkIcon, PackageIcon, WheatIcon } from "lucide-react";
import { motion } from "motion/react"
import { useRef } from "react";

const CategorySlider = () => {
    const categories = [
        { id: 1, name: "Dairy & Eggs", icon: MilkIcon, color: "bg-yellow-100" },
        { id: 2, name: "Rice, Atta & Grains", icon: WheatIcon, color: "bg-orange-100" },
        { id: 3, name: "Snacks & Biscuits", icon: CookieIcon, color: "bg-pink-100" },
        { id: 4, name: "Spices & Masalas", icon: LeafIcon, color: "bg-green-100" },
        { id: 5, name: "Beverages & Drinks", icon: CoffeeIcon, color: "bg-blue-100" },
        { id: 6, name: "Personal Care", icon: HeartIcon, color: "bg-red-100" },
        { id: 7, name: "Household Essentials", icon: HomeIcon, color: "bg-indigo-100" },
        { id: 8, name: "Instant & Packaged Food", icon: PackageIcon, color: "bg-purple-100" },
        { id: 9, name: "Baby & Pet Care", icon: BabyIcon, color: "bg-cyan-100" },
    ]

    const scrollRef= useRef<HTMLDivElement>(null)
    const scroll = (direction:"left" | "right")=>{
        if(!scrollRef.current)return
        const scrollAmount=direction=="left"?-300:300
        scrollRef.current.scrollBy({left:scrollAmount, behavior:"smooth"})
    }

    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, amount: 0.5 }}

                className='w-[90%] md:w-[80%] mx-auto mt-10 relative'
            >

                <h2 className='text-2xl md:text-3xl font-bold text-green-700 mb-6 text-center'>  Shop by category</h2>
                <button onClick={()=>scroll("left")} className=" absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-green-100 rounded-full w-10 h-10 flex items-center justify-center transition-all">
                    <ChevronLeft />
                </button>
                <div ref={scrollRef}
                className=" flex gap-6 overflow-x-auto px-10 pb-4 scrollbar-hide scroll-smooth">
                    {
                        categories.map((cat) => {
                            const Icon = cat.icon
                            return <motion.div key={cat.id}
                                className={`min-w-37.5 md:min-w-44.5 flex flex-col items-center justify-center rounded-2xl ${cat.color} shadow-md hover:shadow-xl transition-all cursor-pointer`}
                            >
                                <div className=" flex flex-col items-center justify-center p-5">
                                    <Icon className=" w-10 h-10 text-green-700 mb-3" />
                                    <p className=" text-center text-sm md:text-base font-semibold text-gray-700">
                                        {cat.name}
                                    </p>
                                </div>
                            </motion.div>
                        })
                    }
                </div>
                <button onClick={()=>scroll("right")} className=" absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-green-100 rounded-full w-10 h-10 flex items-center justify-center transition-all">
                    <ChevronRight />
                </button>
            </motion.div>

        </div>
    );
};

export default CategorySlider;