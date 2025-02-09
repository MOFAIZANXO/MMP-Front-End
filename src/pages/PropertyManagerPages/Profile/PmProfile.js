import React, { useState } from "react";
import "../../../stylesheets/PropertyManager/PmProfile.css";

const PmProfile = () => {
  // State for profile data
  const [profile, setProfile] = useState({
    name: "John Doe",
    password: "johndoe123",
    phone: "123-456-7890",
    address: "123 Main St, City, Country",
    bio: "Experienced property manager with a focus on tenant satisfaction and property maintenance.",
    image: "https://via.placeholder.com/150", // Default image
  });

  // State to toggle edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle profile picture upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Toggle edit mode
  const toggleEdit = () => setIsEditing(!isEditing);

  return (
    <div className="PM_profiles">
      <div className="PM_profile-container">
        {/* Profile Picture Section with Hover Edit */}
        <div className="PM_profile-picture">
          <label htmlFor="imageUpload" className="PM_profile-edit-overlay">
            Edit
          </label>
          <img src={profile.image} alt="Profile" className="PM_profile-img" />
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageUpload}
            className="PM_file-input"
          />
        </div>

        {/* Profile Information Section */}
        <div className="PM_profile-info">
          {Object.keys(profile).map((key) =>
            key !== "image" ? (
              <div className="PM_profile-field" key={key}>
                <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                {isEditing ? (
                  <input type="text" name={key} value={profile[key]} onChange={handleChange} />
                ) : (
                  <p>{profile[key]}</p>
                )}
              </div>
            ) : null
          )}
        </div>

        {/* Edit/Save Profile Button */}
        <button className="PM_profile-edit-button" onClick={toggleEdit}>
          {isEditing ? "Save Profile" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default PmProfile;
