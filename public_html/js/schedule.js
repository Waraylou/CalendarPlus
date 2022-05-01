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
    // Set the innerText of the dayDisplay DOM element to the current year
    yearDisplay.innerText = `${year}`;
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

async function getEventsData(){
    let response = await fetch('/EventsData')
    .then(response => response.json())
    .then(data =>  {return data })
    
    return response;
    
}
let eventData = getEventsData()
eventData.then(val => {
    for (let i = 0; i < val.length; i++) {
        console.log(val[i]);
        // convert val[0].eventStart to a date object
        let startDate = new Date(val[i].eventStart);

        // convert val[0].eventEnd to a date object
        let endDate = new Date(val[i].eventEnd);

        // create a new div for the event
        let eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.id = val[i].event_id;

        // create a new div for the date of the event
        let dateDiv = document.createElement('div');
        dateDiv.classList.add('date');
        dateDiv.innerText = `${startDate.getMonth() + 1}/${startDate.getDate()}`;
        eventDiv.append(dateDiv);

        // create a new div for the abbreviated weekday of the event
        let eventWeekday = document.createElement('div');
        eventWeekday.classList.add('eventWeekday');
        eventWeekday.innerText = startDate.toLocaleDateString('en-us', {weekday: 'short'});
        eventDiv.append(eventWeekday);

        // create a new div for the event start time
        let eventStart = document.createElement('div');
        eventStart.classList.add('eventStart');
        eventStart.innerText = startDate.toLocaleTimeString('en-us', {hour: 'numeric', minute: 'numeric'});
        eventDiv.append(eventStart);

        // create a new div for the event end time
        let eventEnd = document.createElement('div');
        eventEnd.classList.add('eventEnd');
        eventEnd.innerText = endDate.toLocaleTimeString('en-us', {hour: 'numeric', minute: 'numeric'});
        eventDiv.append(eventEnd);

        // create a new div for the event title
        let eventTitle = document.createElement('div');
        eventTitle.classList.add('eventTitle');
        eventTitle.innerText = val[i].event_title;
        eventDiv.append(eventTitle);

        let eventEditButton = document.createElement('button');
        eventEditButton.classList.add('eventEditButton');
        eventEditButton.id = val[i].event_id;
        eventEditButton.innerText = '\u22EE';
        // on click, open the edit event modal
        eventEditButton.addEventListener('click', () => {
            clearSidebar();
            initializeEdit(val[i].event_id);
        });
        eventDiv.append(eventEditButton);

        // append the event div to the calendar
        calendar.append(eventDiv);
    }
});