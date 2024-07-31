import AddressAutoCompleteInput from "./components/map";

const CreateBooking = () => {
  return (
    <section>
      <div>
        <AddressAutoCompleteInput
          onAddressSelect={handleAddressSelect}
          selectedAddress={mySpotStore.data.address}
        />
      </div>
    </section>
  );
};
export default CreateBooking;
