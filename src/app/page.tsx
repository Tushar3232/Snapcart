import React from 'react';
import connectDb from './lib/db';
import { auth } from '@/auth';
import User from './models/user.model';

import EditRoleMobile from '@/components/EditRoleMobile/EditRoleMobile';
import { redirect } from 'next/navigation';
import Nav from '@/components/navber/Nav';
import UserDashboard from '@/components/userDashboard/UserDashboard';
import AdminDashboard from '@/components/adminDashboard/AdminDashboard';
import DeliveryBoyDashboard from '@/components/deliveryBoyDashboard/DeliveryBoyDashboard';
import HeroSection from '@/components/hero/HeroSection';

const Home = async () => {
  await connectDb()
  const session = await auth()
  console.log("Backend Session", session)

  const user = await User.findById(session?.user?.id)
  if (!user) {
    redirect("/login")
  }
  const inComplete = !user.mobile || !user.role || (!user.mobile && user.role == "user")
  if (inComplete) {
    return <EditRoleMobile></EditRoleMobile>
  }

  const plainUser = JSON.parse(JSON.stringify(user))
  return (
    <>
      <Nav user={plainUser}></Nav>
      <HeroSection></HeroSection>
      {
        user.role == "user" ? (<UserDashboard />)
          :
          user.role == "admin" ? (<AdminDashboard />)
            :
            <DeliveryBoyDashboard />
      }
    </>
  );
};

export default Home;