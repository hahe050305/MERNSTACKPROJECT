import React, { useState } from 'react';
import './shipment.css'; // Import the CSS file

const BookingForm = () => {
  const [showReceiver, setShowReceiver] = useState(false);

  // Function to show the receiver details
  const showReceiverDetails = () => {
    setShowReceiver(true);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log("Form submitted");
  };

  return (
    <>
      {/* Back button positioned outside of the form container */}
      <button 
        className="back-button" 
        onClick={() => window.history.back()} 
      >
        Back
      </button>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="pickupLocation">Pickup location</label>
          <input type="text" id="pickupLocation" name="pickupLocation" placeholder="Enter pickup location" required />

          <label htmlFor="quantity">Quantity of the load item</label>
          <input type="text" id="quantity" name="quantity" placeholder="Enter quantity" required />

          <label htmlFor="itemDescription">Item Description</label>
          <input type="text" id="itemDescription" name="itemDescription" placeholder="Describe the item" required />

          <label htmlFor="weight">Weight of the Load (kg)</label>
          <input type="number" id="weight" name="weight" placeholder="Enter weight in kg" required />

          <label htmlFor="deliveryLocation">Delivery location (Destination)</label>
          <input type="text" id="deliveryLocation" name="deliveryLocation" placeholder="Enter delivery location" required />

          <label htmlFor="deliveryDate">Delivery date</label>
          <input type="date" id="deliveryDate" name="deliveryDate" required />

          <label htmlFor="preferredDeliveryTime">Preferred Delivery Time</label>
          <input type="time" id="preferredDeliveryTime" name="preferredDeliveryTime" />

          <label htmlFor="modeOfDelivery">Mode of delivery</label>
          <select id="modeOfDelivery" name="modeOfDelivery" required>
            <option value="" disabled selected>Select the mode of transport</option>
            <option value="air">Air</option>
            <option value="land">Land</option>
            <option value="sea">Sea</option>
          </select>

          <label htmlFor="shippingInsurance">Shipping Insurance</label>
          <select id="shippingInsurance" name="shippingInsurance">
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>

          <label htmlFor="paymentMethod">Payment Method</label>
          <select id="paymentMethod" name="paymentMethod" required>
            <option value="" disabled selected>Select a payment method</option>
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bankTransfer">Bank Transfer</option>
          </select>

          <label htmlFor="specialInstructions">Special Instructions</label>
          <textarea id="specialInstructions" name="specialInstructions" rows="3" placeholder="Any additional instructions"></textarea>

          <div className="button-group">
            <button type="button" onClick={showReceiverDetails}>Company Contact Detail</button>
            <button type="submit">Send Request</button>
          </div>
        </form>

        {showReceiver && (
          <div id="receiverDetails">
            <h2>Receiver Details:</h2>
            <label htmlFor="receiverName">Receiver Name</label>
            <input type="text" id="receiverName" name="receiverName" placeholder="Enter receiver name" required />

            <label htmlFor="receiverContact">Receiver Contact</label>
            <input type="text" id="receiverContact" name="receiverContact" placeholder="Enter receiver contact" required />
          </div>
        )}
      </div>
    </>
  );
};

export default BookingForm;
