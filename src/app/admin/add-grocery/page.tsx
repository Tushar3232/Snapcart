"use client"
import { ArrowLeft, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from "framer-motion"
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';

const categories = [
    "Dairy & Eggs",
    "Rice, Atta & Grains",
    "Snacks & Biscuits",
    "Spices & Masalas",
    "Beverages & Drinks",
    "Personal Care",
    "Household Essentials",
    "Instant & Packaged Food",
    "Baby & Pet Care"
]
const units = [
    "kg", "g", "liter", "ml", "price", "pack"
]
const AddGrocery = () => {
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [unit, setUnit] = useState("")
    const [price, setPrice] = useState("")
    const [preview, setPreview] = useState<string | null>()
    const [backendImage, setBackendImage] = useState<File | null>()

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length == 0) return
        const file = files[0]
        setBackendImage(file)
        setPreview(URL.createObjectURL(file))
    }
    return (
        <div className=' min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-white py-16 px-4 relative'>
            <Link href={"/"} className=' absolute top-6 left-6 flex items-center gap-2 text-green-700 font-semibold bg-white px-4 py-2 rounded-full shadow-md hover:bg-green-100 hover:shadow-lg transition-all'>
                <ArrowLeft />
                <span className=' hidden md:flex'>
                    back to home
                </span>
            </Link>
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className=' bg-white w-full max-w-2xl rounded-3xl border border-green-100 p-8'
            >
                <div className=' flex flex-col items-center mb-8'>
                    <div className=' flex items-center gap-3'>
                        <PlusCircle className=' text-green-600 w-8 h-8' />
                        <h1>Add Your Grocery</h1>
                    </div>
                    <p>Fill out the details below to add a new grocery item.</p>
                </div>
                {/* form  */}
                <form className=' flex flex-col gap-6 w-full'>
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className=' block text-gray-700 font-medium mb-1'>Grocery Name</label>
                        <input
                            type="text"
                            id='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='eg: Sweets, Milk...'
                            className=' w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all'
                        />
                    </div>

                    {/* Category + Unit */}
                    <div className=' grid grid-cols-1 sm:grid-cols-2 gap-3'>
                        <div>
                            <label className=' block text-gray-700 font-medium mb-1 '>
                                Category
                            </label>
                            <select
                                name='category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className=' w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all bg-white'
                            >
                                <option value="">Select Category</option>
                                {
                                    categories.map(cat => (
                                        <option key={cat} value={cat}> {cat} </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div>
                            <label className=' block text-gray-700 font-medium mb-1 '>
                                Unit
                            </label>
                            <select
                                name='unit'
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                                className=' w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all bg-white'
                            >
                                <option value="">Select Unit</option>
                                {
                                    units.map(u => (
                                        <option key={u} value={u}> {u} </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    {/* Price */}
                    <div>
                        <label htmlFor="price" className=' block text-gray-700 font-medium mb-1'>Price</label>
                        <input
                            type="text"
                            id='price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder='eg. 120'
                            className=' w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all'
                        />
                    </div>
                    {/* image  */}
                    <div>
                        <label htmlFor="image"
                         className=' cursor-pointer flex items-center justify-center gap-2 bg-green-50 text-green-700 font-semibold border border-green-200 rounded-xl px-6 hover:bg-green-100 transition-all w-full sm:w-auto'
                         >Upload image</label>
                        <div className=' flex flex-col sm:flex-row items-center gap-5'>

                            <input
                                type="file"
                                hidden
                                accept='image/*'

                                onChange={handleImageChange}

                            />
                            {preview && <Image src={preview} width={100} height={100} alt='image' />}
                        </div>

                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default AddGrocery;