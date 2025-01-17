import React, { useEffect, useState } from "react";
import "./LeaderBoard.css";
import { CiSearch } from "react-icons/ci";
import { getToken } from "../../service/token";
import { baseUrl } from "../../config";
import { FaRegUser } from "react-icons/fa";

function LeaderBoard({ setLoader }) {
  const [studentList, setStudentList] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Qidiruv uchun holat

  const getStudent = () => {
    setLoader(true);
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
        setStudentList(result);
        setFilterData(result); // filterData uchun boshlang'ich qiymatni berish
        setLoader(false);
      })
      .catch((error) => console.error(error));
  };

  const getGroup = () => {
    setLoader(true);
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
        setLoader(false);
        setGroups(result);
      })
      .catch((error) => {
        console.error(error);
        setLoader(false);
      });
  };

  useEffect(() => {
    getStudent();
    getGroup();
  }, [getToken()]);

  // Qidiruv funksiyasi
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase(); // qidiruvni kichik harflarda qilish
    setSearchTerm(query);

    const filteredStudents = filterData.filter((student) => {
      const name =
        (student?.user?.first_name || "") +
        " " +
        (student?.user?.last_name || "");
      return name.toLowerCase().includes(query); // Faqat ismlar bo'yicha qidiruv
    });
    setStudentList(filteredStudents); // Filtrlangan ro'yxatni o'rnatish
  };

  const filterGroup = (group) => {
    if (group === "barchasi") {
      setStudentList(filterData); // Barcha o'quvchilarni qaytarish
    } else {
      const filteredStudents = filterData.filter(
        (item) => item.group === group
      );
      setStudentList(filteredStudents); // Guruh bo'yicha filtrlangan ro'yxat
    }
  };

  return (
    <div className="leaderBoard">
      <header className="header">
        <div>
          <select className="dropdown" name="" id="">
            <option value="">Android</option>
            <option value="">Android</option>
            <option value="">Android</option>
            <option value="">Android</option>
            <option value="">Android</option>
            <option value="">Android</option>
            <option value="">Android</option>
          </select>
        </div>
      </header>

      <section className="content">
        <div className="content_head">
          <h2 className="title">O'quvchilar</h2>
          <div className="search-filter">
            <div className="input_box">
              <CiSearch />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm} // qidiruv qiymatini inputda ko'rsatish
                onChange={handleSearch} // inputda o'zgarish bo'lsa, qidiruvni chaqirish
              />
            </div>
          </div>
        </div>
        <hr />

        <div className="students_list">
          <div className="top-students">
            {Array.isArray(studentList)
              ? studentList
                .sort((a, b) => b.point - a.point)
                .slice(0, 3)
                .reduce((acc, item, index) => {
                  if (index === 1) acc.unshift(item);
                  else acc.push(item);
                  return acc;
                }, [])
                .map((item, index) => {
                  const groupName = Array.isArray(groups)
                    ? groups.find((group) => group?.id === item.group)?.name
                    : "Mavjud emas";

                  return (
                    <div key={index} className="student-card">
                      <div className="avatar">
                        <div className="imgs">
                          {item.image ? (
                            <img
                              src={`${item.image}`}
                              alt=""
                            />
                          ) : (
                            <FaRegUser />
                          )}
                        </div>
                      </div>
                      {item?.user?.first_name || item?.user?.last_name ? (
                        <>
                          <h3 className="student-name">
                            {item.user?.first_name} {item.user?.last_name}
                          </h3>
                          <h4>
                            ({groupName ? groupName : "guruh mavjud emas"})
                          </h4>
                        </>
                      ) : (
                        <>
                          <h3>Ism mavjud emas</h3>
                          <h4>
                            ({groupName ? groupName : "guruh mavjud emas"})
                          </h4>
                        </>
                      )}
                    </div>
                  );
                })
              : "O'quvchilar ro'yxati mavjud emas"}
          </div>

          <div className="student-list">
            {Array.isArray(studentList)
              ? studentList
                .sort((a, b) => b.point - a.point)
                .map((item, index) => {
                  const groupName = Array.isArray(groups)
                    ? groups.find((group) => group?.id === item.group)?.name
                    : "Mavjud emas";

                  return (
                    <div key={index} className="student-row">
                      <div className="student-info">
                        <h3> {index + 1}. </h3>
                        {item?.user?.first_name || item?.user?.last_name ? (
                          <h3>
                            {item.user?.first_name} {item.user?.last_name} (
                            {groupName ? groupName : "guruh mavjud emas"} )
                          </h3>
                        ) : (
                          <h3>
                            Ism mavjud emas (
                            {groupName ? groupName : "guruh mavjud emas"} )
                          </h3>
                        )}
                      </div>
                      <div className="student-xp">{item?.point} XP</div>
                    </div>
                  );
                })
              : "O'quvchilar ro'yxati mavjud emas"}
          </div>
        </div>
      </section>
    </div>
  );
}

export default LeaderBoard;
