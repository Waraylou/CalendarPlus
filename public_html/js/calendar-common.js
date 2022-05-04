const currDate = new Date();
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
function renderStartPadding(cell, paddingDays, lastDayPrevMonth, month, year, renderEvents = false) {
    for (let i = paddingDays; i > 0; i--) {
        daySquare = document.createElement('div');
        daySquare.classList.add('cell');

        date = document.createElement('div');
        date.classList.add('date', 'padding');
        date.innerText = lastDayPrevMonth - i + 1;

        daySquare.append(date);

        if (renderEvents) {
            eventsDiv = document.createElement('div');
            eventsDiv.classList.add('events');
            eventsDiv.id = `${month + 1}-${lastDayPrevMonth - i + 1}-${year}`;
            eventsDiv.addEventListener('click', () => {
                // call initializeCreate() with the date as a parameter
                // create a new date object with the date of the clicked day
                // initializeCreate(new Date(year, month, i));
                clearSidebar();
                initializeCreate(new Date(year, month, lastDayPrevMonth - i + 1));
            });
            daySquare.append(eventsDiv);
        }

        cell.append(daySquare);
    }
}

// Renders days from the current month onto the calendar
function renderMonth(cell, daysInMonth, dt, month, year, renderEvents = false) {
    for (let i = 1; i <= daysInMonth; i++) {
        daySquare = document.createElement('div');
        daySquare.classList.add('cell');
        
        date = document.createElement('div');
        date.classList.add('date');
        date.innerText = i;
        date.addEventListener('click', () => {
            // redirect to the day page for the selected date
            window.location.href = `/day?date=${month + 1}-${i}-${year}`;
        });
        if(i == currDate.getDate() && dt.getMonth() == currDate.getMonth() && dt.getFullYear() == currDate.getFullYear()) {
            date.classList.add('selected');
        }

        daySquare.append(date);

        if (renderEvents) {
            eventsDiv = document.createElement('div');
            eventsDiv.classList.add('events');
            eventsDiv.id = `${month + 1}-${i}-${year}`;
            eventsDiv.addEventListener('click', () => {
                // call initializeCreate() with the date as a parameter
                // create a new date object with the date of the clicked day
                // initializeCreate(new Date(year, month, i));
                clearSidebar();
                initializeCreate(new Date(year, month, i));
            });
            daySquare.append(eventsDiv);
        }

        cell.append(daySquare);
    }
}

// Renders days from the next month + extra, to ensure that all months contain 6 rows
function renderEndPadding(cell, nextPaddingDays, month, year, renderEvents = false) {
    for (let i = 1; i < nextPaddingDays; i++) {
        daySquare = document.createElement('div');
        daySquare.classList.add('cell');

        date = document.createElement('div');
        date.classList.add('date', 'padding');
        date.innerText = i;

        daySquare.append(date);

        if (renderEvents) {
            eventsDiv = document.createElement('div');
            eventsDiv.classList.add('events');
            eventsDiv.id = `${month + 1}-${i}-${year}`;
            eventsDiv.addEventListener('click', () => {
                // call initializeCreate() with the date as a parameter
                // create a new date object with the date of the clicked day
                // initializeCreate(new Date(year, month, i));
                clearSidebar();
                initializeCreate(new Date(year, month, i));
            });
            daySquare.append(eventsDiv);
        }

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

async function getEventsData(){
    let response = await fetch('/EventsData')
    .then(response => response.json())
    .then(data =>  {return data })

    console.log(response);
    
    return response;
    
}