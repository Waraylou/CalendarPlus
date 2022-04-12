let clicked = null;

const calendar = document.getElementById('calendar');

// Get the current date from the URL
const urlParams = new URLSearchParams(window.location.search);
let dateParam = urlParams.get('date');
console.log(dateParam);
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

    // Get the dayDisplay DOM element
    const dayDisplay = document.getElementById('dayDisplay');
    // Set the innerText of the dayDisplay DOM element to the current month, day, and year
    dayDisplay.innerText = `${dt.toLocaleDateString('en-us', {month: 'long'})} ${day}, ${year}`;

    // Create a DOM element that contains the weekday for the current date
    const weekday = document.createElement('h3');
    weekday.classList.add('weekday');
    weekday.classList.add('cell');
    weekday.innerText = dt.toLocaleDateString('en-us', {weekday: 'long'});
    calendar.append(weekday);

    // For each hour of the day, create a new DOM element called cell
    for (let i = 0; i < 24; i++) {
        // Create a new DOM element
        const cell = document.createElement('div');
        // Add the cell class to the DOM element
        cell.classList.add('cell');
        // Append the DOM element to the calendar DOM element
        calendar.append(cell);
    }

    // In each cell, create a new DOM element that contains the hour in the form AM/PM
    for (let i = 0; i < 24; i++) {
        const cell = calendar.children[i+1];
        const hour = document.createElement('div');
        hour.classList.add('hour');
        hour.innerText = `${i % 12 === 0 ? 12 : i % 12} ${i < 12 ? 'AM' : 'PM'}`;
        cell.append(hour);
    }
}

function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
        clearCalendar(calendar);
        d += 1;
        if (d > daysInMonth()) {
            d = 1;
            m += 1;
        }
        if (m > 11) {
            m = 0;
            y += 1;
        }
        // update the url without refreshing the page
        window.history.replaceState({}, '', `?date=${m + 1}-${d}-${y}`);
        load();
    })
    document.getElementById('prevButton').addEventListener('click', () => {
        clearCalendar(calendar);
        d -= 1;
        if (d < 1) {
            m -= 1;
            d = daysInMonth();
        }
        if (m < 0) {
            m = 11;
            y -= 1;
        }
        // update the url without refreshing the page
        window.history.replaceState({}, '', `?date=${m + 1}-${d}-${y}`);
        load();
    })
}

function daysInMonth() {
    return new Date(y, m + 1, 0).getDate();
}

initButtons();
load();