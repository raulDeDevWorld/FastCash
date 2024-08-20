'use client'
import React, { useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captcha, setCaptcha] = useState(null);
    const router = useRouter()
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Aquí puedes manejar la autenticación y validación del captcha.
        if (!captcha) {
            alert("Por favor, completa el captcha");
            return;
        }

        // Lógica de autenticación (llamada a API, etc.)
    };

    const handleCaptchaChange = (value) => {
        setCaptcha(value);
    };

    return (
        <>
        <img src="/bg.png" className='absolute left-0 top-0 block object-cover h-full w-full' alt="" />
            <Head>
                <title>Login</title>
            </Head>
            <div className="relative flex items-center justify-center min-h-screen z-20">
                <div className=" p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-8">Iniciar Sesión</h2>
                    <form onSubmit={handleSubmit} className='z-50'>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                User
                            </label>
                            <input
                                type="text"
                                id="email"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="text" className="block text-sm font-medium text-gray-700">
                                Codigo recibido al correo
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <div className="g-recaptcha" data-sitekey="TU_CLAVE_DEL_SITIO" data-callback={handleCaptchaChange}></div>
                        </div>
                        <button
                        onClick={()=>router.push('/Home')}
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Iniciar Sesión
                        </button>
                        <br />

                        <br />
                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Solicitar Codigo al correo
                        </button>
                    </form>
                </div>
            </div>
            <Script src="https://www.google.com/recaptcha/api.js" async defer />
        </>
    );
}
