import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndividualTourApplication from "./GuestPages/IndiviudalTourApplication/IndividualTourApplication";

function App() {
  return (
    <Router>
      <Routes>
        {/* Existing routes */}
        <Route path="/" element={<h1>Welcome Home</h1>} />
        <Route path="/about" element={<h1>About Page</h1>} />

        {/* Route for Individual Tour Application */}
        <Route path="/api/apply_ind_tour/" element={<IndividualTourApplication />} />
      </Routes>
    </Router>
  );
}

export default App;
