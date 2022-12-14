
// index.js
//
//Global variables
//const url ="https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15106"
const urlRandom ="https://www.thecocktaildb.com/api/json/v1/1/random.php"
const urlMargarita="https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita"
const urlDrinkRatings="https://fake-server-app-jjs2.herokuapp.com/drink_ratings"
const urlTotalRatings="https://fake-server-app-jjs2.herokuapp.com/total_ratings"
const urlLocalTotalRatings="./ratings.json/total_ratings"
const urlDrinkName="https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
let drinkWinner=1
var totalRatings 


// DOM Selectors
const imgDrink1=document.querySelector('#cocktail-1-image')
const h2Drink1=document.querySelector('#cocktail-1-text')
const h6Rating1=document.querySelector('#cocktail-1-rating')
const liDrink1_1=document.querySelector('#cocktail-1-recipe1')
const liDrink1_2=document.querySelector('#cocktail-1-recipe2')
const liDrink1_3=document.querySelector('#cocktail-1-recipe3')
const liDrink1_4=document.querySelector('#cocktail-1-recipe4')
const liDrink1_5=document.querySelector('#cocktail-1-recipe5')
const imgDrink2=document.querySelector('#cocktail-2-image')
const h2Drink2=document.querySelector('#cocktail-2-text')
const h6Rating2=document.querySelector('#cocktail-2-rating')
const liDrink2_1=document.querySelector('#cocktail-2-recipe1')
const liDrink2_2=document.querySelector('#cocktail-2-recipe2')
const liDrink2_3=document.querySelector('#cocktail-2-recipe3')
const liDrink2_4=document.querySelector('#cocktail-2-recipe4')
const liDrink2_5=document.querySelector('#cocktail-2-recipe5')
const divCocktail1=document.querySelector('#cocktail-1')
const divCocktail2=document.querySelector('#cocktail-2')
const olDrinkRatings =document.querySelector('#rank-list')
const li1=document.querySelector('#id1')
const li2=document.querySelector('#id2')
const li3=document.querySelector('#id3')
const li4=document.querySelector('#id4')
const li5=document.querySelector('#id5')
const divPopUpDrink=document.querySelector('#drink-pop-up')

const divFilter=document.querySelector('#filter')
const divDropdown=document.querySelector('#dropdown')

const cocktailThreeText=document.querySelector('#cocktail-3-text')
const li6=document.querySelector('#cocktail-3-recipe1')
const li7=document.querySelector('#cocktail-3-recipe2')
const li8=document.querySelector('#cocktail-3-recipe3')
const li9=document.querySelector('#cocktail-3-recipe4')
const li10=document.querySelector('#cocktail-3-recipe5')
const btnLikes1=document.querySelector('#btnLikes1')
const btnLikes2=document.querySelector('#btnLikes2')



var checkedVodka =true
var checkedGin = true
var checkedBourbon = true
var checkedWhiskey = true
var checkedTequilla = true




//  page load
document.addEventListener('DOMContentLoaded',()=>{
    //Populates the Cocktail Div Cards

    getDrink(urlRandom,imgDrink1,h2Drink1,liDrink1_1,liDrink1_2,liDrink1_3,liDrink1_4,liDrink1_5,h6Rating1,btnLikes1)
    getDrink(urlRandom,imgDrink2,h2Drink2,liDrink2_1,liDrink2_2,liDrink2_3,liDrink2_4,liDrink2_5,h6Rating2,btnLikes2)

    //Gets the current power rankings from ratings.json
 
    getTotalRankings()
    sortRankings()
    
 })



 function calcElo(h6Winner,h6Loser){
//test 2
//new comment 3
    let tempRating1=parseInt(h6Winner.textContent)
    let tempRating2=parseInt(h6Loser.textContent)
    let kFactor=50

    var prob1
    var prob2

   

    prob1 =(1.0/(1.0+ Math.pow(10,((tempRating2-tempRating1)/400))))
    prob2 =(1.0/(1.0+ Math.pow(10,((tempRating1-tempRating2)/400))))
    console.log(`Probalility 1: ${prob1.toFixed(3)*100}%`)
    console.log(`Probalility 2: ${prob2.toFixed(3)*100}%`)

    
    h6Winner.textContent=parseInt(tempRating1+kFactor*(1-prob1))
    h6Loser.textContent=parseInt(tempRating2+kFactor*(0-prob2))
 
 }

 imgDrink1.addEventListener('mouseover', (e)=>{
    imgDrink1.classList.add("glow")
    imgDrink1.setAttribute("style", "border-color:white;")
    
})

