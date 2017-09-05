console.log('Loaded!');

//change the tect of the main-text div
var element = document.getElementById("main-text");

element.innerHTML = 'new text';

// Move the image
var img = document.getElementById('madi');
var marginleft = 0;
function moveright () {
    
    if(marginleft != 200)
    {
    marginleft = marginleft + 5;
    img.style.marginRight = marginleft +'px';
    }
}
img.onclick = function () {
    var interval = setInterval(moveright, 100);
    
    
    // Counter code
var button = document.getElementById("counter");
var counter = 0;


button.onclick = function () {
    
    //Make a request to the counter endpoint
    
    //Capture the response and store it in a variable
    
    //Render the variable in the correct span
    counter = counter + 1;
    var span = document.getElementById("count");
    span.innerHTML = counter.toString();
}};


