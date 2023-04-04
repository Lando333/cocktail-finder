const baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/'
const ingredientUrl = baseUrl + 'filter.php?i='
const cocktailUrl = baseUrl + 'search.php?s='

const submitForm = document.getElementById('search-form')
const resultsList = document.getElementById('results-list')

const recipeTextBox = document.getElementById('text-box')
const cocktailImage = document.getElementById('image')

const drinkName = document.getElementById('cocktail-name')
const instructionP = document.getElementById('instruction')

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

function fetchIngredient(searchWord) {
    fetch(ingredientUrl + searchWord)
        .then(r => r.json())
        .then(cocktailData => renderSearchList(cocktailData))
}
function fetchCocktails(searchWord) {
    fetch(cocktailUrl + searchWord)
        .then(r => r.json())
        .then(cocktailData => renderSearchList(cocktailData))
}

function renderSearchList(list) {
    list.drinks.forEach(element => renderDrink(element));
}
function renderDrink(drink) {
    const li = document.createElement('li')
    li.innerText = drink.strDrink
    resultsList.appendChild(li)
    li.addEventListener('click', () => {
        recipeTextBox.innerHTML = ""
        cocktailImage.innerHTML = ""
        populateRecipe(drink)
    })
}

function populateRecipe(recipe) {
    drinkName.innerText = recipe.strDrink
    recipeTextBox.appendChild(drinkName)

    populateIngredients(recipe)

    instructionP.innerText = recipe.strInstructions
    recipeTextBox.appendChild(instructionP)
    
    cocktailImage.src = recipe.strDrinkThumb
}

function populateIngredients(recipe) {
    for (const key in recipe) {
        if (recipe[key] !== null && key.substring(0, 13) == "strIngredient") {
            console.log(recipe[key])
        }
    }
}