import React from "react";
import { Link } from "react-router-dom";
import "./ViewGuideList.css";

const ViewGuideList = () => {
  const guides = [
    {
      name: "Ahmet Yavuzhan Er",
      bilkentId: "123456",
      contactPhone: "0123 456 78 90",
      contactEmail: "ahmet.er@bilkent.edu.tr",
    },
    {
      name: "John Doe",
      bilkentId: "234567",
      contactPhone: "0987 654 32 10",
      contactEmail: "john.doe@bilkent.edu.tr",
    },
    {
      name: "Jane Smith",
      bilkentId: "345678",
      contactPhone: "0123 987 65 43",
      contactEmail: "jane.smith@bilkent.edu.tr",
    },
    {
      name: "Ali Yıldırım",
      bilkentId: "456789",
      contactPhone: "0111 222 33 44",
      contactEmail: "ali.yildirim@bilkent.edu.tr",
    },
    // Add more guides as needed
  ];

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Bilkent Information Office System</h2>
        <ul>
          <li>
            <Link to="/api/coordinator_dashboard" className="sidebar-link">Dashboard</Link>
          </li>
          <li>
            <Link to="/api/coordinator_puantaj" className="sidebar-link">High School Database</Link>
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
        <h1>Guide List</h1>
        <div className="guide-list-table-container">
          <table className="guide-list-table">
            <thead>
              <tr>
                <th>Guide Name</th>
                <th>Bilkent ID</th>
                <th>Contact Phone</th>
                <th>Contact Email</th>
              </tr>
            </thead>
            <tbody>
              {guides.map((guide, index) => (
                <tr key={index}>
                  <td>{guide.name}</td>
                  <td>{guide.bilkentId}</td>
                  <td>{guide.contactPhone}</td>
                  <td>{guide.contactEmail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewGuideList;
