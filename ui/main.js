console.log('Loaded!');

//change the tect of the main-text div
var element = document.getElementById("main-text");

element.innerHTML = 'new text';

// Move the image
var img = document.getElementById("madi");
img.onclick = function () {
    img.style.marginleft = '100px';
};




