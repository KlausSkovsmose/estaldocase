import React from "react";
import './MoreAddressesItem.css'

const Addresses = ({ addresses, loading, selectAddress }) => {
  if (loading) {
    return <h3>Loading...</h3>;
  }

  return addresses.map((a) => (
    <div className="addresses-on-same-road-item" key={a.id} onClick={(e) => selectAddress(e, a.id)}>
      <h4>{a.adressebetegnelse}</h4>
    </div>
  ));
};

export default Addresses;
