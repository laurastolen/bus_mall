'use strict';

// create array to store all the products
var allProducts = [];

// create array to store the random selection of 3 products
var randomProducts = [];

// create const maxclickcounter
const MAXCLICKCOUNTER = 5;

// create counter of user clicks
var clickCounter = 0;

// create constructor fx for products
var Product = function (name, image) {
  this.name = name;
  this.image = image;
  this.timesClicked = 0;
  this.timesDisplayed = 0;

  this.markAsClicked = function () {
    this.timesClicked++;
  };

  this.render = function (domRef) {
    domRef.src = image;
  };

  allProducts.push(this);
};

// create all the new instances
var bag = new Product('bag', './img/bag.jpg');
var banana = new Product('banana', './img/banana.jpg');
var bathroom = new Product('bathroom', './img/bathroom.jpg');
var boots = new Product('boots', './img/boots.jpg');
var breakfast = new Product('breakfast', './img/breakfast.jpg');
var bubblegum = new Product('bubblegum', './img/bubblegum.jpg');
var chair = new Product('chair', './img/chair.jpg');
var cthulhu = new Product('cthulhu', './img/cthulhu.jpg');
var dogduck = new Product('dog-duck', './img/dog-duck.jpg');
var dragon = new Product('dragon', './img/dragon.jpg');
var pen = new Product('pen', './img/pen.jpg');
var petsweep = new Product('pet-sweep', './img/pet-sweep.jpg');
var scissors = new Product('scissors', './img/scissors.jpg');
var shark = new Product('shark', './img/shark.jpg');
var sweep = new Product('sweep', './img/sweep.png');
var tauntaun = new Product('tauntaun', './img/tauntaun.jpg');
var unicorn = new Product('unicorn', './img/unicorn.jpg');
var usb = new Product('usb', './img/usb.gif');
var watercan = new Product('water-can', './img/water-can.jpg');
var wineglass = new Product('wine-glass', './img/wine-glass.jpg');

// create domref
var placeholder0 = document.getElementById('placeholder-0');
var placeholder1 = document.getElementById('placeholder-1');
var placeholder2 = document.getElementById('placeholder-2');

// create fx to generate rando from 0-49
function getRandomIndex() {
  return Math.floor(Math.random() * (allProducts.length));
}

// create fx to select3objectindicesandrender
function get3ProductsAndRender() {
  randomProducts = [];
  // we want to display an array of *3* random products
  while (randomProducts.length < 3) {
    var nextRandomNum = getRandomIndex();
    if (!randomProducts.includes(nextRandomNum)) {
      randomProducts.push(nextRandomNum);
    }
  }
  // invariance: at this point we have an array of 3 random object indices
  // we need to increase each object's timeDisplayed:
  for (var i = 0; i < randomProducts.length; i++) {
    allProducts[randomProducts[i]].timesDisplayed++;
  }

  allProducts[randomProducts[0]].render(placeholder0);
  allProducts[randomProducts[1]].render(placeholder1);
  allProducts[randomProducts[2]].render(placeholder2);
}

// create fx clicknumber
function clickManager(event) {
  clickCounter++;
  if (clickCounter <= MAXCLICKCOUNTER) {
    var randomProductIndex;

    if (event.target.id === 'placeholder-0') {
      randomProductIndex = 0;
    } else if (event.target.id === 'placeholder-1') {
      randomProductIndex = 1;
    } else if (event.target.id === 'placeholder-2') {
      randomProductIndex = 2;
    } else {
      alert('click on the pictures!');
    }

    var clickedProduct = allProducts[randomProducts[randomProductIndex]];
    clickedProduct.markAsClicked();
    get3ProductsAndRender();
  } else {
    renderResults();
  }
}


// add event listeners to each placeholder
placeholder0.addEventListener('click', clickManager);
placeholder1.addEventListener('click', clickManager);
placeholder2.addEventListener('click', clickManager);


function renderResults() {
  var resultsDiv = document.getElementById('results');
  var resultsList = document.createElement('ul');
  for (var i = 0; i < allProducts.length; i++) {
    var resultsLi = document.createElement('li');
    resultsLi.textContent = `${allProducts[i].name} had ${allProducts[i].timesClicked} votes and was shown ${allProducts[i].timesDisplayed} times.`
    resultsList.append(resultsLi);
  }
  resultsDiv.append(resultsList);
}






get3ProductsAndRender();
// clickManager();
// renderResults();
