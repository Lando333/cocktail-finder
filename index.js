const baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/'
const ingredientUrl = baseUrl + 'filter.php?i='
const cocktailUrl = baseUrl + 'search.php?s='

const submitForm = document.getElementById('search-form')
const resultsList = document.getElementById('results-list')

const drinkName = document.getElementById('cocktail-name')
const measurementsList = document.getElementById('cocktail-measurements')
const ingredientsList = document.getElementById('cocktail-ingredients')
const instructionP = document.getElementById('instruction')
const cocktailImage = document.getElementById('image')


submitForm.addEventListener('submit', (e) => {
    e.preventDefault()
    resultsList.innerHTML = ""
    const searchWord = encodeURI(e.target.search.value)
    if (document.getElementById('element_1').checked)
        fetchIngredient(searchWord)
    else if (document.getElementById('element_2').checked)
        fetchCocktails(searchWord)
    submitForm.reset()
})

// This is where the ingredient search takes place
// Search term is rendered to the results list
function fetchIngredient(searchWord) {
    fetch(ingredientUrl + searchWord)
        .then(r => r.json())
        .then(cocktailData => renderIngredientList(cocktailData))
}
function renderIngredientList(list) {
    list.drinks.forEach(element => renderIngredient(element));
}
// Here the results list is populated
function renderIngredient(drink) {
    const li = document.createElement('li')
    li.innerText = drink.strDrink
    resultsList.appendChild(li)
    li.addEventListener('click', () => {
        drinkName.innerHTML = ""
        measurementsList.innerHTML = ""
        ingredientsList.innerHTML = ""
        instructionP.innerHTML = ""
        cocktailImage.innerHTML = ""
        fetchIngredientCocktail(drink.strDrink)
    })
}
// Here is a second fetch to grab the full recipe
// The original Ingredients search object does not contain all the data
function fetchIngredientCocktail(searchWord) {
    fetch(cocktailUrl + searchWord)
        .then(r => r.json())
        .then(cocktailData => populateRecipe(cocktailData.drinks[0]))
}

// This is where the Cocktail Name search takes place
function fetchCocktails(searchWord) {
    fetch(cocktailUrl + searchWord)
        .then(r => r.json())
        .then(cocktailData => renderCocktailList(cocktailData))
}
function renderCocktailList(list) {
    list.drinks.forEach(element => renderCocktail(element));
}
function renderCocktail(drink) {
    const li = document.createElement('li')
    li.innerText = drink.strDrink
    resultsList.appendChild(li)
    li.addEventListener('click', () => {
        drinkName.innerHTML = ""
        measurementsList.innerHTML = ""
        ingredientsList.innerHTML = ""
        instructionP.innerHTML = ""
        cocktailImage.innerHTML = ""
        populateRecipe(drink)
    })
}

function populateRecipe(recipe) {
    drinkName.innerText = recipe.strDrink
    measurementsAndIngredients(recipe)
    instructionP.innerText = recipe.strInstructions
    cocktailImage.src = recipe.strDrinkThumb
}

function measurementsAndIngredients(recipe) {
    for (const key in recipe) {
        if (recipe[key] !== null) {
            const li = document.createElement('li')

            if (key.substring(0, 10) === "strMeasure") {
                li.innerText = recipe[key]
                measurementsList.appendChild(li)
            }
            if (key.substring(0, 13) === "strIngredient") {
                li.innerText = recipe[key]
                ingredientsList.appendChild(li)
            }
        }
    }
}