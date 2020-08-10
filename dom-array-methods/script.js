const main = document.getElementById('main');

const addUser= document.getElementById('add-user');
const double = document.getElementById('double');
const showMill = document.getElementById('show-millionaires');
const sort = document.getElementById('sort');
const calculateWealth = document.getElementById('calculate-wealth');


let data = [];

//fetch random user and add money

async function getRandomUser(){
   const res = await fetch('https://randomuser.me/api');
   const data = await res.json();
   const user = data.results[0];
   
   const newUser ={
       name:`${user.name.first} ${user.name.last}`,
       money: Math.floor( Math.random() * 1000000 )
   }
   addData(newUser);
}

// Add the new object to data array

function addData(newUserObj){
    data.push(newUserObj);

    updateDOM();
}

//Update DOM
function updateDOM(providedData=data){
    // Clear Main Div
    main.innerHTML = '<h2> <strong>Person</strong> Wealth</h2>';
    
    providedData.forEach((user)=>{
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML= `<strong>${user.name}</strong> $${formatMoney(user.money)}`;
        main.appendChild(element);
    })
}

//Format number as money

function formatMoney(number){
    return (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Double Money 

function doubleMoney(){
    data = data.map ( user =>{
        return { ...user, money: user.money*2 }
    })
  
    updateDOM();
}

// Sort By Richest
function sortByRichest(){
    data.sort((a,b)=>b.money-a.money);
    updateDOM();
}

// Sort By Millioniers
function showMillOnly(){
    data = data.filter(user => user.money > 1000000);
    updateDOM();
}

// Calculate Entire Wealth
function calculateEntireWealth(){
    let wealth= data.reduce((preValue,curValue)=> preValue+curValue.money,0);
    
    const wealthElement = document.createElement('div');
    wealthElement.innerHTML=`<h3>Total Wealth:<strong> ${formatMoney(wealth)}</strong>  </h3>`
    main.appendChild(wealthElement);
}

// Event Listeners

addUser.addEventListener('click',()=>{
    getRandomUser();
})

double.addEventListener('click',()=>{
    doubleMoney()
});

sort.addEventListener('click', ()=>{
    sortByRichest();
})

showMill.addEventListener('click',()=>{
    showMillOnly();
})

calculateWealth.addEventListener('click',()=>{
    calculateEntireWealth();
})