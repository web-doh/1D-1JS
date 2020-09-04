const input = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];

fetch(endpoint)
    .then(response => response.json())
    .then(text => cities.push(...text));

function numWithCommas(num){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
}

function findMatches(wordToMatch){
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch,'gi');
        return place.city.match(regex) || place.state.match(regex);
    });
}

function displayMatches(){
    const matches = findMatches(input.value);
    const html = matches.map(place => {
        const regex = new RegExp(input.value,'gi');
        const matchCity = place.city.replace(regex,`<span class="matching">${input.value}</span>`);
        const matchState = place.state.replace(regex,`<span class="matching">${input.value}</span>`);
         return `<li>
                  <span class="name">${matchCity}, ${matchState}</span>
                  <span class="population">${numWithCommas(place.population)}</span>
                </li>`;
    }).join('');
    suggestions.innerHTML = html;
}

input.addEventListener('input', displayMatches);
input.addEventListener('change', displayMatches);
