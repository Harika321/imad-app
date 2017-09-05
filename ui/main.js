console.log('Loaded!');

//change the tect of the main-text div
var element = document.getElementById("main-text");

element.innerHTML = 'new text';

// Move the image
var img = document.getElementById('madi');
var marginleft = 0;
function moveright () {
    marginleft = marginleft + 5;
    img.style.marginleft = marginleft +'px';
}
img.onclick = function () {
    var interval = setInterval(moveright,100);
};


