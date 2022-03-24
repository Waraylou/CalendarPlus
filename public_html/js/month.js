let nav = 0;
let clicked = null;

const calendar = document.getElementById('calendar');
const currDate = new Date();
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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

    clearCalendar();

    console.log(currDate);
    console.log(dt);

    for(let i = paddingDays; i > 0; i--) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('cell');

        const date = document.createElement('div');
        date.classList.add('date', 'padding');
        date.innerText = lastDayPrevMonth - i + 1;

        daySquare.addEventListener('click', () => console.log('click'));

        daySquare.appendChild(date);
        calendar.appendChild(daySquare);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('cell');

        const date = document.createElement('div');
        date.classList.add('date');
        date.innerText = i;
        if(i == currDate.getDate() && month == currDate.getMonth() && year == currDate.getFullYear()) {
            date.classList.add('selected');
        }

        daySquare.addEventListener('click', () => console.log('click'));

        daySquare.appendChild(date);
        calendar.appendChild(daySquare);
    }

    console.log(day);
    console.log(currDate.getDate());

    for(let i = 1; i < nextPaddingDays; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('cell');

        const date = document.createElement('div');
        date.classList.add('date', 'padding');
        date.innerText = i;

        daySquare.addEventListener('click', () => console.log('click'));

        daySquare.appendChild(date);
        calendar.appendChild(daySquare);
    }
}

function clearCalendar() {
    calendar.innerHTML = '';
}

function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    })
    document.getElementById('prevButton').addEventListener('click', () => {
        nav--;
        load();
    })
}

initButtons();
load();