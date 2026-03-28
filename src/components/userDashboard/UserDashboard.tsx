import React from 'react';
import HeroSection from '../hero/HeroSection';
import CategorySlider from '../category/CategorySlider';
import connectDb from '@/app/lib/db';
import Grocery, { IGrocery } from '@/app/models/grocery.model';
import GroceryItemCard from '../groceryCard/GroceryItemCard';




const UserDashboard = async () => {
    await connectDb()
    const groceries = await Grocery.find({})
    const plainGrocery = JSON.parse(JSON.stringify(groceries))
    return (
        <>
            <HeroSection />
            <CategorySlider />
            <div className=' w-[90%] md:[80%] mx-auto mt-10'>
                <h2 className=' text-2xl md:text-3xl font-bold text-green-600 text-center mb-7'>Popular Grocery Items</h2>
                <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-6'>
                    {
                        plainGrocery.map((item: IGrocery) => (
                            <GroceryItemCard key={item?._id?.toString()} item={item} ></GroceryItemCard>
                        ))
                    }
                </div>
            </div>

        </>
    );
};

export default UserDashboard;