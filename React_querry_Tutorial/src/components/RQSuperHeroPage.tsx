import { useParams } from "react-router-dom";
import { useSuperHeroData } from "../hooks/useSuperHeroData";

interface HeroDetail {
  heroId: string | undefined;
}

const RQSuperHeroPage = () => {
  const { heroId } = useParams();

  // THE RESULT FROM THE API CN B DESTRCUTRED IMIDIATELY
  const { status, data, isError, error }: any = useSuperHeroData(heroId);

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
  return (
    <div>
      {data.data.name}== {data.data.alterEgo}
    </div>
  );
};

export default RQSuperHeroPage;
