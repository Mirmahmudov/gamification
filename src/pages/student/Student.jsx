import React, { useEffect, useState } from "react";
import "./Student.css";
import { FaChevronRight, FaRegStar, FaRegUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { getToken } from "../../service/token";
import { IoIosArrowBack } from "react-icons/io";
import { baseUrl } from "../../config";

function Student({ setLoader }) {
  const [studentInfo, setStudentInfo] = useState();
  const [student, setStudent] = useState([]); // Default to empty array
  const [filterData, setFilterData] = useState([]); // Default to empty array
  const [groups, setGroups] = useState([]); // Default to empty array
  const [searchTerm, setSearchTerm] = useState("");

  const getStudentInfo = async () => {
    try {
      setLoader(true);
      const myHeaders = new Headers({
        Authorization: `Bearer ${getToken()}`,
      });
      const response = await fetch(`${baseUrl}/students/get-me/`, {
        method: "GET",
        headers: myHeaders,
      });
      const result = await response.json();
      setStudentInfo(result);
    } catch (error) {
      console.error("Error fetching student info:", error);
    } finally {
      setLoader(false);
    }
  };

  const getStudent = async () => {
    try {
      setLoader(true);
      const myHeaders = new Headers({
        Authorization: `Bearer ${getToken()}`,
      });
      const response = await fetch(`${baseUrl}/students/`, {
        method: "GET",
        headers: myHeaders,
      });
      const result = await response.json();
      setStudent(result);
      setFilterData(result);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoader(false);
    }
  };

  const getGroup = async () => {
    try {
      setLoader(true);
      const myHeaders = new Headers({
        Authorization: `Bearer ${getToken()}`,
      });
      const response = await fetch(`${baseUrl}/groups/`, {
        method: "GET",
        headers: myHeaders,
      });
      const result = await response.json();
      setGroups(result);
    } catch (error) {
      console.error("Error fetching groups:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getStudentInfo();
    getStudent();
    getGroup();
  }, []);
  const filterGroup = (group) => {
    const filterStudent =
      group === "barchasi"
        ? filterData
        : filterData.filter((item) => item.group === group);
    setStudent(filterStudent);
  };

  const filteredStudents = student.filter((item) =>
    `${item?.user?.first_name || ""} ${item?.user?.last_name || ""}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const topPoints = student.length > 0 ? student[0]?.point : 0;
  const userPoints = student.find((item) => item?.user?.id === studentInfo?.user?.id)?.point || 0;
  const userPosition = student.findIndex((item) => item?.user?.id === studentInfo?.user?.id) + 1;

  return (
    <div className="student">
      <div className="pageName">
        <IoIosArrowBack />
        <h2>Leaderboards</h2>
      </div>

      <div className="student_filter">
        <div className="search">
          <input
            type="text"
            placeholder="Ism kiriting"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <CiSearch />
        </div>
        <div className="row">
          <button onClick={() => filterGroup("barchasi")}>Barchasi</button>
          <button onClick={() => filterGroup(studentInfo?.group)}>
            {
              groups.find((items) => items?.id === studentInfo?.group)?.name ||
              "Guruh nomi yo'q"
            }
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
          <h3>{userPosition}-o'rin</h3>
        </div>
        <div className="student_point">{userPoints} XP</div>
      </div>

      <div className="student_col">
        {filteredStudents.length > 0 ? (
          filteredStudents
            .sort((a, b) => b.point - a.point)
            .map((item, index) => (
              <div key={index} className="student_row">
                <div className="row">
                  <div className="student_imgs">
                    <div className="imgs">
                      {item.image ? (
                        <img src={`${baseUrl}/docs/${item.image}`} alt="" />
                      ) : (
                        <FaRegUser />
                      )}
                    </div>
                    <div className="num">{index + 1}</div>
                  </div>
                  <div className="student_name">
                    <h3>
                      {item.user?.first_name || ""} {item.user?.last_name || ""}
                    </h3>
                    <h4>
                      {groups.find((group) => group?.id === item.group)?.name ||
                        "Mavjud emas"}
                    </h4>
                  </div>
                </div>
                <div className="student_point">{item.point || "0"} XP</div>
                <div className="student_star">
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                </div>
              </div>
            ))
        ) : (
          <p>O'quvchilar ro'yxati mavjud emas</p>
        )}
      </div>
    </div>
  );
}

export default Student;
