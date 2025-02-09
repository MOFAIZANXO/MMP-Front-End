const DummyPmProperty = {
  listingRequests: [
    {
      id: 1,
      image: "https://plus.unsplash.com/premium_photo-1661883964999-c1bcb57a7357?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvcGVydGllc3xlbnwwfHwwfHx8MA%3D%3D",
      name: "Bahria Apartments",
      rentRate: "60k this month",
      address: "Islamabad, Bahria Town Block A",
      status: "Pending Review",
      ownerName: "Ali Khan",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvcGVydGllc3xlbnwwfHwwfHx8MA%3D%3D",
      name: "DHA Apartment",
      rentRate: "80k this month",
      address: "Lahore, DHA Phase 5",
      status: "Pending Review",
      ownerName: "Sara Ahmed",
    },
  ],
  currentManaging: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb3BlcnRpZXN8ZW58MHx8MHx8fDA%3D",
      name: "Gulberg Apartment",
      rentRate: "70k this month",
      address: "Lahore, Gulberg Main Boulevard",
      status: "Active",
      ownerName: "Omar Sheikh",
      renterName: "Zain Raza",
      rentStatus: "Paid", // Added rent status
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHByb3BlcnRpZXN8ZW58MHx8MHx8fDA%3D",
      name: "Faisal Town House",
      rentRate: "50k this month",
      address: "Rawalpindi, Faisal Town Block B",
      status: "Active",
      ownerName: "Fatima Bukhari",
      renterName: "Adeel Hussain",
      rentStatus: "Pending", // Added rent status
    },
    // Vacant properties
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb3BlcnRpZXN8ZW58MHx8MHx8fDA%3D",
      name: "Clifton Apartment",
      rentRate: "90k per month",
      address: "Karachi, Clifton Block 2",
      status: "Vacant - Looking for Renters",
      ownerName: "Bilal Khan",
    },
  ],
};

export default DummyPmProperty;