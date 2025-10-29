import { writable, derived } from 'svelte/store';

type Lang = 'en'|'lv'|'ru';
export const lang = writable<Lang>('en');

const dict: Record<Lang, Record<string,string>> = {
  en: {
    hero_kicker: 'Reclame Fabriek R&D',
    hero_title: 'LED Node',
    hero_sub: 'A compact controller for LED signage. Choose colour, motion and brightness. Save scenes. Lights can run on a plan, and several runs can move together.',
    what_title:'What LED Node does',
    what_1_t:'Simple control', what_1_d:'Open a web page. Choose colour, motion and brightness. Save favourites as scenes.',
    what_2_t:'Plan the day',   what_2_d:'Calm mornings, clean daytime, warm evenings.',
    what_3_t:'Runs together',  what_3_d:'Several runs can move in step so long strips look like one.',
    what_4_t:'Works anywhere', what_4_d:'Shop windows, logo letters, façades, lightboxes.'
  },
  lv: {
    hero_kicker:'Reclame Fabriek R&D',
    hero_title:'LED mezgls',
    hero_sub:'Kompakts kontrolieris LED izkārtnēm. Izvēlieties krāsu, kustību un spilgtumu. Saglabājiet ainas. Gaismas var darboties pēc plāna un vairākas līnijas kustas saskaņoti.',
    what_title:'Ko dara LED mezgls',
    what_1_t:'Vienkārša vadība', what_1_d:'Atveriet tīmekļa lapu. Izvēlieties krāsu, kustību un spilgtumu. Saglabājiet iecienītās ainas.',
    what_2_t:'Dienas plāns',     what_2_d:'Rīti mierīgi, diena tīra, vakars silts.',
    what_3_t:'Saskaņota darbība',what_3_d:'Vairākas līnijas kustas vienā solī – izskatās kā viena gaismas līnija.',
    what_4_t:'Der jebkur',       what_4_d:'Vitrīnas, burtu logo, fasādes, gaismas kastes.'
  },
  ru: {
    hero_kicker:'Reclame Fabriek R&D',
    hero_title:'LED Node',
    hero_sub:'Компактный контроллер для световых вывесок. Выберите цвет, движение и яркость. Сохраняйте сцены. Свет может работать по плану, а несколько линий — двигаться синхронно.',
    what_title:'Что умеет LED Node',
    what_1_t:'Простое управление', what_1_d:'Откройте веб-страницу. Выберите цвет, движение и яркость. Сохраните любимые сцены.',
    what_2_t:'План на день',       what_2_d:'Спокойное утро, чистый день, тёплый вечер.',
    what_3_t:'Синхронная работа',  what_3_d:'Несколько линий двигаются в ногу — смотрится как одна линия света.',
    what_4_t:'Подходит куда угодно',what_4_d:'Витрины, объёмные буквы, фасады, лайтбоксы.'
  }
};

export const t = derived(lang, ($lang) => (key: string) => dict[$lang]?.[key] ?? dict.en[key] ?? key);
