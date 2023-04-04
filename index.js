const baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/'
const ingredientUrl = baseUrl + 'filter.php?i='
const cocktailUrl = baseUrl + 'search.php?s='
const submitForm = document.getElementById('search-form')
const resultsList = document.getElementById('results-list')

const recipeDiv = document.getElementById('text-box')
const imageDiv = document.getElementById('image-box')
const drinkName = document.createElement('li')

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
        recipeDiv.innerHTML = ""
        imageDiv.innerHTML = ""
        populateRecipe(drink)
    })
}

function populateRecipe(recipe) {
    
    drinkName.innerText = recipe.strDrink
    recipeDiv.appendChild(drinkName)

    const drinkImage = document.createElement('img')
    drinkImage.src = recipe.strDrinkThumb
    imageDiv.appendChild(drinkImage)

    console.log(recipe)
}