import { ArrowLeft } from 'lucide-react';
import React from 'react';

type propType={
    previousStep: (n:number)=>void
}

const Register = ({previousStep}:propType) => {
    return (
        <div className=' flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white relative'>
            <h1>Register from</h1>
            <div onClick={()=>previousStep(1)} className=' absolute top-6 left-6 flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors cursor-pointer'>
                <ArrowLeft className=' w-5 h-5'></ArrowLeft>
                <span className=' font-medium'>Back</span>
            </div>
        </div>
    );
};

export default Register;