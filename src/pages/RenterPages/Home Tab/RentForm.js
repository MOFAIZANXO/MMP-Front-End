import "../../../stylesheets/Renter/Home Tab/RentForm.css";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
import logo from "../../../assets/images/logo.png";

const ApplyForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    numberOfPeople: 1,
    cnicFront: null,
    cnicBack: null,
  });
  const [previews, setPreviews] = useState({ front: null, back: null });
  const [touched, setTouched] = useState({
    name: false,
    contact: false,
    numberOfPeople: false,
    cnicFront: false,
    cnicBack: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission state
  const fileInputFront = useRef(null);
  const fileInputBack = useRef(null);

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
    return name.trim() !== "" && contact.length >= 10 && numberOfPeople >= 1;
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
    type === "front" ? fileInputFront.current.click() : fileInputBack.current.click();
  };

  const handleSubmit = () => {
    if (!isStep1Valid() || !isStep2Valid()) {
      alert("Please complete all steps correctly.");
      return;
    }
    setIsSubmitted(true); // Trigger success animation
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
        return formData.numberOfPeople < 1 ? "At least 1 person required" : null;
      case "cnicFront":
        return !formData.cnicFront ? "CNIC Front is required" : null;
      case "cnicBack":
        return !formData.cnicBack ? "CNIC Back is required" : null;
      default:
        return null;
    }
  };

  // Animation variants for success message
  const successVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.5 } },
  };

  return (
    <div className="apply-form-container">
      <img src={logo} alt="Logo" className="logo-image" />
      <h1 className="heading">Renter Form</h1>
      <p className="subheading">Fill out the form to get started with your rental application!</p>

      <div className="progress-bar-container">
        <div className="progress-bar">
          <div className={`progress-step ${step >= 1 ? "active" : ""}`}>1</div>
          <div className={`progress-step ${step >= 2 ? "active" : ""}`}>2</div>
          <div className={`progress-step ${step >= 3 ? "active" : ""}`}>3</div>
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
                  placeholder="Number of People"
                  value={formData.numberOfPeople}
                  onChange={handleChange}
                  onBlur={() => handleBlur("numberOfPeople")}
                  min="1"
                />
                {getFieldError("numberOfPeople") && (
                  <div className="error-message">{getFieldError("numberOfPeople")}</div>
                )}
              </div>

              <div className="button-container">
                <button className="cancel-button" onClick={handleBack}>
                  Cancel
                </button>
                <button className="next-button" onClick={handleNext} disabled={!isStep1Valid()}>
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

              <div className="button-container">
                <button className="back-button" onClick={handleBack}>
                  Back
                </button>
                <button className="next-button" onClick={handleNext} disabled={!isStep2Valid()}>
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
                  <strong>Number of People:</strong> <span>{formData.numberOfPeople}</span>
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
              <div className="button-container">
                <button className="back-button" onClick={handleBack}>
                  Back
                </button>
                <button className="submit-button" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <AnimatePresence>
          <motion.div
            className="success-message"
            variants={successVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2>🎉 Success!</h2>
            <p>Your application has been submitted successfully.</p>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default ApplyForm;