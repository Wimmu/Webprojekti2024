const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // padStart will add a leading 0 if the month is a single digit
const day = String(currentDate.getDate()).padStart(2, '0'); // padStart will add a leading 0 if the day is a single digit
const currentDateString = `${year}-${month}-${day}`;
function createMenuHTML(menu) {
  const foodItems = menu.food_items.split(', ').join('<br>');

  return `
    <h2>Today's menu</h2>
    <p>${foodItems}</p>
  `;
}
fetch("https://10.120.32.75/app/api/v1/menu/" + currentDateString)
  .then((response) => {
    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }
    return response.json();
  })
  .then((menuData) => {
    const todaysMenu = menuData.find((menu) => {
      //console.log('Menu:', menu);
      if (!menu.day) {
        console.error("Menu does not have a day property:", menu);
        return false;
      }
      return menu.day === currentDateString;
    });
    const todaysMenuSection = document.getElementById("todays-menu");
    //console.log('Todays menu:', todaysMenu);
    if (todaysMenu) {
      todaysMenuSection.innerHTML = createMenuHTML(todaysMenu);
    } else {
      todaysMenuSection.innerHTML = "<p>Ei menua tälle päivälle.</p>";
    }
  })
  .catch((error) => console.error("Error:", error));


let INSTAGRAM_API_KEY;

fetch("https://10.120.32.75/app/api/instagram-key")
  .then((response) => response.json())
  .then((data) => {
    INSTAGRAM_API_KEY = data.key;
    //console.log('Data from server:', data); // Add this line
    //console.log('Instagram API Key:', INSTAGRAM_API_KEY);
  })
  .catch((error) => console.error("Error:", error));

const instagramSection = document.getElementById('instagram');

async function getInstagramData() {
  const responseKey = await fetch('https://10.120.32.75/app/api/instagram-key');
  const dataKey = await responseKey.json();
  const INSTAGRAM_API_KEY = dataKey.key;

  const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url&access_token=${INSTAGRAM_API_KEY}`);
  const data = await response.json();
  //console.log('Instagram data:', data);
  return data;
}

getInstagramData().then(data => {
  const instapicsDiv = document.getElementById('instapics'); // Get the #instapics div

  // Get the 9 newest posts
  const newestPosts = data.data.slice(0, 9);

  newestPosts.forEach(item => {
    if (item.media_type === 'IMAGE') {
      const img = document.createElement('img');
      img.src = item.media_url;
      img.alt = item.caption || 'Instagram image';

      const caption = document.createElement('p'); // Create a new paragraph element for the caption
      caption.textContent = item.caption || ''; // Set the text content to the caption
      caption.classList.add('caption'); // Add a class to the caption

      const container = document.createElement('div'); // Create a new div element to contain the image and caption
      container.classList.add('img-container'); // Add a class to the container
      container.appendChild(img);
      container.appendChild(caption);

      instapicsDiv.appendChild(container); // Append the container to the #instapics div
    }
  });
}).catch(error => {
  console.error('Error:', error);
});
