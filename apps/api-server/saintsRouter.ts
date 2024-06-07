import { router, publicProcedure } from "./trpc";
import axios from "axios";
import * as cheerio from "cheerio";
import z from "zod";

type TypeOFData = {
  name: string;
  img: undefined | string;
  profile: string[];
};
type Verse = {
  idx: number;
  text: string;
};
type TypeOfVerse = {
  title: string;
  verses: Verse[];
};

const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export const saintsRouter = router({
  greeting: publicProcedure.query(() => "hello from trpc"),

  getSaints: publicProcedure.query(async () => {
    let listOfObj: TypeOFData[] = [];
    const today = new Date();
    const month = months[today.getMonth()];
    const day = today.getDate().toString();
    await axios
      .get(`http://catholicsaints.mobi/calendar/${[day, month].join("-")}.htm`)
      .then((res) => {
        const $ = cheerio.load(res.data);
        const listOfVerses = $("hr ~ h3, img, h4, h4:contains(Profile) ~ p");

        /* listOfVerses.each((_, el) => {
                    console.log($(el).text());
                }) */

        let pointer: null | string = null;
        let profilePointer: null | string = null;
        let tempObj: TypeOFData = {
          name: "",
          img: "",
          profile: [],
        };
        listOfVerses.each((_, el) => {
          if ($(el).is("h3")) {
            if (pointer !== null) {
              listOfObj = [...listOfObj, tempObj];
              pointer = null;
              tempObj = {
                name: "",
                img: "",
                profile: [],
              };
            }
            pointer = $(el).text();
            tempObj = { ...tempObj, name: pointer };
          } else if ($(el).is("img")) {
            const img = (
              $(el).attr("src")?.valueOf() ? $(el).attr("src")?.valueOf() : ""
            ) as string;
            tempObj = { ...tempObj, img };
          } else if ($(el).is("h4")) {
            if ($(el).text() === "Profile") {
              profilePointer = $(el).text();
            } else {
              profilePointer = null;
            }
          } else if ($(el).is("p") && profilePointer) {
            tempObj = {
              ...tempObj,
              profile: [...tempObj.profile, $(el).text()],
            };
          }
        });
      });
    return listOfObj;
  }),

  getReadings: publicProcedure
    .input(
      z.object({
        book: z.string(),
        chapter: z.number(),
        verses: z.array(z.number()),
      }),
    )
    .query(async (opts) => {
      let v = opts.input.verses;
      let reading: TypeOfVerse = {
        title: "",
        verses: [],
      };
      await axios
        .get(
          `https://alkitab.mobi/manggarai/${opts.input.book}/${opts.input.chapter}`,
        )
        .then((res) => {
          const $ = cheerio.load(res.data);
          const listOfVerses = $("p");

          listOfVerses.each((_, el) => {
            let verseNumber = 0;
            let ayat = "";
            const span = $(el).find("span");
            if (v.length > 0) {
              if ($(span).is(".paragraphtitle")) {
                reading = { ...reading, title: $(span).text() };
              }
              if ($(span).is(".reftext")) {
                verseNumber = parseInt($(span).find("a").text());
                ayat = $(el).text().replace(verseNumber.toString(), "");
                if (v.includes(verseNumber)) {
                  reading = {
                    ...reading,
                    verses: [
                      ...reading.verses,
                      { idx: verseNumber, text: ayat },
                    ],
                  };
                  v = v.filter((val) => val !== verseNumber);
                }
              }
            } else {
              return false;
            }
          });
        });
      return reading;
    }),
});
