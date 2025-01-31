import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Admin from './pages/Admin';
import PropertyManager from './pages/PropertyManager';
import Owner from './pages/OwnerPages/OwnerProfile.js';
import Renter from './pages/RenterPages/Renter';
import Vendor from './pages/Vendor';
import Landing from './pages/Landing';
import SignUp from './pages/signup/SignUp';
import Login from './pages/login/Login';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
