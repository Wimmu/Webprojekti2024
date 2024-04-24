// Dummy data
const menuData = [
  {
    date: 'Maanantai 22.04.2024',
    dishes: ['Sushilajitelma (6 kappaletta)', 'Wakame-merileväsalatti', 'Kanatempura', 'Lohiavocado-rullat']
  },
  {
    date: 'Tiistaina 23.04.',
    dishes: ['Miso-keitto', 'Sashimi-lajitelma (9 kappaletta)', 'Yakitori (kanavarras)']
  },
  {
    date: 'Keskiviikko 24.04.2024',
    dishes: ['Nigiri-lajitelma (8 kappaletta)', 'Gyudon (naudanliharuoka riisillä)', 'Vihreä tee -jäätelö']
  },
  {
    date: 'Torstai 25.04',
    dishes: ['Sake-makirulla (lohirulla)', 'Yasai itame (wokattuja vihanneksia)', 'Edamame (soijapavut)']
  },
  {
    date: 'Perjantai 26.04',
    dishes: ['Chirashi-zushi (kulho täytetty sushiriisillä ja raaka-aineilla)', 'Okonomiyaki (japanilainen ruokalaji, "suuri paistettu asia")', 'Melonipallo (hedelmäjälkiruoka)']
  },
  {
    date: 'Lauantai 27.04',
    dishes: ['Tempura-annos (katkarapu- ja vihannes-tempura)', 'Unagi-don (grillattu ankerias riisillä)', 'Matcha-tee-jäätelö']
  },
  {
    date: 'Sunnuntai 28.04',
    dishes: ['California-maki (avocado, kurkku ja krabba)', 'Shumai (höyrytettyä japanilaista dumplingia)', 'Matcha-tee']
  }
];

function createMenuHTML(menu) {
  let menuHTML = `<h2>${menu.date}</h2>`;
  for (let dish of menu.dishes) {
    menuHTML += `<p>${dish}</p>`;
  }
  return menuHTML;
}

const todaysMenuSection = document.getElementById('todays-menu');


const currentDate = new Date();
const currentDateString = currentDate.toLocaleDateString('fi-FI', { weekday: 'long', day: '2-digit', month: '2-digit' });

console.log(currentDateString);

const todaysMenu = menuData.find(menu => menu.date.toLowerCase() === currentDateString.toLowerCase());

if (todaysMenu) {
  todaysMenuSection.innerHTML = createMenuHTML(todaysMenu);
} else {
  todaysMenuSection.innerHTML = '<p>Ei menua tälle päivälle.</p>';
}
