import React, { useState } from "react";
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";
import ModalAdd from "./ModalAdd";
import ModalDetail from "./ModalDetail";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";


export default function Table({ dataTh, dataTd, columDb, buttonData, endpoint, columnDetail, judulModalEdit, inputData }) {
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [endpointReplaced, setEndpointReplaced] = useState({});
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const [isOpenModalDetail, setIsOPenModalDetail] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'descending' });
  const navigate = useNavigate();

  function handleModalDelete(id) {
    const endpointDetail = endpoint['detail'];
    const endpointDelete = endpoint['delete'];
    const detailReplaced = endpointDetail.replace('{id}', id);
    const deleteReplaced = endpointDelete.replace('{id}', id);
    const replace = {
      "detail": detailReplaced,
      "delete": deleteReplaced
    };
    setEndpointReplaced(replace);
    setIsOpenModalDelete(true);
  }

  function handleModalEdit(id) {
    const endpointDetail = endpoint['detail'];
    const endpointUpdate = endpoint['update'];
    const detailReplaced = endpointDetail.replace('{id}', id);
    const updateReplaced = endpointUpdate.replace('{id}', id);
    const replaced = {
      "detail": detailReplaced,
      "update": updateReplaced
    };
    setEndpointReplaced(replaced);
    setIsOpenModalEdit(true);
  }

  function handleModalAdd() {
    const replaced = {
      "store": endpoint['store']
    };
    setEndpointReplaced(replaced);
    setIsOpenModalAdd(true);
  }

  function handleModalDetail(id) {
    const endpointDetail = endpoint['detail'];
    const endpointUpdate = endpoint['update'];
    const detailReplaced = endpointDetail.replace('{id}', id);
    const updateReplaced = endpointUpdate.replace('{id}', id);
    const replaced = {
      "detail": detailReplaced,
      "update": updateReplaced
    };
    setEndpointReplaced(replaced);
    setIsOpenModalDetail(true);
  }

  // function handleModalLendingAdd() {
  //   setEndpointReplaced({ createLending: endpoint.createLending });
  //   setIsOpenModalLendingAdd(true);
  // }

  function handleRestore(id) {
    const endpointRestore = endpoint['restore'].replace("{id}", id);
    axios.get(endpointRestore, {
      headers: {
        'Authorization': 'bearer ' + localStorage.getItem('access_token'),
      }
    })
      .then(res => {
        Swal.fire({
          title: 'Success',
          text: 'Data was successfully restored',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate('/stuffs');
        });
      })
      .catch(err => {
        navigate('/login');
      });
  }

  function sortData(data, config) {
    const sortedData = [...data];
    if (config.key) {
      sortedData.sort((a, b) => {
        const aValue = parseFloat(a[1][config.key]) || 0;
        const bValue = parseFloat(b[1][config.key]) || 0;
        if (aValue < bValue) {
          return config.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return config.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedData;
  }

  function requestSort(key) {
    let direction = 'descending';
    if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = 'ascending';
    }
    setSortConfig({ key, direction });
  }

  const sortedData = sortData(Object.entries(dataTd), sortConfig);

  return (
    <>
      <br />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-6">
        {buttonData.includes("create") && (
          <button onClick={handleModalAdd} className="inline-flex items-center px-4 py-2 text-sm font-medium text-green-900 bg-white border border-green-200 rounded-lg hover:bg-green-100 hover:text-green-700 focus:outline-none focus:ring-4 focus:ring-green-100 dark:bg-green-800 dark:text-green-400 dark:border-green-600 dark:hover:bg-green-700 dark:hover:text-white dark:focus:ring-green-700">
            Create
          </button>
        )}

        {buttonData.includes("trash") && (
          <Link to={'/stuffs/trash'} className="ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-yellow-900 bg-white border border-yellow-200 rounded-lg hover:bg-yellow-100 hover:text-yellow-700 focus:outline-none focus:ring-4 focus:ring-yellow-100 dark:bg-yellow-800 dark:text-yellow-400 dark:border-yellow-600 dark:hover:bg-yellow-700 dark:hover:text-white dark:focus:ring-yellow-700">
            Trash
          </Link>
        )}


        <br />
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {dataTh.map((data, index) => (
                <th scope="col" className="px-6 py-3 cursor-pointer" key={index} onClick={() => requestSort(data)}>
                  {data}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map(([index, value]) => (
              <tr className="bg-white border-b dark:border-gray-700" key={index}>
                <td className="px-6 py-4">{parseInt(index) + 1}.</td>
                {Object.entries(columDb).map(([i, v]) => {
                  const cellValue = !v ? value[i] : value[i.replace(/[!@#$%^&]/, "")] ? value[i.replace(/[!@#$%^&]/, "")][v] : "0";
                  return (
                    <td key={i} style={{ color: cellValue === "0" ? 'red' : '' }}>
                      {cellValue}
                    </td>
                  );
                })}
                <td>
                  {buttonData.includes('edit') && (
                    <a
                      onClick={() => handleModalEdit(value.id)}
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit{" "}
                    </a>
                  )}

                  {buttonData.includes('detail') && (
                    <a
                      onClick={() => handleModalDetail(value.id)}
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Detail{" "}
                    </a>
                  )}
                  {buttonData.includes('delete') && (
                    <a
                      onClick={() => handleModalDelete(value.id)}
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Delete{" "}
                    </a>
                  )}


                  {buttonData.includes('restore') && (
                    <a
                      onClick={() => handleRestore(value.id)}
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Restore{" "}
                    </a>
                  )}
                  {buttonData.includes('permanent-delete') && (
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Permanent-delete{" "}
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalDelete isOpen={isOpenModalDelete} closeModal={() => setIsOpenModalDelete(false)} endpoint={endpointReplaced} columnDetail={columnDetail} />
      <ModalEdit isOpen={isOpenModalEdit} closeModal={() => setIsOpenModalEdit(false)} judulModal={judulModalEdit} inputData={inputData} endpoint={endpointReplaced} />
      <ModalAdd isOpen={isOpenModalAdd} closeModal={() => setIsOpenModalAdd(false)} judulModal={judulModalEdit} inputData={inputData} endpoint={endpointReplaced} />
      <ModalDetail isOpen={isOpenModalDetail} closeModal={() => setIsOPenModalDetail(false)} judulModal={judulModalEdit} endpoint={endpointReplaced} />


    </>
  );
} 