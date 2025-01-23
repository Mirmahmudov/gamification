import React, { useEffect, useState } from 'react'
import "./NewRead.css"
import { FaArrowLeft } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { getToken } from '../../service/token'
import { baseUrl } from '../../config'

function NewRead({ setLoader }) {
    const { id } = useParams()
    const [onenew, setOneNew] = useState()

    const getOneNews = () => {
        setLoader(true)
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer  ${getToken()}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`${baseUrl}/news/${id}/`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setOneNew(result)
                setLoader(false)
            })
            .catch((error) => {
                setLoader(false)
            });
    }

    const readNews = () => {
        setLoader(true);
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer  ${getToken()}`);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`${baseUrl}/news/${id}/mark-as-read/`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setLoader(false);
            })
            .catch((error) => {
                setLoader(false);
            });

    }


    useEffect(() => {
        getOneNews()
        readNews()
    }, [])



    function formatDate(createdAt) {
        const date = new Date(createdAt);

        const formattedDate = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}, ${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;

        return formattedDate;
    }


    return (
        <>
            <div className="new_read">
                <div className="newNavbar">
                    <div className="rows">
                        <Link to={"/news"} className="logo">
                            <FaArrowLeft />
                        </Link>
                        <div className="time">
                            <h1>{onenew?.title} </h1>

                            <span>
                                {formatDate(onenew?.created_at)}
                            </span>
                        </div>
                    </div>

                </div>
                <div className="info">
                    <div className="imgs">
                        <img src={onenew?.image} alt="" />
                    </div>
                    <h1>{onenew?.title} </h1>
                    <p>{onenew?.description}</p>
                </div>
            </div>
        </>
    )
}

export default NewRead