import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import PropertyManager from './pages/PropertyManagerPages/PropertyManager.js';
import Owner from './pages/OwnerPages/OwnerProfile.js';
import Renter from './pages/RenterPages/Home Tab/WorkOrderForm.js';
import Vendor from './pages/VendorPages/Vendor.js';
import LandingPage from './pages/Landing'; // Imported as LandingPage
import SignUp from './pages/signup/SignUp';
import Login from './pages/login/Login';
import PropertyDetail from "./pages/RenterPages/Home Tab/PropertyDetail";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/property-manager" element={<PropertyManager />} />
          <Route path="/owner" element={<Owner />} />
          <Route path="/renter" element={<Renter />} />
          <Route path="/vendor" element={<Vendor />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/property/:index" element={<PropertyDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;