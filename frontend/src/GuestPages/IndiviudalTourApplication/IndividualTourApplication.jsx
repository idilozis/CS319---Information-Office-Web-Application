import React from "react";
import "./IndividualTourApplication.css";

const IndividualTourApplication = () => {
  return (
    <div className="individual-tour-application-container">
      <aside className="individual-tour-application-sidebar">
        <h2>Bilkent Information Office System</h2>
        <ul className="individual-tour-application-menu">
          <li>Dashboard</li>
          <li>Apply for fair</li>
          <li>Apply for tour</li>
          <li>Apply HS Tour</li>
          <li className="active">Apply Ind. Tour</li>
          <li>Give Feedback</li>
        </ul>
      </aside>
      <main className="individual-tour-application-main-content">
        <header className="individual-tour-application-header">
          <h1>Welcome To IOS</h1>
        </header>
        <div className="individual-tour-application-form-container">
          <h2>Apply Individual Tour</h2>
          <form>
            <div className="individual-tour-application-form-group">
              <label htmlFor="name">Name-Surname:</label>
              <input type="text" id="name" placeholder="John Doe" />
            </div>
            <div className="individual-tour-application-form-group">
              <label htmlFor="city">City/High School:</label>
              <select id="city">
                <option>Ankara</option>
                <option>Istanbul</option>
                <option>Izmir</option>
              </select>
              <select id="highschool">
                <option>TED Ankara</option>
                <option>Other High School</option>
              </select>
            </div>
            <div className="individual-tour-application-form-group">
              <label htmlFor="phone">Contact Phone:</label>
              <input type="text" id="phone" placeholder="0123 456 78 90" />
            </div>
            <div className="individual-tour-application-form-group">
              <label htmlFor="email">Contact e-mail:</label>
              <input type="email" id="email" placeholder="johndoe@example.com" />
            </div>
            <div className="individual-tour-application-form-group">
              <label htmlFor="major">Major of interest:</label>
              <input
                type="text"
                id="major"
                placeholder="I am interested in Computer Science and technology."
              />
            </div>
            <div className="individual-tour-application-form-group">
              <label htmlFor="notes">Additional notes:</label>
              <textarea
                id="notes"
                placeholder="Requires a guide who knows sign language if possible."
              ></textarea>
            </div>
            <button
              type="submit"
              className="individual-tour-application-submit-button"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};
export default IndividualTourApplication;
