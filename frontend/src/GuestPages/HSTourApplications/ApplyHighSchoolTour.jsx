import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ApplyHighSchoolTour.css";

const ApplyHighSchoolTour = () => {
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

  const handleTimeSlotSelect = (time) => {
    setSelectedTime(time);
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
    minDate.setDate(today.getDate() + 14); // Minimum 2 weeks ahead

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
            <Link to="/">Dashboard</Link>
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
            {/* Existing Data Fields */}
            <div className="apply-hs-tour-form-group">
              <label htmlFor="name">Name-Surname:</label>
              <input type="text" id="name" placeholder="John Doe" />
            </div>
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
            <div className="apply-hs-tour-form-group">
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
            <div className="apply-hs-tour-form-group">
              <label htmlFor="groupHead">Group Head:</label>
              <input type="text" id="groupHead" placeholder="Johnie Doeson" />
            </div>
            <div className="apply-hs-tour-form-group">
              <label htmlFor="contactPhone">Contact Phone:</label>
              <input type="text" id="contactPhone" placeholder="0123 456 78 90" />
            </div>
            <div className="apply-hs-tour-form-group">
              <label htmlFor="contactEmail">Contact Email:</label>
              <input type="email" id="contactEmail" placeholder="johndoe@example.com" />
            </div>
            <div className="apply-hs-tour-form-group">
              <label htmlFor="notes">Additional Notes:</label>
              <textarea
                id="notes"
                placeholder="Requires wheelchair if possible."
              ></textarea>
            </div>

            {/* Calendar Section */}
            <div className="apply-hs-tour-form-group">
              <label htmlFor="tourDate">Select Tour Date (at least 2 weeks ahead):</label>
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
