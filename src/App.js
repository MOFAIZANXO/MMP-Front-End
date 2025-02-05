import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Admin from './pages/Admin';
import PropertyManager from './pages/PropertyManagerPages/PropertyManager.js';
import Owner from './pages/OwnerPages/OwnerProfile.js';
import Renter from './pages/RenterPages/Home Tab/Renter.js';
import PropertyDetail from './pages/RenterPages/Home Tab/PropertyDetail.js';
import ApplyForm from './pages/RenterPages/Home Tab/RentForm.js';
import RenterProfile from './pages/RenterPages/Profile Tab/RenterProfile.js';
import Vendor from './pages/VendorPages/Vendor.js';
import Landing from './pages/Landing';
import SignUp from './pages/signup/SignUp';
import Login from './pages/login/Login';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/property-manager" element={<PropertyManager />} />
          <Route path="/owner" element={<Owner />} />
          <Route path="/renter" element={<Renter />} />
          <Route path="/property/:index" element={<PropertyDetail />} />
          <Route path="/renterform" element={<ApplyForm />} />
          <Route path="/renterprofile" element={<RenterProfile />} />
          <Route path="/vendor" element={<Vendor />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
