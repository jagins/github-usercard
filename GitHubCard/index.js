/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/
const cardContainer = document.querySelector('.cards');
axios.get("https://api.github.com/users/jagins")
.then((result) => 
{
  cardContainer.appendChild(createNewCard(result));
}).catch((err) => 
{
  console.log('The data was not returned', err);
});

const followersArray = 
[
  "https://api.github.com/users/Katrina-Dierking", 
  "https://api.github.com/users/Judson00",
  "https://api.github.com/users/davebettswebdev",
  "https://api.github.com/users/PHONGdotTech",
  "https://api.github.com/users/acarrillo3",
  "https://api.github.com/users/anamonteiro430"
];

for(let i = 0; i < followersArray.length; i++)
{
  axios.get(followersArray[i])
  .then((result) => 
  {
    cardContainer.appendChild(createNewCard(result));
  }).catch((err) => 
  {
    console.log('The data was not returned, err');
  });
}
/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />*
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
function createNewCard(obj)
{
  const cardDiv = document.createElement('div'),
        cardImg = document.createElement('img'),
        cardInfoDiv = document.createElement('div'),
        cardH3 = document.createElement('h3'),
        cardPUser = document.createElement('p'),
        cardPLoc = document.createElement('p'),
        cardProfileP = document.createElement('p'),
        cardALink = document.createElement('a'),
        cardPFollower = document.createElement('p'),
        cardPFollowing = document.createElement('p'),
        cardPBio = document.createElement('p');

  cardDiv.classList.add('card');
  cardInfoDiv.classList.add('card-info');
  cardH3.classList.add('name');
  cardPUser.classList.add('username');

  cardImg.src = obj.data.avatar_url;
  cardH3.textContent = obj.data.name;
  cardPUser.textContent = obj.data.login;
  cardProfileP.textContent = `Profile: `;
  cardALink.href = obj.data.html_url;
  cardALink.textContent = obj.data.html_url;
  cardPFollower.textContent = `Followers: ${obj.data.followers}`;
  cardPFollowing.textContent = `Following: ${obj.data.following}`;
  
  if(obj.data.bio === null)
  {
    cardPBio.textContent = `Bio: ${obj.data.name} needs to fill this in on Github`;
  }
  else
  {
    cardPBio.textContent = `Bio: ${obj.data.bio}`;
  }

  if(obj.data.location === null)
  {
    cardPLoc.textContent = 'Location: Unknown';

  }
  else
  {
    cardPLoc.textContent = `Location: ${obj.data.location}`;
  }

  cardDiv.appendChild(cardImg);
  cardDiv.appendChild(cardInfoDiv);
  cardInfoDiv.appendChild(cardH3);
  cardInfoDiv.appendChild(cardPUser);
  cardInfoDiv.appendChild(cardPLoc);
  cardInfoDiv.appendChild(cardProfileP);
  cardProfileP.appendChild(cardALink);
  cardInfoDiv.appendChild(cardPFollower);
  cardInfoDiv.appendChild(cardPFollowing);
  cardInfoDiv.appendChild(cardPBio);

  return cardDiv;
}