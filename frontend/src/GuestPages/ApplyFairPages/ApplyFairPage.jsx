import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ApplyFairPage.css";

const ApplyFairPage = () => {
  // City and High School data
  const cityData = {
    Ankara: ["Ankara Fen Lisesi", "TED Ankara College", "Bilkent High School"],
    Istanbul: ["Robert College", "Uskudar American Academy", "Istanbul High School"],
    Izmir: ["Izmir American College", "Bornova Anadolu Lisesi", "Izmir High School"],
  };

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);

  // Handle city selection
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedSchool(""); 
  };

  // Handle high school selection
  const handleSchoolChange = (e) => {
    setSelectedSchool(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setPopupVisible(true); // Show popup
  
    // Clear form fields
    setSelectedCity("");
    setSelectedSchool("");
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("notes").value = "";
  
    setTimeout(() => setPopupVisible(false), 3000); 
  };
  
  return (
    <div className="apply-fair-container">
      {/* Sidebar */}
      <aside className="apply-fair-sidebar">
        <h2>Bilkent Information Office System</h2>
        <ul className="apply-fair-menu">
          <li>
            <a href="/api/guest_dashboard/" className="menu-link">
              Home
            </a>
          </li>
          <li className="active">
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
        </ul>
        <footer className="apply-fair-footer">
          <Link to="/api/contact_us/" className="apply-fair-contact-link">
            Contact Us
          </Link>
        </footer>
      </aside>

      {/* Main Content */}
      <main className="apply-fair-main-content">
        <div className="apply-fair-form-container">
          <h2>Apply for University Fair</h2>
          <form onSubmit={handleSubmit}>
            <div className="apply-fair-form-group">
              <label htmlFor="name">Name-Surname:</label>
              <input type="text" id="name" placeholder="John Doe" required />
            </div>
            <div className="apply-fair-form-group">
              <label htmlFor="email">Contact E-mail:</label>
              <input
                type="email"
                id="email"
                placeholder="johndoe@example.com"
                required
              />
            </div>
            <div className="apply-fair-form-group">
              <label htmlFor="city">City:</label>
              <select
                id="city"
                value={selectedCity}
                onChange={handleCityChange}
                required
              >
                <option value="">Choose a City</option>
                {Object.keys(cityData).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className="apply-fair-form-group">
              <label htmlFor="school">High School Name:</label>
              <select
                id="school"
                value={selectedSchool}
                onChange={handleSchoolChange}
                disabled={!selectedCity}
                required
              >
                <option value="">
                  {selectedCity
                    ? "Choose a High School"
                    : "Select a City First"}
                </option>
                {selectedCity &&
                  cityData[selectedCity].map((school) => (
                    <option key={school} value={school}>
                      {school}
                    </option>
                  ))}
              </select>
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

        {/* Popup Message */}
        {popupVisible && (
          <div className="popup-message">
            Your application has been submitted successfully!
          </div>
        )}
      </main>
    </div>
  );
};

export default ApplyFairPage;
