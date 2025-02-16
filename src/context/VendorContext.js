import { createContext, useContext, useState } from 'react';
import PmVendorDummy from '../datasets/PmVendorDummy';

const VendorContext = createContext();

export const VendorProvider = ({ children }) => {
  const [vendorApplications, setVendorApplications] = useState(PmVendorDummy.vendorApplications);
  const [currentVendors, setCurrentVendors] = useState(PmVendorDummy.currentVendors);

  // Approve: Move vendor from applications to current vendors
  const approveVendor = (vendorId) => {
    const vendor = vendorApplications.find((v) => v.id === vendorId);
    if (vendor) {
      setVendorApplications((prev) => prev.filter((v) => v.id !== vendorId));
      setCurrentVendors((prev) => [...prev, { ...vendor, status: "Active" }]);
    }
  };

  // Reject: Delete vendor from applications
  const rejectVendor = (vendorId) => {
    setVendorApplications((prev) => prev.filter((v) => v.id !== vendorId));
  };

  return (
    <VendorContext.Provider
      value={{ vendorApplications, currentVendors, approveVendor, rejectVendor }}
    >
      {children}
    </VendorContext.Provider>
  );
};

export const useVendorContext = () => useContext(VendorContext);