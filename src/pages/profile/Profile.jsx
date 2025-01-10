import React, { useEffect, useState } from "react";
import { getToken } from "../../service/token";
import { baseUrl } from "../../config";
import "./Profile.css";
import { FaPen, FaRegUser } from "react-icons/fa";

function Profile() {
  const [studentInfo, setStudentInfo] = useState();
  const [login, setLogin] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [birthDate, setBirthDate] = useState();

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
        setLogin(result?.user?.username);
        setFirstName(result?.user.first_name);
        setLastName(result?.user.last_name);
        setBirthDate(result.birth_date);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getStudentInfo();
  }, [getToken()]);

  return (
    <>
      <div className="profilePage">
        <h1 className="profilName">Mening profilim </h1>
        <div className="navProfile">
          <div className="row">
            <div className="images">
              <div className="imgs">
                {studentInfo?.image ? (
                  <img src={`${baseUrl}/docs/${studentInfo?.image}`} alt="" />
                ) : (
                  <FaRegUser />
                )}
              </div>
            </div>
            <div className="userInfo">
              <h2>
                {studentInfo?.user?.first_name} {studentInfo?.user?.last_name}
              </h2>
              <h5>{studentInfo?.bio}</h5>
            </div>
          </div>
          <div className="point">
            {studentInfo?.point} XP
            <button>
              <FaPen /> tahrirlash
            </button>
          </div>
        </div>
        <div className="profieInfo">
          <div className="row">
            <h4>login</h4>

            <input type="text" placeholder="Asadbek" value={login} />
          </div>
          <div className="row">
            <h4>ism</h4>
            <input type="text" placeholder="Asadbek" value={firstName} />
          </div>

          <div className="row">
            <h4>familya</h4>
            <input type="text" placeholder="Mirmahmudov" value={lastName} />
          </div>

          <div className="row">
            <h4>guruh</h4>

            <select name="" id="">
              <option value="">Frontend 21</option>
            </select>
          </div>
          <div className="row">
            <h4>tug'ulgan sana</h4>
            <input type="date" placeholder="" value={birthDate} />
          </div>
     
        </div>
      </div>
    </>
  );
}

export default Profile;
