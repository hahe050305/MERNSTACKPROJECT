// CompanySearch.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './company_search.css';

const servicesList = [
  { id: 1, name: 'Logistics', image: '/images/logistics.jpg', description: 'Our logistics service ensures timely and safe transport of goods across the globe, leveraging a strong network and advanced technology.' },
  { id: 2, name: 'Warehousing', image: '/images/warehouse.jpg', description: 'Our warehousing solutions offer secure, temperature-controlled storage with real-time inventory tracking and 24/7 access.' },
  { id: 3, name: 'Delivery', image: '/images/delivery.jpg', description: 'We provide prompt and reliable delivery services tailored to meet customer needs, ensuring every package arrives on time.' },
  { id: 4, name: 'Inventory Management', image: '/images/inventory.jpg', description: 'Our inventory management system optimizes stock levels and reduces wastage, providing efficient supply chain support.' },
  { id: 5, name: 'Supply Chain Optimization', image: '/images/supplychain.jpg', description: 'We enhance supply chain efficiency, reducing costs and improving time-to-market with customized optimization strategies.' },
];

const companyList = [
  { id: 1, name: 'DHL', image: '/images/dhl.jpg', rating: 4, location: 'New York, USA' },
  { id: 2, name: 'FM Logistics', image: '/images/fm_logistics.jpg', rating: 5, location: 'Paris, France' },
  { id: 3, name: 'Delhivery', image: '/images/delhivery.jpg', rating: 3, location: 'Mumbai, India' },
  { id: 4, name: 'Blue Dart', image: '/images/blue_dart.jpg', rating: 4.5, location: 'Bangalore, India' },
  { id: 5, name: 'Safe Xpress', image: '/images/safeexpress.jpg', rating: 4.2, location: 'Dubai, UAE' },
  { id: 6, name: 'Gati', image: '/images/gati.jpg', rating: 5, location: 'Singapore' },
];

const CompanySearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedRating, setSelectedRating] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log("CompanySearch component mounted");
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowDropdown(value.length > 0);
  };

  const handleRatingChange = (e) => {
    setSelectedRating(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchQuery) {
      navigate('/company_details');
    }
  };

  const handleServiceClick = (service) => {
    setServiceDescription(service.description);
  };

  const filteredCompanies = companyList.filter((company) => {
    const matchesRating = selectedRating ? Math.floor(company.rating) === parseInt(selectedRating) : true;
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRating && matchesSearch;
  });

  const handleDropdownSelect = (company) => {
    navigate('/company_details');
  };

  return (
    <div className="company-search-container">
      <button className="back-button" onClick={() => window.location.href='/'}>Back</button>

      <div className="background-image">
        <h1 className="heading">Company Authentication</h1>
        <div className="search-container">
          <div className="search-bar-wrapper">
            <input
              type="text"
              className="search-bar"
              placeholder="Search for a Company..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
            <select className="rating-filter" value={selectedRating} onChange={handleRatingChange}>
              <option value="">Ratings</option>
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>{`${rating} Stars`}</option>
              ))}
            </select>
            <span className="search-icon">&#128269;</span>
          </div>
          {showDropdown && (
            <ul className="dropdown">
              {filteredCompanies.map((company) => (
                <li key={company.id} className="dropdown-item" onClick={() => handleDropdownSelect(company)}>
                  <img src={company.image} alt={company.name} className="dropdown-image" />
                  <span>{company.name}</span>
                  <span className="company-location">{company.location}</span>
                  <span className="company-rating">{`Rating: ${'★'.repeat(Math.floor(company.rating))}`}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="services-container">
          <div className="services-static">
            {servicesList.map((service) => (
              <div className="service-item" key={service.id} onClick={() => handleServiceClick(service)}>
                <button className="service-button">{service.name}</button>
                <img src={service.image} alt={service.name} className="service-image" />
              </div>
            ))}
          </div>
        </div>

        {serviceDescription && (
          <div className="service-description-container">
            <p className="service-description">{serviceDescription}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanySearch;
