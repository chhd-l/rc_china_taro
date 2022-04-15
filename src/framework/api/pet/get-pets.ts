import { ApiRoot } from "../../fetcher";
import { normalizePets } from "../lib/normalize";

export const getPets = async () => {
  try {
    const pets = await ApiRoot.pets().getPets({ customerId: "001" });
    return normalizePets(pets);
  } catch (err) {
    console.log(err);
  }
};
