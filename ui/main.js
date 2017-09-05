console.log('Loaded!');

//change the tect of the main-text div
var element = document.getElementById("main-text");

element.innerHTML = 'new text';

// Move the image
var img = document.getElementById('madi');
var marginLeft = 0;
function moveRight () {
    marginLeft = marginLeft + 5;
    img.style.marginLeft = marginLeft +'px';
}
img.onclick = function () {
    var interval = setInterval(moveRight, 100);
};


