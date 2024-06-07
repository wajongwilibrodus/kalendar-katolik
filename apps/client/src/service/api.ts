import axios from 'axios';
import { Passage } from '../types/passage';
import moment from 'moment';
import * as cheerio from 'cheerio';
import { TypeOfVerse } from '../types/passage';
import type { Injil } from '../../data/books'; 

export const getPassages = async () => {
    const data = await axios.get(`https://api.aelf.org/v1/messes/${moment().format("YYYY-MM-DD")}/romain`);
    const passages = (data.data.messes[0].lectures.map((item:Passage) => ({type : item.type, ref: item.ref})));
    return passages;
}

export const getCalendar = async () => {
    const data = await axios.get('http://calapi.inadiutorium.cz/api/v0/en/calendars/default/today');
    const cal = data.data.celebrations[0];
    return cal;
}

export const getReadings = async ({book, chapter, verses}: Injil) => {
    let reading: TypeOfVerse = {
        title: '',
        verses: [],
    };
    await axios.get(`https://alkitab.mobi/manggarai/${book}/${chapter}`)
        .then(res => {
        const $ = cheerio.load(res.data);
        const listOfVerses = $('p');

        listOfVerses.each((_, el) => {
            let verseNumber = 0;
            let ayat = '';
            const span = $(el).find('span');
            if(verses.length > 0) {
                if($(span).is('.paragraphtitle')){
                    reading = {...reading, title: $(span).text()}
                }
                if($(span).is('.reftext')) {
                    verseNumber = parseInt($(span).find('a').text());
                    ayat = ($(el).text()).replace(verseNumber.toString(), '');
                    if(verses.includes(verseNumber)){
                        reading = {...reading, verses: [...reading.verses, {idx: verseNumber, text: ayat}]};
                        verses = verses.filter((val:number) => val !== verseNumber);
                    }
                }
            } else {
                return false;
            }
        })
    });
    return reading;
}

