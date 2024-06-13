import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import axios from "axios";

export default function Lending() {

    const dataThParent = [
        "#",
        "Time",
        "username",
        "Note",
        "Total Use",
        "Stuff",
        "Action"
    ];

    const [lendings, setLendings] = useState([]);
    const [stuffOptions, setStuffOptions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:2222/lendings', {
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                setLendings(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });

        axios.get('http://localhost:2222/stuffs', {
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                // setStuffOptions(res.data.data);
                const array = []
                Object.entries(columDb).map(([i, v]) => {
                    if (i == 'name') {
                        array.push(v)
                    }
                    
                })
                setStuffOptions(array);
                console.log(stuffOptions)
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const columDataBase = {
        "date_time": null,
        "name": null,
        "notes": null,
        "total_stuff": null,
        "stuff": 'name'
    };

    const button = [
        "create",
        "delete",
        "detail",
    ];

    const endpoint = {
        "store": "http://localhost:2222/lendings/store",
        "delete": "http://localhost:2222/lendings/delete/{id}",
        "detail": "http://localhost:2222/lendings/{id}"
    };

    const columnDetailModalDelete = 'name';
    const judulModalEdit = 'Lendings';

    const inputData = {
        "date_time": {
            "type": "date",
            "options": null,
        },
        "name": {
            "type": "text",
            "options": null,
        },
        "notes": {
            "type": "text",
            "options": null,
        },
        "total_stuff": {
            "type": "text",
            "options": null,
        },
        "stuff_id": {
            "type": "select",
            "options": stuffOptions,
        },
    };

    return (
        <>
            <Navbar />
            <div className="p-10">
                <Table dataTh={dataThParent}
                    dataTd={lendings}
                    columDb={columDataBase}
                    buttonData={button}
                    endpoint={endpoint}
                    columnDetail={columnDetailModalDelete}
                    judulModalEdit={judulModalEdit}
                    inputData={inputData}
                />
            </div>
        </>
    );
}
