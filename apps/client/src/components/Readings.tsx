import { getBook } from "../../data/books";
import { useReadingsCoba3, useTodaysReadings } from "../service/queries";
import { Reading } from "./Reading";
export const Readings = () => {
  const { data: todaysReading } = useTodaysReadings();
  if (todaysReading) {
    console.log(todaysReading);
  }
  if (todaysReading) {
    console.log(getBook(todaysReading[0].ref));
  }

  const bibles = useReadingsCoba3(todaysReading);
  if (bibles) {
    console.log(bibles[0]?.data?.title);
  }
  /* if(isLoading){
        return <h1>Loading...</h1>
    }
    if(isError){
        return <h1>Error: {error.message}</h1>
    } */

  return (
    <>
      <h1 className="mt-10 text-center mb-4 text-2xl font-bold tracking-tight leading-none text-white md:text-3xl lg:text-4xl">
        Reading
      </h1>
      {bibles && bibles.map((bible) => <Reading data={bible?.data} />)}
    </>
  );
};




