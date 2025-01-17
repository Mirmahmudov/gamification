import React, { useEffect, useState } from "react";
import { getToken } from "../../service/token";
import { baseUrl } from "../../config";
import "./Profile.css";
import { FaPen, FaRegUser } from "react-icons/fa";

function Profile({ setLoader }) {
  const [studentInfo, setStudentInfo] = useState(null);
  const [login, setLogin] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [editBio, setEditBio] = useState()
  const [editDate, setEditDate] = useState()
  const [editImg, setEditImg] = useState()



  const getStudentInfo = () => {
    setLoader(true);
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
        setLogin(result?.user?.username || "");
        setFirstName(result?.user?.first_name || "");
        setLastName(result?.user?.last_name || "");
        setBirthDate(result?.birth_date || "");
        setLoader(false);
      })
      .catch((error) => {
        console.error(error);
        setLoader(false);
      });
  };

  const editUser = () => {
    console.log("Bio:", editBio);
    console.log("Date:", editDate);
    console.log("Image:", editImg);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM5NTI2NzYzLCJpYXQiOjE3MzY5MzQ3NjMsImp0aSI6ImIxNjdhOGMzNDMzNjQzZWZiYmRkOGRmNzZlZWJjNWYzIiwidXNlcl9pZCI6M30.-35UDWHniYLesPHLvJsiKw_W06dC9o1GCgg-6I1koN8");


    const formData = new FormData();
    formData.append('birth_date', editDate); // 'file' API-da kutgan nomga mos kelishi kerak
    formData.append('bio', editBio); // 'bio' API-da kutgan nomga mos kelishi kerak
    formData.append('image', editImg); // 'number' API-da kutgan nomga mos kelishi kerak

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: formData,
      redirect: "follow"
    };

    fetch("https://codialpointv3.pythonanywhere.com/students/4/", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

  }

  useEffect(() => {
    getStudentInfo();
  }, []);


  return (
    <>
      <div className="profilePage">
        <h1 className="profilName">Mening profilim</h1>
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
          {/* <form onSubmit={(e) => {
            e.preventDefault()
            editUser()
          }} className="profilNavModal">
            <textarea value={editBio}
              onChange={(e) => setEditBio(e.target.value)} name="" id="" placeholder="bio"></textarea>
            <input type="date" value={editDate}
              onChange={(e) => setEditDate(e.target.value)} />
            <input type="file"
              onChange={(e) => setEditImg(e.target.files[0])} />
            <button>edit</button>
          </form> */}
        </div>
        <div className="profieInfo">
          <div className="row">
            <h4>Login</h4>
            <input
              type="text"
              placeholder="Asadbek"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <div className="row">
            <h4>Ism</h4>
            <input
              type="text"
              placeholder="Asadbek"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="row">
            <h4>Familiya</h4>
            <input
              type="text"
              placeholder="Mirmahmudov"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="row">
            <h4>Guruh</h4>
            <select name="group" id="group">
              <option value="">Frontend 21</option>
            </select>
          </div>
          <div className="row">
            <h4>Tug'ilgan sana</h4>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
