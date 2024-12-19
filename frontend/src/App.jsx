import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndividualTourApplication from "./GuestPages/IndiviudalTourApplication/IndividualTourApplication";
import ApplyFairPage from "./GuestPages/ApplyFairPages/ApplyFairPage";
import GiveFeedbackPage from "./GuestPages/FeedBackPage/GiveFeedbackPage"; // Import Give Feedback Page
import ApplyHighSchoolTour from "./GuestPages/HSTourApplications/ApplyHighSchoolTour"; // Import Apply HS Tour Page
import ContactUsPage from "./GuestPages/ContactPage/ContactUsPage"; // Import Contact Us Page
import AdvisorDashboard from "./AdvisorPages/Dashboard/AdvisorDashboard"; // Import Advisor Dashboard
import GuideDashboard from "./GuidePages/GuideDashboard/GuideDashboard"; // Import Guide Dashboard

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

        {/* Route for Apply High School Tour */}
        <Route path="/api/apply_hs_tour/" element={<ApplyHighSchoolTour />} />

        {/* Route for Give Feedback Page */}
        <Route path="/api/give_feedback/" element={<GiveFeedbackPage />} />

        {/* Route for Contact Us Page */}
        <Route path="/api/contact_us/" element={<ContactUsPage />} />

        {/* New Route for Advisor Dashboard */}
        <Route path="/api/advisor_dashboard/" element={<AdvisorDashboard />} />

        {/* New Route for Guide Dashboard */}
        <Route path="/api/guide_dashboard/" element={<GuideDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

