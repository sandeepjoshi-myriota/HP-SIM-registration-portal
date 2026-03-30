const scanBtn = document.getElementById('scanBtn');
const html5QrCode = new Html5Qrcode("interactive");

scanBtn.addEventListener('click', () => {
    // 1. Show the element FIRST
    document.getElementById('interactive').style.display = 'block';

    // 2. Define mobile-optimized constraints
    const config = { 
        fps: 15, 
        qrbox: { width: 250, height: 150 },
        aspectRatio: 1.0
    };

    // 3. Request permissions explicitly
    html5QrCode.start(
        { facingMode: "environment" }, // Forces the BACK camera
        config,
        (decodedText) => {
            document.getElementById('iccid').value = decodedText;
            html5QrCode.stop();
            document.getElementById('interactive').style.display = 'none';
        }
    ).catch((err) => {
        // This will trigger on mobile if not using HTTPS
        console.error("Mobile Camera Error:", err);
        alert("Mobile Error: " + err); 
    });
}, { passive: true }); // Adding passive listener for mobile performance

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
