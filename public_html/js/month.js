const date = new Date();

// Function to render dates onto the calendar
function renderCalendar() {

    const monthDays = document.querySelector('.grid');
    // Last day(number) of the month (how many days are in the month)
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    // Last day(number) of the previous month (how many days in previous month)
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    // Calculates what day the first day of the month is on
    const firstDayIndex = date.getDay();
    // Calculates what day the last day of the month is on
    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    
    const nextDays = 7 - lastDayIndex - 1;
    // List of months
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    // Sets the correct month and year on the top of the screen
    document.querySelector('.topbar h2').innerHTML = months[date.getMonth()] + " " + date.getFullYear();
    // Initializes days to empty
    let days = "";
    // Displays days of the last month that would be visible on the current month's calendar
    for(let i = firstDayIndex; i > 0; i--) {
        days += `<div class="cell"><div class="date prev-month">${prevLastDay - i + 1}</div></div>`;
    }
    // Displays days of the current month
    for(let i = 1; i <= lastDay; i++) {
        days += `<div class="cell"><div class="date">${i}</div></div>`;
        monthDays.innerHTML = days;
    }
    // Displays days of the next month that would be visible on the current month's calendar
    for(let i = 1; i <= nextDays; i++) {
        days += `<div class="cell"><div class="date next-month">${i}</div></div>`;
        monthDays.innerHTML = days;
    }
}
// Changes the calendar to the previous month when the "Prev" button is clicked
document.querySelector('.prev').addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
})
// Changes the calendar to the next month when the "Next" button is clicked
document.querySelector('.next').addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
})
// Initializes the calendar (only done once)
renderCalendar();