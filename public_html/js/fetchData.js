//import fetch from 'node-fetch';

fetch('/monthData')
    .then( responce => responce.json())
    .then( json => {console.log(json)} )
    .catch( err => console.error(`Fetch problem: ${err.message}`));

