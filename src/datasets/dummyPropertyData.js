const dummyPropertyData = {
  ownerName: "John Doe",
  contactNumber: "123-456-7890",
  cnic: "12345-6789012-3",
  propertyName: "Luxury Apartment",
  province: "Punjab",
  address: "123 Street, Lahore",
  expectedRent: "50,000 PKR",
  includedUtilities: {
    electricity: true,
    water: true,
    gas: false,
    internet: true,
  },
  rooms: 3,
  bathrooms: 2,
  kitchens: 1,
  description: "A beautiful and spacious apartment in the heart of Lahore.",
  files: [
    {
      file: { name: "property-image-1.jpg", type: "image/jpeg" },
      preview: "https://via.placeholder.com/150",
    },
    {
      file: { name: "property-document.pdf", type: "application/pdf" },
      preview: "",
    },
  ],
};

export default dummyPropertyData;
