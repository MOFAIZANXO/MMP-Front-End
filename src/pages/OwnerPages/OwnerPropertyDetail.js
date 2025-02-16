import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faHouseChimney, faToilet, faBed, faKitchenSet } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/images/logo.png";
import room from "../../assets/images/room.png";
import rent from "../../assets/images/rent.png";
import OwnerPropertyImageSlider from "../../components/Owner/OwnerPropertyImageSlider";
import "../../stylesheets/Owner/ownerpropertydetail.css";

const OwnerPropertyDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { property } = state;

  return (
    <div className="ownerPropertyDetail">
        <div className="BackButton-icon" onClick={() => {navigate(-1)}}>
            <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <div className="PropertyCard-div">
            <div className="PropertyCard-head">
                <img src={logo} alt="" className="propertycard-headimg" />
                <h1>Property Details</h1>
            </div>

            <div className="InfoProperty">
                <div className="ownerproperty-headDiv">
                    <FontAwesomeIcon icon={faHouseChimney} className="IconHouse" />
                    <div className="ownerproperty-headDivText">
                        <h2 className="headDiv-h2">{property.name}</h2>
                        <p className="headDiv-p">{property.address}</p>
                    </div>
                </div>
                
                <OwnerPropertyImageSlider images={property.images} />

                <div className="ContainerCards">
                    <div className="CardInfo">
                        <img src={room} alt="" className="RoomImage" />
                        <h4>Room Details</h4>
                        <div className="BathDiv">
                            <FontAwesomeIcon icon={faToilet} className="IconBath" />
                            <p><b>Bathroom:</b> {property.roomDetail.bathrooms}</p>
                        </div>
                        <div className="BedDiv">
                            <FontAwesomeIcon icon={faBed} className="IconBed" />
                            <p><b>Bedroom:</b> {property.roomDetail.bedrooms}</p>
                        </div>
                        <div className="KitchenDiv">
                            <FontAwesomeIcon icon={faKitchenSet} className="IconKitchen" />
                            <p><b>Kitchen:</b> {property.roomDetail.kitchens}</p>
                        </div>
                    </div>

                    <div className="CardInfo RentDiv">
                        <img src={rent} alt="" className="RentImage" />
                        <h4>Rs {property.rent}/month</h4>
                        <p><b>Included:</b>{" "}
                        {property.included 
                            ? property.included.join(", ") 
                            : "No expense included"}
                        </p>
                        {property.included && (
                            <p>
                            <b>Excluded:</b>{" "}
                            {property.excluded.join(", ")}
                            </p>
                        )}
                    </div>
                </div>

                <div className="additionalInfo">
                    <h3>Additional Description</h3>
                    <p>{property.propertyNeighborhood}</p>
                </div>
            </div>

            <div className="lineDiv"></div>

            <div className="RenteeInformation">
                <h3>Rentee Details</h3>
                <p><strong>Name:</strong> {property.currentRentee.name}</p>
                <p><strong>Contact:</strong> {property.currentRentee.contact}</p>
                <p><strong>No. of Residents:</strong> {property.currentRentee.residents}</p>
            </div>
            
            <div className="lineDiv"></div>

            <div className="RentInformation">
                <h3>Rent Information</h3>
                <p className="InfoRent-p1"><strong>Rent Due Date:</strong> {property.rentDueDate}</p>
                <p className="InfoRent-p2">
                    <p className="InfoRent-p3"><strong>Payment Status:</strong>&nbsp;&nbsp;</p>
                    <p 
                        className="InfoRent-p4" 
                        style={{
                            color: property.rentPaid ? "darkgreen" : "rgb(159, 122, 0)",
                            backgroundColor: property.rentPaid ? "lightgreen" : "rgb(255, 245, 192)"
                        }}
                    >
                        {property.rentPaid ? 'Paid' : 'Pending'}
                    </p>
                </p>
            </div>

            <div className="ownerpropertydetail-buttons">
                <button className="applyforRepair-button" onClick={() => navigate("/repairform")}>Home Service Request</button>
                <button className="applyforRepair-button" onClick={() => navigate("/owner")}>Rentee History</button>
            </div>
        </div>
    </div>
  );
};

export default OwnerPropertyDetail;

/*
    Yaar rent ki due date backend pay aisay handle kerni hai kay jaisay hi renter pay keray ga,
    rentPaid jo boolean value hai, wo true ker deni hai or rent ki due date ek month baad ki ker deni hai
*/