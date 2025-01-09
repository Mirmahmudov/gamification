import React, { useEffect, useState } from "react";
import "./Student.css";
import { FaChevronRight, FaRegStar, FaRegUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { getToken } from "../../service/token";
import { IoIosArrowBack } from "react-icons/io";
import { baseUrl } from "../../config";

function Student() {
  const [studentInfo, setStudentInfo] = useState();
  const [student, setStudent] = useState();
  const [filterData, setFilterData] = useState();
  const [groups, setGroups] = useState();
  const getStudentInfo = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}/students/get-me/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setStudentInfo(result);
        console.log(result);
      })
      .catch((error) => console.error(error));
  };

  const getStudent = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}/students/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setStudent(result);
        setFilterData(result);
        console.log(result);
      })
      .catch((error) => console.error(error));
  };

  const getGroup = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}/groups/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setGroups(result);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getStudentInfo();
    getStudent();
    getGroup();
  }, [getToken()]);

  console.log();

  // filter

  const filterGroup = (group) => {
    if (group == "barchasi") {
      var filterStudent = filterData.filter((item) => {
        return item;
      });
    } else {
      var filterStudent = filterData.filter((item) => {
        return item.group === group;
      });
    }

    setStudent(filterStudent);
  };

  var topPoints = student ? student[0]?.point : 0;
  var userPoints = Array.isArray(student)
    ? student.find((item) => item?.user?.id === studentInfo?.user?.id)?.point
    : undefined;

  var user = Array.isArray(student)
    ? student.findIndex((item) => item?.user?.id === studentInfo?.user?.id)
    : -1;
  return (
    <>
      <div className="student">
        <div className="pageName">
          <IoIosArrowBack />
          <h2>Leaderboards</h2>
        </div>

        <div className="student_filter">
          <div className="search">
            <input type="text" placeholder="Asadbek" />
            <CiSearch />
          </div>
          <div className="row">
            <button
              onClick={() => {
                filterGroup("barchasi");
              }}
            >
              Barchasi
            </button>
            <button
              onClick={() => {
                filterGroup(studentInfo?.group);
              }}
            >
              {Array.isArray(groups)
                ? groups.find((items) => items?.id === studentInfo?.group)
                    ?.name || "Guruh nomi yo'q"
                : "Groups massiv emas"}
            </button>
          </div>
        </div>
        <div className="student_score">
          <div className="student_position">
            <div className="student_imgs">
              <div className="imgs userImg">
                {studentInfo?.image ? (
                  <img src={`${baseUrl}/docs/${studentInfo.image}`} alt="" />
                ) : (
                  <FaRegUser />
                )}
              </div>
              <div className="score">{userPoints - topPoints}</div>
            </div>
            <h2>
              {studentInfo?.user?.first_name} {studentInfo?.user?.last_name}
            </h2>
            <h3>
              {user + 1}
              -o'rin
            </h3>
          </div>
          <div className="student_point">{studentInfo?.point} XP</div>
        </div>
        <div className="student_col">
          {Array.isArray(student)
            ? student
                .sort((a, b) => b.point - a.point)
                .map((item, index) => {
                  return (
                    <div key={item?.id} className="student_row">
                      <div className="row">
                        <div className="student_imgs">
                          <div className="imgs">
                            {item.image ? (
                              <img
                                src={`${baseUrl}/docs/${item.image}`}
                                alt=""
                              />
                            ) : (
                              <FaRegUser />
                            )}
                          </div>
                          <div className="num">{index + 1}</div>
                        </div>
                        <div className="student_name">
                          {item.user?.first_name || item.user?.last_name ? (
                            <h3>
                              {item.user?.first_name} {item.user?.last_name}
                            </h3>
                          ) : (
                            <h3>Ism mavjud emas</h3>
                          )}
                          {groups?.find((items) => items?.id === item.group) ? (
                            <h4>
                              {
                                groups?.find(
                                  (items) => items?.id === item.group
                                )?.name
                              }
                            </h4>
                          ) : (
                            <h4>mavjud emas</h4>
                          )}
                        </div>
                      </div>
                      <div className="student_point">
                        {item.point ? item.point : "0"} XP <FaChevronRight />
                      </div>
                      <div className="student_star">
                        <FaRegStar />
                        <FaRegStar />
                        <FaRegStar />
                      </div>
                    </div>
                  );
                })
            : "O'quvchilar ro'yxati mavjud emas"}
        </div>
      </div>
    </>
  );
}

export default Student;
