"use strict"

/**
 * Global Variables
 */

let oddDuckProductsContainer; //HTML element for duck products
let resultButton; // a button to show results 
let image1; // an image element
let image2; //an image element
let image3; // an image element
let allOddDuckProductsArray=[]; //an array of duck products
let click=0; // the number of the user clicks
let maxClicksAllowed= 25; // the maximum number of clicks
let viewButton;
let previousSet = [];
let currentSet= [];
let oddDuckProducts;



const oddDuckProductsArray = [ 'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'water-can.jpg',
  'wine-glass.jpg',];
const str = 'banana.jpg';
if (oddDuckProductsArray.indexOf(str) === -1) {
  oddDuckProductsArray.push(str);
}
console.log(oddDuckProductsArray);


/**
 * odd duck products Objects (data/ model objects
 */

// constructor for duck products
function OddDuckProducts(name, src) {
  this.name= name;
  this.src= src;
  this.views= 0;
  this.clicks= 0;
}
/**
 * View logic
 */

// draw three random duck products on the page

function render() {
  //get three random duck products 
  console.log("get three random duck products")
  let currentSet=[];
  for (let i = 0; i < 3; i++) {
    //get random index for each
    let index = getRandomOddDuckProductsIndex();
    while (previousSet.includes(index) || currentSet.includes(index)){
      index=getRandomOddDuckProductsIndex();
    }    
      currentSet.push(index);
  } //end for
  //update previous for next loop
  previousSet=currentSet

//set the image values
console.log(currentSet);
image1.src = allOddDuckProductsArray[currentSet[0]].src;
image1.alt = allOddDuckProductsArray[currentSet[0]].name;
image2.src = allOddDuckProductsArray[currentSet[1]].src;
image2.alt = allOddDuckProductsArray[currentSet[1]].name;
image3.src = allOddDuckProductsArray[currentSet[2]].src;
image3.alt = allOddDuckProductsArray[currentSet[2]].name;


// increment the view counts 
allOddDuckProductsArray [currentSet[0]].views++;
allOddDuckProductsArray [currentSet[1]].views++;
allOddDuckProductsArray [currentSet[2]].views++;
localStorage.setItem("products", JSON.stringify({"data": allOddDuckProductsArray}));
}

/**
 * Display the results of all the clicking 
 */
function renderResults() {
  console.log(`in renderResults()`);
  let ul= document.querySelector("ul");
  for(let i=0; i<allOddDuckProductsArray.length; i++){
    let oddDuckProducts= allOddDuckProductsArray[i];
    let li= document.createElement("li");
    li.textContent= `${oddDuckProducts.name} had ${oddDuckProducts.views} views and was clicked ${oddDuckProducts.clicks} times`;
    ul.appendChild(li);
  }
}




function renderChart(){
  console.log('in renderChart()');
  let oddDuckProductsNames=[];
  let oddDuckProductsClicks=[];
  let oddDuckProductsViews=[];
  for (let i =0; i < allOddDuckProductsArray. length; i++){
    oddDuckProductsNames.push(allOddDuckProductsArray[i].name);
    oddDuckProductsClicks.push(allOddDuckProductsArray[i].clicks);
    oddDuckProductsViews.push(allOddDuckProductsArray[i].views);
  }


  /*** Definining the data so it fits JSON chart format
   *
   */
  const oddDuckProductsData=
  {
    labels: oddDuckProductsNames,
    datasets:[
      {
        label:'Clicks',
        data: oddDuckProductsClicks,
        backgroundColor:['rgba(255,99,132,0.2)'],
        borderColor:['rgb(255,99,132)'],
        borderWidth:1,
      },
      {
        label:'Views',
        data: oddDuckProductsViews,
        backgroundColor:['rgba(255,99,122,0.2)'],
        borderColor:['rgb(255,99,132)'],
        borderWidth:1,


      },
    ],
  };
  // configuring graph
  const config ={
    type:'bar',
    data: oddDuckProductsData,
    options:{
        legend: {
          position: "bottom"
        }
      },
      scales:{
        y:{
          beginAtZero: true,
        },
      },
  }
  // reference the canvas element in html
  let canvasChart = document.getElementById('myChart');
  // draw chart
  const myChart = new Chart(canvasChart,config);
}



