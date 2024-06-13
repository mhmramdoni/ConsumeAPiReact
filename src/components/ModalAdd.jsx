import React, { useState } from "react";
import axios from "axios";

export default function ModalAdd({
  isOpen,
  closeModal,
  judulModal,
  inputData,
  endpoint,
}) {
  if (!isOpen) {
    return null;
  }

  const [dataDetail, setDataDetail] = useState({});
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setDataDetail((dataSebelumnya) => ({
      ...dataSebelumnya,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? "" : "This field is required",
    }));
  }

  function handleStore(e) {
    e.preventDefault();
    const newErrors = {};

    Object.entries(inputData).forEach(([key, item]) => {
      if (!dataDetail[key]) {
        newErrors[key] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      axios
        .post(endpoint["store"], dataDetail, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <>
      <div
        id="authentication-modal"
        tabindex="-1"
        aria-hidden="true"
        className="fixed top-0 left-0 w-full h-full flex justify-center items-center"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add Data {judulModal}
              </h3>
              <button
                onClick={closeModal}
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-4">
              <form className="space-y-4" onSubmit={handleStore}>
                {Object.entries(inputData).map(([index, item]) => (
                  <div className="mb-6" key={index}>
                    {item.type === "select" ? (
                      <div>
                        <label
                          htmlFor={index}
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          {index}
                        </label>
                        <select
                          name={index}
                          id={index}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:ring-primary-500"
                          onChange={handleChange}
                        >
                          <option >
                            Select {index}
                          </option>
                          {item["options"].map((opt, optIndex) => (
                            <option value={opt} key={optIndex}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        {errors[index] && (
                          <p className="text-red-500 text-sm">{errors[index]}</p>
                        )}
                      </div>
                    ) : (
                      <div>
                        <label
                          htmlFor={index}
                          className="block text-sm font-medium text-gray-900 dark:text-white capitalize mb-3"
                        >
                          {index}
                        </label>
                        <input
                          type={item.type}
                          name={index}
                          id={index}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          onChange={handleChange}
                        />
                        {errors[index] && (
                          <p className="text-red-500 text-sm">{errors[index]}</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add data
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
