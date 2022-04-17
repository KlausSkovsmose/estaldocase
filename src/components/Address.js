import React from "react";
import './Address.css'

const Address = ({ addresses, loading, selectAddress }) => {
  if (loading) {
    return <h3>Loading...</h3>;
  }
  return addresses.map((a) => (
    <div
      className="address-item"
      key={a.adresse.id}
      onClick={(e) => selectAddress(e, a.adresse.id)}
    >
      <h4>{a.tekst}</h4>
    </div>
  ));
};

export default Address;
