document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bookingForm');
    const bookNowBtn = document.getElementById('book-now');
    const inputs = form.querySelectorAll('input[required]');
    const programBtns = document.querySelectorAll('.program-btn');
    const experts = document.querySelectorAll('.expert-card');
    let selectedProgram = '';
    let selectedExpert = '';

    const checkFormValidity = () => {
        const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');
        if (allFilled && selectedProgram && selectedExpert) {
            bookNowBtn.disabled = false;
        } else {
            bookNowBtn.disabled = true;
        }
    };

    inputs.forEach(input => {
        input.addEventListener('input', checkFormValidity);
    });

    programBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            programBtns.forEach(b => b.classList.remove('selected'));
            e.target.classList.add('selected');
            selectedProgram = e.target.innerText;
            checkFormValidity();
        });
    });

    experts.forEach(expert => {
        expert.addEventListener('click', (e) => {
            experts.forEach(exp => exp.classList.remove('selected'));
            e.currentTarget.classList.add('selected');
            selectedExpert = e.currentTarget.querySelector('p').innerText;
            checkFormValidity();
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const bookingDetails = {
            name: document.getElementById('name').value,
            dob: document.getElementById('dob').value,
            address: document.getElementById('address').value,
            postalCode: document.getElementById('postal-code').value,
            city: document.getElementById('city').value,
            email: document.getElementById('email').value,
            prefix: document.getElementById('prefix').value,
            phone: document.getElementById('phone').value,
            program: selectedProgram,
            expert: selectedExpert,
            date: document.getElementById('calendar-input').value,
            time: document.getElementById('time-input').value
        };

        localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
        window.location.href = 'confirmation.html';
    });

    const calendar = document.createElement('input');
    calendar.type = 'date';
    calendar.id = 'calendar-input';
    calendar.onchange = function () {
        selectedDate = this.value;
        checkFormValidity();
    };
    document.getElementById('calendar').appendChild(calendar);

    const timeInput = document.createElement('input');
    timeInput.type = 'time';
    timeInput.id = 'time-input';
    timeInput.onchange = function () {
        checkFormValidity();
    };
    document.getElementById('time').appendChild(timeInput);
});

document.addEventListener('DOMContentLoaded', function () {
    const confirmationDetails = document.getElementById('confirmation-details');
    if (confirmationDetails) {
        const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));
        if (bookingDetails) {
            confirmationDetails.innerHTML = `
                Date: ${bookingDetails.date}<br>
                Time: ${bookingDetails.time}<br>
                Name: ${bookingDetails.name}<br>
                Service: ${bookingDetails.program}<br>
                Expert: ${bookingDetails.expert}
            `;
        }
    }
});
