import { useReadingsCoba3, useTodaysReadings } from "../service/queries";
import { Reading } from "./Reading";
export const Readings = () => {
  const { data: todaysReading } = useTodaysReadings();

  const bibles = useReadingsCoba3(todaysReading);

  return (
    <div id="readings">
      <h1 className="mt-10 text-center mb-4 text-2xl font-bold tracking-tight leading-none dark:text-white md:text-3xl lg:text-4xl">
        Reading
      </h1>
      {bibles && bibles.map((bible) => <Reading data={bible?.data} />)}
    </div>
  );
};
