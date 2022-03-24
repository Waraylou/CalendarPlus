let nav = 0;
let clicked = null;

const calendar = document.getElementById('calendar');
const currDate = new Date();
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const weekdaysAbbr = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

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
    monthCell.classList.add('cell');
    monthCell.id = `${months[month]}`;

    monthName = document.createElement('h3');
    monthName.classList.add('month');
    monthName.innerText = `${months[month]}`;
    monthCell.append(monthName);

    days = document.createElement('div');
    days.classList.add('weekdays');

    for (let i = 0; i < 7; i++) {
        dayAbbr = document.createElement('div');
        dayAbbr.classList.add('day');
        dayAbbr.innerText = `${weekdaysAbbr[i]}`;
        days.append(dayAbbr);
    }
    
    monthCell.append(days);

    for (let i = paddingDays; i > 0; i--) {
        date = document.createElement('div');
        date.classList.add('date', 'padding');
        date.innerText = lastDayPrevMonth - i + 1;
        monthCell.append(date);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        date = document.createElement('div');
        date.classList.add('date');
        date.innerText = i;
        if(i == currDate.getDate() && month == currDate.getMonth() && year == currDate.getFullYear()) {
            date.classList.add('selected');
        }
        monthCell.append(date);
    }

    if (monthCell.childElementCount < 38) {
        for (let i = 1; i < (nextPaddingDays + 7); i++) {
            date = document.createElement('div');
            date.classList.add('date', 'padding');
            date.innerText = i;
            monthCell.append(date);
        } 
    }
    else {
        for (let i = 1; i < nextPaddingDays; i++) {
            date = document.createElement('div');
            date.classList.add('date', 'padding');
            date.innerText = i;
            monthCell.append(date);
        }
    }

    return monthCell;
}

function clearCalendar() {
    calendar.innerHTML = '';
}

function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        clearCalendar();
        load();
    })
    document.getElementById('prevButton').addEventListener('click', () => {
        nav--;
        clearCalendar();
        load();
    })
}

initButtons();
load();