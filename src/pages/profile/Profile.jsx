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
  const [editTel, setEditTel] = useState("");
  const [editImg, setEditImg] = useState(null);
  const [imgView, setImgView] = useState(false);
  const [oneGroups, setOneGroups] = useState([])

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
        setEditTel(result.phone_number)
        setLoader(false);
      })
      .catch((error) => {
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
    formData.append("phone_number", editTel);
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
        setLoader(false)
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
        if (result) {
          setOneGroups(result);
        }


        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
      });

  }


  useEffect(() => {
    getStudentInfo();
    getOneGroup()
  }, []);

  const getGroupName = (id) => {

    return oneGroups?.find((item) => item?.id == id);
  };


  const handleChangePhone = (e) => {
    let input = e.target.value.replace(/\D/g, ""); // Faqat raqamlarni qoldirish

    if (input.length > 9) input = input.slice(0, 9); // Maksimal 9 ta raqam

    let formatted = input;
    if (input.length > 2) {
      formatted = `(${input.slice(0, 2)}) ${input.slice(2)}`;
    }
    if (input.length > 5) {
      formatted = `(${input.slice(0, 2)}) ${input.slice(2, 5)}-${input.slice(5)}`;
    }
    if (input.length > 7) {
      formatted = `(${input.slice(0, 2)}) ${input.slice(2, 5)}-${input.slice(5, 7)}-${input.slice(7, 9)}`;
    }

    setEditTel(formatted); // Telefonni formatlash va saqlash
  };


  return (
    <div className="profilePage">
      <div className="pageName">
        <IoIosArrowBack onClick={() => {
          navigate(-1)
        }} />
        <h2> Ma'lumotlarim</h2>
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
              <h4>Tug'ilgan sanangizni </h4>
              <input
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
              />
              <br />

            </div>
            <div className="col">
              <h4>Telefon raqam </h4>
              <input className="tel"
                type="tel"
                value={editTel}
                onChange={(e) => {
                  handleChangePhone(e)
                }}
                placeholder="+998 (__) ___-__-__"
              />
              <br />

            </div>
          </div>
          <div className="editRow">
            <div className="col">
              <h4>Bio </h4>
              <textarea
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                placeholder="Bio"
              ></textarea>
            </div>

          </div>
          <div className="btns">
            <button type="submit"> Saqlash</button>
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
            {/* <img src="imgs/coin-3.png" alt="" />
            {studentInfo?.point} */}
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

                <h3>{getGroupName(studentInfo?.group)?.name}</h3>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h4>Tug'ilgan sana</h4>

                <h3>{studentInfo?.birth_date ? studentInfo?.birth_date : "dd.mm.YYYY"}</h3>
              </div>
              <div className="col">
                <h4>Telefon raqam</h4>
                <h3>{studentInfo?.phone_number ? studentInfo?.phone_number : "+998(__)___"}</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;