import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ContactUsPage.css";

const ContactUsPage = () => {
  const [advisors, setAdvisors] = useState([]); // State to store advisor data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch advisors from the API
  useEffect(() => {
    const fetchAdvisors = async () => {
      try {
        const response = await fetch("/api/advisors/"); // Update the endpoint as needed
        if (!response.ok) {
          throw new Error("Failed to fetch advisors");
        }
        const data = await response.json();
        setAdvisors(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchAdvisors();
  }, []);

  return (
    <div className="contact-us-container">
      {/* Sidebar */}
      <aside className="contact-us-sidebar">
        <h2>Bilkent Information Office System</h2>
        <ul className="contact-us-menu">
          <li>
            <a href="/api/guest_dashboard/" className="menu-link">
              Home
            </a>
          </li>
          <li>
            <Link to="/api/apply_fair/">Apply for Fair</Link>
          </li>
          <li>
            <Link to="/api/apply_hs_tour/">Apply for HS Tour</Link>
          </li>
          <li>
            <Link to="/api/apply_ind_tour/">Apply for Ind. Tour</Link>
          </li>
          <li>
            <Link to="/api/give_feedback/">Give Feedback</Link>
          </li>
          <li className="active">
            <Link to="/api/contact_us/">Contact Us</Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="contact-us-main-content">
        <header className="contact-us-header">
          <h1>Contact Us</h1>
        </header>
        <div className="contact-us-info-container">
          <h2>Our Advisors</h2>
          {loading && <p>Loading advisors...</p>}
          {error && <p className="error-message">{error}</p>}
          {!loading &&
            !error &&
            advisors.map((advisor, index) => (
              <div key={index} className="contact-card">
                <p>
                  <strong>{advisor.name}</strong>
                </p>
                <p>Advisor</p>
                <p>Email: {advisor.contact_email}</p>
                <p>Phone: {advisor.contact_phone}</p>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default ContactUsPage;
