import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { NavLink, useNavigate } from 'react-router-dom';
import { getToken } from '../../service/token';
import { baseUrl } from '../../config';
import { FaRegUser } from 'react-icons/fa';
import './AssessmentTwo.css';
import { toast } from 'react-toastify';
import { FaXmark } from 'react-icons/fa6';

function AssessmentTwo({ courses, userInfo, setLoader }) {
  const navigate = useNavigate();
  const [selectedGroup, setSelectedGroup] = useState(null); // Guruhni saqlash
  const [mentor, setMentor] = useState(null);
  const [filteredStudents, setFilteredStudents] = useState([]); // Filterlangan o'quvchilarni saqlash
  const [points, setPoints] = useState([]); // To'plangan ballar
  const [modal, setModal] = useState(false);
  const [comments, setComments] = useState({}); // Izohlar uchun state qo'shish

  // O'quvchilarni olish
  const getStudents = (groupId = selectedGroup) => {
    setLoader(true);
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${getToken()}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    const url = groupId
      ? `${baseUrl}/students/?group=${groupId}&group__mentor=${mentor ? mentor : ''}`
      : `${baseUrl}/students/?group__mentor=${mentor ? mentor : ''}`;

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setFilteredStudents(result); // O'quvchilarni filterlab, saqlab qo'yamiz
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
      });
  };

  // Mentorni olish
  const getMentor = () => {
    setLoader(true);
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${getToken()}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${baseUrl}/mentors/get-me`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setMentor(result?.id);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
      });
  };

  useEffect(() => {
    getMentor();
  }, [getToken()]);

  useEffect(() => {
    if (mentor) {
      getStudents();
    }
  }, [mentor]);

  // Ballarni o'zgartirish
  const handlePointChange = (studentId, pointType, value) => {
    const updatedPoints = [...points];
    const pointIndex = updatedPoints.findIndex((point) => point.studentId === studentId && point.pointType === pointType);

    if (pointIndex === -1) {
      updatedPoints.push({
        studentId,
        pointType,
        value,
      });
    } else {
      updatedPoints[pointIndex].value = value;
    }

    setPoints(updatedPoints);
  };

  // Izohni o'zgartirish
  const handleCommentChange = (studentId, value) => {
    setComments((prevComments) => ({
      ...prevComments,
      [studentId]: value, // Har bir o'quvchi uchun izohni yangilash
    }));
  };

  // Checkbox o'zgarishini qayd etish
  const handleCheckboxChange = (studentId, pointType) => {
    let value = 0;

    // Vaqtida_keldi bo'lsa, 30 ball berish
    if (pointType === 2) { // 2 = Vaqtida_keldi
      value = 30;
    }

    // Qatnashdi bo'lsa, 20 ball berish
    if (pointType === 4) { // 4 = Qatnashdi
      value = 20;
    }

    handlePointChange(studentId, pointType, value);
  };

  // Backendga ballarni va izohlarni yuborish
  const handleSubmit = () => {
    const date = new Date().toISOString().split('T')[0]; // Bugungi sana

    points.forEach((point) => {
      const data = {
        amount: point.value,
        description: comments[point.studentId] || '', // Izohni yuborish
        date,
        mentor,
        student: point.studentId,
        point_type: point.pointType,
      };

      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${getToken()}`);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: 'follow',
      };

      fetch(`${baseUrl}/give-points/`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // Backendga muvaffaqiyatli yuborilganidan keyin
          setLoader(false);
          toast.success('Baholandi');
          resetForm(); // Inputlarni bo'shatish
        })
        .catch((error) => {
          // Hatolik yuz berganda
          setLoader(false);
          toast.error('Hatolik mavjud');
        });
    });

    getStudents(selectedGroup);
  };

  // Inputlarni va checkboxlarni bo'shatish
  const resetForm = () => {
    setPoints([]); // Ballarni tozalash
    setComments({}); // Izohlarni tozalash
    const checkboxes = document.querySelectorAll('.check');
    checkboxes.forEach((checkbox) => (checkbox.checked = false)); // Checkboxlarni bo'shatish
    const inputs = document.querySelectorAll('.num, .date, textarea');
    inputs.forEach((input) => (input.value = '')); // Inputlarni bo'shatish
  };

  return (
    <div className="assessmentTwo">
      <div className="topPage">
        <div className="pageName">
          <IoIosArrowBack onClick={() => navigate(-1)} />
          <h2>Baholash</h2>
        </div>
        <header className="header">
          <div>
            <Autocomplete
              disablePortal
              options={courses && Array.isArray(courses) ? courses : []}
              getOptionLabel={(option) => option?.name || ''}
              sx={{ width: 300, padding: '0px' }}
              onChange={(event, value) => {
                setSelectedGroup(value?.id || null);
                getStudents(value?.id || null);
              }}
              renderInput={(params) => <TextField {...params} label="Barcha guruhlar" />}
              isOptionEqualToValue={(option, value) => option?.id === value?.id}
              className="custom-autocomplete"
            />
          </div>

          <NavLink to="/teacherhistory" className={'recent-add'}>
            Baholar Tarixi
          </NavLink>
        </header>
      </div>

      <div className="studentTable">
        <table border={'1px'}>
          <thead>
            <tr>
              <th colSpan={2}>Ism</th>
              <th>Vazifa</th>
              <th>Rag'bat</th>
              <th>Qatnashdi</th>
              <th>Vaqtida_keldi</th>
              <th>Sana</th>
              <th>Izoh</th>
              <th>imtihon</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents?.map((item, index) => (
              <tr key={index}>
                <td>
                  <div className="imgs">
                    {item?.image ? (
                      <img src={`${item?.image}`} alt="" />
                    ) : (
                      <FaRegUser />
                    )}
                  </div>
                </td>
                <td className="td_name">
                  <h2>
                    {item?.user?.first_name || item?.user?.last_name
                      ? ` ${item?.user?.first_name || ''} ${item?.user?.last_name || ''}`
                      : 'Ism mavjud emas'}
                  </h2>
                  <span>{item?.bio ? item.bio : 'ma\'lumot mavjud emas'}</span>
                </td>

                <td>
                  <input
                    className="num"
                    placeholder="100"
                    type="text"
                    onChange={(e) =>
                      handlePointChange(item.id, 1, parseInt(e.target.value, 10) || 0)
                    }
                  />
                </td>
                <td>
                  <input
                    className="num"
                    placeholder="100"
                    type="text"
                    onChange={(e) =>
                      handlePointChange(item.id, 5, parseInt(e.target.value, 10) || 0)
                    }
                  />
                </td>
                <td>
                  <input
                    className="check"
                    type="checkbox"
                    onChange={() => handleCheckboxChange(item?.id, 4)} // Darsga qatnashdi
                  />
                </td>
                <td>
                  <input
                    className="check"
                    type="checkbox"
                    onChange={() => handleCheckboxChange(item?.id, 2)} // Darsga o'z vaqtida keldi
                  />
                </td>
                <td>
                  <input type="date" className="date" defaultValue={new Date().toISOString().split('T')[0]} />
                </td>
                <td>
                  <textarea
                    placeholder="coin uchun izoh"
                    value={comments[item.id] || ''}
                    onChange={(e) => handleCommentChange(item.id, e.target.value)}
                  />
                </td>
                <td>
                  <input
                    className="num"
                    placeholder="1000"
                    type="text"
                    onChange={(e) =>
                      handlePointChange(item.id, 6, parseInt(e.target.value, 10) || 0)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btnrow">
        <button className="btn" onClick={handleSubmit}>
          Yuborish
        </button>
      </div>
    </div>
  );
}

export default AssessmentTwo;
