import React, { useEffect, useState } from "react";
import "./Student.css";
import { FaChevronRight, FaRegStar, FaRegUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { getToken } from "../../service/token";
import { IoIosArrowBack } from "react-icons/io";

function Student() {
  const [studentInfo, setStudentInfo] = useState("");
  const getStudentInfo = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://codialpoint.pythonanywhere.com/students/get-me/",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setStudentInfo(result);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getStudentInfo();
  }, [getToken()]);
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
            <button>Barchasi</button>
            <button>Backend</button>
          </div>
        </div>
        <div className="student_score">
          <div className="student_position">
            <div className="student_imgs">
              <div className="imgs userImg">
                {studentInfo.image ? (
                  <img
                    src={`https://codialpoint.pythonanywhere.com/docs/${studentInfo.image}`}
                    alt=""
                  />
                ) : (
                  <FaRegUser />
                )}
              </div>
              <div className="score">-68</div>
            </div>
            <h2>
              {studentInfo?.user?.first_name} {studentInfo?.user?.last_name}
            </h2>
            <h3>31-o'rin </h3>
          </div>
          <div className="student_point">{studentInfo.point} XP</div>
        </div>
        <div className="student_col">
          <div className="student_row">
            <div className="row">
              <div className="student_imgs">
                <div className="imgs">
                  <FaRegUser />
                </div>
                <div className="num">1</div>
              </div>
              <div className="student_name">
                <h3>Asadbek Mirmahmudov</h3>
                <h4>Backend 21</h4>
              </div>
            </div>
            <div className="student_point">
              1 850 XP <FaChevronRight />
            </div>
            <div className="student_star">
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
            </div>
          </div>
          <div className="student_row">
            <div className="row">
              <div className="student_imgs">
                <div className="imgs">
                  <FaRegUser />
                </div>
                <div className="num">2</div>
              </div>
              <div className="student_name">
                <h3>Asadbek Mirmahmudov</h3>
                <h4>Backend 21</h4>
              </div>
            </div>
            <div className="student_point">
              1 850 XP <FaChevronRight />
            </div>
            <div className="student_star">
              <FaRegStar />
              <FaRegStar />
            </div>
          </div>
          <div className="student_row">
            <div className="row">
              <div className="student_imgs">
                <div className="imgs">
                  <FaRegUser />
                </div>
                <div className="num">3</div>
              </div>
              <div className="student_name">
                <h3>Asadbek Mirmahmudov</h3>
                <h4>Backend 21</h4>
              </div>
            </div>
            <div className="student_point">
              1 850 XP <FaChevronRight />
            </div>
            <div className="student_star">
              <FaRegStar />
            </div>
          </div>
          <div className="student_row">
            <div className="row">
              <div className="student_imgs">
                <div className="imgs">
                  <FaRegUser />
                </div>
                <div className="num">4</div>
              </div>
              <div className="student_name">
                <h3>Asadbek Mirmahmudov</h3>
                <h4>Backend 21</h4>
              </div>
            </div>
            <div className="student_point">
              1 850 XP <FaChevronRight />
            </div>
            <div className="student_star">{/* <FaRegStar /> */}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Student;
