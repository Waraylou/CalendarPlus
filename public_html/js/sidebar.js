function initializeMain() {
    document.querySelector('.sidebar-left').innerHTML = "<button type='button' id='create'>Create</button>";
    document.querySelector('#create').addEventListener('click', () => {
        initializeCreate();
    })
}

function initializeCreate() {
    document.querySelector('.sidebar-left').innerHTML = "<form action=''>" +
    "<input type='text' id='title' name='title' placeholder='Title'><br>" +
    "<input type='text' id='location' name='location' placeholder='Location'><br>" +
    "<input type='text' id='description' name='description' placeholder='Description'><br>" +
    "<input type='button' id='back' value='Back'>" +
    "<input type='submit' id='save' value='Save'>" +
    "</form>"
}

initializeMain();