let nav = 0;
let clicked = null;

const calendar = document.getElementById('calendar');

function load() {
    const dt = new Date();

    if (nav !== 0) {
        dt.setDate(new Date().getDate() + nav);
    }
    
    day = dt.getDate();
    month = dt.getMonth();
    year = dt.getFullYear();

    console.log(dt);

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
        nav++;
        clearCalendar(calendar);
        load();
    })
    document.getElementById('prevButton').addEventListener('click', () => {
        nav--;
        clearCalendar(calendar);
        load();
    })
}

initButtons();
load();