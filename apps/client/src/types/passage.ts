export type Passage = {
    type: string,
    ref: string,
}


export type Verse = {
    idx: number;
    text: string;
}
export type TypeOfVerse ={
    title: string;
    verses: Verse[];
}

