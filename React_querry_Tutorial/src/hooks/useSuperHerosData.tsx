import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchData = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const useSuperHerosData = ({
  onSuccess,
  onError,
  refetchIntervalInBackground,
  refetchOnWindowFocus,
}: any) => {
  return useQuery({
    queryKey: ["super-heros"],
    queryFn: fetchData,
    onSuccess,
    onError,
    refetchIntervalInBackground,
    refetchOnWindowFocus,

    // Note select is  a data transformation ppty data transformation is used to transform data
    // select: (data) => {
    //   const superheroNames = data.data.map((hero: any) => hero.name);
    //   return superheroNames;
    // },
  });
};

export default useSuperHerosData;
