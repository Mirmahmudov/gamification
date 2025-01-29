import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate import qildik
import "./EditPointHistory.css";
import { getToken } from '../../service/token';
import { baseUrl } from '../../config';
import { IoIosArrowBack } from 'react-icons/io';
import { SiTunein } from 'react-icons/si';

function EditPointHistory({ mentorId, setLoader }) {
    const { id } = useParams();
    const navigate = useNavigate(); // Sahifani yo'naltirish uchun
    const [amount, setAmount] = useState('');
    const [pointType, setPointType] = useState('');
    const [pointData, setPointData] = useState('');
    const [pointDesc, setPointDesc] = useState('');
    const [studentId, setStudentId] = useState('')
    const [group, setGroup] = useState([]);


    const getPointType = () => {
        setLoader(true)
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${getToken()}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch(`${baseUrl}/point-types/`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setGroup(result);
                setLoader(false)
            })
            .catch((error) => {
                setLoader(false)
            });
    };

    const getGivePoints = () => {
        setLoader(true)
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${getToken()}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch(`${baseUrl}/give-points/${id}/`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setLoader(false)
                setAmount(result.amount);
                setPointDesc(result.description);
                setPointType(result.point_type);
                setPointData(result.date);
                setStudentId(result.student);

            })
            .catch((error) => {

                setLoader(false)
            });
    };


    const editPoint = (e) => {
        setLoader(true)
        e.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${getToken()}`);


        const raw = JSON.stringify({
            "amount": amount,
            "description": pointDesc,
            "date": pointData,
            "mentor": mentorId,
            "student": studentId,
            "point_type": pointType
        });

        const requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(`${baseUrl}/give-points/${id}/`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setLoader(false)
                navigate('/teacherhistory');
            })
            .catch((error) => {
                setLoader(false)
            });
    }

    // const editPoint = (e) => {
    //     e.preventDefault();
    //     const myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");
    //     myHeaders.append("Authorization", `Bearer ${getToken()}`);

    //     const raw = JSON.stringify({
    //         amount,
    //         description: pointDesc,
    //         date: pointData,
    //         mentor: mentorId,
    //         student: studentId, // Studentni dinamik qilib sozlashingiz mumkin
    //         point_type: pointType,
    //     });

    //     const requestOptions = {
    //         method: "PATCH",
    //         headers: myHeaders,
    //         body: raw,
    //         redirect: "follow",
    //     };

    //     fetch(`${baseUrl}/give-points/${id}/`, requestOptions)
    //         .then((response) => response.json())
    //         .then((result) => {
    //             navigate('/teacherhistory');
    //         })
    //         .catch((error) => console.error(error));
    // };

    // O'chirish funksiyasi



    const deletePoint = (e) => {
        setLoader(true)
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${getToken()}`);

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch(`${baseUrl}/give-points/${id}/`, requestOptions)
            .then(() => {
                setLoader(false)
                navigate('/assessment'); // O'chirishdan so'ng sahifani yo'naltirish
            })
            .catch((error) => {
                setLoader(false)
            });
    };

    useEffect(() => {
        getGivePoints();
        getPointType();
    }, []);

    const getGroupName = (id) => {
        return group?.find((item) => item.id === id)?.name || "Guruh mavjud emas";
    };

    return (
        <div className="edit_point">
            <div className="container">
                <div className="pageName">
                    <IoIosArrowBack onClick={() => {
                        navigate(-1)
                    }} />
                    <h2>Yangiliklar</h2>
                </div>
                <form onSubmit={editPoint}>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="description">Izoh</label>
                            <input
                                id="description"
                                value={pointDesc}
                                onChange={(e) => setPointDesc(e.target.value)}
                                type="text"
                                placeholder='izoh mavjud emas'
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="amount">coin miqdori</label>
                            <input
                                id="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                type="text"
                                placeholder='point mavjud emas'
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="pointType">coin turi</label>
                            <select
                                id="pointType"
                                value={pointType}
                                onChange={(e) => setPointType(e.target.value)}
                            >
                                {group.map((grp) => (
                                    <option key={grp.id} value={grp.id}>
                                        {grp.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col">
                            <label htmlFor="date">Sana</label>
                            <input
                                id="date"
                                value={pointData}
                                onChange={(e) => setPointData(e.target.value)}
                                type="date"
                            />
                        </div>
                    </div>
                    <div className="btns">
                        <button type="submit" className="edit">
                            Tahrirlash
                        </button>
                        <button onClick={deletePoint} className="del">
                            O'chirish
                        </button>
                        <button onClick={(e) => {
                            e.preventDefault()
                            navigate("/assessment")
                        }}>
                            bekor qilish
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditPointHistory;
