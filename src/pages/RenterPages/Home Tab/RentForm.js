// 1 data file is being used here (look at it to see the necessary data to use)

import "../../../stylesheets/Renter/Home Tab/RentForm.css";
import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaCheckCircle } from 'react-icons/fa';
import logo from "../../../assets/images/logo.png";
import rentRequests from "../../../datasets/rentrequests"; 

const ApplyForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    numberOfPeople: "",
    cnicFront: null,
    cnicBack: null,
    propertyId: null,
  });
  const [previews, setPreviews] = useState({ front: null, back: null });
  const [touched, setTouched] = useState({
    name: false,
    contact: false,
    numberOfPeople: false,
    cnicFront: false,
    cnicBack: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputFront = useRef(null);
  const fileInputBack = useRef(null);
  const navigate = useNavigate();

  const propertyId = new URLSearchParams(window.location.search).get('propertyId');

  const handleNext = () => {
    if (step === 1 && !isStep1Valid()) {
      setTouched({
        ...touched,
        name: true,
        contact: true,
        numberOfPeople: true,
      });
      return;
    }
    if (step === 2 && !isStep2Valid()) {
      setTouched({
        ...touched,
        cnicFront: true,
        cnicBack: true,
      });
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => step > 1 && setStep(step - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "contact" && !/^\d*$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
    setTouched({ ...touched, [name]: true });
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const isStep1Valid = () => {
    const { name, contact, numberOfPeople } = formData;
    return (
      name.trim() !== "" &&
      contact.length >= 10 &&
      Number(numberOfPeople) >= 1
    );
  };

  const isStep2Valid = () => formData.cnicFront && formData.cnicBack;

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, [type]: file });
      setTouched({ ...touched, [type]: true });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews({ ...previews, [type]: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = (type) => {
    if (type === "front") {
      fileInputFront.current.click();
    } else {
      fileInputBack.current.click();
    }
  };

  const handleSubmit = () => {
    if (!isStep1Valid() || !isStep2Valid()) {
      alert("Please complete all steps correctly.");
      return;
    }

    const rentRequest = {
      ...formData,
      propertyId,
      status: "pending",
      type: "rent",
      requestDate: new Date().toISOString(),
    };
    rentRequests.push(rentRequest);

    setIsSubmitted(true);
    console.log("Form Data:", formData);
  };

  const getFieldError = (field) => {
    if (!touched[field]) return null;

    switch (field) {
      case "name":
        return formData.name.trim() === "" ? "Name is required" : null;
      case "contact":
        if (formData.contact.length < 10) return "Contact must be at least 10 digits";
        return null;
      case "numberOfPeople":
        return Number(formData.numberOfPeople) < 1 ? "At least 1 resident is required" : null;
      case "cnicFront":
        return !formData.cnicFront ? "CNIC Front is required" : null;
      case "cnicBack":
        return !formData.cnicBack ? "CNIC Back is required" : null;
      default:
        return null;
    }
  };

  return (
    <div className="apply-form-container">
      <img src={logo} alt="Logo" className="logo-image" />
      <h1 className="heading">Renter Form</h1>
      <p className="subheading">Fill out the form to get started with your rental application!</p>

      <div className="progress-Bar-container">
        <div className="progressBar">
          <div className={`progressStep ${step >= 1 ? "active" : ""}`}>1</div>
          <div className={`progressStep ${step >= 2 ? "active" : ""}`}>2</div>
          <div className={`progressStep ${step >= 3 ? "active" : ""}`}>3</div>
        </div>
      </div>

      {!isSubmitted ? (
        <>
          {step === 1 && (
            <div className="form-step">
              <h2>Step 1: Personal Information</h2>
              <div className={`input-group ${getFieldError("name") ? "error" : ""}`}>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => handleBlur("name")}
                />
                {getFieldError("name") && <div className="error-message">{getFieldError("name")}</div>}
              </div>

              <div className={`input-group ${getFieldError("contact") ? "error" : ""}`}>
                <input
                  type="text"
                  name="contact"
                  placeholder="Contact Number (10+ digits)"
                  value={formData.contact}
                  onChange={handleChange}
                  onBlur={() => handleBlur("contact")}
                  maxLength="13"
                />
                {getFieldError("contact") && <div className="error-message">{getFieldError("contact")}</div>}
              </div>

              <div className={`input-group ${getFieldError("numberOfPeople") ? "error" : ""}`}>
                <input
                  type="number"
                  name="numberOfPeople"
                  placeholder="No. of Residents"
                  value={formData.numberOfPeople}
                  onChange={handleChange}
                  onBlur={() => handleBlur("numberOfPeople")}
                  min="1"
                />
                {getFieldError("numberOfPeople") && (
                  <div className="error-message">{getFieldError("numberOfPeople")}</div>
                )}
              </div>

              <div className="Button-Container">
                <button className="cancelBtn" onClick={() => navigate(-1)}>
                  Cancel
                </button>
                <button className="nextBtn" onClick={handleNext} disabled={!isStep1Valid()}>
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <h2>Step 2: Upload CNIC</h2>
              <p className="upload-subheading">Upload clear images of your CNIC (front and back)</p>

              <div
                className={`file-drop-area ${getFieldError("cnicFront") ? "error-border" : ""}`}
                onClick={() => triggerFileInput("front")}
              >
                <input
                  type="file"
                  ref={fileInputFront}
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "cnicFront")}
                  hidden
                />
                {previews.front ? (
                  <div className="file-preview">
                    <img src={previews.front} alt="CNIC Front Preview" />
                    <span className="replace-text">Click to replace</span>
                  </div>
                ) : (
                  <>
                    <p>Click to upload CNIC Front</p>
                    {getFieldError("cnicFront") && (
                      <div className="error-message">{getFieldError("cnicFront")}</div>
                    )}
                  </>
                )}
              </div>

              <div
                className={`file-drop-area ${getFieldError("cnicBack") ? "error-border" : ""}`}
                onClick={() => triggerFileInput("back")}
              >
                <input
                  type="file"
                  ref={fileInputBack}
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "cnicBack")}
                  hidden
                />
                {previews.back ? (
                  <div className="file-preview">
                    <img src={previews.back} alt="CNIC Back Preview" />
                    <span className="replace-text">Click to replace</span>
                  </div>
                ) : (
                  <>
                    <p>Click to upload CNIC Back</p>
                    {getFieldError("cnicBack") && (
                      <div className="error-message">{getFieldError("cnicBack")}</div>
                    )}
                  </>
                )}
              </div>

              <div className="Button-Container">
                <button className="back-Btn" onClick={handleBack}>
                  Back
                </button>
                <button className="nextBtn" onClick={handleNext} disabled={!isStep2Valid()}>
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-step">
              <h2>Step 3: Review</h2>
              <div className="review-section">
                <p>
                  <strong>Name:</strong> <span>{formData.name}</span>
                </p>
                <p>
                  <strong>Contact:</strong> <span>{formData.contact}</span>
                </p>
                <p>
                  <strong>No. of Residents:</strong> <span>{formData.numberOfPeople}</span>
                </p>

                <p>
                  <strong>CNIC Front:</strong>
                  {formData.cnicFront ? (
                    <img
                      className="review-image"
                      src={URL.createObjectURL(formData.cnicFront)}
                      alt="CNIC Front Preview"
                    />
                  ) : (
                    "Not uploaded"
                  )}
                </p>

                <p>
                  <strong>CNIC Back:</strong>
                  {formData.cnicBack ? (
                    <img
                      className="review-image"
                      src={URL.createObjectURL(formData.cnicBack)}
                      alt="CNIC Back Preview"
                    />
                  ) : (
                    "Not uploaded"
                  )}
                </p>
              </div>
              <div className="Button-Container">
                <button className="back-Btn" onClick={handleBack}>
                  Back
                </button>
                <button className="submit-Btn" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="successScreen">
          <FaCheckCircle className="successIcon" />
          <h2>Your rent request has been sent successfully!</h2>
          <p id="p1">Thanks for contacting MMP! Our agent will reach out to you soon!</p>
          <p id="p2">Have a great day!</p>
          <Link to="/renterprofile" className="continue-button">Continue</Link>
        </div>
      )}
    </div>
  );
};

export default ApplyForm;