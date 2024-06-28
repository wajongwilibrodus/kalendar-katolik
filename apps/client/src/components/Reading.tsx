import { GetReadings } from "../trpc";

export const Reading = ({ data}: { data: GetReadings | undefined}) => {
  return (
    <div>
      <h1 className="mt-5 text-center mb-4 text-2xl font-bold tracking-tight leading-none dark:text-white md:text-2xl lg:text-2xl">
        {data?.title}
      </h1>
      <div className="mx-auto mt-10 px-8 max-w-4xl grid grid-cols-1 gap-6 sm:grid-cols-2">
        {data?.verses.map((verse) => (
          <p className="font-zilla text-xl" key={verse.idx}>
            <span className="mr-10px inline-block align-top text-xs font-bold text-blue-300">
              {verse.idx}
            </span>
            {verse.text}
          </p>
        ))}
      </div>
    </div>
  );
};
