// index.js
//
//Global variables
//const url ="https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15106"
const url ="https://www.thecocktaildb.com/api/json/v1/1/random.php"
const imgDrink1=document.createElement('img')
const divDrink1=document.querySelector('#cocktail-1')
const h2Drink1=document.createElement('h2')


// Fetch on Page load
document.addEventListener('DOMContentLoaded',()=>{
    fetch(url)

        .then(res=>res.json())
        .then(data=>{
            console.log(data.drinks[0])
            imgDrink1.src=data.drinks[0].strDrinkThumb
            imgDrink1.width=300
            h2Drink1.textContent=data.drinks[0].strDrink
            divDrink1.append(h2Drink1)
            divDrink1.append(imgDrink1)


        })
        .catch(e=>console.error(e))
 




})


