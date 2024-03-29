'use strict';

var localProductData = 'localProductData';
var allProducts = [];
var randomProducts = [];
var clickCounter = 0;
const MAXCLICKCOUNTER = 25;

var Product = function (name, picture) {
  this.name = name;
  this.picture = picture;
  this.timesClicked = 0;
  this.timesDisplayed = 0;

  this.markAsClicked = function () {
    this.timesClicked++;
  };
  this.render = function (domRef) {
    domRef.src = this.picture;
  };
  this.loadData = function (data) {
    // the argument we pass in to this method will be a pre-parsed object
    this.timesClicked = data.timesClicked;
    this.timesDisplayed = data.timesDisplayed;
    this.name = data.name;
    this.picture = data.picture;
  };
};

if (localStorage.getItem(localProductData) === null) {
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

  allProducts.push(bag);
  allProducts.push(banana);
  allProducts.push(bathroom);
  allProducts.push(boots);
  allProducts.push(breakfast);
  allProducts.push(bubblegum);
  allProducts.push(chair);
  allProducts.push(cthulhu);
  allProducts.push(dogduck);
  allProducts.push(dragon);
  allProducts.push(pen);
  allProducts.push(petsweep);
  allProducts.push(scissors);
  allProducts.push(shark);
  allProducts.push(sweep);
  allProducts.push(tauntaun);
  allProducts.push(unicorn);
  allProducts.push(usb);
  allProducts.push(watercan);
  allProducts.push(wineglass);
} else {
  var jsonData = localStorage.getItem(localProductData);
  var data = JSON.parse(jsonData);

  for (var i = 0; i < data.length; i++) {
    var newProduct = new Product('', '');
    newProduct.loadData(data[i]);
    allProducts.push(newProduct);
  }
}

var placeholder0 = document.getElementById('placeholder-0');
var placeholder1 = document.getElementById('placeholder-1');
var placeholder2 = document.getElementById('placeholder-2');
var body = document.getElementById('body');

function getRandomIndex() {
  return Math.floor(Math.random() * (allProducts.length));
}


var tempArray = [];
function get3ProductsAndRender() {
  randomProducts = [];

  while (randomProducts.length < 3) {
    var nextRandomNum = getRandomIndex();

    if (!randomProducts.includes(nextRandomNum) && !tempArray.includes(nextRandomNum)) {
      randomProducts.push(nextRandomNum);
    }
  }
  for (var i = 0; i < randomProducts.length; i++) {
    allProducts[randomProducts[i]].timesDisplayed++;
  }
  allProducts[randomProducts[0]].render(placeholder0);
  allProducts[randomProducts[1]].render(placeholder1);
  allProducts[randomProducts[2]].render(placeholder2);
  tempArray = randomProducts;
  return tempArray;
}

function clickManager(event) {
  clickCounter++;

  if (clickCounter < MAXCLICKCOUNTER) {
    var randomProductIndex;

    if (event.target.id === 'placeholder-0') {
      randomProductIndex = 0;
    } else if (event.target.id === 'placeholder-1') {
      randomProductIndex = 1;
    } else if (event.target.id === 'placeholder-2') {
      randomProductIndex = 2;
    }

    var clickedProduct = allProducts[randomProducts[randomProductIndex]];
    clickedProduct.markAsClicked();
    get3ProductsAndRender();
  } else {
    placeholder0.removeEventListener('click', clickManager);
    placeholder1.removeEventListener('click', clickManager);
    placeholder2.removeEventListener('click', clickManager);
    saveDataLocally();
    createResultsChart();
  }
}

function bodyClickManager(event) {
  if (event.target.nodeName !== 'IMG') {
    alert('OMG would you please just click on the pictures!!');
  }
}

function saveDataLocally() {
  var jsonData = JSON.stringify(allProducts);
  localStorage.setItem(localProductData, jsonData);
}

placeholder0.addEventListener('click', clickManager);
placeholder1.addEventListener('click', clickManager);
placeholder2.addEventListener('click', clickManager);
body.addEventListener('click', bodyClickManager);

// this function was created for the first day of this lab, and it's no longer being used as we're using the chart instead
// function renderResultsList() {
//   var resultsList = document.getElementById('results');
//   for (var i = 0; i < allProducts.length; i++) {
//     var resultsLi = document.createElement('li');
//     resultsLi.textContent = `${allProducts[i].name} had ${allProducts[i].timesClicked} votes and was shown ${allProducts[i].timesDisplayed} times.`;
//     resultsList.append(resultsLi);
//   }
// }

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
