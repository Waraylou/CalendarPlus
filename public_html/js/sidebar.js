const main = document.getElementById('sidebar');

// Initializes the main sidebar view
function initializeMain() {
    const mainSidebar = document.createElement('div');
    mainSidebar.id = 'main-sidebar';

    const createButton = document.createElement('button');
    createButton.type = 'button';
    createButton.id = 'create';
    createButton.innerText = 'Create';
    createButton.addEventListener('click', () => {
        clearSidebar();
        initializeCreate();
    });
    mainSidebar.appendChild(createButton);

    const sidebarCalendar = document.createElement('div');
    sidebarCalendar.id = 'sidebar-calendar';
    sidebarCalendar.className = 'sidebar-calendar';
    initializeSidebarCalendar(sidebarCalendar);
    mainSidebar.appendChild(sidebarCalendar);

    main.appendChild(mainSidebar);
}

function initializeSidebarCalendar(calendar) {
    const dt = new Date();

    day = dt.getDate();
    month = dt.getMonth();
    year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const lastDayPrevMonth = new Date(year, month, 0).getDate();
    const nextPaddingDays = 7 - new Date(year, month + 1, 0).getDay();

    const paddingDays = firstDayOfMonth.getDay();

    const displayViewed = document.createElement('h3');
    displayViewed.id = 'sidebar-display-viewed';
    displayViewed.innerText = `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;
    // on click, redirect to the month view of the selected month
    displayViewed.addEventListener('click', () => {
        window.location.href = '/month' + `?date=${dt.getMonth() + 1}-${dt.getDate()}-${dt.getFullYear()}`;
    });
    calendar.appendChild(displayViewed);

    renderDaysOfWeek(calendar);

    renderStartPadding(calendar, paddingDays, lastDayPrevMonth);

    renderMonth(calendar, daysInMonth, dt, month, year);

    renderExtraPadding(calendar, nextPaddingDays);
}

// CLears sidebar content
function clearSidebar() {
    main.innerHTML = '';
}

// Initializes the create sidebar
function initializeCreate(date = new Date()) {
    // Form creation
    const createForm = document.createElement('form');
    createForm.id = 'manageEvent';
    createForm.method = 'POST'
    createForm.action = '/api/events'

        // Container for form fields
        const formFields = document.createElement('div');
        formFields.className = 'formFields';

            // Field for event name
            const titleField = document.createElement('input');
            titleField.type = 'text';
            titleField.id = 'title';
            titleField.name = 'title';
            titleField.placeholder = 'Title';
            formFields.appendChild(titleField);
            
            // Label for start time field
            const startLabel = document.createElement('label');
            startLabel.innerText = 'Start Time';
            formFields.appendChild(startLabel);

            // Field for start time
            const startTime = document.createElement('input');
            startTime.type = 'datetime-local';
            // set the default value to the current time, without seconds
            let startDate = new Date();
            if (date !== new Date()) {
                startDate = date;
            }
            startTime.value = startDate.toISOString().split('T')[0] + 'T' + startDate.toTimeString().split(' ')[0].split(':')[0] + ':00';
            formFields.appendChild(startTime);
            startTime.name = "start";
            startTime.id = "start";

            // Label for end time field
            const endLabel = document.createElement('label');
            endLabel.innerText = 'End Time';
            formFields.appendChild(endLabel);

            // Field for end time
            const endTime = document.createElement('input');
            endTime.type = 'datetime-local';
            // set the default value to the current time, without seconds + 1 hour
            let endDate = new Date();
            if (date !== new Date()) {
                endDate = date;
            }
            endDate.setHours(endDate.getHours() + 1);
            endTime.value = endDate.toISOString().split('T')[0] + 'T' + endDate.toTimeString().split(' ')[0].split(':')[0] + ':00';
            formFields.appendChild(endTime);
            endTime.name = "end";
            endTime.id = "end";

            // Label for all day checkbox
            const allDayLabel = document.createElement('label');
            allDayLabel.className = 'reminder';
            allDayLabel.innerText = 'Remind Me';

                // Checkbox element
                const allDay = document.createElement('input');
                allDay.type = 'checkbox';
                allDayLabel.appendChild(allDay);

                // Element for custom checkbox (replaces default visually)
                const checkmark = document.createElement('span');
                checkmark.className = 'checkmark';
                allDayLabel.appendChild(checkmark);

            formFields.appendChild(allDayLabel);

            // Field for event location
            const locationField = document.createElement('input');
            locationField.type = 'text';
            locationField.id = 'location';
            locationField.name = 'location';
            locationField.placeholder = 'Location';
            formFields.appendChild(locationField);

            // Field for event description
            const descriptionField = document.createElement('textarea');
            descriptionField.id = 'description';
            descriptionField.name = 'description';
            descriptionField.placeholder = 'Description';
            formFields.appendChild(descriptionField);

            createForm.appendChild(formFields);

            // Container for form buttons
            const formButtons = document.createElement('div');
            formButtons.className = 'formButtons';

            // Back button (returns user to main sidebar)
            const backButton = document.createElement('button');
            backButton.type = 'button';
            backButton.id = 'back';
            backButton.innerText = 'Back';
            backButton.addEventListener('click', () => {
                clearSidebar();
                initializeMain();
                // log the value of startDate
            });
            formButtons.appendChild(backButton);
            // Save button (saves event)
            const saveButton = document.createElement('button');
            saveButton.id = 'save';
            saveButton.innerText = 'Save';
            saveButton.addEventListener('click', () => {
                // if the title is empty, set it to 'Untitled Event'
                if (titleField.value === '') {
                    titleField.value = 'Untitled Event';
                }
                createForm.submit();
            });
            formButtons.appendChild(saveButton);

        createForm.appendChild(formButtons);

    main.appendChild(createForm);
}

// Initializes the edit sidebar
function initializeEdit(eventId) {

    let eventData = getEventsData()
    eventData.then(val => {
        for (let i = 0; i < val.length; i++) {
            if (val[i].event_id === eventId) {
                // Form creation
                const createForm = document.createElement('form');
                createForm.id = 'manageEvent';
                createForm.method = 'POST'
                createForm.action = '/api/updateEvent'

                // Container for form fields
                const formFields = document.createElement('div');
                formFields.className = 'formFields';
                
                // Field for event name
                const titleField = document.createElement('input');
                // set the field to readonly
                titleField.readOnly = true;
                titleField.type = 'text';
                titleField.id = 'title';
                titleField.name = 'title';
                titleField.placeholder = 'Title';
                titleField.value = val[i].event_title;
                formFields.appendChild(titleField);
                
                // Label for start time field
                const startLabel = document.createElement('label');
                startLabel.innerText = 'Start Time';
                formFields.appendChild(startLabel);

                // Field for start time
                const startTime = document.createElement('input');
                startTime.readOnly = true;
                startTime.type = 'datetime-local';
                // set the default value to the current time
                let startDate = new Date(val[i].eventStart);
                // add 5 hours to the start date
                startDate.setHours(startDate.getHours() + 5);
                startTime.value = startDate.toISOString().split('T')[0] + 'T' + startDate.toTimeString().split(' ')[0];
                formFields.appendChild(startTime);
                startTime.name = "start";
                startTime.id = "start";

                // Label for end time field
                const endLabel = document.createElement('label');
                endLabel.innerText = 'End Time';
                formFields.appendChild(endLabel);

                // Field for end time
                const endTime = document.createElement('input');
                endTime.readOnly = true;
                endTime.type = 'datetime-local';
                // set the default value to the current time, without seconds
                let endDate = new Date(val[i].eventEnd);
                // add 5 hours to the end date
                endDate.setHours(endDate.getHours() + 5);
                endTime.value = endDate.toISOString().split('T')[0] + 'T' + endDate.toTimeString().split(' ')[0];
                formFields.appendChild(endTime);
                endTime.name = "end";
                endTime.id = "end";

                // Label for all day checkbox
                const allDayLabel = document.createElement('label');
                allDayLabel.className = 'reminder';
                allDayLabel.innerText = 'Remind Me';

                    // Checkbox element
                    const allDay = document.createElement('input');
                    allDay.readOnly = true;
                    allDay.type = 'checkbox';
                    allDayLabel.appendChild(allDay);

                    // Element for custom checkbox (replaces default visually)
                    const checkmark = document.createElement('span');
                    checkmark.className = 'checkmark';
                    allDayLabel.appendChild(checkmark);

                formFields.appendChild(allDayLabel);

                // Field for event location
                const locationField = document.createElement('input');
                locationField.readOnly = true;
                locationField.type = 'text';
                locationField.id = 'location';
                locationField.name = 'location';
                locationField.placeholder = 'Location';
                locationField.value = val[i].eventLocation;
                formFields.appendChild(locationField);

                // Field for event description
                const descriptionField = document.createElement('textarea');
                descriptionField.readOnly = true;
                descriptionField.id = 'description';
                descriptionField.name = 'description';
                descriptionField.placeholder = 'Description';
                descriptionField.value = val[i].eventDescription;
                formFields.appendChild(descriptionField);

                // create a hidden input field to hold the event id
                const eventIdField = document.createElement('input');
                eventIdField.type = 'hidden';
                eventIdField.name = 'event_id';
                eventIdField.value = val[i].event_id;
                formFields.appendChild(eventIdField);

                createForm.appendChild(formFields);

                // Container for form buttons
                const formButtons = document.createElement('div');
                formButtons.className = 'formButtons';

                    // Back button (returns user to main sidebar)
                    const backButton = document.createElement('button');
                    backButton.type = 'button';
                    backButton.id = 'back';
                    backButton.innerText = 'Back';
                    backButton.addEventListener('click', () => {
                        clearSidebar();
                        initializeMain();
                    });
                    formButtons.appendChild(backButton);

                    // Delete button (deletes event)
                    const deleteButton = document.createElement('button');
                    deleteButton.type = 'button';
                    deleteButton.id = 'delete';
                    deleteButton.innerText = 'Delete';
                    // when clicked, call the /deleteEvent route
                    deleteButton.addEventListener('click', () => {
                        const deleteForm = document.getElementById('manageEvent');
                        deleteForm.action = '/deleteEvent';
                        deleteForm.submit();
                    });
                    formButtons.appendChild(deleteButton);

                    // Edit button (edits event)
                    const editButton = document.createElement('button');
                    editButton.type = 'button';
                    editButton.id = 'edit';
                    editButton.innerText = 'Edit';
                    formButtons.appendChild(editButton);

                    // if the edit button is clicked, make all the fields editable
                    editButton.addEventListener('click', () => {
                        titleField.readOnly = false;
                        startTime.readOnly = false;
                        endTime.readOnly = false;
                        allDay.readOnly = false;
                        locationField.readOnly = false;
                        descriptionField.readOnly = false;

                        // change the back button's event listener to call initializeEdit(eventId)
                        backButton.removeEventListener('click', () => {
                            clearSidebar();
                            initializeMain();
                        });
                        backButton.addEventListener('click', () => {
                            clearSidebar();
                            initializeEdit(eventId);
                        });
                        // get rid of the delete button
                        deleteButton.remove();
                        // replace the edit button with a save button
                        editButton.remove();
                        const saveButton = document.createElement('button');
                        saveButton.type = 'button';
                        saveButton.id = 'save';
                        saveButton.innerText = 'Save';
                        // when clicked, call the /updateEvent route
                        saveButton.addEventListener('click', () => {
                            const saveForm = document.getElementById('manageEvent');
                            saveForm.action = '/updateEvent';
                            // if the title is empty, set it to 'Untitled Event'
                            if (titleField.value === '') {
                                titleField.value = 'Untitled Event';
                            }
                            saveForm.submit();
                        });
                        formButtons.appendChild(saveButton);
                    });

                createForm.appendChild(formButtons);

                main.appendChild(createForm);
            }
        }
    });
}

initializeMain();