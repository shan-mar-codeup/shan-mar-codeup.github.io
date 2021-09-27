"use strict"

function renderCoffee(coffee) {
    let html = '<div class="coffee" id=">';
    html += coffee.id + '"><h5>' + coffee.name + '</h5>';
    html += '<p>' + coffee.roast + '</p>';
    html += '</div>';

    return html;
}

function renderCoffees(coffees) {
    if (localStorage.getItem('coffees')) {
        coffees = JSON.parse(localStorage.getItem('coffees'));
    }
    let htmlOdd = '', htmlEven = '';
    for(let i = 0; i < coffees.length; i++) {
        if (i % 2 === 0) {
            htmlEven += renderCoffee(coffees[i]);
        } else {
            htmlOdd += renderCoffee(coffees[i]);
        }
    }
    return '<div id="coffees-even">' + htmlEven + '</div><div id="coffees-odd">' + htmlOdd + '</div>';
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    let selectedRoast = roastSelection.value;
    let coffeeInput = coffeeName.value;
    let filteredCoffees = [];

    coffees.forEach(function(coffee) {
        if (selectedRoast === "all" && coffeeInput === "") {
            filteredCoffees.push(coffee);
        } else if (selectedRoast === coffee.roast && coffeeInput.toLowerCase() === coffee.name.toLowerCase()) {
            filteredCoffees.push(coffee);
        } else if (selectedRoast === coffee.roast && coffeeInput === "") {
            filteredCoffees.push(coffee);
        } else if (coffeeInput.toLowerCase() === coffee.name.toLowerCase()) {
            filteredCoffees.push(coffee);
        }
    });

    coffeeTable.innerHTML = renderCoffees(filteredCoffees);
}


function displayCoffeeByName() {
    let coffeeInput = coffeeName.value;
    let filteredCoffees = [];

    coffees.forEach(function(coffee) {
        if (coffee.name.toLowerCase().includes(coffeeInput.toLowerCase())) {
            filteredCoffees.push(coffee);
        }
    });

    coffeeTable.innerHTML = renderCoffees(filteredCoffees);
}

function displayCoffeeByRoast() {
    let selectedRoast = roastSelection.value;
    let filteredCoffees = [];

    coffees.forEach(function(coffee) {
        if (selectedRoast === "all") {
            filteredCoffees.push(coffee);
        } else if (selectedRoast === coffee.roast) {
            filteredCoffees.push(coffee);
        }
    });

    coffeeTable.innerHTML = renderCoffees(filteredCoffees);
}

// function addNewCoffee(input) {
//     input.preventDefault(); // don't submit the form, we just want to update the data
//     let coffeeAdded = {name: coffeeName2.value, roast: roast.value};
//
//     coffees.unshift(coffeeAdded);
//     coffees.slice(1).forEach(function(coffee) {
//         if (coffeeAdded.name.toLowerCase() === coffee.name.toLowerCase() && coffeeAdded.roast.toLowerCase() === coffee.roast.toLowerCase()) {
//             coffees.shift(coffeeAdded);
//         }
//     });
//
//     coffeeTable.innerHTML = renderCoffees(coffees);
// }

function addNewCoffee(event) {
    event.preventDefault(); // don't submit the form, we just want to update the data
    let coffeeName = coffeeName2.value.slice(0, 1).toUpperCase() + coffeeName2.value.slice(1).toLowerCase();
    let coffeeAdded = {id: coffees.length + 1, name: coffeeName, roast: roast.value.toLowerCase()};

    function isInList() {
        for (let i = 0; i < coffees.length; i++) {
            if (coffees[i].name.toLowerCase() === coffeeAdded.name.toLowerCase() && coffees[i].roast.toLowerCase() === coffeeAdded.roast.toLowerCase()) {
                console.log("found it in the list!");
                return true;
            }
        }
    }

    if (!isInList()) {
        coffees.unshift(coffeeAdded);
    }

    localStorage.setItem("coffees",JSON.stringify(coffees));

    coffeeTable.innerHTML = renderCoffees(coffees);
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
let coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

let coffeeTable = document.querySelector('#coffees');
let submitButton = document.querySelector('#submit');
let submitButton2 = document.querySelector('#submit2');
let roastSelection = document.querySelector('#roast-selection');
let coffeeName = document.querySelector('#coffee-name');
let coffeeName2 = document.querySelector('#name');
let roast = document.querySelector('#roast');

coffeeTable.innerHTML = renderCoffees(coffees);

submitButton.addEventListener('click', updateCoffees);
submitButton2.addEventListener('click', addNewCoffee);
coffeeName.addEventListener("input", displayCoffeeByName);
roastSelection.addEventListener("change", displayCoffeeByRoast);

