import React from "react";
import { Link } from "react-router-dom";
import "./ContactUsPage.css";

const ContactUsPage = () => {
  return (
    <div className="contact-us-container">
      {/* Sidebar */}
      <aside className="contact-us-sidebar">
        <h2>Bilkent Information Office System</h2>
        <ul className="contact-us-menu">
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/api/apply_fair/">Apply for Fair</Link>
          </li>
          <li>
            <Link to="/api/apply_hs_tour/">Apply HS Tour</Link>
          </li>
          <li>
            <Link to="/api/apply_ind_tour/">Apply Ind. Tour</Link>
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
          <div className="contact-card">
            <p><strong>Dr. John Smith</strong></p>
            <p>Advisor</p>
            <p>Email: john.smith@example.com</p>
            <p>Phone: +1 123-456-7890</p>
          </div>
          <div className="contact-card">
            <p><strong>Dr. Sarah Johnson</strong></p>
            <p>Advisor</p>
            <p>Email: sarah.johnson@example.com</p>
            <p>Phone: +1 987-654-3210</p>
          </div>
          <div className="contact-card">
            <p><strong>Dr. Michael Brown</strong></p>
            <p>Advisor</p>
            <p>Email: michael.brown@example.com</p>
            <p>Phone: +1 456-789-1234</p>
          </div>
          <div className="contact-card">
            <p><strong>Dr. Emily Davis</strong></p>
            <p>Advisor</p>
            <p>Email: emily.davis@example.com</p>
            <p>Phone: +1 321-654-9876</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUsPage;
