let nav = 0;
let clicked = null;

const calendar = document.getElementById('calendar');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function load() {
    const dt = new Date();

    if (nav !== 0) {
        dt.setFullYear(new Date().getFullYear() + nav);
    }

    const year = dt.getFullYear();

    document.getElementById('yearDisplay').innerText = `${year}`

    console.log(dt);

    for (let i = 0; i < 12; i++) {
        calendar.append(miniCalendar(dt, i));
    }
}

function miniCalendar(dtRef, monthNum) {
    dt = dtRef;

    dt.setMonth(monthNum);
    dt.setDate(1); 

    day = dt.getDate();
    month = dt.getMonth();
    year = dt.getFullYear();

    firstDayOfMonth = new Date(year, month, 1);
    daysInMonth = new Date(year, month + 1, 0).getDate();

    lastDayPrevMonth = new Date(year, month, 0).getDate();
    nextPaddingDays = 7 - new Date(year, month + 1, 0).getDay();

    dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    })
    paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    monthCell = document.createElement('div');
    monthCell.classList.add('month-cell');
    monthCell.id = `${months[month]}`;

    monthName = document.createElement('h3');
    monthName.classList.add('month');
    monthName.innerText = `${months[month]}`;
    monthCell.append(monthName);

    renderDaysOfWeek(monthCell);

    renderStartPadding(monthCell, paddingDays, lastDayPrevMonth);

    renderMonth(monthCell, daysInMonth, dt);

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