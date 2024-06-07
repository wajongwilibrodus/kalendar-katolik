import { trpc } from "../trpc";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Saints = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const { data: saints, isLoading, isError, error } = trpc.getSaints.useQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    <>
      <h1 className="mt-10 text-center mb-4 text-2xl font-bold tracking-tight leading-none text-white md:text-3xl lg:text-4xl">
        Saints Celebrated Today
      </h1>
      <div className="mx-auto mt-10 px-8 max-w-4xl mb-20 h-fit">
        <Slider {...settings}>
          {saints.map((saint) => (
            <div
              key={saint.name}
              className="bg-slate-800 text-white rounded-xl"
            >
              <div className="h-56 rounded-t-xl bg-indigo-800 flex justify-center items-center">
                <img
                  className="h-44 w-44 rounded-full"
                  src={
                    saint.img
                      ? `http://catholicsaints.mobi/calendar/${saint.img}`
                      : "/All-Saints.jpg"
                  }
                  alt="Saints"
                />
              </div>

              <div className="flex flex-col justify-center items-center gap-4 p-4">
                <p className="text-xl font-semibold">{saint.name}</p>
                <div>
                  {saint.profile.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Saints;
