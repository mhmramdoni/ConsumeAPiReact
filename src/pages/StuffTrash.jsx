import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import axios from "axios";

export default function StuffTrash() {
    const dataThParent = [
        "#",
        "Name",
        "Category",
        "Action"
    ];

    const [stuffs, setStuffs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:2222/stuffs/trash', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                setStuffs(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const columnDataBase = {
        "name": null,
        "category": null,
    };

    const buttons = [
        "restore",
        "permanent-delete"
    ];

    const endpoints = {
        "restore": "http://localhost:2222/stuffs/trash/restore/{id}",
        "permanent-delete": "http://localhost:2222/stuffs/trash/permanent-delete/{id}"
    };

    const columnDetailModalDelete = ''; // Assuming it should be empty as per the original code
    const judulModalEdit = ''; // Assuming it should be empty as per the original code
    const inputData = {}; // Assuming it should be empty as per the original code

    return (
        <>
            <Navbar />
            <Table 
                dataTh={dataThParent} 
                dataTd={stuffs} 
                columDb={columnDataBase} 
                buttonData={buttons}
                endpoints={endpoints} 
                columnDetail={columnDetailModalDelete} 
                judulModalEdit={judulModalEdit} 
                inputData={inputData} 
            />
        </>
    );
}
