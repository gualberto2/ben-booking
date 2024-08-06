"use client";

import { useMySpotStore } from "@/store";
import { LatLng } from "@/types";
import React, { useEffect, useState } from "react";
import AddressAutoCompleteInput from "./map";

function SelectAddress({ onAddressChange }: any) {
  const mySpotStore = useMySpotStore();
  const [message, setMessage] = useState<string>("");

  const handleAddressSelect = (address: string, gpscoords: LatLng) => {
    setMessage("");
    mySpotStore.updateState({
      address: address,
      gpscooords: gpscoords,
    });
    onAddressChange(address);
  };

  useEffect(() => {
    // Initialize with the current address from the store
    onAddressChange(mySpotStore.data.address);
  }, [mySpotStore.data.address]);

  return (
    <AddressAutoCompleteInput
      onAddressSelect={handleAddressSelect}
      selectedAddress={mySpotStore.data.address}
    />
  );
}

export default SelectAddress;
