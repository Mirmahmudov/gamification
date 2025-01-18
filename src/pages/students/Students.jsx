import React, { useEffect, useState } from 'react';
import './Students.css';
import { FaCrown, FaUser } from 'react-icons/fa';
import { getToken } from '../../service/token';
import { baseUrl } from '../../config';

function Students({ setLoader }) {
    const [studentList, setStudentList] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [groups, setGroups] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLargeScreen, setIsLargeScreen] = useState(false);

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
                console.error(error);
                setLoader(false);
            });
    };

    const getGroup = () => {
        setLoader(true);
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${getToken()}`);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch(`${baseUrl}/groups/`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setGroups(result || []);
                setLoader(false);
            })
            .catch((error) => {
                console.error(error);
                setLoader(false);
            });
    };

    useEffect(() => {
        getStudent();
        getGroup();
    }, []);

    useEffect(() => {
        // Detect screen size
        const handleResize = () => {
            if (window.innerWidth > 700) {
                setIsLargeScreen(true);
            } else {
                setIsLargeScreen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check

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
        if (group === 'barchasi') {
            setStudentList(filterData);
        } else {
            const filteredStudents = filterData.filter(
                (item) => item.group === parseInt(group, 10)
            );
            setStudentList(filteredStudents);
        }
    };

    const reorderTopStudents = () => {
        if (isLargeScreen && studentList.length > 1) {
            const reordered = [...studentList];
            const temp = reordered[0];
            reordered[0] = reordered[1];
            reordered[1] = temp;
            return reordered;
        }
        return studentList;
    };

    return (
        <>
            <div className="students">
                <div className="topStudents">
                    <div className="row">
                        {Array.isArray(reorderTopStudents()) && reorderTopStudents().length > 0
                            ? reorderTopStudents().slice(0, 3).map((item, index) => {
                                const groupName = Array.isArray(groups)
                                    ? groups.find((group) => group?.id === item.group)?.name
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
                                            <div className="imgs">
                                                {item.image ? (
                                                    <img src={item.image} alt="" />
                                                ) : (
                                                    <FaUser />
                                                )}
                                            </div>
                                            <div className="div">
                                                {item?.user?.first_name || item?.user?.last_name ? (
                                                    <>
                                                        <h2>
                                                            {item.user?.first_name} {item.user?.last_name}
                                                        </h2>
                                                        <h3>
                                                            ({groupName ? groupName : 'guruh mavjud emas'})
                                                        </h3>
                                                        <div className="pointRow">
                                                            <span className="number">{}</span>
                                                            <span className="point">{item?.point} XP</span>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <h2>Ism mavjud emas</h2>
                                                        <h3>
                                                            ({groupName ? groupName : 'guruh mavjud emas'})
                                                        </h3>
                                                        <div className="pointRow">
                                                            <span className="number">{}</span>
                                                            <span className="point">{item?.point} XP</span>
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
                        <h1>O'quvchilar jadvali</h1>
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
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <td>№</td>
                                <td>O'quvchilar</td>
                                <td>Yo'nalish</td>
                                <td>Ball</td>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(studentList) && studentList.length > 0
                                ? studentList
                                    .sort((a, b) => b.point - a.point)
                                    .map((item, index) => {
                                        const groupName = Array.isArray(groups)
                                            ? groups.find((group) => group?.id === item.group)?.name
                                            : 'Mavjud emas';

                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}. </td>
                                                {item?.user?.first_name || item?.user?.last_name ? (
                                                    <td>
                                                        {item.user?.first_name} {item.user?.last_name}
                                                    </td>
                                                ) : (
                                                    <td>Ism mavjud emas</td>
                                                )}
                                                <td> {groupName ? groupName : 'guruh mavjud emas'}</td>
                                                <td>
                                                    <div className="point">{item?.point} XP</div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                : 'O\'quvchilar ro\'yxati mavjud emas'}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Students;
