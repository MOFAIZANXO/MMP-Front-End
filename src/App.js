import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ChatPage from './pages/Chat.js';
import PropertyManager from './pages/PropertyManagerPages/PropertyManager.js';
import Owner from './pages/OwnerPages/OwnerProfile.js';
import Renter from './pages/RenterPages/Home Tab/Renter.js';
import PropertyDetail from './pages/RenterPages/Home Tab/PropertyDetail.js';
import ApplyForm from './pages/RenterPages/Home Tab/RentForm.js';
import RenterProfile from './pages/RenterPages/Profile Tab/RenterProfile.js';
import RepairForm from './pages/RenterPages/Profile Tab/WorkOrderForm.js';
import RentPayment from './pages/RenterPages/Payment.js';
import OwnerProfile from './pages/OwnerPages/OwnerProfile.js';
import OwnerForm from './pages/OwnerPages/PropertyOwnerForm.js';
import PmReviewProperty from './pages/PropertyManagerPages/Properties/ReviewProperty.js';
import PmReviewRenter from './pages/PropertyManagerPages/Renters/PmRenterForm.js';
import Vendor from './pages/VendorPages/Vendor.js';
import LandingPage from './pages/Landing';
import SignUp from './pages/signup/SignUp';
import Login from './pages/login/Login';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/owner" element={<Owner />} />
          <Route path="/ownerprofile" element={<OwnerProfile />} />
          <Route path="/ownerform" element={<OwnerForm />} />
          <Route path="/renter" element={<Renter />} />
          <Route path="/property/:index" element={<PropertyDetail />} />
          <Route path="/renterform" element={<ApplyForm />} />
          <Route path="/renterprofile" element={<RenterProfile />} />
          <Route path="/repairform" element={<RepairForm />} />
          <Route path="/rentpayment" element={<RentPayment />}></Route>          
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