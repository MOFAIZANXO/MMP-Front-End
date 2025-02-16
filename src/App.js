import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { VendorProvider } from './context/VendorContext';
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
import OwnerPropertyDetail from './pages/OwnerPages/OwnerPropertyDetail.js';
import PmProperties from "./pages/PropertyManagerPages/Properties/PmProperties.js";
import PmRenters from "./pages/PropertyManagerPages/Renters/PmRenters";
import PmVendors from "./pages/PropertyManagerPages/Vendors/PmVendors";
import PmWorkorders from "./pages/PropertyManagerPages/WorkOrders/PmWorkorders"; 
import PmProfile from "./pages/PropertyManagerPages/Profile/PmProfile";
import PmReviewProperty from './pages/PropertyManagerPages/Properties/ReviewProperty.js';
import PmReviewRenter from './pages/PropertyManagerPages/Renters/PmRenterForm.js';
import PmVendorForm from './pages/PropertyManagerPages/Vendors/PmVendorForm.js';
import Vendor from './pages/VendorPages/Vendor.js';
import LandingPage from './pages/Landing';
import SignUp from './pages/signup/SignUp';
import Login from './pages/login/Login';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <VendorProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/owner" element={<Owner />} />
            <Route path="/ownerprofile" element={<OwnerProfile />} />
            <Route path="/ownerform" element={<OwnerForm />} />
            <Route path="/ownerpropertydetail/:propertyName" element={<OwnerPropertyDetail />} />
            <Route path="/renter" element={<Renter />} />
            <Route path="/property/:index" element={<PropertyDetail />} />
            <Route path="/renterform" element={<ApplyForm />} />
            <Route path="/renterprofile" element={<RenterProfile />} />
            <Route path="/repairform" element={<RepairForm />} />
            <Route path="/rentpayment" element={<RentPayment />} />          
            <Route path="/property-manager" element={<PropertyManager />}>
              <Route path="pmProperties" element={<PmProperties />} />
              <Route path="pmRenters" element={<PmRenters />} />
              <Route path="pmVendors" element={<PmVendors />} />
              <Route path="pmWorkOrders" element={<PmWorkorders />} />
              <Route path="pmProfile" element={<PmProfile />} />
            </Route>
            <Route path="/review-property" element={<PmReviewProperty />} />
            <Route path="/PmRenterForm" element={<PmReviewRenter />} />
            <Route path="/pm-vendor-form/:id" element={<PmVendorForm />} />
            <Route path="/vendor" element={<Vendor />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </VendorProvider>
  );
}

export default App;