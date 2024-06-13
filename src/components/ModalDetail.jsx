import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ModalDetail({ isOpen, closeModal, judulModal, inputData, endpoint }) {
    const [dataDetail, setDataDetail] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (isOpen) {
            axios.get(endpoint['detail'], {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
            .then(res => {
                setDataDetail(res.data.data);
            })
            .catch(err => {
                setErrorMessage('Failed to fetch data: ' + err.message);
                console.log(err);
            });
        }
    }, [isOpen, endpoint]);

    if (!isOpen) {
        return null;
    }

    return (
        <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Data Details: {judulModal}
                        </h3>
                        <button onClick={closeModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5">
                        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                        <div className="space-y-4">
                            {
                                Object.entries(inputData).map(([index, item]) => (
                                    <div className="mb-6" key={index}>
                                        <label htmlFor={index} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{index}</label>
                                        {item.type === "select" ? (
                                            <select
                                                id={index}
                                                name={index}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                value={dataDetail[index] || ''}
                                                readOnly
                                                disabled
                                            >
                                                <option hidden disabled>{index}</option>
                                                {item.options.map((opt, idx) => (
                                                    <option key={idx} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                type={item.type}
                                                name={index}
                                                id={index}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                value={dataDetail[index] || ''}
                                                readOnly
                                            />
                                        )}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
