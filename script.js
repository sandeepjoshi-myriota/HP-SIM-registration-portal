document.addEventListener("DOMContentLoaded", () => {
    const forbiddenDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
    const form = document.getElementById('hyperPulseForm');
    const scanBtn = document.getElementById('scanBtn');
    const iccidInput = document.getElementById('iccid');
    const status = document.getElementById('statusMessage');
    const readerElement = document.getElementById('interactive');

    // 1. Scanner Initialization
    const html5QrCode = new Html5Qrcode("interactive");

    scanBtn.addEventListener('click', () => {
        // Show camera container
        readerElement.style.display = 'block';

        const config = { 
            fps: 20, 
            qrbox: { width: 300, height: 150 },
            aspectRatio: 1.0 
        };

        // Start Camera
        html5QrCode.start(
            { facingMode: "environment" }, 
            config, 
            (decodedText) => {
                // SUCCESS: Populate ICCID
                iccidInput.value = decodedText;
                
                // Stop camera and hide reader
                html5QrCode.stop().then(() => {
                    readerElement.style.display = 'none';
                });
            },
            (errorMessage) => { /* Ignore constant scan failures */ }
        ).catch((err) => {
            alert("Camera failed: Ensure you are on HTTPS or localhost. Error: " + err);
        });
    });

    // 2. Form Submission & Validation
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        status.innerHTML = ""; // Clear old messages

        const email = document.getElementById('companyEmail').value.toLowerCase();
        const phone = document.getElementById('contactNumber').value;
        const domain = email.split('@')[1];

        // Business Email Check
        if (forbiddenDomains.includes(domain)) {
            showStatus("Error: Personal email providers are not allowed.", "error");
            return;
        }

        // Mobile Validation (Digits only, 7-15 chars)
        if (!/^\d{7,15}$/.test(phone)) {
            showStatus("Error: Please enter a valid mobile number (digits only).", "error");
            return;
        }

        // Success
        showStatus("Registration Successful! Processing SIM activation...", "success");
        form.reset();
        readerElement.style.display = 'none';
    });

    function showStatus(msg, type) {
        status.innerText = msg;
        status.className = type;
    }
});
