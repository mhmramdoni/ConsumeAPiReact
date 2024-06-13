import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import axios from "axios";


export default function Stuff() {

    const dataThParent = [
        "#",
        "Name",
        "Category",
        "Total avaliable",
        "Total Defec",
        "Action"
    ]

    const [stuffs, setStuffs] = useState({});


    useEffect(() => {
        axios.get('http://localhost:2222/stuffs', {
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                setStuffs(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const coloumDataBase = {
        "name": null,
        "category": null,
        "stuff_stock":
            "total_avaliable",
        "stuff_stock*": "total_defec",
    }

    const buttons = [
        "edit",
        "delete",
        "create",
        "trash"
    ]

    const endpoint = {
        "detail": "http://localhost:2222/stuffs/{id}",
        "delete": "http://localhost:2222/stuffs/delete/{id}",
        "update": "http://localhost:2222/stuffs/update/{id}",
        "store": "http://localhost:2222/stuffs/store",
        "trash": "http://localhost:2222/stuffs/trash"
    }
    const columndetailModelDelete = 'name'

    const judulModalEdit = 'stuff'

    const inputData = {
        "name": {
            "type": "text",
            "options": null,
        },
        "category": {
            "type": "select",
            "options": ['KLN', 'HTL', 'Sarpras/Teknisi']
        },
    }

    return (
        <>
            <Navbar />
            <div className="p-10">
                <Table dataTh={dataThParent} dataTd={stuffs} columDb={coloumDataBase} buttonData={buttons}
                    endpoint={endpoint} columnDetail={columndetailModelDelete} judulModalEdit={judulModalEdit} inputData={inputData}></Table>
            </div>
        </>
    )
}