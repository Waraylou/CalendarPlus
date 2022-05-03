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

function load(year = dt.getFullYear()) {
    document.getElementById('yearDisplay').innerText = `${year}`;

    for (let i = 0; i < 12; i++) {
        calendar.append(miniCalendar(new Date(dt), i));
    }
}

function miniCalendar(dtRef, monthNum) {

    dtRef.setMonth(monthNum);
    dtRef.setDate(1); 

    const year = dtRef.getFullYear();

    const firstDayOfMonth = new Date(year, monthNum, 1);
    const daysInMonth = new Date(year, monthNum + 1, 0).getDate();

    const lastDayPrevMonth = new Date(year, monthNum, 0).getDate();
    const nextPaddingDays = 7 - new Date(year, monthNum + 1, 0).getDay();

    const paddingDays = firstDayOfMonth.getDay();

    const monthCell = document.createElement('div');
    monthCell.classList.add('month-cell');
    monthCell.id = `${dtRef.toLocaleDateString('en-us', {month: 'long'})}`;

    const monthName = document.createElement('h3');
    monthName.classList.add('month');
    monthName.innerText = `${dtRef.toLocaleDateString('en-us', {month: 'long'})}`;
    monthCell.append(monthName);

    renderDaysOfWeek(monthCell);

    renderStartPadding(monthCell, paddingDays, lastDayPrevMonth);

    renderMonth(monthCell, daysInMonth, dtRef, monthNum, year);

    if (monthCell.childElementCount < 38) {
        renderExtraPadding(monthCell, nextPaddingDays);
    }
    else {
        renderEndPadding(monthCell, nextPaddingDays, monthNum + 1, year);
    }

    return monthCell;
}

function initButtons() {
    nextButton = document.getElementById('nextButton');
    prevButton = document.getElementById('prevButton');
    nextButton.addEventListener('click', () => {
        clearCalendar(calendar);
        // add one year to dt
        dt.setFullYear(dt.getFullYear() + 1);
        window.history.replaceState({}, '', `?date=${dt.getMonth() + 1}-${dt.getDate()}-${dt.getFullYear()}`);
        load();
        nextButton.blur();
    });
    prevButton.addEventListener('click', () => {
        clearCalendar(calendar);
        // subtract one year to dt
        dt.setFullYear(dt.getFullYear() - 1);
        window.history.replaceState({}, '', `?date=${dt.getMonth() + 1}-${dt.getDate()}-${dt.getFullYear()}`);
        load();
        prevButton.blur();
    });
}

initButtons();
load();