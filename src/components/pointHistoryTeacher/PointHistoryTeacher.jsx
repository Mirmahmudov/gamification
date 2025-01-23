import React, { useEffect, useState } from 'react'
import "./PointHistoryTeacher.css"
import { getToken } from '../../service/token'
import { baseUrl } from '../../config'
import { FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'

function PointHistoryTeacher({ setLoader, mentorId, courses }) {
    const [pointData, setPointData] = useState()
    const [typeData, setTypeData] = useState()
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();


    const getPoints = () => {
        setLoader(true)
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${getToken()}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`${baseUrl}/give-points/?mentor=${mentorId}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setPointData(result.reverse());
                setLoader(false)
            })
            .catch((error) => {
                setLoader(false)
            });
    }

    const getPointsType = () => {
        setLoader(true)

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${getToken()}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`${baseUrl}/point-types/`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setLoader(false)
                setTypeData(result)
            })
            .catch((error) => {
                setLoader(false)
            });
    }

    useEffect(() => {
        getPointsType()
    }, [])

    useEffect(() => {
        if (mentorId) {
            getPoints();
        }
    }, [mentorId]);

    const onePointType = (id) => {
        return typeData?.find((item) => item.id == id);
    }

    const formatDate = (isoString) => {
        const date = new Date(isoString);

        const weekdays = [
            "Dushanba", "Seshanba", "Chorshanba", "Payshanba",
            "Juma", "Shanba", "Yakshanba",
        ];
        const months = [
            "yanvar", "fevral", "mart", "aprel", "may", "iyun",
            "iyul", "avgust", "sentyabr", "oktyabr", "noyabr", "dekabr",
        ];

        const weekday = weekdays[date.getDay()];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return ` ${day} ${month}, ${year}`;
    };

    const getCoursName = (id) => {
        return courses?.find((item) => item.id == id);
    };

    // Search function
    const filteredPointData = pointData?.filter(item => {
        const fullName = `${item?.student?.user?.first_name} ${item?.student?.user?.last_name}`;
        return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <>
            <div className="pointhistory teacherPoint">
                <div className="historyFilter">
                    <div className="pageName">
                        <IoIosArrowBack onClick={() => {
                            navigate(-1)
                        }} />
                        <h2>Pointlar</h2>
                    </div>



                    <input
                        type="text"
                        placeholder="Ism yoki Familya bo'yicha qidirish..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="searchInput"
                    />
                </div>

                {filteredPointData?.map((item, index) => {
                    return <Link key={index} to={`/edithistory/${item?.id}`} className="row">
                        <div className="div">
                            <div className="imgs">
                                {item?.student?.image ? (
                                    <img src={item?.student?.image} alt="" />
                                ) : (
                                    <FaUser />
                                )}
                            </div>
                            <div className="pointHistoryInfo">
                                <h3>{item?.student?.user?.first_name || item?.student?.user?.student?.last_name ? (
                                    <>
                                        {item?.student?.user?.first_name} {item?.student?.user?.last_name}
                                    </>
                                ) : (
                                    <>Ism mavjud emas</>
                                )}</h3>

                                <h4>{getCoursName((item).student.group)?.name || "Guruh mavjud emas"}</h4>
                                <h5>{formatDate(item?.created_at)}</h5>
                            </div>
                        </div>
                        <div className="pointHistoryNumber">
                            +{item?.amount} points
                        </div>
                    </Link>
                })}
            </div>
        </>
    )
}

export default PointHistoryTeacher
