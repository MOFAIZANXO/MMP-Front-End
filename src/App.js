import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Admin from './pages/Admin';
import PropertyManager from './pages/PropertyManager';
import Owner from './pages/Owner';
import Renter from './pages/Renter';
import Vendor from './pages/Vendor';
import Landing from './pages/Landing';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
