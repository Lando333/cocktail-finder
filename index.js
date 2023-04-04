const cocktailUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const ingredientUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='
const submitForm = document.getElementById('search-form')
const resultsList = document.getElementById('results-list')
let ingredient = document.getElementById('')

submitForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchWord = e.target.search.value
    if (e.target.ingredient.checked)
        fetchIngredient(searchWord)
    else if (e.target.cocktail.checked)
        fetchCocktails(searchWord)
    submitForm.reset()
})
function fetchCocktails(searchWord) {
    fetch(cocktailUrl + searchWord)
        .then(r => r.json())
        .then(cocktailData => renderSearchList(cocktailData))
}
function fetchIngredient(searchWord) {
    fetch(ingredientUrl + searchWord)
        .then(r => r.json())
        .then(cocktailData => renderSearchList(cocktailData))
}

function renderSearchList(list) {
    list.drinks.forEach(element => renderDrink(element));
}
function renderDrink(drink) {
    console.log(drink)
    const li = document.createElement('li')
    li.innerText = drink.strDrink
    resultsList.appendChild(li)

    
}