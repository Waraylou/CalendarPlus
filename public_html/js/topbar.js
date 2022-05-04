const dropdown = document.getElementById('dropbtn');
const dropdownContent = document.getElementById('dropdown-content');

function initializeDropdown() {
    dropdown.addEventListener('click', () => {
        dropdownContent.classList.toggle('show');
        dropdown.blur();
    });

    // Close the dropdown if the user clicks outside of it
    window.addEventListener('click', () => {
        if (!event.target.matches('.dropbtn')) {
            const dropdowns = document.getElementsByClassName('dropdown-content');
            for (let i = 0; i < dropdowns.length; i++) {
                const openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    });

    // create dropdown links
    const dayLink = document.createElement('button');
    dayLink.classList.add('dropdown-item');
    dayLink.id = "day";
    dayLink.innerText = 'Day';
    dayLink.addEventListener('click', () => {
        window.location.href = '/day' + `?date=${dt.getMonth() + 1}-${dt.getDate()}-${dt.getFullYear()}`;
    });

    const weekLink = document.createElement('button');
    weekLink.classList.add('dropdown-item');
    weekLink.id = "week";
    weekLink.innerText = 'Week';
    weekLink.addEventListener('click', () => {
        window.location.href = '/week' + `?date=${dt.getMonth() + 1}-${dt.getDate()}-${dt.getFullYear()}`;
    });

    const monthLink = document.createElement('button');
    monthLink.classList.add('dropdown-item');
    monthLink.id = "month";
    monthLink.innerText = 'Month';
    monthLink.addEventListener('click', () => {
        window.location.href = '/month' + `?date=${dt.getMonth() + 1}-${dt.getDate()}-${dt.getFullYear()}`;
    });

    const yearLink = document.createElement('button');
    yearLink.classList.add('dropdown-item');
    yearLink.id = "year";
    yearLink.innerText = 'Year';
    yearLink.addEventListener('click', () => {
        window.location.href = '/year' + `?date=${dt.getMonth() + 1}-${dt.getDate()}-${dt.getFullYear()}`;
    });

    const scheduleLink = document.createElement('button');
    scheduleLink.classList.add('dropdown-item');
    scheduleLink.id = "schedule";
    scheduleLink.innerText = 'Schedule';
    scheduleLink.addEventListener('click', () => {
        window.location.href = '/schedule' + `?date=${dt.getMonth() + 1}-${dt.getDate()}-${dt.getFullYear()}`;
    });

    dropdownContent.append(dayLink);
    dropdownContent.append(weekLink);
    dropdownContent.append(monthLink);
    dropdownContent.append(yearLink);
    dropdownContent.append(scheduleLink);
}