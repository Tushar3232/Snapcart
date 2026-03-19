import React from 'react';
import connectDb from './lib/db';
import { auth } from '@/auth';
import User from './models/user.model';

import EditRoleMobile from '@/components/EditRoleMobile/EditRoleMobile';
import { redirect } from 'next/navigation';
import Nav from '@/components/navber/Nav';

const Home = async () => {
  await connectDb()
  const session = await auth()
  console.log("Backend Session",session)
 
  const user = await User.findById(session?.user?.id)
  if(!user){
    redirect("/login")
  }
  const inComplete= !user.mobile || !user.role || (!user.mobile && user.role == "user")
  if(inComplete){
    return <EditRoleMobile></EditRoleMobile>
  }
  return (
    <>
      <Nav user={user}></Nav>
    </>
  );
};

export default Home;