import { createContext } from "react"
import { IPet } from "./APIResponsesTypes"

const AdoptedPetContext = createContext<[IPet | null, (adoptedPet: IPet) => void]>([{
  id: 1234,
  name: "kira",
  animal: "dog",
  breed: "a dog",
  description: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
  images: [],
  city: "Seattle",
  state: "WA",
},
() => { },
])

export default AdoptedPetContext
