// import { ApiRoot } from "../../fetcher";
import { mockPetlist } from "@/framework/mock/pet";
import ApiRoot from "../fetcher";
import { normalizePetsForFe } from "../lib/normalize";

export const getPets = async () => {
  try {
    // const pets = await ApiRoot.pets().getPets({ customerId: "20220415" });
    const pets = mockPetlist;
    console.info("petspetspetspets", pets);
    return pets.map((pet) => normalizePetsForFe(pet));
  } catch (err) {
    console.log(err, "err");
  }
};
