"use client"
import { motion, MotionConfig } from "framer-motion"
import { ArrowRight, BikeIcon, ShoppingBasket } from "lucide-react";


const Welcome = () => {
    return (
        <div className=' flex flex-col items-center justify-center min-h-screen text-center p-6 gap-3'>
            <motion.div
                initial={{
                    opacity: 0,
                    y: -20
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{ duration: 1, }}
                className=" flex items-center justify-center gap-3"
            >
                <ShoppingBasket className=" w-11 h-11 text-green-600" />
                <h1 className=" text-4xl md:text-5xl font-extrabold text-green-700">Snapcart</h1>


            </motion.div>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className=" mt-4 text-gray-700 text-lg md:text-xl max-w-lg"
            >
                Your one-stop destination for fresh greceries, organic produce,
                and daily essentials delivered right to your doorstep.
            </motion.p>

            <div className=" flex justify-center items-center gap-10 mt-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <ShoppingBasket className=" w-24 h-24 md:w-32 md:h-32 text-green-600" />
                    
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                >
            
                    <BikeIcon className=" w-24 h-24 md:w-32 md:32 text-orange-500"></BikeIcon>
                </motion.div>
            </div>

            <motion.button
            initial={{opacity:0, scale:0}}
            animate={{opacity:1, scale:1 }}
            transition={{duration:0.6}}
            className=" inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-2xl shadow-md "
            >
                Next <ArrowRight></ArrowRight> 
            </motion.button>
        </div>
    );
};

export default Welcome;