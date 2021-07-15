export default function fetchCountries(name) {
    const url = 'https://restcountries.eu/rest/v2';
    return fetch(`${url}/name/${name}?fields=name;capital;population;flag;languages`)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
};