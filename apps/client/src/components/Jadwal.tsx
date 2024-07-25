import useGoogleSheets from "use-google-sheets";
import "dotenv";
const hari = ["minggu", "senin", "selasa", "rabu", "kamis", "jumat", "sabtu"];
type Hari =
  | "minggu"
  | "senin"
  | "selasa"
  | "rabu"
  | "kamis"
  | "jumat"
  | "sabtu";
type Greja = {
  img: string;
  alamat: string;
  minggu: string;
  senin: string;
  selasa: string;
  rabu: string;
  kamis: string;
  jumat: string;
  sabtu: string;
  paroki: string;
};
export const Jadwal = () => {
  const { data, loading, error } = useGoogleSheets({
    apiKey: process.env.API_KEY as string,
    sheetId: process.env.SHEET_ID as string,
    sheetsOptions: [{ id: "jadwal" }],
  });

  if (loading) {
    <h1>Loading...</h1>;
  }
  if (error) {
    <h1>Error!</h1>;
  }
  return (
    <div id="mass" className="text-white grid grid-cols-1 gap-6 sm:grid-cols-3 px-4 mx-auto items-center max-w-4xl  py-24 lg:py-56">
      {(data[0]?.data as Greja[])?.map((greja) => {
        const image = greja.img;
        const date = hari[new Date().getDay()];
        return (
          <div
            key={image}
            className="bg-blue-800 rounded overflow-hidden shadow-md relative"
          >
            <img
              src={`/${image}.jpg`}
              alt={image}
              className="w-full h-32 sm:h-48 object-cover"
            />
            <div className="m-4 flex justify-between">
              <div>
                <span className="font-bold">{greja.paroki}</span>
                <span className="block">{greja.alamat}</span>
              </div>
              <div>
                {greja[date as Hari]?.split(",")?.map((waktu: string) => (
                  <span key={waktu} className="block">
                    {waktu}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

