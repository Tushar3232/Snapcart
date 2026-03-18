import React from 'react';
import connectDb from './lib/db';
import { auth } from '@/auth';
import User from './models/user.model';
import { redirect } from 'next/dist/server/api-utils';
import EditRoleMobile from '@/components/EditRoleMobile/EditRoleMobile';

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
    <div>
      
    </div>
  );
};

export default Home;