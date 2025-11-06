import { writable, derived } from 'svelte/store';
import { save, load } from './prefs';

type Lang = 'en'|'lv'|'ru';
export const lang = writable<Lang>(load<Lang>('lg-lang','en'));
lang.subscribe(v => save('lg-lang', v));

const dict: Record<Lang, Record<string,string>> = {
  en: {
    hero_kicker: 'Reclame Fabriek R&D',
    hero_title: 'LUMIGRID LED Node',
    hero_sub: 'A compact controller for LED signage. Choose colour, motion and brightness. Save scenes. Lights can run on a plan, and several runs can move together.',
    what_title:'What LUMIGRID <span class="accent">LED Node</span> does',
    what_1_t:'<span class="accent">Simple</span> control', what_1_d:'Open a web page. Choose colour, motion and brightness. Save favourites as scenes.',
    what_2_t:'Plan the <span class="accent">day</span>',   what_2_d:'Calm mornings, clean daytime, warm evenings.',
    what_3_t:'Runs <span class="accent">together</span>',  what_3_d:'Several runs can move in step so long strips look like one.',
    what_4_t:'Works <span class="accent">anywhere</span>', what_4_d:'Shop windows, logo letters, façades, lightboxes.',
    faq_title: '<span class="accent">FAQ</span>',
    faq_q1: 'Do I need special software?',
    faq_a1: 'No. Control is in a web page.',
    faq_q2: 'Can it run white and colour?',
    faq_a2: 'Yes. Smooth white dimming and animated colour strips.',
    faq_q3: 'Will lights stay in sync?',
    faq_a3: 'Yes. Effects are designed to line up across runs.',
    contact_title: "Let's talk <span class=\"accent\">lighting</span>",
    contact_intro: "Share the facade, lettering, or window you want to transform. We'll map zones, looks, and schedule suggestions, then respond within one business day."
  },
  lv: {
    hero_kicker:'Reclame Fabriek R&D',
    hero_title:'LUMIGRID LED mezgls',
    hero_sub:'Kompakts kontrolieris LED izkārtnēm. Izvēlieties krāsu, kustību un spilgtumu. Saglabājiet ainas. Gaismas var darboties pēc plāna un vairākas līnijas kustas saskaņoti.',
    what_title:'Ko dara LUMIGRID <span class="accent">LED mezgls</span>',
    what_1_t:'<span class="accent">Vienkārša</span> vadība', what_1_d:'Atveriet tīmekļa lapu. Izvēlieties krāsu, kustību un spilgtumu. Saglabājiet iecienītās ainas.',
    what_2_t:'Dienas <span class="accent">plāns</span>',     what_2_d:'Rīti mierīgi, diena tīra, vakars silts.',
    what_3_t:'Saskaņota <span class="accent">darbība</span>',what_3_d:'Vairākas līnijas kustas vienā solī – izskatās kā viena gaismas līnija.',
    what_4_t:'Der <span class="accent">jebkur</span>',       what_4_d:'Vitrīnas, burtu logo, fasādes, gaismas kastes.',
    faq_title: '<span class="accent">BUJ</span> (Bieži uzdotie jautājumi)',
    faq_q1: 'Vai man vajag īpašu programmatūru?',
    faq_a1: 'Nē. Vadība ir tīmekļa lapā.',
    faq_q2: 'Vai tas var darboties baltā un krāsā?',
    faq_a2: 'Jā. Gluds baltās gaismas regulēšana un animētas krāsu joslas.',
    faq_q3: 'Vai gaismas paliks sinhronā?',
    faq_a3: 'Jā. Efekti ir veidoti, lai līdzinātos pār visām līnijām.',
    contact_title: 'Apspriedīsim <span class="accent">apgaismojumu</span>',
    contact_intro: 'Dalieties ar fasādi, burtiem vai vitrīnu, ko vēlaties pārveidot. Mēs kartēsim zonas, izskatu un grafika ieteikumus, pēc tam atbildēsim vienas darba dienas laikā.'
  },
  ru: {
    hero_kicker:'Reclame Fabriek R&D',
    hero_title:'LUMIGRID LED Node',
    hero_sub:'Компактный контроллер для световых вывесок. Выберите цвет, движение и яркость. Сохраняйте сцены. Свет может работать по плану, а несколько линий — двигаться синхронно.',
    what_title:'Что умеет LUMIGRID <span class="accent">LED Node</span>',
    what_1_t:'<span class="accent">Простое</span> управление', what_1_d:'Откройте веб-страницу. Выберите цвет, движение и яркость. Сохраните любимые сцены.',
    what_2_t:'План на <span class="accent">день</span>',       what_2_d:'Спокойное утро, чистый день, тёплый вечер.',
    what_3_t:'Синхронная <span class="accent">работа</span>',  what_3_d:'Несколько линий двигаются в ногу — смотрится как одна линия света.',
    what_4_t:'Подходит <span class="accent">куда угодно</span>',what_4_d:'Витрины, объёмные буквы, фасады, лайтбоксы.',
    faq_title: '<span class="accent">Часто задаваемые вопросы</span>',
    faq_q1: 'Нужна ли специальная программа?',
    faq_a1: 'Нет. Управление через веб-страницу.',
    faq_q2: 'Может работать с белым и цветным светом?',
    faq_a2: 'Да. Плавная регулировка белого света и анимированные цветные полосы.',
    faq_q3: 'Будет ли свет синхронизирован?',
    faq_a3: 'Да. Эффекты разработаны для синхронной работы на всех линиях.',
    contact_title: 'Давайте поговорим о <span class="accent">свете</span>',
    contact_intro: 'Расскажите о фасаде, буквах или витрине, которую хотите преобразить. Мы создадим карту зон, внешний вид и график, затем ответим в течение одного рабочего дня.'
  }
};

export const t = derived(lang, ($lang) => (key: string) => dict[$lang]?.[key] ?? dict.en[key] ?? key);
