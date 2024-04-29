// Dummy data
const menuData = [
  {
    date: 'Maanantai 29.04.',
    dishes: ['Sushilajitelma (6 kappaletta)', 'Wakame-merileväsalatti', 'Kanatempura', 'Lohiavocado-rullat']
  },
  {
    date: 'Tiistai 30.04.',
    dishes: ['Miso-keitto', 'Sashimi-lajitelma (9 kappaletta)', 'Yakitori (kanavarras)']
  },
  {
    date: 'Keskiviikko 01.05.',
    dishes: ['Nigiri-lajitelma (8 kappaletta)', 'Gyudon (naudanliharuoka riisillä)', 'Vihreä tee -jäätelö']
  },
  {
    date: 'Torstai 02.05.',
    dishes: ['Sake-makirulla (lohirulla)', 'Yasai itame (wokattuja vihanneksia)', 'Edamame (soijapavut)']
  },
  {
    date: 'Perjantai 03.05.',
    dishes: ['Chirashi-zushi (kulho täytetty sushiriisillä ja raaka-aineilla)', 'Okonomiyaki (japanilainen ruokalaji, "suuri paistettu asia")', 'Melonipallo (hedelmäjälkiruoka)']
  },
  {
    date: 'Lauantai 04.05.',
    dishes: ['Tempura-annos (katkarapu- ja vihannes-tempura)', 'Unagi-don (grillattu ankerias riisillä)', 'Matcha-tee-jäätelö']
  },
  {
    date: 'Sunnuntai 06.05.',
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
const currentDateString = currentDate.toLocaleDateString('fi-FI', { day: '2-digit', month: '2-digit' });

console.log(currentDateString);

const todaysMenu = menuData.find(menu => {
  const menuDate = menu.date.split(' ')[1]; // This will get the date part after the weekday
  return menuDate === currentDateString;
});

if (todaysMenu) {
  todaysMenuSection.innerHTML = createMenuHTML(todaysMenu);
} else {
  todaysMenuSection.innerHTML = '<p>Ei menua tälle päivälle.</p>';
}


let INSTAGRAM_API_KEY;

fetch('http://127.0.0.1:3000/api/instagram-key')
  .then(response => response.json())
  .then(data => {
    INSTAGRAM_API_KEY = data.key;
    //console.log('Data from server:', data); // Add this line
    //console.log('Instagram API Key:', INSTAGRAM_API_KEY);
  })
  .catch(error => console.error('Error:', error));

const instagramSection = document.getElementById('instagram');

async function getInstagramData() {
  const responseKey = await fetch('http://127.0.0.1:3000/api/instagram-key');
  const dataKey = await responseKey.json();
  const INSTAGRAM_API_KEY = dataKey.key;

  const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url&access_token=${INSTAGRAM_API_KEY}`);
  const data = await response.json();
  console.log('Instagram data:', data);
  return data;
}

getInstagramData().then(data => {
  data.data.forEach(item => {
    if (item.media_type === 'IMAGE') {
      const img = document.createElement('img');
      img.src = item.media_url;
      img.alt = item.caption || 'Instagram image';

      const caption = document.createElement('p'); // Create a new paragraph element for the caption
      caption.textContent = item.caption || ''; // Set the text content to the caption

      const container = document.createElement('div'); // Create a new div element to contain the image and caption
      container.appendChild(img);
      container.appendChild(caption);

      instagramSection.appendChild(container); // Append the container to the Instagram section
    }
  });
}).catch(error => {
  console.error('Error:', error);
});
