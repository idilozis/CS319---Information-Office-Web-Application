import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ApplyHighSchoolTour.css";

const ApplyHighSchoolTour = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [highSchools, setHighSchools] = useState([]);
  const [selectedHighSchool, setSelectedHighSchool] = useState(""); // Added for high school selection
  const [selectedTime, setSelectedTime] = useState("");
  const [capacity, setCapacity] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({});

  const timeSlots = [
    { time: "8:30-9:30", status: "busy" },
    { time: "9:30-10:30", status: "free" },
    { time: "10:30-11:30", status: "moderate" },
    { time: "11:30-12:30", status: "free" },
  ];

  const cityHighSchoolMapping = {
    Ankara: ["TED Ankara", "Ankara Science High School", "Gazi High School"],
    Istanbul: ["Galatasaray High School", "Istanbul Science High School"],
    Izmir: ["Izmir American College", "Izmir Science High School"],
  };

  const handleTimeSlotSelect = (time) => {
    setSelectedTime(time);
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    setHighSchools(cityHighSchoolMapping[city] || []);
    setSelectedHighSchool(""); // Reset high school selection
  };

  const handleCapacityChange = (e) => {
    const value = e.target.value;
    if (value <= 60) {
      setCapacity(value);
      setErrors((prev) => ({ ...prev, capacity: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        capacity: "Capacity cannot exceed 60.",
      }));
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    const minDate = new Date();
    minDate.setDate(today.getDate() + 14);

    if (selectedDate >= minDate) {
      setDate(e.target.value);
      setErrors((prev) => ({ ...prev, date: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        date: "Date must be at least 2 weeks in the future.",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors.capacity && !errors.date) {
      alert("Form submitted successfully!");
    } else {
      alert("Please fix the validation errors before submitting.");
    }
  };

  return (
    <div className="apply-hs-tour-container">
      {/* Sidebar */}
      <aside className="apply-hs-tour-sidebar">
        <h2>Bilkent Information Office System</h2>
        <ul className="apply-hs-tour-menu">
          <li>
            {/* Replaced Link with a standard <a> tag for server-side navigation */}
            <a href="/api/guest_dashboard/" className="menu-link">Home</a>
          </li>
          <li>
            <Link to="/api/apply_fair/">Apply for Fair</Link>
          </li>
          <li className="active">
            <Link to="/api/apply_hs_tour/">Apply HS Tour</Link>
          </li>
          <li>
            <Link to="/api/apply_ind_tour/">Apply Ind. Tour</Link>
          </li>
          <li>
            <Link to="/api/give_feedback/">Give Feedback</Link>
          </li>
        </ul>
        <footer className="apply-hs-tour-footer">
          <Link to="/api/contact_us/">Contact Us</Link>
        </footer>
      </aside>

      {/* Main Content */}
      <main className="apply-hs-tour-main-content">
        <header className="apply-hs-tour-header">
          <h1>Apply High School Tour</h1>
        </header>
        <div className="apply-hs-tour-form-container">
          <form onSubmit={handleSubmit}>
            {/* Name-Surname */}
            <div className="apply-hs-tour-form-group">
              <label htmlFor="name">Name-Surname:</label>
              <input type="text" id="name" placeholder="John Doe" />
            </div>

            {/* Capacity */}
            <div className="apply-hs-tour-form-group">
              <label htmlFor="capacity">Capacity (max 60):</label>
              <input
                type="number"
                id="capacity"
                placeholder="50"
                value={capacity}
                onChange={handleCapacityChange}
              />
              {errors.capacity && (
                <p style={{ color: "red", fontSize: "0.9rem" }}>
                  {errors.capacity}
                </p>
              )}
            </div>

            {/* City */}
            <div className="apply-hs-tour-form-group">
              <label htmlFor="city">City:</label>
              <select id="city" value={selectedCity} onChange={handleCityChange}>
                <option value="" disabled>
                  Choose City
                </option>
                {Object.keys(cityHighSchoolMapping).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* High School */}
            <div className="apply-hs-tour-form-group">
              <label htmlFor="highschool">High School:</label>
              <select
                id="highschool"
                value={selectedHighSchool}
                onChange={(e) => setSelectedHighSchool(e.target.value)}
                disabled={!selectedCity}
              >
                <option value="" disabled>
                  Choose High School
                </option>
                {highSchools.map((school, index) => (
                  <option key={index} value={school}>
                    {school}
                  </option>
                ))}
              </select>
            </div>

            {/* Group Head */}
            <div className="apply-hs-tour-form-group">
              <label htmlFor="groupHead">Group Head:</label>
              <input type="text" id="groupHead" placeholder="Johnie Doeson" />
            </div>

            {/* Contact Phone */}
            <div className="apply-hs-tour-form-group">
              <label htmlFor="contactPhone">Contact Phone:</label>
              <input type="text" id="contactPhone" placeholder="0123 456 78 90" />
            </div>

            {/* Contact Email */}
            <div className="apply-hs-tour-form-group">
              <label htmlFor="contactEmail">Contact Email:</label>
              <input
                type="email"
                id="contactEmail"
                placeholder="johndoe@example.com"
              />
            </div>

            {/* Notes */}
            <div className="apply-hs-tour-form-group">
              <label htmlFor="notes">Additional Notes:</label>
              <textarea
                id="notes"
                placeholder="Requires wheelchair if possible."
              ></textarea>
            </div>

            {/* Calendar Section */}
            <div className="apply-hs-tour-form-group">
              <label htmlFor="tourDate">Select Tour Date:</label>
              <input
                type="date"
                id="tourDate"
                value={date}
                onChange={handleDateChange}
              />
              {errors.date && (
                <p style={{ color: "red", fontSize: "0.9rem" }}>{errors.date}</p>
              )}
            </div>

            {/* Time Slot Section */}
            <div className="apply-hs-tour-form-group">
              <label>Select Time Slot:</label>
              <div className="time-slot-container">
                {timeSlots.map((slot, index) => (
                  <div
                    key={index}
                    className={`time-slot ${slot.status} ${
                      selectedTime === slot.time ? "selected" : ""
                    }`}
                    onClick={() => handleTimeSlotSelect(slot.time)}
                    style={{ cursor: "pointer" }}
                  >
                    {slot.time}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="apply-hs-tour-submit-button">
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ApplyHighSchoolTour;
