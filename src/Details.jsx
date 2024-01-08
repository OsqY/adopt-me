import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";
import { useState, useContext } from "react";
import AdoptedPetContext from "./AdoptedPetContext";

const Details = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
  const results = useQuery({
    queryKey: ["details", id],
    queryFn: fetchPet,
  });
  const [_, setAdoptedPet] = useContext(AdoptedPetContext)

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🔃</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="w-11/12 pb-3 bg-sky-500 mx-auto my-4 rounded-lg">
      <Carousel images={pet.images} />
      <div className="mx-4 p-2 flex-col bg-yellow-200 rounded-lg " >
        <h1 className="p-0">{pet.name}</h1>
        <h2 className="p-0">{pet.animal} - {pet.breed} - {pet.city} - {pet.state}</h2>
        <button className="mt-4 rounded-lg bg-orange-500 p-2 duration-500" onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <p className="my-4">{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button onClick={() => {
                  setAdoptedPet(pet)
                  navigate("/")
                }}>
                  Yes
                </button>
                <button onClick={() => setShowModal(false)} > No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
