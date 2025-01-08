import React, { useEffect, useState } from "react";
import "./GivePoint.css";
import { baseUrl } from "../../config";
import { getToken } from "../../service/token";

const GivePoint = ({
  givePoint,
  setAmount,
  setDescription,
  setDate,
  setPoint_type,
  setMentor,
  courses,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;
  const [pointTypes, setPointTypes] = useState(null);
  const getPoitType = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}/point-types/`, requestOptions)
      .then((response) => response.json())
      .then((result) => setPointTypes(result))
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getPoitType();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
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
              <label htmlFor="input1">Point kiriting</label>
              <input
                required
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                type="text"
                id="input1"
                placeholder="Enter value for point"
              />
            </div>
            <div className="form-group">
              <label htmlFor="input2">Izoh</label>
              <input
                required
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                type="text"
                id="input2"
                placeholder="Enter value for description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="input3">Sana</label>
              <input
                required
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                type="date"
                id="input3"
              />
            </div>
            <div className="form-group">
              <label htmlFor="select">Point Turi</label>
              <select
                onChange={(e) => {
                  setPoint_type(e.target.value);
                }}
                id="select"
              >
                <option value="" disabled selected>
                  Select an option
                </option>
                {pointTypes?.map((item) => {
                  return (
                    <option value={item.id}>
                      {item.name} ({item.max_point}){" "}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="select">Kursni tanlang</label>
              <select
                onChange={(e) => {
                  setMentor(e.target.value);
                }}
                id="select"
              >
                <option value="" disabled selected>
                  Select an option
                </option>
                {courses?.map((item) => {
                  return <option value={item.id}>{item.name}</option>;
                })}
              </select>
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
