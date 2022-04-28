let clicked = null;

const calendar = document.getElementById('calendar');

// Get the current date from the URL
const urlParams = new URLSearchParams(window.location.search);
let dateParam = urlParams.get('date');

if (dateParam) {
    const date = dateParam.split('-');
    d = parseInt(date[1]);
    m = parseInt(date[0]) - 1;
    y = parseInt(date[2]);
}
else {
    // if there are no url params, load the current day
    d = currDate.getDate();
    m = currDate.getMonth();
    y = currDate.getFullYear();
}

function load(year = y) {
    const dt = new Date();

    dt.setFullYear(year);

    // Get the dayDisplay DOM element
    const yearDisplay = document.getElementById('yearDisplay');
    // Set the innerText of the dayDisplay DOM element to the current month, day, and year
    yearDisplay.innerText = `${dt.toLocaleDateString('en-us', {month: 'long'})} ${day}, ${year}`;

    // Create a DOM element that contains the weekday for the current date
    const weekday = document.createElement('h3');
    weekday.classList.add('weekday');
    weekday.classList.add('cell');
    weekday.innerText = dt.toLocaleDateString('en-us', {weekday: 'long'});
    calendar.append(weekday);

}

function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
        clearCalendar(calendar);
        y += 1;
        window.history.replaceState({}, '', `?date=${m + 1}-${d}-${y}`);
        load();
    });
    document.getElementById('prevButton').addEventListener('click', () => {
        clearCalendar(calendar);
        y -= 1;
        window.history.replaceState({}, '', `?date=${m + 1}-${d}-${y}`);
        load();
    });
}

function daysInMonth() {
    return new Date(y, m + 1, 0).getDate();
}

initButtons();
load();

async function getMonthData(){
    let response = await fetch('/monthData')
    .then(response => response.json())
    .then(data =>  {return data })
    
    return response;
    
}
let monthData = getMonthData()
monthData.then(val => {
    for (let i = 0; i < val.length; i++) {
        // convert val[0].eventStart to a date object
        let startDate = new Date(val[i].eventStart);
        // get the day month and year from the date object
        let eventStart = `${startDate.getMonth() + 1}-${startDate.getDate()}-${startDate.getFullYear()}`;
        // convert val[0].eventEnd to a date object
        let endDate = new Date(val[i].eventEnd);
        // get the day month and year from the date object
        let eventEnd = `${endDate.getMonth() + 1}-${endDate.getDate()}-${endDate.getFullYear()}`;
        // if the event div exists, add the event to the div
        if (document.getElementById(eventStart)) {
            // create a div element to hold the event
            let eventDiv = document.createElement('div');
            eventDiv.classList.add('event');
            // create a div element to hold the event title
            let eventTitle = document.createElement('div');
            // set the event title to the event title from the database
            eventTitle.innerText = val[i].event_title;
            // add the event div to the events div of that day
            eventDiv.appendChild(eventTitle);
            document.getElementById(eventStart).appendChild(eventDiv);
        }
    }
});