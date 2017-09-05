console.log('Loaded!');

//



// Move the image
var img = document.getElementById('madi');
var marginleft = 0;
function moveright () {
    marginleft = marginleft + 5;
    img.style.marginleft = marginleft +'px';
}
img.onclick = function () {
    var interval = setinterval(moveright,100);
};

