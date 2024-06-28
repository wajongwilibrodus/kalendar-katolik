import Saints from "./Saints";
import { useTodayPassages, useTodayCalendar } from "../service/queries";
import { Passage } from "../types/passage";
import { Jadwal } from "./Jadwal";
import { Readings } from "./Readings";
const Mass = () => {
  const { data: readings } = useTodayPassages();
  const { data: cal } = useTodayCalendar();
  return (
    <div id="home">
      <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none dark:text-white md:text-5xl lg:text-6xl">
          Give us this day our daily Bread!
        </h1>
        <p className="mb-10 text-lg font-normal font-zilla dark:text-yellow-100 lg:text-xl sm:px-16 lg:px-48">
          "I am the living bread that came down from heaven; whoever eats this
          bread will live forever; and the bread that I will give is my flesh
          for the life of the world."
        </p>
        <div className="mt-10 px-8 max-w-4xl mx-auto flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0 sm:space-x-4">
          <div className="mb-2 dark:text-white text-center text-lg sm:text-left">
            <p>Title: {cal?.title}</p>
            <p>Colour: {cal?.colour}</p>
          </div>
          <div className="mb-2 text-center sm:text-right dark:text-white text-lg">
            {(readings ? readings : []).map((val: Passage) => (
              <p key={val.type}>
                {val.type}
                {": "}
                {val.ref}
              </p>
            ))}
          </div>
        </div>
      </div>
      <hr className="mx-auto bg-black dark:bg-white w-1/2" />
      <Saints />
      <hr className="mx-auto bg-black dark:bg-white w-1/2" />
      <Jadwal />
      <hr className="mx-auto bg-black dark:bg-white w-1/2" />

      <Readings />
    </div>
  );
};

export default Mass;
