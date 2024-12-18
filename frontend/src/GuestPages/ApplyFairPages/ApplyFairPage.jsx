import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./ApplyFairPage.css"; // Import the corresponding CSS file

const ApplyFairPage = () => {
  return (
    <div className="apply-fair-container">
      {/* Sidebar */}
      <aside className="apply-fair-sidebar">
        <h2>Bilkent Information Office System</h2>
        <ul className="apply-fair-menu">
          <li>
          <a href="/api/guest_dashboard/" className="menu-link">Home</a>
          </li>
          <li className="active">
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
        </ul>
        <footer className="apply-fair-footer">
          {/* Updated Contact Us link for consistency */}
          <Link to="/api/contact_us/" className="apply-fair-contact-link">
            Contact Us
          </Link>
        </footer>
      </aside>

      {/* Main Content */}
      <main className="apply-fair-main-content">
        <header className="apply-fair-header">
          <h1>Welcome To IOS</h1>
        </header>
        <div className="apply-fair-form-container">
          <h2>Apply for University Fair</h2>
          <form>
            <div className="apply-fair-form-group">
              <label htmlFor="name">Name-Surname:</label>
              <input type="text" id="name" placeholder="John Doe" />
            </div>
            <div className="apply-fair-form-group">
              <label htmlFor="email">Contact E-mail:</label>
              <input type="email" id="email" placeholder="johndoe@example.com" />
            </div>
            <div className="apply-fair-form-group">
              <label htmlFor="school">High School Name:</label>
              <input type="text" id="school" placeholder="Your High School" />
            </div>
            <div className="apply-fair-form-group">
              <label htmlFor="notes">Additional Notes:</label>
              <textarea
                id="notes"
                placeholder="Add any additional information here."
              ></textarea>
            </div>
            <button type="submit" className="apply-fair-submit-button">
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ApplyFairPage;
