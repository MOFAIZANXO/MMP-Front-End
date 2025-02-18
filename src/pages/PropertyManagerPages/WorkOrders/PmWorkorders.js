import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../../../stylesheets/PropertyManager/PmWorkorders.css";

const PmWorkorderDummy = {
  newWorkorders: [
    {
      id: 1,
      propertyName: "City Heights",
      location: "Karachi, Sindh",
      workorderNumber: "WO-002",
      requestedBy: "Renter",
      date: "2023-08-02",
      vendorType: "Plumber",
      description: "Bathroom pipe leakage",
      issueImage:
        "https://www.thespruce.com/thmb/OO8Atcd9Hoy5m5K8wKXmMXUBwCY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/SPR-wire-connection-problems-and-solutions-1152877-hero_30062-22e3d3deac834e8b809b757af5be5fce.jpg", // Replace with actual issue image URL
    },
  ],
  currentWorkorders: [],
};

const WorkorderCard = ({ workorder, onIssue }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`workorder-card ${isHovered || isExpanded ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className={`workorder-header ${isExpanded ? "expanded" : ""}`}>
        <h3>{workorder.propertyName}</h3>
        <p className="location">{workorder.location}</p>
      </div>

      <div className="workorder-meta">
        <span>WO#: {workorder.workorderNumber}</span>
        <span>Requested by: {workorder.requestedBy}</span>
        <span>Date: {workorder.date}</span>
        <span className="vendor-type">Vendor Type: {workorder.vendorType}</span>
      </div>

      {(isHovered || isExpanded) && (
        <>
          {workorder.issueImage && (
            <img
              src={workorder.issueImage}
              alt="Issue"
              className="workorder-image"
            />
          )}

          <div className="workorder-actions">
            <p className="description">{workorder.description}</p>
            <div className="action-links">
              <span className="action-link">Contact Owner</span>
              <span
                className="action-link"
                onClick={(e) => {
                  e.stopPropagation();
                  onIssue(workorder.id);
                }}
              >
                Issue Workorder
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const PmWorkorders = () => {
  const [activeTab, setActiveTab] = useState("New");
  const [searchTerm, setSearchTerm] = useState("");
  const [workorders, setWorkorders] = useState(PmWorkorderDummy);

  const handleIssueWorkorder = (workorderId) => {
    const workorder = workorders.newWorkorders.find((wo) => wo.id === workorderId);
    setWorkorders((prev) => ({
      newWorkorders: prev.newWorkorders.filter((wo) => wo.id !== workorderId),
      currentWorkorders: [...prev.currentWorkorders, workorder],
    }));
  };

  const filteredWorkorders =
    activeTab === "New"
      ? workorders.newWorkorders
      : workorders.currentWorkorders;

  return (
    <div className="PM_workorders">
      <div className="sub-nav">
        <button
          className={activeTab === "New" ? "active" : ""}
          onClick={() => setActiveTab("New")}
        >
          New Workorders ({workorders.newWorkorders.length})
        </button>
        <button
          className={activeTab === "Current" ? "active" : ""}
          onClick={() => setActiveTab("Current")}
        >
          Current Workorders ({workorders.currentWorkorders.length})
        </button>
      </div>

      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by Workorder ID or Property Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="workorders-list">
        {filteredWorkorders.map((workorder) => (
          <WorkorderCard
            key={workorder.id}
            workorder={workorder}
            onIssue={handleIssueWorkorder}
          />
        ))}
      </div>
    </div>
  );
};

export default PmWorkorders;