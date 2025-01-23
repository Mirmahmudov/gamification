import React, { useEffect, useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { useNavigate, useParams } from 'react-router-dom'
import { getToken } from '../../service/token'
import { baseUrl } from '../../config'
import "./OnePoint.css"

function OnePoint({ setLoader }) {
    const navigate = useNavigate()
    const { id } = useParams()
    const [getPoint, setGetPoint] = useState()
    const [mentorId, setMentorId] = useState()
    const [getMentorInfo, setGetMentorInfo] = useState()
    const [studentId, setStudentId] = useState()
    const [typeId, setTypeId] = useState()
    const [typeData, setTypeData] = useState()
    const [studentData, setStudentData] = useState()

    const getUserPoint = () => {
        setLoader(true)
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${getToken()}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`${baseUrl}/give-points/${id}/`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setMentorId(result?.mentor);
                setStudentId(result?.student)
                setTypeId(result?.point_type)
                setGetPoint(result)
                setLoader(false)
            })
            .catch((error) => {
                setLoader(false)
            });
    }

    const getStudent = () => {
        setLoader(true)
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${getToken()}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`${baseUrl}/students/${studentId}/`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setStudentData(result)
                setLoader(false)
            })
            .catch((error) => {
                setLoader(false)

            });
    }

    const getType = () => {
        setLoader(true)
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${getToken()}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`${baseUrl}/point-types/${typeId}/`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setTypeData(result)
                setLoader(false)

            })
            .catch((error) => {
                setLoader(false)
            });
    }

    const getMentor = () => {
        setLoader(true)
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${getToken()}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`${baseUrl}/mentors/${mentorId}/`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setLoader(false)
                setGetMentorInfo(result)
            })
            .catch((error) => {

                setLoader(false)

            });
    }

    useEffect(() => {
        getUserPoint()
    }, [])

    useEffect(() => {
        if (mentorId) {
            getMentor()
        }
    }, [mentorId])

    useEffect(() => {
        if (studentId) {
            getStudent()
        }
    }, [studentId])

    useEffect(() => {
        if (typeId) {
            getType()
        }
    }, [typeId])
    return (
        <>
            <div className="pageName">
                <IoIosArrowBack onClick={() => {
                    navigate(-1)
                }} />
                <h2>Point</h2>
            </div>
            <div className="onePoint">
                <div className="onePointRow">
                    <div className="onePointImg">
                        <img src={studentData?.image} alt="" />
                    </div>
                    <div className="onePointInfo">
                        <div className="coinInfo">
                            <img src="/imgs/coin-3.png" alt="" />
                            {getPoint?.amount} point
                        </div>
                        <h2>{typeData?.name} </h2>
                        <p>{getPoint?.description ? getPoint?.description : "point uchun izoh mavjud emas"}</p>
                        <div className="info_row">
                            <h3>
                                {getPoint?.date}
                            </h3>
                            <h3>
                                {getMentorInfo?.user?.last_name} {getMentorInfo?.user?.first_name}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default OnePoint