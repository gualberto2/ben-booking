"use client";

import React, { useEffect, useRef, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { libs } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { LatLng } from "@/types";

type AddressAutoCompleteInputProps = {
  onAddressSelect: (address: string, gpscoords: LatLng) => void;
  selectedAddress?: string;
};

function AddressAutoCompleteInput({
  onAddressSelect,
  selectedAddress,
}: AddressAutoCompleteInputProps) {
  const [autoComplete, setAutoComplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
    libraries: libs,
  });

  const placesAutoCompleteRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isLoaded) {
      const gAutoComplete = new google.maps.places.Autocomplete(
        placesAutoCompleteRef.current as HTMLInputElement,
        {
          fields: ["formatted_address", "geometry", "name"],
          componentRestrictions: {
            country: ["us"],
          },
        }
      );

      gAutoComplete.addListener("place_changed", () => {
        const place = gAutoComplete.getPlace();
        const position = place.geometry?.location;
        onAddressSelect(place.formatted_address!, {
          lat: position?.lat()!,
          lng: position?.lng()!,
        });
      });
    }
  }, [isLoaded]);

  useEffect(() => {
    // https://github.com/radix-ui/primitives/issues/1859
    // Disable Radix ui dialog pointer events lockout
    setTimeout(() => (document.body.style.pointerEvents = ""), 0);
  });

  return <Input ref={placesAutoCompleteRef} defaultValue={selectedAddress} />;
}

export default AddressAutoCompleteInput;
