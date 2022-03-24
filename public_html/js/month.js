let nav = 0;
let clicked = null;

const calendar = document.getElementById('calendar');

function load() {
    const dt = new Date();

    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    }
    
    day = dt.getDate();
    month = dt.getMonth();
    year = dt.getFullYear();

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

    document.getElementById('monthDisplay').innerText = `${dt.toLocaleDateString('en-us', {month: 'long'})} ${year}`

    renderStartPadding(calendar, paddingDays, lastDayPrevMonth);

    renderMonth(calendar, daysInMonth, dt);

    renderEndPadding(calendar, nextPaddingDays);
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