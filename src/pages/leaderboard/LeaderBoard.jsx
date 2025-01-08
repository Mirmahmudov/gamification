import React from "react";
import "./LeaderBoard.css";
import { CiSearch } from "react-icons/ci";

function LeaderBoard() {
  const topStudents = [
    { name: "Alijon Valiyev", role: "Frontend" },
    { name: "Asadbek Tursunov", role: "Backend" },
    { name: "Usmon Kamolov", role: "Android" },
  ];

  const studentList = [
    { name: "Asadbek Tursunov (Backend №28)", xp: 1850 },
    { name: "Alijon Valiyev (Frontend №27)", xp: 1775 },
    { name: "Usmon Karimov (Android №21)", xp: 1750 },
    { name: "Example (Example №28)", xp: 1425 },
    { name: "Example (Example №28)", xp: 1425 },
    { name: "Example (Example №28)", xp: 1425 },
    { name: "Example (Example №28)", xp: 1425 },
  ];
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
          <input className="dropdown" type="date" />
        </div>
      </header>

      <section className="content">
        <div className="content_head">
          <h2 className="title">O'quvchilar</h2>
          <div className="search-filter">
            <div className="input_box">
              <CiSearch />
              <input type="text" placeholder="Search" />
            </div>
            <select name="" id="" className="gradeType">
              <option value="">Left 30 days</option>
              <option value="">Left 30 days</option>
              <option value="">Left 30 days</option>
              <option value="">Left 30 days</option>
            </select>
          </div>
        </div>
        <hr />

        <div className="students_list">
          <div className="top-students">
            {topStudents.map((student, index) => (
              <div key={index} className="student-card">
                <div className="avatar"></div>
                <p className="student-name">{student.name}</p>
                <p className="student-role">{student.role}</p>
              </div>
            ))}
          </div>
          <div className="student-list">
            {studentList.map((student, index) => (
              <div key={index} className="student-row">
                <div className="student-info">
                  {index + 1}. {student.name}
                </div>
                <div className="student-xp">{student.xp} XP</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default LeaderBoard;
