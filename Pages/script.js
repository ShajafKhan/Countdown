function isLocalStorageAvailable() {
    try {
        const test = '__localStorage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

function isValidDate(dateString) {
    if (!dateString || dateString.trim() === '') return false;
    const date = new Date(dateString);
    const isValid = !isNaN(date.getTime()) && date.getTime() > 0;
    console.log(`Date validation for "${dateString}":`, isValid);
    return isValid;
}

function storeParamsToLocalStorageAndCleanURL() {
    if (!isLocalStorageAvailable()) {
        console.error('localStorage is not available');
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const hasParams = params.has('n') || params.has('end-date') || params.has('birthday-card-url');

    if (hasParams) {
        console.log('Processing URL parameters...');

        const name = params.get('n');
        const endDate = params.get('end-date');
        const birthdayCardUrl = params.get('birthday-card-url');

        // Check if these are NEW parameters (different from stored ones)
        const currentStored = {
            name: localStorage.getItem('name'),
            endDate: localStorage.getItem('endDate'),
            birthdayCardUrl: localStorage.getItem('birthdayCardUrl')
        };

        const newParams = {
            name: name?.trim() || null,
            endDate: endDate?.trim() || null,
            birthdayCardUrl: birthdayCardUrl?.trim() || null
        };

        // Check if parameters are different or if it's the first time
        const paramsChanged = JSON.stringify(currentStored) !== JSON.stringify(newParams);

        console.log('Current stored:', currentStored);
        console.log('New parameters:', newParams);
        console.log('Parameters changed:', paramsChanged);

        if (paramsChanged) {
            // Store new parameters
            if (name && name.trim()) {
                localStorage.setItem('name', name.trim());
                console.log('Stored name:', name.trim());
            }

            if (endDate && endDate.trim()) {
                if (isValidDate(endDate.trim())) {
                    localStorage.setItem('endDate', endDate.trim());
                    console.log('Stored endDate:', endDate.trim());
                } else {
                    console.error(' Invalid date format provided:', endDate);
                    return;
                }
            }

            if (birthdayCardUrl && birthdayCardUrl.trim()) {
                localStorage.setItem('birthdayCardUrl', birthdayCardUrl.trim());
                console.log('Stored birthdayCardUrl:', birthdayCardUrl.trim());
            }

            // Always reload when parameters change
            console.log('Reloading to clean URL...');
            window.location.href = window.location.pathname;
        } else {
            console.log('ℹ Parameters unchanged, skipping reload');
        }
    }
}


function loadCountdownData() {
    if (!isLocalStorageAvailable()) {
        return null;
    }

    const name = localStorage.getItem('name');
    const endDate = localStorage.getItem('endDate');
    const birthdayCardUrl = localStorage.getItem('birthdayCardUrl');

    console.log('Loading data:', { name, endDate, birthdayCardUrl });

    if (name && endDate && isValidDate(endDate)) {
        return { name, endDate, birthdayCardUrl };
    } else {
        console.log(' Invalid or missing countdown data');
        return null;
    }
}

function countdown(endDate) {
    try {
        const end = new Date(endDate).getTime();

        if (isNaN(end)) {
            throw new Error('Invalid end date provided');
        }

        const timer = setInterval(() => {
            try {
                const now = new Date().getTime();
                const distance = end - now;

                if (distance <= 0) {
                    clearInterval(timer);
                    document.getElementById('countdown').textContent = 'The countdown has ended!';
                    document.getElementById('redirectButton').style.display = 'inline-block';
                    return;
                }

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                document.getElementById('countdown').textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            } catch (error) {
                console.error('Error in countdown timer:', error);
                clearInterval(timer);
                document.getElementById('countdown').textContent = 'Error in countdown calculation';
            }
        }, 1000);
    } catch (error) {
        console.error('Error starting countdown:', error);
        document.getElementById('countdown').textContent = 'Error: Invalid countdown date';
    }
}

function redirect() {
    try {
        const birthdayCardUrl = localStorage.getItem('birthdayCardUrl');
        if (birthdayCardUrl && birthdayCardUrl.trim()) {
            if (birthdayCardUrl.startsWith('http://') || birthdayCardUrl.startsWith('https://')) {
                window.location.href = birthdayCardUrl;
            } else {
                alert('Invalid URL format for birthday card.');
            }
        } else {
            alert('No birthday card URL found.');
        }
    } catch (error) {
        console.error('Error during redirect:', error);
        alert('Error occurred during redirect.');
    }
}

console.log("=== COUNTDOWN DEBUG LOG ===");
const params = new URLSearchParams(window.location.search);
console.log("URL Parameters found:", {
    name: params.get('n'),
    endDate: params.get('end-date'),
    birthdayUrl: params.get('birthday-card-url')
});

console.log("localStorage contents:", {
    name: localStorage.getItem('name'),
    endDate: localStorage.getItem('endDate'),
    birthdayCardUrl: localStorage.getItem('birthdayCardUrl')
});

try {
    storeParamsToLocalStorageAndCleanURL();
    const countdownData = loadCountdownData();

if (!countdownData) {
    document.querySelector('.countdown-container').innerHTML = `
        <div class="error-message">
            <h2>No Valid Countdown Data Found</h2>
            <p>Please generate a countdown from the URL Generator page with valid parameters.</p>
            <a href="https://shajafkhan.github.io/Url-Generator/Pages/index.html" 
               class="url-generator-btn">
               Go to URL Generator
            </a>
        </div>`;
} else {
    document.getElementById('name').textContent = countdownData.name;
    countdown(countdownData.endDate);
    console.log(' Countdown started successfully!');
}

} catch (error) {
    console.error('Error initializing countdown page:', error);
    document.querySelector('.countdown-container').innerHTML = `
            <div class="error-message">Error loading countdown page.<br>
            Please check the console for details and try again.</div>`;
}