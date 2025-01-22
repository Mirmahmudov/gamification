import React, { useEffect, useState } from "react";
import { getToken } from "../../service/token";
import { baseUrl } from "../../config";
import "./Profile.css";
import { FaPen, FaRegUser } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Profile({ setLoader }) {
  const [studentInfo, setStudentInfo] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [editBio, setEditBio] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editImg, setEditImg] = useState(null);
  const [imgView, setImgView] = useState(false)
  const navigate = useNavigate()


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
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch student info");
        }
        return response.json();
      })
      .then((result) => {
        setStudentInfo(result);
        setEditBio(result?.bio || "");
        setEditDate(result?.birth_date || "");
        setLoader(false);
      })
      .catch((error) => {
        console.error(error);
        setLoader(false);
      });
  };

  const editUser = (e) => {
    setLoader(true)
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()} `);

    const formData = new FormData();
    formData.append("birth_date", editDate);
    formData.append("bio", editBio);
    if (editImg) {
      formData.append("image", editImg);
    }


    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: formData,
      redirect: "follow"
    };

    fetch(`${baseUrl}/students/${studentInfo?.id}/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoader(false)
        setEditModal(false)
        getStudentInfo()

      })
      .catch((error) => {
        setEditModal(false)
        console.error(error)
        setLoader(false)

      });

  };

  useEffect(() => {
    getStudentInfo();
  }, []);


  return (
    <div className="profilePage">
       <div className="pageName">
          <IoIosArrowBack onClick={() => {
            navigate(-1)
          }} />
          <h2>Mening profilim</h2>
        </div>
      {imgView && <div className="userProfileImgView" onClick={() => {
        setImgView(false)

      }}>
        {studentInfo?.image ? (
          <img src={studentInfo?.image} alt="" />
        ) : (
          <FaRegUser />
        )}
      </div>}
      {editModal ? (
        <form onSubmit={editUser} className="profilNavModal">
          <div className="editRow">
            <div className="images" onClick={() => {
              studentInfo?.image && setImgView(true)


            }}>
              <div className="imgs">
                {studentInfo?.image ? (
                  <img src={studentInfo?.image} alt="" />

                ) : (
                  <FaRegUser />
                )}
              </div>
            </div>
            <label htmlFor="file-input" className="custom-file-input">
              Surat yuklash
            </label>
            <input
              type="file"
              id="file-input"
              accept="image/*"
              onChange={(e) => setEditImg(e.target.files[0])}
            />
          </div>
          <div className="editRow">
            <div className="col">
              <h4>Oʻzingiz haqingizda yozing</h4>
              <textarea
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                placeholder="Bio"
              ></textarea>
            </div>
            <div className="col">
              <h4>Tug'ilgan sanangizni kiriting</h4>
              <input
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
              />
            </div>
          </div>
          <div className="btns">
            <button type="submit">O'zgarishlarni saqlash</button>
            <button type="button" onClick={() => setEditModal(false)}>
              Bekor qilish
            </button>
          </div>
        </form>
      ) : (
        <div className="navProfile">
          <div className="row">
            <div className="images" onClick={() => {
              setImgView(true)
            }}>
              <div className="imgs">
                {studentInfo?.image ? (
                  <img src={`${studentInfo?.image}`} alt="" />
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
            <img src="imgs/coin-3.png" alt="" />
            {studentInfo?.point}
            <button onClick={() => setEditModal(true)}>
              <FaPen /> Tahrirlash
            </button>
          </div>
        </div>
      )}
      {!editModal && (
        <div className="profieInfo">
          <div className="viewUserInfo">
            <div className="row">
              <div className="col">
                <h4>Login</h4>
                <h3>{studentInfo?.user?.username}</h3>
              </div>
              <div className="col">
                <h4>Ism</h4>
                <h3>{studentInfo?.user?.first_name}</h3>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h4>Familiya</h4>
                <h3>{studentInfo?.user?.last_name}</h3>
              </div>
              <div className="col">
                <h4>Guruh</h4>
                <h3>Frontend 21</h3>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h4>Tug'ilgan sana</h4>
                <h3>{studentInfo?.birth_date}</h3>
              </div>
              <div className="col">
                <h4>Telfon raqam</h4>
                <h3>{studentInfo?.phone_number ? studentInfo?.phone_number : "+998xxxxxxx"}</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;