/**
 * control logic
 * initialize the global variable, set up needed event handlers, and perform the intial render
 */
function initialize() {
  console.log(`in initialize()`);
  //get intial reference to HTML elements
  oddDuckProductsContainer= document.querySelector("section");
  resultButton= document.querySelector("section+div");
  image1= document.querySelector("section img:first-child");
  image2= document.querySelector("section img:nth-child(2)");
  image3= document.querySelector("section img:nth-child(3)");
  viewButton=document.getElementById("viewButton");

  // instantiate duck products
  let result=localStorage.getItem("products");
  if (result===null) {
  allOddDuckProductsArray= [];
  allOddDuckProductsArray.push(new OddDuckProducts("bag", "./images/bag.jpg"));
  allOddDuckProductsArray.push(new OddDuckProducts("banana", "./images/banana.jpg"));
  allOddDuckProductsArray.push(new OddDuckProducts("bathroom", "./images/bathroom.jpg"));
  allOddDuckProductsArray.push(new OddDuckProducts("boots", "./images/boots.jpg"));
  allOddDuckProductsArray.push(new OddDuckProducts("breakfast", "./images/breakfast.jpg"));
  allOddDuckProductsArray.push(new OddDuckProducts("bubblegum", "./images/bubblegum.jpg"));
  allOddDuckProductsArray.push(new OddDuckProducts("chair", "./images/chair.jpg"));
  allOddDuckProductsArray.push(new OddDuckProducts("dog-duck", "./images/dog-duck.jpg"));
  allOddDuckProductsArray.push(new OddDuckProducts("dragon", "./images/dragon.jpg"));
  allOddDuckProductsArray.push(new OddDuckProducts("pen", "./images/pen.jpg"));
  allOddDuckProductsArray.push(new OddDuckProducts("pet-sweep", "./images/pet-sweep.jpg"));
  allOddDuckProductsArray.push(new OddDuckProducts("scissors", "./images/scissors.jpg"));
  allOddDuckProductsArray.push(new OddDuckProducts("shark", "./images/shark.jpg"));
  allOddDuckProductsArray.push(new OddDuckProducts("sweep", "./images/sweep.png"));
  allOddDuckProductsArray.push(new OddDuckProducts("tauntaum", "./images/tauntaun.jpg"));
  allOddDuckProductsArray.push(new OddDuckProducts("unicorn", "./images/unicorn.jpg"));
  allOddDuckProductsArray.push(new OddDuckProducts("water-can", "./images/water-can.jpg"));
  allOddDuckProductsArray.push(new OddDuckProducts("wine-glass", "./images/wine-glass.jpg"));
  localStorage.setItem("products", JSON.stringify({"data":allOddDuckProductsArray}));
  } else {
    allOddDuckProductsArray=JSON.parse(result).data;
  }

  //set any event handlers 

  oddDuckProductsContainer.addEventListener("click", handleOddDuckProductsClick);
  // perform the initial render
  render();
}

function handleOddDuckProductsClick(evt) {
  //test to see if we have clicked an image 
  if(evt.target === oddDuckProductsContainer){
    alert("Please click on an image");
  }
  click++;
  console.log(`in handleOddDuckProductsClick() click; ${click}`)
  //we don't know which random duck product was clicked, so loop through them to see if any match the event target

  let clickOddDuckProducts= evt.target.alt;
  for(let i=0; i<allOddDuckProductsArray.length; i++){
    if(clickOddDuckProducts === allOddDuckProductsArray[i].name) {
      allOddDuckProductsArray[i].clicks++;
      break;
    }
  }
  //see if we have made it to the maximum number of clicks
  if(click === maxClicksAllowed){
    console.log(`click=maxClicks`);
    //remove the event listener
    oddDuckProductsContainer.removeEventListener("click", handleOddDuckProductsClick);
    //enable the display button
    viewButton.addEventListener("click", renderResults);
    renderChart();
  } else {
    render();
  }
}

/**
 * returns a random index 
 */

function getRandomOddDuckProductsIndex() {
  return Math.floor(Math.random() * allOddDuckProductsArray.length);
}