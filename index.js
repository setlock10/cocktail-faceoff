// index.js
//
//Global variables
//const url ="https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15106"
const url ="https://www.thecocktaildb.com/api/json/v1/1/random.php"
const imgDrink1=document.querySelector('#cocktail-1-image')
const h2Drink1=document.querySelector('#cocktail-1-text')
const liDrink1_1=document.querySelector('#cocktail-1-recipe1')
const liDrink1_2=document.querySelector('#cocktail-1-recipe2')
const liDrink1_3=document.querySelector('#cocktail-1-recipe3')
const liDrink1_4=document.querySelector('#cocktail-1-recipe4')
const liDrink1_5=document.querySelector('#cocktail-1-recipe5')
const imgDrink2=document.querySelector('#cocktail-2-image')
const h2Drink2=document.querySelector('#cocktail-2-text')
const liDrink2_1=document.querySelector('#cocktail-2-recipe1')
const liDrink2_2=document.querySelector('#cocktail-2-recipe2')
const liDrink2_3=document.querySelector('#cocktail-2-recipe3')
const liDrink2_4=document.querySelector('#cocktail-2-recipe4')
const liDrink2_5=document.querySelector('#cocktail-2-recipe5')



//  page load
document.addEventListener('DOMContentLoaded',()=>{
    getDrink(imgDrink1,h2Drink1,liDrink1_1,liDrink1_2,liDrink1_3,liDrink1_4,liDrink1_5)
    getDrink(imgDrink2,h2Drink2,liDrink2_1,liDrink2_2,liDrink2_3,liDrink2_4,liDrink2_5)
 })

// Fetch a drink
function getDrink(img,h2,li1,li2,li3,li4,li5){

    fetch(url)
        .then(res=>res.json())
        .then(data=>{
            //drink=data.drinks[0]
            console.log(data.drinks[0])
            img.src=data.drinks[0].strDrinkThumb
            img.width=360
            h2.textContent=data.drinks[0].strDrink

            li1.textContent=`${data.drinks[0].strMeasure1} ${data.drinks[0].strIngredient1}`
            li2.textContent=`${data.drinks[0].strMeasure2} ${data.drinks[0].strIngredient2}`
            li3.textContent=`${data.drinks[0].strMeasure3} ${data.drinks[0].strIngredient3}`
            li4.textContent=`${data.drinks[0].strMeasure4} ${data.drinks[0].strIngredient4}`
            li5.textContent=`${data.drinks[0].strMeasure5} ${data.drinks[0].strIngredient5}`
            if(data.drinks[0].strIngredient1==null) {li1.remove()}
            if(data.drinks[0].strIngredient2==null) {li2.remove()}
            if(data.drinks[0].strIngredient3==null) {li3.remove()}
            if(data.drinks[0].strIngredient4==null) {li4.remove()}
            if(data.drinks[0].strIngredient5==null) {li5.remove()}



        })
        .catch(e=>console.error(e))
}

function renderDrink(drink){
    //console.log(drink)
    //drink1=drink
    
}

