import React, { useEffect, useState } from 'react';
import './Students.css';
import { FaCrown, FaRegUser, FaUser } from 'react-icons/fa';
import { getToken } from '../../service/token';
import { baseUrl } from '../../config';
import { HiTrophy } from 'react-icons/hi2';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

function Students({ setLoader, mentorId }) {
    const [studentList, setStudentList] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [groups, setGroups] = useState([]);
    const [oneGroups, setOneGroups] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    const [imgViewModal, setImgViewModal] = useState(false)
    const [userImg, setUserImg] = useState()
    const [studentInfo, setStudentInfo] = useState()
    const navigate = useNavigate()
    const getStudent = () => {
        setLoader(true);
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${getToken()}`);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch(`${baseUrl}/students/`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setStudentList(result || []);
                setFilterData(result || []);
                setLoader(false);
            })
            .catch((error) => {
                setLoader(false);
            });
    };

    const getStudentInfo = () => {
        setLoader(true);
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${getToken()}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`${baseUrl}/students/get-me/ `, requestOptions)
            .then((response) => response.json())

            .then((result) => {
                setLoader(false);
                setStudentInfo(result)
            })
            .catch((error) => {
                setLoader(false);
            });
    }


    const getGroup = () => {
        setLoader(true);
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${getToken()}`);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch(`${baseUrl}/groups/?mentor=${mentorId}&active=true`, requestOptions)
            .then((response) => response.json())
            .then((result) => {

                setGroups(result || []);
                setLoader(false);
            })
            .catch((error) => {
                setLoader(false);
            });
    };

    const getOneGroup = () => {

        setLoader(true);
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${getToken()}`);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch(`${baseUrl}/groups/?active=true`, requestOptions)
            .then((response) => response.json())
            .then((result) => {

                setOneGroups(result || []);
                setLoader(false);
            })
            .catch((error) => {
                setLoader(false);
            });

    }

    useEffect(() => {
        getStudent();
        getStudentInfo()
        getOneGroup()
    }, []);



    useEffect(() => {
        if (mentorId) {
            getGroup();
        }
    }, [mentorId])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 700) {
                setIsLargeScreen(true);
            } else {
                setIsLargeScreen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchTerm(query);

        const filteredStudents = filterData.filter((student) => {
            const name =
                (student?.user?.first_name || '') + ' ' + (student?.user?.last_name || '');
            return name.toLowerCase().includes(query);
        });
        setStudentList(filteredStudents);
    };



    const filterGroup = (group) => {

        if (group.toLowerCase() === 'barchasi') {
            setStudentList(filterData);
        } else if (group.toLowerCase() === 'meningguruhim') {
            const filteredStudents = filterData.filter(

                (item) => item.group == parseInt(studentInfo?.group, 10)

            );
            setStudentList(filteredStudents);
        } else {
            const filteredStudents = filterData.filter(
                (item) => item.group === parseInt(group, 10)
            );
            setStudentList(filteredStudents);
        }
    };
    const getGroupName = (id) => {
        return oneGroups?.find((item) => item?.id == id);
    };
    return (
        <>
            <div className="students">
                {imgViewModal && <div className="userProfileImgView" onClick={() => {
                    setImgViewModal(false)
                }}>
                    {userImg ? (
                        <img src={userImg} alt="" />
                    ) : (
                        <FaRegUser />
                    )}
                </div>}
                <div className="topStudents">
                    <div className="row">
                        {Array.isArray(studentList) && studentList?.length > 0
                            ? studentList?.slice(0, 3).map((item, index) => {
                                const groupName = Array.isArray(oneGroups)
                                    ? oneGroups?.find((group) => group?.id === item?.group)?.name
                                    : 'Mavjud emas';

                                return (
                                    <div
                                        key={index}
                                        className={`col top-student-${index}`}
                                    >
                                        <div className="Crown">
                                            <FaCrown />
                                        </div>
                                        <div className="topStudentInfo">
                                            <div className="imgs" onClick={() => {
                                                setUserImg(item?.image);

                                                item?.image && setImgViewModal(true);
                                            }}>
                                                {item?.image ? (
                                                    <img src={item?.image} alt="" />
                                                ) : (
                                                    <FaUser />
                                                )}
                                            </div>
                                            <div className="div">
                                                {item?.user?.first_name || item?.user?.last_name ? (
                                                    <>
                                                        <h2>
                                                            {item?.user?.first_name} {item?.user?.last_name}
                                                        </h2>
                                                        <h3>
                                                            {groupName ? groupName : 'guruh mavjud emas'}
                                                        </h3>
                                                        <div className="pointRow">
                                                            <span className="number">{index + 1}</span>
                                                            <span className="point">{item?.point} coin</span>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <h2>Ism mavjud emas</h2>
                                                        <h3>
                                                            {groupName ? groupName : 'guruh mavjud emas'}
                                                        </h3>
                                                        <div className="pointRow">
                                                            <span className="number">{index + 1}</span>
                                                            <span className="point">{item?.point} coin</span>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <div className="pointMedia">
                                            <span>{index + 1}</span>
                                        </div>
                                    </div>
                                );
                            })
                            : 'O\'quvchilar ro\'yxati mavjud emas'}
                    </div>
                </div>

                <div className="studentTable">
                    <div className="tableHeader">
                        <div className="pageName">
                            <IoIosArrowBack onClick={() => {
                                navigate(-1)
                            }} />
                            <h2>O'quvchilar jadvali</h2>
                        </div>

                        {


                            !studentInfo?.detail ?
                                <>
                                    <div className="user_filter">
                                        <input
                                            onInput={(e) => {
                                                handleSearch(e);
                                            }}
                                            type="text"
                                            placeholder="Ism kiriting"
                                        />
                                        <select
                                            onChange={(e) => {
                                                filterGroup(e.target.value);
                                            }}
                                            name=""
                                            id=""
                                        >
                                            <option value="barchasi">Barchasi</option>
                                            <option value="meningGuruhim">mening guruhim</option>
                                            {/* {Array.isArray(groups) &&
                                    groups.map((item, index) => (
                                        <option key={index} value={item?.id}>
                                            {item.name}
                                        </option>
                                    ))} */}
                                        </select>
                                    </div>
                                    <div className="user_btns">
                                        <button onClick={(e) => {
                                            filterGroup(e.target.textContent);
                                        }}>Barchasi</button>
                                        <button onClick={(e) => {
                                            filterGroup(e.target.textContent);
                                        }} value={"meningguruhim"}>meningguruhim</button>
                                    </div>
                                </> : <>
                                    <div className="user_filter">
                                        <input
                                            onInput={(e) => {
                                                handleSearch(e);
                                            }}
                                            type="text"
                                            placeholder="Ism kiriting"
                                        />
                                        <select
                                            onChange={(e) => {
                                                filterGroup(e.target.value);
                                            }}
                                            name=""
                                            id=""
                                        >
                                            <option value="barchasi">Barchasi</option>
                                            {Array.isArray(groups) &&
                                                groups.map((item, index) => (
                                                    <option key={index} value={item?.id}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                </>}
                    </div>




                    <div className="table_Body">
                        {Array.isArray(studentList) && studentList.length > 0
                            ? studentList
                                .sort((a, b) => b.point - a.point).slice(0, 20)
                                .map((item, index) => {

                                    return (
                                        <div key={index} className={studentInfo?.id == item?.id ? "student_table_row active" : "student_table_row"}>
                                            <div className="div">
                                                <span className='student_num'>{index + 1}</span>
                                                <div className="studentsTableImg" onClick={() => {
                                                    setUserImg(item?.image);

                                                    item.image && setImgViewModal(true);
                                                }}>
                                                    {item?.image ?
                                                        <img src={item?.image} alt="" />
                                                        :
                                                        <div className="icon">
                                                            <FaRegUser />
                                                        </div>
                                                    }

                                                </div>
                                                <div className="studentTableCol">
                                                    {item?.user?.first_name || item?.user?.last_name ? (
                                                        <h2>
                                                            {item.user?.first_name} {item.user?.last_name}
                                                        </h2>
                                                    ) : (
                                                        <h2>Ism mavjud emas</h2>
                                                    )}


                                                    <h3>  {getGroupName(item?.group)?.name || "Guruh mavjud emas"}</h3>
                                                </div>
                                            </div>
                                            <div className="studentCointrow">

                                                <div className="studetTableCrown" >
                                                    <HiTrophy />
                                                </div>
                                                <div className="point">{item?.point ? item?.point : 0} coin</div>
                                            </div>

                                        </div>
                                    );
                                })
                            : 'O\'quvchilar ro\'yxati mavjud emas'}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Students;
