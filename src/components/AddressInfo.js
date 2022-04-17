import React from "react";
import "./AddressInfo.css";

const AddressInfo = ({ road, housenr, floor, door, zipcode, city }) => {
  return (
    <>
      <label>Vejnavn: </label>
      <input type="text" id="address-info" value={road} readOnly={true} />
      <label>Husnummer: </label>
      <input type="text" id="address-info" value={housenr} readOnly={true} />
      <label>Etage: </label>
      <input
        type="text"
        id="address-info"
        value={floor === null ? "Stue" : floor}
        readOnly={true}
      />
      <label>Dør: </label>
      <input
        type="text"
        id="address-info"
        value={door === null ? "" : door}
        readOnly={true}
      />
      <label>Postnummer: </label>
      <input type="text" id="address-info" value={zipcode} readOnly={true} />
      <label>By: </label>
      <input type="text" id="address-info" value={city} readOnly={true} />
    </>
  );
};

export default AddressInfo;
