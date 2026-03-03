'use client'
import Register from '@/components/register/Register';
import Welcome from '@/components/welcome/Welcome';
import React, { useState } from 'react';

const RegisterPage = () => {
    const [stap, setStap] = useState(1)
    return (
        <div>
            {
                stap == 1 ? <Welcome nextStap={setStap}></Welcome> : <Register previousStep={setStap}></Register>
            }

        </div>
    );
};

export default RegisterPage;