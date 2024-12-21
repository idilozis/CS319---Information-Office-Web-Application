import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./ViewAdvisorList.css";

const ViewAdvisorList = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const userMenuRef = useRef(null);

  const advisors = [
    { name: "Ahmet Yavuzhan Er", bilkentId: "123456", contactPhone: "0123 456 78 90", contactEmail: "ahmet.er@bilkent.edu.tr", assignedDay: "Monday" },
    { name: "John Doe", bilkentId: "234567", contactPhone: "0987 654 32 10", contactEmail: "john.doe@bilkent.edu.tr", assignedDay: "Tuesday" },
    { name: "Jane Smith", bilkentId: "345678", contactPhone: "0123 987 65 43", contactEmail: "jane.smith@bilkent.edu.tr", assignedDay: "Wednesday" },
    { name: "Ali Yıldırım", bilkentId: "456789", contactPhone: "0111 222 33 44", contactEmail: "ali.yildirim@bilkent.edu.tr", assignedDay: "Thursday" },
    { name: "Berker Kara", bilkentId: "567890", contactPhone: "0333 444 55 66", contactEmail: "berker.kara@bilkent.edu.tr", assignedDay: "Friday" },
    { name: "Sıla Yılmaz", bilkentId: "678901", contactPhone: "0444 555 66 77", contactEmail: "sila.yilmaz@bilkent.edu.tr", assignedDay: "Saturday" },
    { name: "Zeynep Dursun", bilkentId: "789012", contactPhone: "0555 666 77 88", contactEmail: "zeynep.dursun@bilkent.edu.tr", assignedDay: "Sunday" },
  ];

  // Sort advisors by assigned day (Monday to Sunday)
  const daysOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const sortedAdvisors = advisors.sort((a, b) => daysOrder.indexOf(a.assignedDay) - daysOrder.indexOf(b.assignedDay));

  const handleClickOutside = (event) => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Bilkent Information Office System</h2>
        <ul>
          <li>
            <Link to="/api/coordinator_dashboard" className="sidebar-link">Dashboard</Link>
          </li>
          <li>
            <Link to="/api/coordinator_highschool_database" className="sidebar-link">High School Database</Link>
          </li>
          <li>
            <Link to="/api/coordinator_puantaj" className="sidebar-link">Puantaj Page</Link>
          </li>
          <li>
            <Link to="/api/coordinator_fair_applications" className="sidebar-link">Fair Applications</Link>
          </li>
          <li>
            <Link to="/api/coordinator_accepted_tours" className="sidebar-link">Tour Applications</Link>
          </li>
          <li>
            <Link to="/api/coordinator_view_advisor_list" className="sidebar-link">Advisor List</Link>
          </li>
          <li>
            <Link to="/api/coordinator_view_guide_list" className="sidebar-link">Guide List</Link>
          </li>
          <li>
            <Link to="/api/coordinator_view_feedback" className="sidebar-link">View Feedbacks</Link>
          </li>
        </ul>
        <div className="logout">
          <button onClick={() => (window.location.href = "/api/login/")}>Logout</button>
        </div>
      </div>

      <div className="main-content">
        <div className="user-menu" ref={userMenuRef}>
          <div
            className="user-icon"
            onClick={() => setMenuVisible(!menuVisible)}
          >
            <img
              src="/static/icons/userSymbol.png"
              className="user-avatar"
              alt="User Icon"
            />
            Kemal Çakır
          </div>
          {menuVisible && (
            <div className="dropdown-menu">
              <button onClick={() => (window.location.href = "/api/settings/")}>
                Settings
              </button>
              <button onClick={() => (window.location.href = "/api/login/")}>
                Logout
              </button>
            </div>
          )}
        </div>

        <h1>Advisor List</h1>
        <div className="advisor-list-table-container">
          <table className="advisor-list-table">
            <thead>
              <tr>
                <th>Advisor Name</th>
                <th>Bilkent ID</th>
                <th>Contact Phone</th>
                <th>Contact Email</th>
                <th>Assigned Day</th>
              </tr>
            </thead>
            <tbody>
              {sortedAdvisors.map((advisor, index) => (
                <tr key={index}>
                  <td>{advisor.name}</td>
                  <td>{advisor.bilkentId}</td>
                  <td>{advisor.contactPhone}</td>
                  <td>{advisor.contactEmail}</td>
                  <td>{advisor.assignedDay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewAdvisorList;
