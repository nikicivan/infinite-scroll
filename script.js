const imgContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];

//Unsplash API
let count = 5;
const apiKey = 'Srh4Cr-G4VeBLEwkM4r_yV5IGbCTrVM6w2cqzDfFA1c';  
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imageLoaded() {    
    imagesLoaded ++;    
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true; 
        count = 30;            
    }
};

//Helper function to set attribute on DOM elements
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
};

//Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;   
    
    //Run function for each object in photos Array
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');        
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        //Create <img> for photo
        const img = document.createElement('img');        
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        //Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        //Put <img> inside <a>, then put both inside image-container element
        item.appendChild(img);
        imgContainer.appendChild(item);
    });
};

//Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();  
        displayPhotos();     
    } catch (error) {
        console.log(error);
    }
};

//Check to see if scrolling near bottom of page, Load more Page
window.addEventListener('scroll', () => {
   if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {    
    getPhotos();    
   }
})

//On load
getPhotos();