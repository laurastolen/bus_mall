'use strict';

// create array to store all the products
var allProducts = [];

// create array to store the random selection of 3 products
var randomProducts = [];

//create const maxclickcounter
const MAXCLICKCOUNTER = 25;

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

// create fx clicknumber

// create 