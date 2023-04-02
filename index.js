const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const submitForm = document.getElementById('search-form')
const resultsList = document.getElementById('results-list')

submitForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchWord = e.target.search.value
    fetchCocktails(searchWord)
    submitForm.reset()
})
function fetchCocktails(searchWord) {
    fetch(url + searchWord)
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