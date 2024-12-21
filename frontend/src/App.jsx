import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndividualTourApplication from "./GuestPages/IndiviudalTourApplication/IndividualTourApplication";
import ApplyFairPage from "./GuestPages/ApplyFairPages/ApplyFairPage";
import GiveFeedbackPage from "./GuestPages/FeedBackPage/GiveFeedbackPage"; // Import Give Feedback Page
import ApplyHighSchoolTour from "./GuestPages/HSTourApplications/ApplyHighSchoolTour"; // Import Apply HS Tour Page
import ContactUsPage from "./GuestPages/ContactPage/ContactUsPage"; // Import Contact Us Page
import AdvisorDashboard from "./Advisor Pages/Dashboard/AdvisorDashboard"; // Import Advisor Dashboard
import GuideDashboard from "./GuidePages/GuideDashboard/GuideDashboard"; // Import Guide Dashboard
import FairPage from "./Advisor Pages/FairPage/FairPage"
import GuideFairPage from "./GuidePages/FairPage/FairPage"
import TourApplication from "./Advisor Pages/TourApplications/TourApplication";
import GuideList from "./Advisor Pages/GuideList/GuideList";
import Tours from "./Advisor Pages/Tours/Tours";
import PuantajPage from "./Advisor Pages/PuantajPage/PuantajPage"
import Settings from "./Advisor Pages/settings/Settings";
import CoordinatorDashboard from "./CoordinatorPage/Dashboard/CoordinatorDashboard";
import CoordinatorPuantaj from "./CoordinatorPage/Puantaj Page/CoordinatorPuantaj";
import ResponsibleAdvisors from "./GuidePages/ResponsibleAdvisors/ResponsibleAdvisors";
import AcceptedTours from "./GuidePages/AcceptedTours/AcceptedTours";

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
        <Route path="/api/fairs/" element={<FairPage />} />
        <Route path="/api/guide_fairs/" element={<GuideFairPage />} />
        <Route path="/apply-highschool-tour" element={<ApplyHighSchoolTour />} />
        <Route path="/api/tour_application/" element={<TourApplication />} />
        <Route path="/api/guide_list/" element={<GuideList />} />
        <Route path="/api/advisor_tours/" element={<Tours />} />
        <Route path="/api/puantaj_page/" element={<PuantajPage />} />
        <Route path="/api/settings/" element={<Settings/>} />
        <Route path="/api/coordinator_dashboard/" element={<CoordinatorDashboard/>} />
        <Route path="/api/coordinator_puantaj/" element={<CoordinatorPuantaj/>} />
        <Route path="/api/responsible_advisors/" element={<ResponsibleAdvisors/>} />
        <Route path="/api/accepted_tours/" element={<AcceptedTours/>} />
      </Routes>
    </Router>
  );
}

export default App;

