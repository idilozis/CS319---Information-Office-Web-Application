import React from "react";
import { Link } from "react-router-dom";
import "./GiveFeedbackPage.css"; // CSS for this page

const GiveFeedbackPage = () => {
  return (
    <div className="give-feedback-container">
      {/* Sidebar */}
      <aside className="give-feedback-sidebar">
        <h2>Bilkent Information Office System</h2>
        <ul className="give-feedback-menu">
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/api/apply_fair/">Apply for Fair</Link>
          </li>
          <li>
            <Link to="/api/apply_tour/">Apply for Tour</Link>
          </li>
          <li>
            <Link to="/api/apply_hs_tour/">Apply HS Tour</Link>
          </li>
          <li>
            <Link to="/api/apply_ind_tour/">Apply Ind. Tour</Link>
          </li>
          <li className="active">
            <Link to="/api/give_feedback/">Give Feedback</Link>
          </li>
        </ul>
        <footer className="give-feedback-footer">
          <Link to="/contact_us">Contact Us</Link>
        </footer>
      </aside>

      {/* Main Content */}
      <main className="give-feedback-main-content">
        <header className="give-feedback-header">
          <h1>Welcome To IOS</h1>
        </header>
        <div className="give-feedback-form-container">
          <h2>Guest (Counselor) Give Feedback</h2>
          <form>
            <div className="give-feedback-form-group">
              <label htmlFor="name">Name-Surname:</label>
              <input type="text" id="name" placeholder="John Doe" />
            </div>
            <div className="give-feedback-form-group">
              <label htmlFor="city">City/High School:</label>
              <select id="city" defaultValue="">
                <option value="" disabled>
                  Select City
                </option>
                <option>Ankara</option>
                <option>Istanbul</option>
                <option>Izmir</option>
              </select>
              <select id="highschool" defaultValue="">
                <option value="" disabled>
                  Select High School
                </option>
                <option>TED Ankara</option>
                <option>Other High School</option>
              </select>
            </div>
            <div className="give-feedback-form-group">
              <label htmlFor="tour-type">Tour Type:</label>
              <label>
                <input type="checkbox" /> High School
              </label>
              <label>
                <input type="checkbox" /> Individual
              </label>
            </div>
            <div className="give-feedback-form-group">
              <label htmlFor="date">Tour Date:</label>
              <input type="date" id="date" />
            </div>
            <div className="give-feedback-form-group">
              <label htmlFor="feedback">Feedback:</label>
              <textarea
                id="feedback"
                placeholder="Share your feedback here..."
              ></textarea>
            </div>
            <button type="submit" className="give-feedback-submit-button">
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default GiveFeedbackPage;
