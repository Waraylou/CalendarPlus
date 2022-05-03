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

function load(month = dt.getMonth(), year = dt.getFullYear()) {
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const lastDayPrevMonth = new Date(year, month, 0).getDate();
    const nextPaddingDays = 7 - new Date(year, month + 1, 0).getDay();

    const paddingDays = firstDayOfMonth.getDay();

    document.getElementById('monthDisplay').innerText = `${dt.toLocaleDateString('en-us', {month: 'long', year: 'numeric'})}`;

    renderStartPadding(calendar, paddingDays, lastDayPrevMonth, month - 1, year, true);

    renderMonth(calendar, daysInMonth, dt, month, year, true);

    renderEndPadding(calendar, nextPaddingDays, month + 1, year, true);

    let eventData = getEventsData()
    eventData.then(val => {
        // add the events to the calendar
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
                // if there is less than one child in the div, add the event
                if (document.getElementById(eventStart).childElementCount < 4) {
                    // create a div element to hold the event
                    let eventDiv = document.createElement('div');
                    eventDiv.classList.add('event');
                    // create a div element to hold the event title
                    let eventTitle = document.createElement('div');
                    // set the event title to the event title from the database
                    eventTitle.innerText = val[i].event_title;
                    // add the event div to the events div of that day
                    eventDiv.appendChild(eventTitle);
                    // on clicking the event div, call initializeEdit(val[i].event_id)
                    eventDiv.addEventListener('click', (e) => {
                        clearSidebar();
                        initializeEdit(val[i].event_id);
                        if (!e) var e = window.event;
                        e.cancelBubble = true;
                        if (e.stopPropagation) e.stopPropagation();
                    });
                    document.getElementById(eventStart).appendChild(eventDiv);
                }
            }
        }
    });
}

function initButtons() {
    nextButton = document.getElementById('nextButton');
    prevButton = document.getElementById('prevButton');
    nextButton.addEventListener('click', () => {
        clearCalendar(calendar);
        // add one month to dt
        dt.setMonth(dt.getMonth() + 1);
        window.history.replaceState({}, '', `?date=${dt.getMonth() + 1}-${dt.getDate()}-${dt.getFullYear()}`);
        load();
        nextButton.blur();
    })
    prevButton.addEventListener('click', () => {
        clearCalendar(calendar);
        // subtract one month from dt
        dt.setMonth(dt.getMonth() - 1);
        // redirect the page to the previous month
        window.history.replaceState({}, '', `?date=${dt.getMonth() + 1}-${dt.getDate()}-${dt.getFullYear()}`);
        load();
        prevButton.blur();
    })
}

initButtons();
load();