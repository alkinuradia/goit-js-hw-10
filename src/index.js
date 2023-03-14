import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchForm = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');
const countriesInfo = document.querySelector('.country-info');

searchForm.addEventListener('input', debounce(search, DEBOUNCE_DELAY));

function search() {
  const country = searchForm.value.trim();
  if (!country) {
    clearForm();
    return;
  }
  return fetchCountries(country).then(renderCountries).catch(showError);
}

function clearForm() {
  countriesList.innerHTML = '';
  countriesInfo.innerHTML = '';
}

function showError() {
  clearForm();
  return Notiflix.Notify.failure('Oops, there is no country with that name.');
}

function renderCountries(countriesName) {
  clearForm();
  if (countriesName.length > 10) {
    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  if (countriesName.length >= 2 && countriesName.length <= 10) {
    renderCountryId(countriesName);
  } else {
    renderCountryId(countriesName);
    renderCountriesInfo(countriesName);
  }
}

function renderCountryId(countriesName) {
  const markup = countriesName
    .map(({ name, flags }) => {
      return `<li class = "country-list__item"><img src="${flags.svg}" alt="${name.common}" width="60" height="45"><span class = "country-list__name">${name.official}</span></li>`;
    })
    .join('');
  countriesList.innerHTML = markup;
}

function renderCountriesInfo(countriesName) {
  const countryInfo = countriesName
    .map(({ capital, population, languages }) => {
      return `<p class = "country-info__data"><b>Capital:</b> ${capital}</p><p class = "country-info__data"><b>Population:</b> ${population}</p><p class = "country-info__data"><b>Languages:</b> ${Object.values(
        languages
      ).join(', ')}</p>`;
    })
    .join('');
  countriesInfo.innerHTML = countryInfo;
}