imgDrink1.addEventListener('mouseout', (e)=>{
    imgDrink1.classList.add("glow")
    imgDrink1.setAttribute("style", "border-color:blue;")
})

 imgDrink1.addEventListener('click',()=>{
    drinkWinner=1

    updateTotalRankings()

    console.log("chose drink "+drinkWinner)

    calcElo(h6Rating1,h6Rating2)

    updateDrinkRatings(divCocktail1,parseInt(h6Rating1.textContent))
    updateDrinkRatings(divCocktail2,parseInt(h6Rating2.textContent))
    

})


imgDrink2.addEventListener('mouseover', (e)=>{
    imgDrink2.classList.add("glow")
    imgDrink2.setAttribute("style", "border-color:white;")
    
})

imgDrink2.addEventListener('mouseout', (e)=>{
    imgDrink2.classList.add("glow")
    imgDrink2.setAttribute("style", "border-color:blue;")
})

imgDrink2.addEventListener('click',()=>{
    drinkWinner=2
    updateTotalRankings()

    console.log("chose drink "+drinkWinner)
    calcElo(h6Rating2,h6Rating1)

    updateDrinkRatings(divCocktail2,parseInt(h6Rating1.textContent))
    updateDrinkRatings(divCocktail1,parseInt(h6Rating1.textContent))
    

})

function sortRankings(){
    //console.log('going to sort')
    //const li = document.createElement('li')
    //olDrinkRatings.replaceChildren()
 
    fetch (urlDrinkRatings)
    .then(res=>res.json())
    .then(drinks=>{
        //console.log(drinks)
        drinks.sort((a,b)=> (a.powerRating>b.powerRating)?-1:1)
        //console.log(drinks)
        for (let i=0;i<5;i++){
            olDrinkRatings.children[i].textContent=`${drinks[i].powerRating} ${drinks[i].strDrink}`
            olDrinkRatings.children[i].addEventListener('click', ()=>{
                divPopUpDrink.classList.add("appear")
                getSingleDrink(drinks[i].strDrink)
                divPopUpDrink.addEventListener('click',()=>{
                    divPopUpDrink.classList.remove("appear")
                })
            })
        }

            
    })
    .catch(e=>console.error(e))

}




// Get the rated drinks 
function getDrinkRatings(h6Rating,drinkName){
    //h6Rating.textContent=parseInt(h6Rating.textContent)+125
    //console.log(h6Rating.textContent)
    let i = 0

    fetch (urlDrinkRatings)
    .then(res=>res.json())
    .then(drinks=>{
           
        //console.log(drinks)
        drinks.forEach(drink=>{
            //console.log(drink.strDrink)
            if(drink.strDrink==drinkName){
                
                h6Rating.textContent= drink.powerRating
                i=1;
            }
        })
        if(i==0){
            h6Rating.textContent=1500
        }
           
    })
    .catch(e=>console.error(e))

}



// Update the drink ratings
function updateDrinkRatings(div,score){
    //let drinkRatings =[]
    let i=0
    //console.log(div.children[0].textContent)

    fetch (urlDrinkRatings)
    .then(res=>res.json())
    .then(drinks=>{
           
        //console.log(drinks)
        drinks.forEach(drink=>{
            //console.log(drink.strDrink)
            if(drink.strDrink==div.children[0].textContent){
                
                patchDrinkRating(div.children[0].textContent,score,drink.id,drink.powerRating)
                i=1;
            }
        })
        if(i==0){
            postNewDrinkRating(div.children[0].textContent,score)
        }
           
    })
    .catch(e=>console.error(e))
    //totalRatings++;
}


function patchDrinkRating(drinkName,score,id,rating){
    //console.log(`${urlDrinkRatings}/${id}`)
    fetch(`${urlDrinkRatings}/${id}`,{
        method:'PATCH',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({"powerRating":score})
    })
            .then(res=>res.json())
            .then(data=>{
             })
            .catch(e=>console.error(e))

    

}

function postNewDrinkRating(drinkName,score){
    fetch(urlDrinkRatings,{
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ 
            "strDrink":drinkName,
            "powerRating":score
        })
    })
        .then(res=>res.json())
        .then(data=>{
            //location.reload()
            getDrink(urlRandom,imgDrink1,h2Drink1,liDrink1_1,liDrink1_2,liDrink1_3,liDrink1_4,liDrink1_5,h6Rating1,btnLikes1)
            getDrink(urlRandom,imgDrink2,h2Drink2,liDrink2_1,liDrink2_2,liDrink2_3,liDrink2_4,liDrink2_5,h6Rating2,btnLikes2)
        
            //Gets the current power rankings from ratings.json
         
            getTotalRankings()
            sortRankings()
                        })
        .catch(e=>console.error(e))




}


// Get the total rankings
function getTotalRankings(){
    fetch (urlTotalRatings)
    //fetch ("../ratings.json")   //implementing local json data
        .then(res=>res.json())
        .then(data=>{
            //console.log(data.total_ratings[0].total_ratings) //implementing local json data
            
            totalRatings=data[0].total_ratings
            console.log("total ratings from server "+totalRatings)
            //console.log(data)
        })
        .catch(e=>console.error(e))
        //totalRatings++;

}

