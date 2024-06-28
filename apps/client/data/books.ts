import { books } from "./allBooks";
export type Book = {
  namePorto: string;
  nameIdn: string;
};

export type Injil = {
  pb: string;
  book: string;
  chapter: number;
  verses: number[];
};

export type Verse = {
  idx: number;
  text: string;
};

export type ReadingType = {
  title: string;
  verses: Verse[];
};

const manggarai = [
  "Mat",
  "Mrk",
  "Luk",
  "Yoh",
  "Kis",
  "Rom",
  "1Ko",
  "2Ko",
  "Gal",
  "Efe",
  "Flp",
  "Kol",
  "1Te",
  "2Te",
  "1Ti",
  "2Ti",
  "Tit",
  "Flm",
  "Ibr",
  "Yak",
  "1Pt",
  "2Pt",
  "1Yo",
  "2Yo",
  "3Yo",
  "Yud",
  "Why",
];

export function getBook(evangile: string) {
  let book;
  let pb = "tb";
  const reBook = /[1-9]*\s*[A-Z]\w*\s\s*\d*/;
  const verses = getVerse2(evangile);
  const [bab, injil, bag] = reBook
    .exec(evangile)![0]
    .split(/\s\s*\s*/)
    .reverse();
  if (bag) {
    book = books.filter((val) => val.namePorto === [bag, injil].join(""))[0]
      ?.nameIdn;
  } else {
    book = books.filter((val) => val.namePorto === injil)[0]?.nameIdn;
  }
  pb = manggarai.includes(book) ? "manggarai" : pb;
  const mzm =
    book === "Mzm" &&
    parseInt(/\(\d*\)/.exec(evangile.split(",")![0])![0].slice(1, -1));
  return { pb, book, chapter: book === "Mzm" ? mzm : parseInt(bab), verses };
}

export const arrayRange = (start: number, stop: number, step: number) => {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, index) => start + index * step,
  );
};

export const getVerse = (evangile: string) => {
  const reVerse = /\d*a*b*c*d*\s*-\s*\d*a*b*c*d*/g;
  let match;
  let verses: number[] = [];
  while ((match = reVerse.exec(evangile)) !== null) {
    const [start, stop] = match[0].split("-");
    verses = [...verses, ...arrayRange(parseInt(start), parseInt(stop), 1)];
  }
  return verses.sort();
};

export const getVerse2 = (evangile: string) => {
  const listOfVerses = evangile.split(",").slice(1);
  const initialValue: string[] = [];
  const verses = listOfVerses.reduce(
    (acc, currentVal) => [...acc, ...currentVal.split(".")],
    initialValue,
  );
  const initalVal: number[] = [];
  const fixVerses = verses.reduce((acc, currVal) => {
    let verses: number[] = [];
    const singleReg = /\s*\d*/g;
    const rangeReg = /\d*a*b*c*d*\s*-\s*\d*a*b*c*d*/g;
    if (currVal.includes("-")) {
      const [first, end] = rangeReg.exec(currVal)![0].split("-");
      verses = arrayRange(parseInt(first), parseInt(end), 1);
    } else {
      verses = [parseInt(singleReg.exec(currVal)![0])];
    }
    return [...acc, ...verses];
  }, initalVal);

  return [...fixVerses.filter((val, idx) => fixVerses.indexOf(val) === idx)];
};
