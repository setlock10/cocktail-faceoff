// index.js
//
//Global variables
//const url ="https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15106"
const url ="https://www.thecocktaildb.com/api/json/v1/1/random.php"
const imgDrink1=document.querySelector('#cocktail-1-image')
const h2Drink1=document.querySelector('#cocktail-1-text')
const imgDrink2=document.querySelector('#cocktail-2-image')
const h2Drink2=document.querySelector('#cocktail-2-text')



//  page load
document.addEventListener('DOMContentLoaded',()=>{
    getDrink(imgDrink1,h2Drink1)
    getDrink(imgDrink2,h2Drink2)
 })

// Fetch a drink
function getDrink(img,h2){

    fetch(url)
        .then(res=>res.json())
        .then(data=>{
            //drink=data.drinks[0]
            //console.log(data)
            img.src=data.drinks[0].strDrinkThumb
            img.width=330
            h2.textContent=data.drinks[0].strDrink
        })
        .catch(e=>console.error(e))
}

function renderDrink(drink){
    //console.log(drink)
    //drink1=drink
}

