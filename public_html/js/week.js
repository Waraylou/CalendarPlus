let clicked = null;

const calendar = document.getElementById('calendar');

// Get the current date from the URL
const urlParams = new URLSearchParams(window.location.search);
let dateParam = urlParams.get('date');

const dt = new Date();

if (dateParam) {
    const date = dateParam.split('-');
    dt.setDate(parseInt(date[1]));
    dt.setMonth(parseInt(date[0]) - 1);
    dt.setFullYear(parseInt(date[2]));
}
else {
    window.history.replaceState({}, '', `?date=${dt.getMonth() + 1}-${dt.getDate()}-${dt.getFullYear()}`);
}

function load(day = dt.getDate(), month = dt.getMonth(), year = dt.getFullYear()) {

    // if dt.getDate() is not a sunday, set day to the previous sunday
    if (dt.getDay() !== 0) {
        dt.setDate(dt.getDate() - dt.getDay());
        day = dt.getDate();
        month = dt.getMonth();
        year = dt.getFullYear();
        window.history.replaceState({}, '', `?date=${dt.getMonth() + 1}-${dt.getDate()}-${dt.getFullYear()}`);
    }

    // Get the dayDisplay DOM element
    const dayDisplay = document.getElementById('weekDisplay');
    // Set the innerText of the dayDisplay DOM element to the current year
    dayDisplay.innerText = `${dt.toLocaleDateString('en-us', {month: 'long', day: 'numeric', year: 'numeric'})}`;

    let eventData = getEventsData()
    eventData.then(val => {
        for (let i = 0; i < val.length; i++) {
            // convert val[0].eventStart to a date object
            let startDate = new Date(val[i].eventStart);

            // convert val[0].eventEnd to a date object
            let endDate = new Date(val[i].eventEnd);

            // if the start date is in the current week, add the event to the calendar
            if (startDate.getFullYear() === year && startDate.getMonth() === month && startDate.getDate() >= day && startDate.getDate() <= day + 6) {
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
        }
        // if the calendar has no events, display a message
        if (calendar.childElementCount === 0) {
            let noEvents = document.createElement('div');
            noEvents.classList.add('noEvents');
            noEvents.innerText = 'No events scheduled for this week.';
            calendar.append(noEvents);
        }
    });
}

function initButtons() {
    nextButton = document.getElementById('nextButton');
    prevButton = document.getElementById('prevButton');
    nextButton.addEventListener('click', () => {
        clearCalendar(calendar);
        // add one week to dt
        dt.setDate(dt.getDate() + 7);
        // update the url without refreshing the page
        window.history.replaceState({}, '', `?date=${dt.getMonth() + 1}-${dt.getDate()}-${dt.getFullYear()}`);
        load();
        nextButton.blur();
    });
    prevButton.addEventListener('click', () => {
        clearCalendar(calendar);
        // subtract one week from dt
        dt.setDate(dt.getDate() - 7);
        // update the url without refreshing the page
        window.history.replaceState({}, '', `?date=${dt.getMonth() + 1}-${dt.getDate()}-${dt.getFullYear()}`);
        load();
        prevButton.blur();
    });
}

initButtons();
load();

async function getEventsData(){
    let response = await fetch('/EventsData')
    .then(response => response.json())
    .then(data =>  {return data })
    
    return response;
    
}