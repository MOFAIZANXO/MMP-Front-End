import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Admin from './pages/Admin';
import PropertyManager from './pages/PropertyManager';
<<<<<<< HEAD
import Owner from './pages/OwnerPages/OwnerProfile.js';
import Renter from './pages/RenterPages/Renter';
=======
import Owner from './pages/Owner';
import Renter from './pages/RenterPages/Home Tab/Renter';
>>>>>>> d2d11d481dbaddb58c4e5f7642e1de723ad57dbf
import Vendor from './pages/Vendor';
import Landing from './pages/Landing';
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
          <Route path="/" element={<Landing />} />
          <Route path="/admin" element={<Admin />} />
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
