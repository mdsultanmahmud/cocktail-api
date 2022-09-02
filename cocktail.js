/**
 * 
হয় মডিউল 34 ভালো করে দেখে ফেলো। বিশেষ করে the meal db রি তারপরে আরো সময় থাকলে এর আরেকটা খালতো ভাই the coktaildb থেকে কিছু জিনিস এনে দেখাবে। একজাক্টলি কি দেখাতে হবে। সেটা আমি বলে দিবো না। তুমি ওদের ওয়েবসাইট এ যাও। সেখানে কি কি লেখা আছে সেগুলা পড়ো। api গুলা এর ছোট করে কি কি করে বলা আছে। সেগুলা দেখো। তারপর কিছু ডাটা লোড করো। সেই ডাটাগুলো দেখাও। এইখানে সার্চ ফাংশনালিটি ইমপ্লিমেন্ট করো। অনেকটা mealdb এর মতো। আবার কোন একটাতে ক্লিক করলে সেটার ডিটেল দেখাবে। তুমি যে ডাটা লোড করেছো। বা ডাটা ওয়েবসাইট এ দেখাচ্ছ। সেই কোড এর মধ্যে arrow ফাংশন ইউজ করতে পারতেছো কিনা। যখন লুপ চালাচ্ছ সেখানে forEach ইউজ করতে পারতেছো কিনা। 

 */

const loadCocktail = (search, dataLimit) => {
    if(search.length > 1 ){
        alert('Please search with just first letter!!!')
    }else{
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayCocktail(data.drinks, dataLimit))
    }
   
}



const displayCocktail = (cocktails, dataLimit) => {
    const container = document.getElementById('cocktail-container')
    if(dataLimit && cocktails.length > dataLimit){   
        cocktails = cocktails.slice(0, dataLimit)
        document.getElementById('show-all-container').classList.remove('d-none')
        document.getElementById('show-less-container').classList.add('d-none')
    }else{
        document.getElementById('show-all-container').classList.add('d-none')
        document.getElementById('show-less-container').classList.remove('d-none')
    }
    container.innerHTML = ''
    cocktails.forEach(cocktail => {
        container.innerHTML += `
                <div class="col">
                    <div class="card h-100">
                        <img src="${cocktail.strDrinkThumb}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${cocktail.strDrink}</h5>
                            <p class="card-text"><strong>About: </strong> ${(cocktail.strInstructions).slice(0, 200)}</p>
                        </div>
                        <button onclick="LoadDetailsData(${cocktail.idDrink})" type="button" class="btn btn-danger " data-bs-toggle="modal" data-bs-target="#cocktail">
                                Show Details
                            </button>
                    </div>
                </div>
        `
    });
}


// load data of cocktail details 

const LoadDetailsData = (id) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data.drinks[0]))
}

// show data details in web page 
const showDetails = data => {
    const showDetails = document.getElementById('modal-body')
    const modalTitle = document.getElementById('exampleModalLabel')
    modalTitle.innerText = `${data.strDrink}`
    showDetails.innerHTML = `
    <img style="width:200px;height:200px;border-radius:50%" src="${data.strDrinkThumb}" class="img-fluid mx-auto d-block my-2" alt="">
    <h4 class="text-uppercase">Id: ${data.idDrink}</h4>
    <h4 class="text-uppercase">Drink Catagory: ${data.strCategory}</h4>
    <p><strong>Release Date:</strong> ${data.dateModified}</p>
    <p><strong>Glass:</strong> ${data.strGlass}</p>
    <p><strong>Glass Measure:</strong> ${data.strMeasure1}</p>
    <p><strong>Ingrediant:</strong> ${data.strIngredient2 ? data.strIngredient2 : 'No Ingrediant'}</p>
    <p><strong>Instruction:</strong> ${data.strInstructionsIT ? data.strInstructionsIT : 'No Instruction found'}</p>
    `
}



// search  button handle 

const searchItem = () =>{
    const userDataElement = document.getElementById('user-input')
    const userDataElementValue = userDataElement.value
    return userDataElementValue
}

const search = () => {
   const userDataElementValue = searchItem()
    loadCocktail(userDataElementValue, dataLimit = 7)
}

document.getElementById('user-input').addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        const userDataElementValue = searchItem()
        loadCocktail(userDataElementValue, dataLimit = 7)
    }
})



// works with show all button 

document.getElementById('show-all-btn').addEventListener('click', function(){
    const userDataElementValue = searchItem()
    loadCocktail(userDataElementValue)
})


document.getElementById('show-less-btn').addEventListener('click', function(){
    const userDataElementValue = searchItem()
    loadCocktail(userDataElementValue, dataLimit = 7)
})