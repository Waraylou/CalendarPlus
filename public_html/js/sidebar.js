function initializeMain() {
    document.querySelector('.sidebar-left').innerHTML = "<button type='button' id='create'>Create</button>";
    document.querySelector('#create').addEventListener('click', () => {
        initializeCreate();
    })
}

function initializeCreate() {
    document.querySelector('.sidebar-left').innerHTML = "<form action=''>" +
    "<input type='text' id='title' name='title' placeholder='Title'><br>" +
    "<label for='birthdaytime'>Start Time</label>" +
    "<input type='datetime-local'>" +
    "<label for='birthdaytime'>End Time</label>" +
    "<input type='datetime-local'>" +
    "<label class='allday'>All Day" +
    "<input type='checkbox'>" +
    "<span class='checkmark'></span>" +
    "</label>" +
    "<input type='text' id='location' name='location' placeholder='Location'><br>" +
    "<textarea id='description' name='description' placeholder='Description'></textarea>" +
    "<input type='button' id='back' value='Back'>" +
    "<input type='submit' id='save' value='Save'>" +
    "</form>"
    document.querySelector('#back').addEventListener('click', () => {
        initializeMain();
    })
}

initializeMain();