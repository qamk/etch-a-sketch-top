"use strict";
const stepper = document.querySelector('#stepper');
const parentDiv = document.querySelector('.grid-container');
const clear = document.querySelector('#clear');
const crazyPalette = document.querySelector('#random');
const darken = document.querySelector('#darken');
let colour = '';
let isDarken = false;


let random = (n) => Math.floor(Math.random()*n);

//opacity allows this darkenColour to work with random colours as well
function darkenColour (opacity) {
    opacity = +opacity;
    if (!(opacity == 1)) {
        opacity += (0.1*10)/10; //due to the fp representation approximations
        return opacity.toString();
    }
    opacity = "";
}

function setRandomColour () {
    colour = `rgb(${random(256)},${random(256)},${random(256)})`;
}

function draw (e) {
    let newStyle = e.target.style;
    if (isDarken) {
        if (!newStyle.backgroundColor) {return}
        let opacity= darkenColour(newStyle.opacity);
        newStyle.opacity = opacity;
        return;
    }
    newStyle.backgroundColor = colour;   
}

function clearGrid () {
    let numChildren = parentDiv.childNodes.length;
    let children = parentDiv.childNodes;
    for (let i=0;i<=numChildren;i++) {
        if (!children[i]) {continue;}
        children[i].style.backgroundColor="rgba(0,0,0,0)";
        children[i].style.opacity = "";
    }
}

function deleteGrid (){
    let numChildren = parentDiv.childNodes.length;
    for (let i=1;i<=numChildren;i++) {
        parentDiv.removeChild(parentDiv.firstChild)
    }
}

function createGrid (e) {
    const size = e.target.value;
    colour = 'black';
    if (size >100) {
        alert("Invalid size, make sure the size is between 2 and 100.");
        return;
    }
    const gridSize = `repeat(${size},1fr)`;
    deleteGrid();
    for (let i=1;i<=size**2;i++) {
        const newDiv = document.createElement('div');
        newDiv.addEventListener('mouseenter', draw);
        parentDiv.appendChild(newDiv);

    }
    parentDiv.style.gridTemplateRows = gridSize;
    parentDiv.style.gridTemplateColumns = gridSize; 
}

stepper.addEventListener('change',createGrid);
clear.addEventListener('click',clearGrid);
crazyPalette.addEventListener('click',setRandomColour);
darken.addEventListener('click', function (e) {
    isDarken = !isDarken;
    let darkenStyle=e.target.style; //easier to tell when isDarken is true/false
    if (darkenStyle.border=="1px solid #ccb6b6"||darkenStyle.border=="1px solid rgb(204, 182, 182)"||darkenStyle.border=="") {
        darkenStyle.border = "1px solid #b40101";
    }
    else {darkenStyle.border="1px solid #ccb6b6";}
});