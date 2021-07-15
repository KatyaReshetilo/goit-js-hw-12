import './sass/main.scss';
import fetchCountries from './js/fetchCountries';

  
let debounce = require('lodash.debounce');
import Notiflix from "notiflix";


const DEBOUNCE_DELAY = 300;
const searchBoxInput = document.querySelector('#search-box');
const countryListUrl = document.querySelector('.country-list');
const countryInfoUrl = document.querySelector('.country-info');



searchBoxInput.addEventListener("input", debounce(onSearchBoxInput, DEBOUNCE_DELAY));

function onSearchBoxInput(e) {
    e.preventDefault();

    
    const searchLetter = e.target.value;
    if (e.target.value.trim() === "") {
        countryInfoUrl.innerHTML = " ";
        countryListUrl.innerHTML = " ";
        return
  }
  
 
    fetchCountries(searchLetter)
        .then((countries) => {
           
            if (countries.length === 1) {
                renderCountryCard(countries);
            };
            if (countries.length >= 2 && countries.length <= 10) {
renderCountryList(countries)
            };
            if (countries.length > 10) {
Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            };
        }).catch((erorr) => {
            Notiflix.Notify.failure('Oops, there is no country with that name')
            countryListUrl.innerHTML = " ";
            countryInfoUrl.innerHTML = " ";})
};




    





function renderCountryCard(countries) {
    
    const markup = countries
    .map((country) => {
      return `<p><img src="${country.flag}" alt = '${country.name}' width='40px' heigth='40px'>
         ${country.name}</p>
        <p>Capital: ${country.capital}</p>
        <p>Population: ${country.population}</p>
        <p>Languages: ${country.languages.map(language=>language.name).join(", ")}</p>`

    })
        .join("");
   
    countryInfoUrl.innerHTML = markup;
    countryListUrl.innerHTML = " ";
}

countryListUrl.style.listStyle = "none";


function renderCountryList(countries) {
    const markupList = countries
        .map((country) => {
            return `<li><img src="${country.flag}" alt = '${country.name}' width='30px' heigth='30px'>
         ${country.name}</li>`
        }).join("");
    countryListUrl.innerHTML = markupList;
    countryInfoUrl.innerHTML = " ";
}
