const images = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg"];
const chosenImage = images[Math.floor(Math.random() * images.length)];

const body = document.body;
body.style.backgroundImage = `url(img/${chosenImage})`;