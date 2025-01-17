import React, { useEffect, useState } from "react";
import "./GivePoint.css";
import { baseUrl } from "../../config";
import { getToken } from "../../service/token";

const GivePoint = ({
  userInfo,
  givePoint,
  setAmount,
  setDescription,
  setDate,
  setPoint_type,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null; // Modal faqat ochilganda render bo'ladi

  const [pointTypes, setPointTypes] = useState([]);
  const [date, setLocalDate] = useState(() => {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset()); // Vaqt zonasini hisobga olish
    return today.toISOString().split("T")[0];
  });

  const getPointType = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}/point-types/`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Serverda xatolik!");
        }
        return response.json();
      })
      .then((result) => setPointTypes(result))
      .catch((error) => console.error("Point turini olishda xatolik:", error));
  };

  useEffect(() => {
    getPointType();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDate(date); // Tanlangan sanani belgilash
    givePoint();
  };

  return (
    <div className="give_point">
      <div className="modal-overlay">
        <div className="modal-container">
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
          <h2 className="modal-title">Baholash</h2>
          <form onSubmit={handleSubmit} className="custom-form">
            <div className="form-group">
              <label htmlFor="select">Point Turi</label>
              <select
                onChange={(e) => setPoint_type(e.target.value)}
                id="select"
                defaultValue="" // Default bo'sh qiymat
              >
              
                {pointTypes.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} ({item.max_point})
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="input1">Point kiriting</label>
              <input
                required
                onChange={(e) => setAmount(e.target.value)}
                type="number" // Raqam kiritish uchun
                id="input1"
                placeholder="Enter value for point"
              />
            </div>
            <div className="form-group">
              <label htmlFor="input2">Izoh</label>
              <input
                required
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                id="input2"
                placeholder="Enter value for description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="input3">Sana</label>
              <input
                required
                value={date}
                onChange={(e) => setLocalDate(e.target.value)}
                type="date"
                id="input3"
              />
            </div>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GivePoint;
