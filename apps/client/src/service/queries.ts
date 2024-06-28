import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCalendar, getPassages } from "./api";
import { trpc } from "../trpc";
import { getBook, Injil } from "../../data/books";
import { Passage } from "../types/passage";

export const useTodayPassages = () => {
  return useQuery({
    queryKey: ["passages"],
    queryFn: () => getPassages(),
  });
};

export const useTodayCalendar = () => {
  return useQuery({
    queryKey: ["calendar"],
    queryFn: () => getCalendar(),
  });
};

export const useReadings = (readings: Passage) => {
  const [bacaan, setBacaan] = useState<Injil>({
    pb: "",
    book: "",
    chapter: 0,
    verses: [],
  });
  useEffect(() => {
    function handlePass(readings: Passage) {
      if (readings?.ref) {
        setBacaan(getBook(readings.ref));
      }
    }
    handlePass(readings);
  }, [readings]);

  return trpc.getReadings.useQuery(bacaan, { enabled: !!bacaan });
};

export const useTodaysReadings = () => {
  return useQuery({
    queryKey: ["readings"],
    queryFn: () => getPassages(),
    select: (readings) =>
      readings.filter((reading: Passage) =>
        ["evangile", "lecture_2", "lecture_1", "psaume"].includes(reading?.type),
      ),
  });
};

export const useReadingsCoba3 = (readings: Passage[]) => {
  return trpc.useQueries((t) =>
    (readings ? readings : []).map((reading) =>
      t.getReadings(getBook(reading.ref)),
    ),
  );
};
