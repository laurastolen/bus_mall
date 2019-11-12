'use strict';

// create array to store all the products
var allProducts = [];

// create array to store the random selection of 3 products
var randomProducts = [];

// create const maxclickcounter
const MAXCLICKCOUNTER = 6;

// create counter of user clicks
var clickCounter = 0;

// create constructor fx for products
var Product = function (name, image) {
  this.name = name;
  this.image = image;
  this.timesClicked = 0;
  this.timesDisplayed = 0;
  // this.successRate = this.calcPercent();
  // this.calcPercent = function () {
  //   var percentClicked = 100 * (this.timesClicked / this.timesDisplayed);
  //   return percentClicked;
  // };

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
// trying to create a loop to make this display any number of images
// previously just had the following three lines:
var placeholder0 = document.getElementById('placeholder-0');
var placeholder1 = document.getElementById('placeholder-1');
var placeholder2 = document.getElementById('placeholder-2');


var numToDisplay = 3;
// var placeholderArray = [];
// for (var i = 0; i < numToDisplay; i++) {
//   var imageDiv = document.createElement('div');
//   imageDiv.innerHTML = '<img id="' + i + '" src="" alt="">';
//   var placeholder = document.getElementById('i');
//   console.log(placeholder);
//   placeholderArray.push(placeholder);
// }





// create fx to generate rando from 0-49
function getRandomIndex() {
  return Math.floor(Math.random() * (allProducts.length));
}

// create fx to select3objectindicesandrender
function get3ProductsAndRender() {
  // var tempArray = [];
  randomProducts = [];
  // we want to display an array of *3* random products
  while (randomProducts.length < numToDisplay) {
    var nextRandomNum = getRandomIndex();
    if (!randomProducts.includes(nextRandomNum)) {
      randomProducts.push(nextRandomNum);
    }
  }
  // tempArray = randomProducts;
  // invariance: at this point we have an array of 3 random object indices
  // we need to increase each object's timesDisplayed:
  for (var i = 0; i < randomProducts.length; i++) {
    allProducts[randomProducts[i]].timesDisplayed++;
  }
  allProducts[randomProducts[0]].render(placeholder0);
  allProducts[randomProducts[1]].render(placeholder1);
  allProducts[randomProducts[2]].render(placeholder2);
  // // try as a loop instead to correspond with looped placeholder:
  //   for (var j = 0; i < numToDisplay; j++) {
  //     allProducts[randomProducts[j]].render(placeholderArray[j]);
  //   }


  // return tempArray;
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

    // var idOfClickedPic = event.target.id

    var clickedProduct = allProducts[randomProducts[randomProductIndex]];
    clickedProduct.markAsClicked();
    get3ProductsAndRender();
  } else {
    // for(var i = 0; i < allProducts.length; i++) {
    //   percentClicked allProducts[i].successRate;

    // }

    placeholder0.removeEventListener('click', clickManager);
    placeholder1.removeEventListener('click', clickManager);
    placeholder2.removeEventListener('click', clickManager);
    createResultsChart();
  }
}

// add event listeners to each placeholder
placeholder0.addEventListener('click', clickManager);
placeholder1.addEventListener('click', clickManager);
placeholder2.addEventListener('click', clickManager);

// we are no longer calling this function -- using chart instead
function renderResultsList() {
  var resultsList = document.getElementById('results');
  for (var i = 0; i < allProducts.length; i++) {
    var resultsLi = document.createElement('li');
    resultsLi.textContent = `${allProducts[i].name} had ${allProducts[i].timesClicked} votes and was shown ${allProducts[i].timesDisplayed} times.`;
    resultsList.append(resultsLi);
  }
}

get3ProductsAndRender();

function createResultsChart() {
  var productsArray = [];
  var clickArray = [];
  var shownArray = [];
  var percentClicked = [];

  for (var i = 0; i < allProducts.length; i++) {
    productsArray.push(allProducts[i].name);
    clickArray.push(allProducts[i].timesClicked);
    shownArray.push(allProducts[i].timesDisplayed);
    percentClicked.push((allProducts[i].timesClicked) / (allProducts[i].timesDisplayed) * 100);
  }

  var context = document.getElementById('chart').getContext('2d');
  Chart.defaults.global.defaultFontColor = 'black';
  var resultsChart = new Chart(context, {
    type: 'bar',
    data: {
      labels: productsArray,
      datasets: [
        {
          label: 'Product Clicks',
          yAxisID: 'A',
          data: clickArray,
          backgroundColor: 'rgb(255,99,132)',
          borderColor: 'rgb(255,299,132)',
        },
        {
          label: 'Number of Times Shown',
          yAxisID: 'A',
          data: shownArray,
          backgroundColor: 'rgb(0,15,299)',
          borderColor: 'rgb(100,20,35)',
        },
        {
          label: 'Overall Success Rate',
          yAxisID: 'B',
          data: percentClicked,
          backgroundColor: 'rgb(20,200,100)',
          borderColor: 'rgb(300,200,100)',
        }
      ],
    },
    options: {
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Product Name',
          },
          gridLines: {
            display: false,
          },
        }],
        yAxes: [{
          gridLines: {
            display: false,
          },
          scaleLabel: {
            display: true,
            labelString: 'Times Shown and Clicked',
          },
          id: 'A',
          type: 'linear',
          position: 'left',
          ticks: {
            max: 8,
            min: 0,
          },
        }, {
          scaleLabel: {
            display: true,
            labelString: 'Total Success Rate',
          },
          id: 'B',
          type: 'linear',
          position: 'right',
          ticks: {
            max: 100,
            min: 0,
          },
        }
        ],

      },
    },
  });
}
