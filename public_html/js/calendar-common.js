const currDate = new Date();
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const weekdaysAbbr = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function renderDaysOfWeek(cell) {
    days = document.createElement('div');
    days.classList.add('weekdays');

    for (let i = 0; i < 7; i++) {
        dayAbbr = document.createElement('div');
        dayAbbr.classList.add('day');
        dayAbbr.innerText = `${weekdaysAbbr[i]}`;
        days.append(dayAbbr);
    }
    
    cell.append(days);
}

// Renders days from the previous month that would be visible on calendar for current month
function renderStartPadding(cell, paddingDays, lastDayPrevMonth) {
    for (let i = paddingDays; i > 0; i--) {
        daySquare = document.createElement('div');
        daySquare.classList.add('cell');

        date = document.createElement('div');
        date.classList.add('date', 'padding');
        date.innerText = lastDayPrevMonth - i + 1;

        daySquare.append(date);
        cell.append(daySquare);
    }
}

// Renders days from the current month onto the calendar
function renderMonth(cell, daysInMonth, dt) {
    for (let i = 1; i <= daysInMonth; i++) {
        daySquare = document.createElement('div');
        daySquare.classList.add('cell');
        
        date = document.createElement('div');
        date.classList.add('date');
        date.innerText = i;
        if(i == currDate.getDate() && dt.getMonth() == currDate.getMonth() && dt.getFullYear() == currDate.getFullYear()) {
            date.classList.add('selected');
        }

        daySquare.append(date);
        cell.append(daySquare);
    }
}

// Renders days from the next month + extra, to ensure that all months contain 6 rows
function renderEndPadding(cell, nextPaddingDays) {
    for (let i = 1; i < nextPaddingDays; i++) {
        daySquare = document.createElement('div');
        daySquare.classList.add('cell');

        date = document.createElement('div');
        date.classList.add('date', 'padding');
        date.innerText = i;

        daySquare.append(date);
        cell.append(daySquare);
    }
}

// Renders days from the next month that would be visible on the calendar for the current month
function renderExtraPadding(cell, nextPaddingDays) {
    for (let i = 1; i < (nextPaddingDays + 7); i++) {
        daySquare = document.createElement('div');
        daySquare.classList.add('cell');

        date = document.createElement('div');
        date.classList.add('date', 'padding');
        date.innerText = i;

        daySquare.append(date);
        cell.append(daySquare);
    } 
}

function clearCalendar(calendar) {
    calendar.innerHTML = '';
}