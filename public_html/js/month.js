let clicked = null;

const calendar = document.getElementById('calendar');

const urlParams = new URLSearchParams(window.location.search);
let d = parseInt(urlParams.get('day'));
let m = parseInt(urlParams.get('month'));
let y = parseInt(urlParams.get('year'));

// if there are no url params, load the current month
if (isNaN(d) || isNaN(m) || isNaN(y)) {
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

    renderStartPadding(calendar, paddingDays, lastDayPrevMonth);

    renderMonth(calendar, daysInMonth, dt, month, year);

    renderEndPadding(calendar, nextPaddingDays);
}

function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
        clearCalendar(calendar);
        m += 1;
        if (m > 11) {
            m = 0;
            y += 1;
        }
        window.history.replaceState({}, '', `?day=${d}&month=${m}&year=${y}`);
        load();
    })
    document.getElementById('prevButton').addEventListener('click', () => {
        clearCalendar(calendar);
        m -= 1;
        if (m < 0) {
            m = 11;
            y -= 1;
        }
        window.history.replaceState({}, '', `?day=${d}&month=${m}&year=${y}`);
        load();
    })
}

initButtons();
load();