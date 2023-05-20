import useSuperHerosData from "../hooks/useSuperHerosData";
import { Link } from "react-router-dom";

export const RQSuperHeroesPage = () => {
  type DataResult = {
    id: number;
    name: string;
  };

  const onSuccess = (data: any) => {
    console.log("onsucess:", data);
  };
  const onError = (error: any) => {
    console.log("onerro:", error);
  };

  // THE RESULT FROM THE API CN B DESTRCUTRED IMIDIATELY
  const { status, data, isError, error, isFetching }: any = useSuperHerosData({
    onSuccess,
    onError,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
  });

  console.log(isFetching);

  // if loading is true
  if (status === "loading") {
    return <h2>Loading...</h2>;
  }

  // if loadded and has error
  if (isError) {
    return (
      <>
        <h2>{error.message}</h2>
      </>
    );
  }
  // if loading is false and the there is data result
  return (
    <div>
      <h2>Super Heros Nmaes with RQ</h2>
      {data?.data.map((names: DataResult) => {
        // const { name, id } = names;
        return (
          <div key={names.id}>
            <Link to={`/rq-superhero/${names.id}`}>{names.name}</Link>
          </div>
        );
      })}
    </div>
  );
};
