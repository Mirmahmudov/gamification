import React, { useEffect, useState } from "react";
import "./GivePoint.css";
import { baseUrl } from "../../config";
import { getToken } from "../../service/token";
import { toast } from "react-toastify";

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
  if (!isOpen) return null;

  const [pointTypes, setPointTypes] = useState([]);
  const [selectedPointType, setSelectedPointType] = useState("");
  const [descriptionRequired, setDescriptionRequired] = useState(false);
  const [description, updateDescription] = useState("");
  const [date, setLocalDate] = useState(() => {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
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
      .then((result) => {
        setPointTypes(result);
      })
      .catch((error) => toast.error("Point turini olishda xatolik:", error));
  };

  useEffect(() => {
    getPointType();
  }, []);

  const handlePointTypeChange = (e) => {
    const selectedType = e.target.value;
    setSelectedPointType(selectedType);

    const selectedPoint = pointTypes.find((item) => item.id.toString() === selectedType);
    if (selectedPoint?.name === "Rag'bat") {
      setDescriptionRequired(true);
    } else {
      setDescriptionRequired(false);
    }

    setPoint_type(selectedType);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (descriptionRequired && !description.trim()) {
      toast.error("Iltimos, izoh kiriting!");
      return;
    }
    setDescription(description);
    setDate(date);
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
                onChange={handlePointTypeChange}
                id="select"
                defaultValue="1"
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
                type="number"
                id="input1"
                placeholder="Enter value for point"
              />
            </div>
            <div className="form-group">
              <label htmlFor="input2">Izoh</label>
              <input
                onChange={(e) => updateDescription(e.target.value)}
                type="text"
                id="input2"
                placeholder="Enter value for description"
                required={descriptionRequired}
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
