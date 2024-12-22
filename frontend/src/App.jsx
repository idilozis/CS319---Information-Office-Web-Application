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
import CoordinatorFairApplications from "./CoordinatorPage/FairApplications/CoordinatorFairApplications";
import AcceptedTours from "./GuidePages/AcceptedTours/AcceptedTours";
import AcceptedToursList from "./CoordinatorPage/AcceptedToursList/acceptedToursList";
import ViewGuideList from "./CoordinatorPage/GuideList/ViewGuideList";
import ViewAdvisorList from "./CoordinatorPage/AdvisorList/ViewAdvisorList";
import ViewFeedback from "./CoordinatorPage/ViewFeedBack/ViewFeedback";
import HighSchoolDatabase from "./CoordinatorPage/Highschool Database/HighSchoolDatabase";
import DirectorDashboard from "./Director Pages/Director Dashboard/DirectorDashboard";
import ViewPuantajPage from "./Director Pages/PuantajPage/ViewPuantajPage";
import D_HighSchoolDatabase from "./Director Pages/Database/HighSchoolDataBase";
import FairApplications_D from "./Director Pages/FairApplications/FairApplications_D";
import AcceptedTours_D from "./Director Pages/AcceptedTours/AcceptedTours_D";
import Feedback_D from "./Director Pages/Feedback_D/Feedback_D";
import Dashboard_p from "./PromotionalCoordinator/Dashboard/Dashboard_p";
import TourApplication_p from "./PromotionalCoordinator/TourApplication_p/TourApplication_p";
import FairApplication_p from "./PromotionalCoordinator/FairApplication_p/FairApplication_p";

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
        <Route path="/api/coordinator_fair_applications/" element={<CoordinatorFairApplications/>} />
        <Route path="/api/accepted_tours/" element={<AcceptedTours/>} />
        <Route path="/api/coordinator_accepted_tours/" element={<AcceptedToursList/>} />
        <Route path="/api/coordinator_view_guide_list/" element={<ViewGuideList/>} />
        <Route path="/api/coordinator_view_advisor_list/" element={<ViewAdvisorList/>} />
        <Route path="/api/coordinator_view_feedback/" element={<ViewFeedback/>} />
        <Route path="/api/coordinator_highschool_database/" element={<HighSchoolDatabase/>} />
        <Route path="/api/director_dashboard/" element={<DirectorDashboard/>} />
        <Route path="/api/director_puantaj_page/" element={<ViewPuantajPage/>} />
        <Route path="/api/director_database/" element={<D_HighSchoolDatabase/>} />
        <Route path="/api/director_fair_applications/" element={<FairApplications_D/>} />
        <Route path="/api/director_accepted_tours/" element={<AcceptedTours_D/>} />
        <Route path="/api/director_feedback/" element={<Feedback_D/>} />
        <Route path="/api/promo_coordinator_dashboard/" element={<Dashboard_p/>} />
        <Route path="/api/promo_coordinator_tour_application/" element={<TourApplication_p/>} />
        <Route path="/api/promo_coordinator_fair_application/" element={<FairApplication_p/>} />
        
      </Routes>
    </Router>
  );
}

export default App;