function updateTotalRankings(){
    totalRatings++;
 
    fetch(urlTotalRatings+"/1",{
        method:'PATCH',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            "total_ratings":totalRatings
        })
    })
        .then(res=>res.json())
        .then(data=>{
            
        })
        .catch(e=>console.error(e))

    //console.log("updated total rankings "+totalRatings)


}

// Get a single drink
function getSingleDrink(drinkName){

    //console.log(urlRandom)
    //var url= urlDrinkName+drinkName
 
//    fetch ("www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
    fetch (urlDrinkName+drinkName)
    .then(res=>res.json())
    .then(data=>{
        console.log(data.drinks[0])
        let img=document.querySelector('#cocktail-3-image')
        img.src=data.drinks[0].strDrinkThumb
        img.width=360
        //divPopUpDrink.append(img)
        cocktailThreeText.textContent=data.drinks[0].strDrink
        li6.textContent=`${data.drinks[0].strMeasure1} ${data.drinks[0].strIngredient1}`
        li7.textContent=`${data.drinks[0].strMeasure2} ${data.drinks[0].strIngredient2}`
        li8.textContent=`${data.drinks[0].strMeasure3} ${data.drinks[0].strIngredient3}`
        li9.textContent=`${data.drinks[0].strMeasure4} ${data.drinks[0].strIngredient4}`
        li10.textContent=`${data.drinks[0].strMeasure5} ${data.drinks[0].strIngredient5}`
        if(data.drinks[0].strIngredient1==null) {li6.remove()}
        if(data.drinks[0].strIngredient2==null) {li7.remove()}
        if(data.drinks[0].strIngredient3==null) {li8.remove()}
        if(data.drinks[0].strIngredient4==null) {li9.remove()}
        if(data.drinks[0].strIngredient5==null) {li10.remove()}


    })



    
}






// Fetch a drink
   

function getDrink(url,img,h2,li1,li2,li3,li4,li5,h6Rating,btn){


    fetch(url)
        .then(res=>res.json())
        .then(data=>{
            drink=data.drinks[0]

            //does drink contain a filtered ingredient?
             //getDrink.call(this)

            //debugger
            //console.log(data.drinks[0])
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

            btn.addEventListener('click', () => {
                btn.textContent="Liked"
                //console.log("click")
              
            })

            

            getDrinkRatings(h6Rating,data.drinks[0].strDrink)

            //console.log(data.drinks[0])
            

            if (isFiltered(data.drinks[0])===true){
                //debugger
                return false
            }
            else{
                return true
            }

        })
        .catch(e=>console.error(e))
}

// CheckBox Event handlers

    // Filter Dropdown mouseover event
    divFilter.addEventListener('mouseover',(e)=>{
        //console.log(e)
        divDropdown.classList.remove("vanish")
    })

    // Filter Dropdown mouseover event
    divFilter.addEventListener('mouseout',(e)=>{
        //console.log(e)
        divDropdown.classList.add("vanish")
    })


    divDropdown.children[0].addEventListener('change',()=>{
        if (divDropdown.children[0].checked===true) {checkedVodka=true;}
        else{ checkedVodka=false;}
       
    })
    divDropdown.children[2].addEventListener('change',()=>{
        if (divDropdown.children[2].checked===true) {checkedGin=true}
        else{ checkedGin=false}
        console.log(checkedGin)
     })
    divDropdown.children[4].addEventListener('change',()=>{
        if (divDropdown.children[4].checked===true) {checkedBourbon=true}
        else{ checkedBourbon=false}
        })
    divDropdown.children[6].addEventListener('change',()=>{
        if (divDropdown.children[6].checked===true) {checkedWhiskey=true}
        else{ checkedWhiskey=false}
       })
    divDropdown.children[8].addEventListener('change',()=>{
        if (divDropdown.children[8].checked===true) {checkedTequilla=true}
        else{ checkedTequilla=false}
       })
    



 
//} handle check

function isFiltered(drink){

    if (drink.strIngredient1=="Gin"&&(checkedGin===false)){
        console.log("Gin :(")
        return true
    }
     if (drink.strIngredient1=="Vodka"&&(checkedVodka===false)){
        console.log("Vodka :(")
        return true
    }

     if (drink.strIngredient1=="Bourbon"&&(checkedBourbon===false)){
        console.log("Bourbon :(")
        return true
    }
 
     if (drink.strIngredient1=="Whiskey"&&(checkedWhiskey===false)){
        console.log("Whiskey :(")
        return true
    }
     if (drink.strIngredient1=="Tequilla"&&(checkedWhiskey===false)){
        console.log("Tequilla :(")
        return true
    }
    
        return false
   
}
