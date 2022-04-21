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

function load(day = d, month = m, year = y) {
    const dt = new Date();

    dt.setFullYear(year);
    dt.setMonth(month);
    dt.setDate(day);

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const lastDayPrevMonth = new Date(year, month, 0).getDate();
    const nextPaddingDays = 7 - new Date(year, month + 1, 0).getDay();

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    })
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    document.getElementById('monthDisplay').innerText = `${dt.toLocaleDateString('en-us', {month: 'long'})} ${year}`;

    renderStartPadding(calendar, paddingDays, lastDayPrevMonth, true);

    renderMonth(calendar, daysInMonth, dt, month, year, true);

    renderEndPadding(calendar, nextPaddingDays, true);
}

function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
        clearCalendar(calendar);
        m += 1;
        if (m > 11) {
            m = 0;
            y += 1;
        }
        window.location.href = `/month?date=${m + 1}-${d}-${y}`;
    })
    document.getElementById('prevButton').addEventListener('click', () => {
        clearCalendar(calendar);
        m -= 1;
        if (m < 0) {
            m = 11;
            y -= 1;
        }
        // redirect the page to the previous month
        window.location.href = `/month?date=${m + 1}-${d}-${y}`;
    })
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
});