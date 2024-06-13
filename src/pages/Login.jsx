import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [inputData, setInputData] = useState({
        email: '',
        password: '',
    });

    const [errorData, setErrorData] = useState([]);
    const navigate = useNavigate();

    function handleLogin(e) {
        e.preventDefault();
        axios.post('http://localhost:2222/login', inputData)
            .then(res => {
                console.log(res);
                localStorage.setItem('access_token', res.data.data.access_token);
                navigate('/profile');
            })
            .catch(err => {
                setErrorData(err.response.data);
            });
    }

    return (
        <div>
            <Navbar />
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
            <section className="bg-gray-50 dark:bg-gray-900 mt-8">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-40 lg:px-0 lg:ml-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
                    <div className="flex flex-col justify-center">
                        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400"></p>
                        {
                            Object.keys(errorData).length > 0 && (
                                <div className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    <svg className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                    </svg>
                                    <span className="sr-only">Danger</span>
                                    <div>
                                        <span className="font-medium">Gagal Login</span>
                                        <ul className="mt-1.5 list-disc list-inside">
                                            {
                                                Object.entries(errorData).map(([index, value]) => (
                                                    <li key={index}>{value}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div>
                        <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Sign in to Inventaris
                            </h2>
                            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={(e) => setInputData({ ...inputData, password: e.target.value })}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Login to your account
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
