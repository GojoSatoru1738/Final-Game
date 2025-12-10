const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "Skybox.png";  

img.onload = function () {
    ctx.drawImage(img, 0, 0);  
};
