import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import PropertyManager from './pages/PropertyManagerPages/PropertyManager.js';
import Owner from './pages/OwnerPages/OwnerProfile.js';
import Renter from './pages/RenterPages/Home Tab/Renter.js';
import PropertyDetail from './pages/RenterPages/Home Tab/PropertyDetail.js';
import ApplyForm from './pages/RenterPages/Home Tab/RentForm.js';
import RenterProfile from './pages/RenterPages/Profile Tab/RenterProfile.js';
import OwnerForm from './pages/OwnerPages/PropertyOwnerForm.js';
import RepairForm from './pages/RenterPages/Home Tab/WorkOrderForm.js';
import PmReviewProperty from './pages/PropertyManagerPages/Properties/ReviewProperty.js';
import PmReviewRenter from './pages/PropertyManagerPages/Renters/PmRenterForm.js';
import Vendor from './pages/VendorPages/Vendor.js';
import LandingPage from './pages/Landing'; // Imported as LandingPage
import SignUp from './pages/signup/SignUp';
import Login from './pages/login/Login';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ChatPage from './pages/Chat.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/owner" element={<Owner />} />
          <Route path="/ownerform" element={<OwnerForm />} />
          <Route path="/renter" element={<Renter />} />
          <Route path="/property/:index" element={<PropertyDetail />} />
          <Route path="/renterform" element={<ApplyForm />} />
          <Route path="/repairform" element={<RepairForm />} />
          <Route path="/renterprofile" element={<RenterProfile />} />
          
          <Route path="/property-manager" element={<PropertyManager />} />
          <Route path="/review-property" element={<PmReviewProperty />} />
          <Route path="/PmRenterForm" element={<PmReviewRenter />} />

          <Route path="/vendor" element={<Vendor />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;