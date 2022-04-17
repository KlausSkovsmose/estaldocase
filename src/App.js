import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MoreAddressesItem from "./components/MoreAddressesItem";
import Pagination from "./components/Pagination";
import Address from "./components/Address";
import AddressInfo from "./components/AddressInfo";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSelected, setIsSelected] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [addresses, setAddresses] = useState([]);
  const [addressesOnSameRoad, setAddressesOnSameRoad] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [addressesPerPage] = useState(10);

  // Address data states
  const [road, setRoad] = useState("");
  const [housenr, setHousenr] = useState("");
  const [floor, setFloor] = useState("");
  const [door, setDoor] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");

  // Handle select when clicking on address
  const handleSelect = () => {
    setIsSelected(!isSelected);
  };

  // Handles the input change
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  // Gets all the addresses on the same road
  const getAddressesOnSameRoad = async (road, zipcode) => {
    const res = await axios.get(
      `https://api.dataforsyningen.dk/adresser?vejnavn=${road}&postnr=${zipcode}`
    );
    setAddressesOnSameRoad(res.data);
  };

  // Selects the address that gets clicked on and gets its data
  const selectAddress = async (e, id) => {
    setInputValue(e.target.innerText);
    const res = await axios.get(
      `https://api.dataforsyningen.dk/adresser/${id}`
    );
    setRoad(res.data.adgangsadresse.vejstykke.navn);
    setHousenr(res.data.adgangsadresse.husnr);
    setFloor(res.data.etage);
    setDoor(res.data.dør);
    setZipcode(res.data.adgangsadresse.postnummer.nr);
    setCity(res.data.adgangsadresse.postnummer.navn);

    // Get addresses on the same road that matches selected address
    getAddressesOnSameRoad(
      res.data.adgangsadresse.vejstykke.navn,
      res.data.adgangsadresse.postnummer.nr
    );
    setIsLoading(false);
    handleSelect();
  };

  // Useeffect that fetches addresses based on what you type in input field
  useEffect(() => {
    const getAddress = async () => {
      const res = await axios.get(
        `https://api.dataforsyningen.dk/adresser/autocomplete?q=${inputValue}`
      );
      setAddresses(res.data);
      setIsLoading(false);
    };
    getAddress();
    setIsSelected(false);
  }, [inputValue]);

  // Get index of last and first address. This is for pagination
  const indexOfLastAddress = currentPage * addressesPerPage;
  const indexOfFirstAddress = indexOfLastAddress - addressesPerPage;
  const currentAddresses = addressesOnSameRoad.slice(
    indexOfFirstAddress,
    indexOfLastAddress
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <div className="top-container">ESTALDO CASE</div>
      <div className="content-container">
        <div className="left-container">
          <div className="search">
            <input
              placeholder="Indtast addresse"
              type="text"
              id="search-input"
              value={inputValue}
              onChange={handleChange}
            />
          </div>

          {isLoading ? (
            <h3>Loading...</h3>
          ) : inputValue === "" ? (
            ""
          ) : (
            <div className="address-container">
              {isSelected ? (
                ""
              ) : (
                <Address
                  addresses={addresses}
                  loading={isLoading}
                  selectAddress={selectAddress}
                />
              )}
            </div>
          )}
          <div className="input-container">
            <AddressInfo
              road={road}
              housenr={housenr}
              floor={floor}
              door={door}
              zipcode={zipcode}
              city={city}
            />
          </div>
        </div>

        <div className="right-container">
          <div className="more-addresses-container">
            <h3>
              Addresser på samme vej som {road} {housenr}
            </h3>
            <div className="more-addresses">
              <MoreAddressesItem
                addresses={currentAddresses}
                loading={isLoading}
                selectAddress={selectAddress}
              />
            </div>
            <Pagination
              addressesPerPage={addressesPerPage}
              totalAddresses={addressesOnSameRoad.length}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
