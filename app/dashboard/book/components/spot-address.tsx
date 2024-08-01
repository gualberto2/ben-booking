"use client";

import { useMySpotStore } from "@/store";
import { LatLng } from "@/types";
import React, { useState } from "react";
import AddressAutoCompleteInput from "./map";

function SpotAddress() {
  const mySpotStore = useMySpotStore();
  const [message, setMessage] = useState<string>("");

  const handleAddressSelect = (address: string, gpscoords: LatLng) => {
    setMessage("");
    mySpotStore.updateState({
      address: address,
      gpscooords: gpscoords,
    });
  };
  return (
    <div className="grid w-full gap-1 5">
      <h2 className="text-xl sm:text-2xl py-4 font-semibold">Address</h2>
      <AddressAutoCompleteInput
        onAddressSelect={handleAddressSelect}
        selectedAddress={mySpotStore.data.address}
      />
    </div>
  );
}

export default SpotAddress;
