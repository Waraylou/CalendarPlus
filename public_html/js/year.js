let clicked = null;

const calendar = document.getElementById('calendar');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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

function load(year = y) {
    const dt = new Date();

    dt.setFullYear(year);

    document.getElementById('yearDisplay').innerText = `${year}`;

    for (let i = 0; i < 12; i++) {
        calendar.append(miniCalendar(dt, i));
    }
}

function miniCalendar(dtRef, monthNum) {
    const dt = dtRef;

    dt.setMonth(monthNum);
    dt.setDate(1); 

    const month = monthNum;
    const year = y;

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

    const monthCell = document.createElement('div');
    monthCell.classList.add('month-cell');
    monthCell.id = `${months[month]}`;

    const monthName = document.createElement('h3');
    monthName.classList.add('month');
    monthName.innerText = `${months[month]}`;
    monthCell.append(monthName);

    renderDaysOfWeek(monthCell);

    renderStartPadding(monthCell, paddingDays, lastDayPrevMonth);

    renderMonth(monthCell, daysInMonth, dt, month, year);

    if (monthCell.childElementCount < 38) {
        renderExtraPadding(monthCell, nextPaddingDays);
    }
    else {
        renderEndPadding(monthCell, nextPaddingDays);
    }

    return monthCell;
}

function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
        clearCalendar(calendar);
        y += 1;
        load();
    })
    document.getElementById('prevButton').addEventListener('click', () => {
        clearCalendar(calendar);
        y -= 1;
        load();
    })
}

initButtons();
load();