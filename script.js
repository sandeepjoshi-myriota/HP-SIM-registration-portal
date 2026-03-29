document.addEventListener("DOMContentLoaded", () => {
    const forbiddenDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
    const form = document.getElementById('hyperPulseForm');
    const scanBtn = document.getElementById('scanBtn');
    const status = document.getElementById('statusMessage');
    const iccidInput = document.getElementById('iccid');

    // Initialize the Scanner
    const html5QrCode = new Html5Qrcode("interactive");

    scanBtn.addEventListener('click', () => {
        document.getElementById('interactive').style.display = 'block';

        const config = { fps: 10, qrbox: { width: 250, height: 150 } };

        // Start scanning (using the back camera)
        html5QrCode.start(
            { facingMode: "environment" }, 
            config,
            (decodedText) => {
                // Logic when a barcode is found
                iccidInput.value = decodedText;
                html5QrCode.stop(); // Stop camera after success
                document.getElementById('interactive').style.display = 'none';
                alert("Scan Successful: " + decodedText);
            },
            (errorMessage) => {
                // We don't alert here because it scans every frame
                console.log("Scanning...");
            }
        ).catch((err) => {
            alert("Camera Error: Make sure you are using HTTPS or localhost.");
            console.error(err);
        });
    });

    // --- SAME FORM VALIDATION AS BEFORE ---
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('companyEmail').value.toLowerCase();
        const domain = email.split('@')[1];

        if (forbiddenDomains.includes(domain)) {
            showStatus("Error: Business email required.", "error");
            return;
        }

        showStatus("Success! SIM registered.", "success");
        form.reset();
    });

    function showStatus(msg, type) {
        status.innerText = msg;
        status.className = type;
    }
});
