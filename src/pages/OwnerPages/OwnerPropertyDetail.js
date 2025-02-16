import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faHouseChimney, faToilet, faBed, faKitchenSet } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/images/logo.png";
import room from "../../assets/images/room.png";
import OwnerPropertyImageSlider from "../../components/Owner/OwnerPropertyImageSlider";
import "../../stylesheets/Owner/ownerpropertydetail.css";

const OwnerPropertyDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { property } = state;

  return (
    <div className="ownerPropertyDetail">
        <div className="BackButton-icon" onClick={() => {navigate("/renter")}}>
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
                </div>
                <p className="propertyDiv-p"><strong>Included in Rent:</strong> {property.included ? property.included.join(', ') : 'None'}</p>
                <p className="propertyDiv-p"><strong>Description:</strong> {property.propertyNeighborhood}</p>
            </div>

            <div className="InfoRentee">
                <h2>Rentee Details</h2>
                <div className="lineDiv"></div>
                <p><strong>Name:</strong> {property.currentRentee.name}</p>
                <p><strong>Contact:</strong> {property.currentRentee.contact}</p>
                <p><strong>No. of Residents:</strong> {property.currentRentee.residents}</p>
            </div>

            <div className="InfoRent">
                <h2>Rent Information</h2>
                <div className="lineDiv"></div>
                <p><strong>Rent Due Date:</strong> {property.rentDueDate}</p>
                <p><strong>Payment Status:</strong> {property.rentPaid ? 'Paid' : 'Pending'}</p>
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