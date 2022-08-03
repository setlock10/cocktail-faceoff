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

const checkedVodka =true
const checkedGin = true
const checkedBourbon = true
const checkedWhiskey = true
const checkedTequilla = true




//  page load
document.addEventListener('DOMContentLoaded',()=>{
    //Populates the Cocktail Div Cards
    getDrink(urlRandom,imgDrink1,h2Drink1,liDrink1_1,liDrink1_2,liDrink1_3,liDrink1_4,liDrink1_5,h6Rating1)
    getDrink(urlRandom,imgDrink2,h2Drink2,liDrink2_1,liDrink2_2,liDrink2_3,liDrink2_4,liDrink2_5,h6Rating2)

    //Gets the current power rankings from ratings.json
    getTotalRankings()
    sortRankings()
    handleCheckBoxes()

    //document.cookie = 'ppkcookie1=testcookie; expires=Thu, 2 Aug 2001 20:47:11 UTC; path=/'
    
 })

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
    //result1L=tempRating1+kFactor*(0-prob1)
    //result2W=tempRating2+kFactor*(1-prob2)
    h6Loser.textContent=parseInt(tempRating2+kFactor*(0-prob2))
    //h6Loser.textContent=tempRating2+kFactor*(0-prob2)


    




 }
imgDrink1.addEventListener('mouseover', (e)=>{
    imgDrink1.classList.add("glow")
    imgDrink1.setAttribute("style", "border-color:white;")
})
imgDrink1.addEventListener('mouseout', (e)=>{
    imgDrink1.classList.remove("glow")
    imgDrink1.setAttribute("style", "border-color:blue;")

})

 divCocktail1.addEventListener('click',()=>{
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

divCocktail2.addEventListener('click',()=>{
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
            location.reload()

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
function getDrink(url,img,h2,li1,li2,li3,li4,li5,h6Rating){

    fetch(url)
        .then(res=>res.json())
        .then(data=>{
            //drink=data.drinks[0]
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

            

            getDrinkRatings(h6Rating,data.drinks[0].strDrink)






        })
        .catch(e=>console.error(e))

}

// CheckBoxes
function handleCheckBoxes()
{
    if (readCookie(checkedVodka)==null){
        setCookies()
    }
    else{
        setChecks()
    }

    
        console.log(divDropdown.children)
    
 

}

//Cookies
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function setCookies(){
    createCookie(checkedVodka,true,10)
    createCookie(checkedGin,true,10)
    createCookie(checkedBourbon,true,10)
    createCookie(checkedWhiskey,true,10)
    createCookie(checkedTequilla,true,10)
    
}

function setChecks(){
    

}