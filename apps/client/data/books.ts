export type Book = {
  namePorto: string;
  nameIdn: string;
};

export type Injil = {
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

export const books: Book[] = [
  {
    namePorto: "Mc",
    nameIdn: "Mrk",
  },
  {
    namePorto: "Jc",
    nameIdn: "Yak",
  },
  {
    namePorto: "Mt",
    nameIdn: "Mat",
  },
  {
    namePorto: "1P",
    nameIdn: "1Pt",
  },
  {
    namePorto: "Jn",
    nameIdn: "Yoh",
  },
  {
    namePorto: "2P",
    nameIdn: "2Pt",
  },
  {
    namePorto: "Rm",
    nameIdn: "Rom",
  },
];

export function getBook(evangile: string) {
  let book;
  const reBook = /[1-9]*\s*[A-Z]\w*\s\s*\d*/;
  const reVerse = /\d*a*b*c*d*-\d*a*b*c*d*/;
  const [start, stop] = reVerse.exec(evangile)![0].split("-");
  const verses = arrayRange(parseInt(start), parseInt(stop), 1);
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
  console.log(reBook.exec(evangile)!);
  return { book, chapter: parseInt(bab), verses };
}

export const arrayRange = (start: number, stop: number, step: number) => {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, index) => start + index * step,
  );
};
