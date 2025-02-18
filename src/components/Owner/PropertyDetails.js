import React from 'react';
import '../../stylesheets/Owner/propertydetails.css';

const PropertyDetails = ({
  propertyName,
  setPropertyName,
  province,
  setProvince,
  city,
  setCity,
  address,
  setAddress,
  expectedRent,
  setExpectedRent,
  includedUtilities,
  setIncludedUtilities,
  rooms,
  setRooms,
  bathrooms,
  setBathrooms,
  kitchens,
  setKitchens,
  propertyNeighborhood,
  setPropertyNeighborhood,
  files,
  setFiles,
  touched,
  setTouched,
  isPage2Valid,
  setPage,
  handleBack,
}) => {
  const provinceCities = {
    Punjab: [
      'Lahore', 'Faisalabad', 'Rawalpindi', 'Multan', 'Gujranwala', 'Sialkot', 'Bahawalpur', 'Sargodha', 'Sheikhupura', 'Jhelum',
      'Rahim Yar Khan', 'Kasur', 'Sahiwal', 'Okara', 'Mianwali', 'Hafizabad', 'Attock', 'Bhakkar', 'Chiniot', 'Dera Ghazi Khan',
      'Gujrat', 'Jhang', 'Khushab', 'Mandi Bahauddin', 'Narowal', 'Pakpattan', 'Toba Tek Singh', 'Vehari', 'Wah Cantonment',
      'Muzaffargarh', 'Khanewal', 'Lodhran', 'Nankana Sahib', 'Chakwal', 'Talagang', 'Jauharabad', 'Kamoke', 'Muridke', 'Gojra',
      'Hasilpur', 'Kabirwala', 'Kot Addu', 'Mailsi', 'Pattoki', 'Renala Khurd', 'Sadiqabad', 'Sambrial', 'Taxila', 'Zafarwal',
    ],
    Sindh: [
      'Karachi', 'Hyderabad', 'Sukkur', 'Larkana', 'Nawabshah', 'Mirpur Khas', 'Thatta', 'Jacobabad', 'Shikarpur', 'Khairpur',
      'Badin', 'Dadu', 'Ghotki', 'Jamshoro', 'Kamber Shahdadkot', 'Kashmore', 'Matiari', 'Qambar Shahdadkot', 'Sanghar', 'Shahbandar',
      'Tando Allahyar', 'Tando Muhammad Khan', 'Umerkot', 'Tharparkar', 'Naushahro Feroze', 'Shaheed Benazirabad', 'Sujawal', 'Hala',
      'Kotri', 'Moro', 'Naushahro Feroze', 'Rohri', 'Sehwan', 'Tando Adam', 'Ubauro', 'Warah',
    ],
    KPK: [
      'Peshawar', 'Abbottabad', 'Mardan', 'Swat', 'Nowshera', 'Kohat', 'Bannu', 'Charsadda', 'Haripur', 'Mansehra',
      'Swabi', 'Dera Ismail Khan', 'Karak', 'Battagram', 'Buner', 'Chitral', 'Hangu', 'Kohistan', 'Lakki Marwat', 'Lower Dir',
      'Malakand', 'Shangla', 'Tank', 'Upper Dir', 'Timergara', 'Tordher', 'Shabqadar', 'Takht Bhai', 'Topi', 'Batkhela',
      'Jamrud', 'Landi Kotal', 'Parachinar', 'Hangu', 'Daggar', 'Kulachi', 'Lakki', 'Tangi', 'Zaida',
    ],
    Balochistan: [
      'Quetta', 'Gwadar', 'Turbat', 'Khuzdar', 'Chaman', 'Sibi', 'Loralai', 'Zhob', 'Dera Bugti', 'Ziarat',
      'Usta Muhammad', 'Kalat', 'Mastung', 'Nushki', 'Panjgur', 'Qila Saifullah', 'Kharan', 'Washuk', 'Awaran', 'Barkhan',
      'Dera Murad Jamali', 'Harnai', 'Kech', 'Kohlu', 'Lasbela', 'Musakhel', 'Pishin', 'Qila Abdullah', 'Sherani', 'Sohbatpur',
      'Turbat', 'Ziarat', 'Duki', 'Jaffarabad', 'Jhal Magsi', 'Lehri', 'Sibi', 'Sohbatpur',
    ],
    Gilgit: [
      'Gilgit', 'Skardu', 'Hunza', 'Astore', 'Ghizer', 'Nagar', 'Ghanche', 'Shigar', 'Kharmang', 'Diamer',
      'Gupis-Yasin', 'Ishkoman', 'Roundu', 'Khaplu', 'Minimerg', 'Punial', 'Thak', 'Yasin',
    ],
    Kashmir: [
      'Muzaffarabad', 'Mirpur', 'Rawalakot', 'Kotli', 'Bagh', 'Bhimber', 'Hattian Bala', 'Haveli', 'Neelum', 'Palandri',
      'Sudhnati', 'Athmuqam', 'Chikar', 'Dhirkot', 'Forward Kahuta', 'Hajira', 'Khuiratta', 'Mangla', 'Sehnsa', 'Tattapani',
    ],
  };

  const handleUtilityChange = (utility) => {
    setIncludedUtilities((prev) => ({ ...prev, [utility]: !prev[utility] }));
  };

  const isValidFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    return validTypes.includes(file.type) && file.size <= 50 * 1024 * 1024;
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files)
      .filter((file) => isValidFile(file))
      .map((file) => {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
          reader.onload = () => resolve({ file, preview: reader.result });
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

    Promise.all(newFiles).then((results) => {
      setFiles((prev) => [...prev, ...results]);
      setTouched({ ...touched, files: true });
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files)
      .filter((file) => isValidFile(file))
      .map((file) => ({ file, preview: URL.createObjectURL(file) }));

    setFiles((prev) => [...prev, ...newFiles]);
    setTouched({ ...touched, files: true });
  };

  const removeFile = (index) => {
    URL.revokeObjectURL(files[index].preview);
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNumberChange = (setter) => (e) => {
    const value = e.target.value.trim();
    if (value === '') {
      setter('');
    } else {
      const numericValue = parseInt(value, 10);
      if (!isNaN(numericValue) && numericValue >= 0) {
        setter(numericValue);
      }
    }
    setTouched({ ...touched, [setter.name]: true });
  };

  const cleanAddress = (address) => {
    return address.trim().replace(/[^\w\s]/g, '');
  };

  const handleAddressChange = (e) => {
    const cleanedAddress = cleanAddress(e.target.value);
    setAddress(cleanedAddress);
    setTouched({ ...touched, address: true });
  };

  const getFieldError = (field) => {
    if (!touched[field]) return null;
    switch (field) {
      case 'propertyName':
        return propertyName.trim() === '' ? 'Property Name is required' : null;
      case 'province':
        return province === '' ? 'Province is required' : null;
      case 'city':
        return city === '' ? 'City is required' : null;
      case 'address':
        return address.trim() === '' ? 'Address is required' : null;
      case 'expectedRent':
        return expectedRent === '' ? 'Expected Rent is required' : null;
      case 'rooms':
        return rooms === '' ? 'Rooms is required' : null;
      case 'bathrooms':
        return bathrooms === '' ? 'Bathrooms is required' : null;
      case 'kitchens':
        return kitchens === '' ? 'Kitchens is required' : null;
      case 'propertyNeighborhood':
        return propertyNeighborhood.trim() === '' ? 'Description is required' : null;
      case 'files':
        return files.length === 0 ? 'At least one file is required' : null;
      default:
        return null;
    }
  };

  return (
    <div className="form-page">
      <div className={`FormGroup ${getFieldError('propertyName') ? 'error' : ''}`}>
        <h3>Property Name</h3>
        <input
          type="text"
          value={propertyName}
          onChange={(e) => {
            setPropertyName(e.target.value);
            setTouched({ ...touched, propertyName: true });
          }}
          placeholder="Property Name"
        />
        {getFieldError('propertyName') && <div className="error-message">{getFieldError('propertyName')}</div>}
      </div>

      <div className={`FormGroup ${getFieldError('province') ? 'error' : ''}`}>
        <h3>Location</h3>
        <select
          value={province}
          onChange={(e) => {
            setProvince(e.target.value);
            setCity('');
            setTouched({ ...touched, province: true });
          }}
          className="province-select"
        >
          <option value="">Select Province</option>
          <option value="Punjab">Punjab</option>
          <option value="Sindh">Sindh</option>
          <option value="KPK">Khyber Pakhtunkhwa</option>
          <option value="Balochistan">Balochistan</option>
          <option value="Gilgit">Gilgit Baltistan</option>
          <option value="Kashmir">Azad & Jammu Kashmir</option>
        </select>
        {getFieldError('province') && <div className="error-message">{getFieldError('province')}</div>}

        <select
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setTouched({ ...touched, city: true });
          }}
          className="city-select"
          disabled={!province}
        >
          <option value="">Select City</option>
          {provinceCities[province]?.map((cityName) => (
            <option key={cityName} value={cityName}>
              {cityName}
            </option>
          ))}
        </select>
        {getFieldError('city') && <div className="error-message">{getFieldError('city')}</div>}

        <input
          type="text"
          value={address}
          onChange={handleAddressChange}
          placeholder="Property Address"
        />
        {getFieldError('address') && <div className="error-message">{getFieldError('address')}</div>}
      </div>

      <div className={`FormGroup ${getFieldError('expectedRent') ? 'error' : ''}`}>
        <h3>Rent Details</h3>
        <input
          type="number"
          value={expectedRent}
          onChange={handleNumberChange(setExpectedRent)}
          placeholder="Expected Rent"
        />
        {getFieldError('expectedRent') && <div className="error-message">{getFieldError('expectedRent')}</div>}
        <div className="utilities-group">
          <div className="is-included">Included in rent:</div>
          <div className="checkboxes">
            <label className="electricity">
              <input
                type="checkbox"
                checked={includedUtilities.electricityBill}
                onChange={() => handleUtilityChange('electricityBill')}
              />
              Electricity Bill
            </label>
            <label className="gas">
              <input
                type="checkbox"
                checked={includedUtilities.gasBill}
                onChange={() => handleUtilityChange('gasBill')}
              />
              Gas Bill
            </label>
            <label className="water">
              <input
                type="checkbox"
                checked={includedUtilities.waterSupply}
                onChange={() => handleUtilityChange('waterSupply')}
              />
              Water Supply
            </label>
          </div>
        </div>
      </div>

      <div className="FormGroup">
        <h3>Property Details</h3>
        <div className="number-inputs">
          <input
            type="number"
            value={rooms}
            onChange={handleNumberChange(setRooms)}
            placeholder="Rooms"
          />
          {getFieldError('rooms') && <div className="error-message">{getFieldError('rooms')}</div>}
          <input
            type="number"
            value={bathrooms}
            onChange={handleNumberChange(setBathrooms)}
            placeholder="Bathrooms"
          />
          {getFieldError('bathrooms') && <div className="error-message">{getFieldError('bathrooms')}</div>}
          <input
            type="number"
            value={kitchens}
            onChange={handleNumberChange(setKitchens)}
            placeholder="Kitchens"
          />
          {getFieldError('kitchens') && <div className="error-message">{getFieldError('kitchens')}</div>}
        </div>
        <textarea
          value={propertyNeighborhood}
          onChange={(e) => {
            setPropertyNeighborhood(e.target.value);
            setTouched({ ...touched, propertyNeighborhood: true });
          }}
          placeholder="Additional Description"
        />
        {getFieldError('propertyNeighborhood') && <div className="error-message">{getFieldError('propertyNeighborhood')}</div>}
      </div>

      <div className={`FormGroup ${getFieldError('files') ? 'error' : ''}`}>
        <h3>Upload Photos</h3>
        <div
          className="file-drop-area"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <p>Drag & drop files or click to upload</p>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".jpeg,.jpg,.png,.pdf"
            multiple
          />
        </div>
        {getFieldError('files') && <div className="error-message">{getFieldError('files')}</div>}
        <div className="file-previews">
          {files.map((fileObj, index) => (
            <div className="file-preview" key={index}>
              <button className="remove-file" onClick={() => removeFile(index)}>
                ×
              </button>
              {fileObj.file.type.startsWith('image') ? (
                <img src={fileObj.preview} alt="Preview" />
              ) : (
                <div className="file-icon">📄</div>
              )}
              <span>{fileObj.file.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button className="BackButton" onClick={handleBack}>
          Back
        </button>
        <button className="NextButton" onClick={() => setPage(3)} disabled={!isPage2Valid()}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PropertyDetails;