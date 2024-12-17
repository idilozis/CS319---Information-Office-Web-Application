import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndividualTourApplication from "./GuestPages/IndiviudalTourApplication/IndividualTourApplication";
import ApplyFairPage from "./GuestPages/ApplyFairPages/ApplyFairPage";
import GiveFeedbackPage from "./GuestPages/FeedBackPage/GiveFeedbackPage"; // Import Give Feedback Page

function App() {
  return (
    <Router>
      <Routes>
        {/* Existing routes */}
        <Route path="/" element={<h1>Welcome Home</h1>} />
        <Route path="/about" element={<h1>About Page</h1>} />

        {/* Route for Individual Tour Application */}
        <Route
          path="/api/apply_ind_tour/"
          element={<IndividualTourApplication />}
        />

        {/* Route for Apply Fair Page */}
        <Route path="/api/apply_fair/" element={<ApplyFairPage />} />

        {/* Route for Give Feedback Page */}
        <Route path="/api/give_feedback/" element={<GiveFeedbackPage />} />
      </Routes>
    </Router>
  );
}

export default App;
