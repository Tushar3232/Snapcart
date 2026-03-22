"use client"
import { LogOutIcon, Package, Search, ShoppingCartIcon, User } from 'lucide-react';
import mongoose from 'mongoose';
import { AnimatePresence } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { motion } from "framer-motion"
import { signOut } from 'next-auth/react';
interface IUser {
    _id?: mongoose.Types.ObjectId,
    name: string,
    email: string,
    password?: string,
    mobile?: string,
    role: "user" | "deliberyBoy" | "admin"
    image?: string
}
const Nav = ({ user }: { user: IUser }) => {
    const [open, setOpen] = useState(false)
    const [searchBarOpen, setSearchBarOpen] = useState(false)
    console.log(user)
    return (
        <div className=' w-[95%] fixed top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-green-500 to-green-700 rounded-2xl shadow-lg shadow-black/30 flex justify-between items-center h-20 px-4 md:px-8 z-50'>
            <Link href={"/"}
                className=' text-white font-extrabold text-2xl sm:text-3xl tracking-wide hover:scale-105 transition-transform'
            >
                snapcart
            </Link>

            {/* search  */}
            {
                user?.role == "user" && <form className=' hidden md:flex items-center bg-white rounded-full px-4 py-2 w-1/2 max-w-lg shadow-md'>
                    <Search className=' text-gray-500 w-5 h-5 mr-2'></Search>


                    <input
                        type="text"
                        placeholder='Search groceries...'
                        className='w-full outline-none text-gray-700 placeholder-gray-400'
                    />


                </form>
            }

            <div className=' flex items-center gap-3 md:gap-6 relative'>
                {
                    user?.role == "user" && <>
                        <div
                            onClick={() => setSearchBarOpen((prev) => !prev)}
                            className=' cursor-pointer bg-white rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:scale-105 transition md:hidden'>
                            <Search />
                        </div>


                        <Link href={""}
                            className=' relative bg-white rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:scale-105 transition'
                        >
                            <ShoppingCartIcon className=' text-green-600 w-6 h-6' />
                            <span className=' absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold shadow'>0</span>
                        </Link>
                    </>
                }

                <div className='relative'>
                    <div
                        onClick={() => setOpen(prev => !prev)}
                        className=' bg-white rounded-full w-11 h-11 flex items-center justify-center overflow-hidden shadow-md hover:scale-105 transition-transform '>
                        {
                            user?.image
                                ?
                                <Image src={user?.image}
                                    alt="User Profile"
                                    fill
                                    className="rounded-full object-cover"
                                />
                                :
                                <User />
                        }
                    </div>
                    <AnimatePresence>
                        {open &&
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.2 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                className=' absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-200 p-3 z-999'
                            >
                                <div className=' flex gap-2'>
                                    <div className=' relative w-10 h-10 rounded-full bg-green-100 flex items-center justify-center overflow-hidden'>
                                        {
                                            user?.image
                                                ?
                                                <Image src={user?.image}
                                                    alt="User Profile"
                                                    fill
                                                    className="rounded-full object-cover"
                                                />
                                                :
                                                <User />
                                        }
                                    </div>
                                    <div>
                                        <div className=' text-gray-800 font-semibold'> {user.name} </div>
                                        <div className=' text-xs text-gray-500 capitalize'> {user.role} </div>
                                    </div>
                                </div>
                                <Link href={""}
                                    onClick={() => setOpen(false)}
                                    className=' flex items-center gap-3 py-3 hover:bg-green-50 rounded-lg text-gray-700 font-medium'
                                >
                                    <Package className=' w-5 h-5 text-green-700' />
                                    My Orders
                                </Link>
                                <button
                                    onClick={() => {
                                        setOpen(false)
                                        signOut({ callbackUrl: "/login" })
                                    }}
                                    className='flex items-center gap-2 w-full text-left px-3 py-3 hover:bg-red-500 rounded-lg text-gray-700 font-medium'>
                                    <LogOutIcon />
                                    Log Out

                                </button>
                            </motion.div>
                        }
                    </AnimatePresence>

                    <AnimatePresence>
                        {
                            searchBarOpen && <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.2 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                className=' fixed top-24 left-1/2 -translate-x-1/2 w-[90%] bg-white rounded-full shadow-lg z-40 flex items-center px-4 py-2'
                            >
                                <Search className=' text-gray-500 w-5 h-5 mr-2' />
                                <form className=' grow' >
                                    <input type="text"
                                        className=' w-full outline-none'
                                        placeholder='Search groceries....'
                                    />
                                </form>
                                <button onClick={() => setSearchBarOpen(false)}
                                    className=' hover:text-red-600 cursor-pointer'
                                >
                                    X
                                </button>
                            </motion.div>
                        }
                    </AnimatePresence>

                </div>
            </div>

        </div>
    );
};

export default Nav;