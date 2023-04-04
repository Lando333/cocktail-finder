const baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/'
const cocktailUrl = 'search.php?s='
const ingredientUrl = 'filter.php?i='
const submitForm = document.getElementById('search-form')
const resultsList = document.getElementById('results-list')
let ingredient = document.getElementById('')

submitForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchWord = e.target.search.value
    if (document.getElementById('element_1'))
        fetchIngredient(searchWord)
    else if (document.getElementById('element_2'))
        fetchCocktails(searchWord)
    submitForm.reset()
})
function fetchCocktails(searchWord) {
    fetch(baseUrl + cocktailUrl + searchWord)
        .then(r => r.json())
        .then(cocktailData => renderSearchList(cocktailData))
}
function fetchIngredient(searchWord) {
    fetch(baseUrl + ingredientUrl + searchWord)
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