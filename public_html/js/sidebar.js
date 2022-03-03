function initializeMain() {
    document.querySelector('.sidebar-left').innerHTML = "<button type='button' id='create'>Create</button>";
    document.querySelector('#create').addEventListener('click', () => {
        initializeCreate();
    })
}

function initializeCreate() {
    document.querySelector('.sidebar-left').innerHTML = "<form id='manageEvent' action=''>" +
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
    "</form>" + 
    "<button type='button' id='back'>Back</button>" +
    "<button id='save' form='manageEvent'>Save</button>"
    document.querySelector('#back').addEventListener('click', () => {
        initializeMain();
    })
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

initializeMain();