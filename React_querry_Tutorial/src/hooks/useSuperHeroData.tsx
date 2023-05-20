import { useQuery } from "react-query";
import axios from "axios";

const fetchSingleHeroData = ({ qerryKey }: any) => {
  const heroId = qerryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId: any) => {
  return useQuery(["superHeroId", heroId], fetchSingleHeroData);
};
