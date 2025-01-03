import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ApplyHighSchoolTour.css";
import axios from "axios";

const ApplyHighSchoolTour = () => {
  const [selectedTime, setSelectedTime] = useState("");
  const [capacity, setCapacity] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({});
  const [cities, setCities] = useState([]);
  const [highSchools, setHighSchools] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedHighSchool, setSelectedHighSchool] = useState("");
  const [popupVisible, setPopupVisible] = useState(false); 

  useEffect(() => {
    axios
      .get("/api/cities/")
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => console.error("Error fetching cities:", error));
  }, []);

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);

    axios
      .get(`/api/highschools/${city}/`)
      .then((response) => setHighSchools(response.data))
      .catch((error) => console.error("Error fetching high schools:", error));
  };

  const timeSlots = [
    { time: "8:30-10:30", status: "free" },
    { time: "10:30-12:30", status: "free" },
    { time: "13:30-15:30", status: "free" },
    { time: "15:30-17:30", status: "free" },
  ];

  const handleTimeSlotSelect = (time) => setSelectedTime(time);

  const handleCapacityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 180) {
      setErrors((prev) => ({ ...prev, capacity: "Capacity cannot exceed 180." }));
    } else if (value < 0) {
      setErrors((prev) => ({ ...prev, capacity: "Capacity cannot be negative." }));
    } else {
      setCapacity(value);
      setErrors((prev) => ({ ...prev, capacity: "" }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!errors.capacity && !errors.date) {
      const formData = {
        counselor_name: document.getElementById("name").value,
        capacity: capacity,
        highschool: selectedHighSchool,
        contact_phone: document.getElementById("contactPhone").value,
        contact_email: document.getElementById("contactEmail").value,
        additional_notes: document.getElementById("notes").value,
        date: date,
        time_slot: selectedTime,
      };

      try {
        const response = await axios.post("/api/submit_tour/", formData, {
          headers: { "Content-Type": "application/json" },
        });
  
        if (response.status === 201) {
          setPopupVisible(true); 
          setTimeout(() => setPopupVisible(false), 3000); 
  
       
          setSelectedCity("");
          setSelectedHighSchool("");
          setCapacity("");
          setDate("");
          setSelectedTime("");
          document.getElementById("name").value = "";
          document.getElementById("contactPhone").value = "";
          document.getElementById("contactEmail").value = "";
          document.getElementById("notes").value = "";
        }
      } catch (error) {
        alert("An error occurred. Please try again.");
      }
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
            <a href="/api/guest_dashboard/" className="menu-link">
              Home
            </a>
          </li>
          <li>
            <Link to="/api/apply_fair/">Apply for Fair</Link>
          </li>
          <li className="active">
            <Link to="/api/apply_hs_tour/">Apply for HS Tour</Link>
          </li>
          <li>
            <Link to="/api/apply_ind_tour/">Apply for Ind. Tour</Link>
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
              <label htmlFor="capacity">Capacity (max 180):</label>
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
                {cities.map((city, index) => (
                  <option key={index} value={city}>
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

      {/* Popup Message */}
      {popupVisible && (
        <div className="popup-message">
          Form submitted successfully!
        </div>
      )}
    </div>
  );
};

export default ApplyHighSchoolTour;
