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
        window.history.replaceState({}, '', `?date=${m + 1}-${d}-${y}`);
        load();
    })
    document.getElementById('prevButton').addEventListener('click', () => {
        clearCalendar(calendar);
        m -= 1;
        if (m < 0) {
            m = 11;
            y -= 1;
        }
        window.history.replaceState({}, '', `?date=${m + 1}-${d}-${y}`);
        load();
    })
}

initButtons();
load();