import { useContext, useDeferredValue, useMemo, useState, useTransition } from "react";
import { useQuery } from "@tanstack/react-query";
import useBreedList from "./useBreedList";
import Results from "./Results";
import fetchSearch from "./fetchSearch";
import AdoptedPetContext from "./AdoptedPetContext";
import { Animal } from "./APIResponsesTypes";

const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "" as Animal,
    breed: "",
  });
  const [adoptedPet] = useContext(AdoptedPetContext)
  const [animal, setAnimal] = useState("" as Animal);
  const [breeds] = useBreedList(animal);
  const [isPending, startTransition] = useTransition()

  const results = useQuery({
    queryKey: ["search", requestParams],
    queryFn: fetchSearch,
  });

  const pets = results?.data?.pets ?? [];
  const deferredPets = useDeferredValue(pets)
  const renderedPets = useMemo(() => <Results pets={deferredPets} />, [deferredPets])
  return (
    <div className="my-0 mx-auto w-11/12">
      <form className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const obj = {
            animal: (formData.get("animal")?.toString() as Animal) ?? ("" as Animal),
            location: formData.get("location")?.toString() ?? "",
            breed: formData.get("breed")?.toString() ?? "",
          };
          startTransition(() => {
            setRequestParams(obj)
          })
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            name="location"
            className="w-60 mb-5 block"
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          <select
            className="w-60 mb-5 block"
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value as Animal);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          <select
            className="w-60 mb-5 block"
            id="breed"
            name="breed"
            disabled={breeds.length === 0}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>{breed}</option>
            ))}
          </select>
        </label>
        {
          isPending ? (
            <div className="">
              <h2> Loading...
              </h2>
            </div>
          ) : (
            <button className="rounded px-6 py-2 color text-white duration-500 hover:opacity-70 border-none bg-orange-500">Submit</button>
          )
        }
      </form>
      {renderedPets}
    </div >
  );
};

export default SearchParams;
