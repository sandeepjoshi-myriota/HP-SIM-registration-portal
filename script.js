document.addEventListener("DOMContentLoaded", () => {
    // 1. Setup constants for validation
    const forbiddenDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
    const form = document.getElementById('hyperPulseForm');
    const scanBtn = document.getElementById('scanBtn');
    const iccidInput = document.getElementById('iccid');
    const readerElement = document.getElementById('interactive');

    // 2. Initialize the Scanner Instance
    const html5QrCode = new Html5Qrcode("interactive");

    // 3. Define the Success Callback Function
    const onScanSuccess = (decodedText, decodedResult) => {
        console.log(`Scan result: ${decodedText}`, decodedResult);
        
        // Populate the ICCID field
        iccidInput.value = decodedText;
        
        // Visual feedback for the user
        iccidInput.style.border = "2px solid #00f2ff";
        iccidInput.classList.add('scan-success-flash');

        // Stop scanning and hide camera
        html5QrCode.stop().then(() => {
            readerElement.style.display = 'none';
            alert("ICCID Captured: " + decodedText);
        }).catch((err) => {
            console.warn("Stop failed", err);
        });
    };

    // 4. Define the Error Callback (Optional - fires on every frame that fails)
    const onScanFailure = (error) => {
        // We leave this empty to avoid spamming the console
    };

    // 5. Button Click Event
    scanBtn.addEventListener('click', () => {
        readerElement.style.display = 'block';

        const config = { 
            fps: 20, 
            qrbox: { width: 300, height: 150 },
            aspectRatio: 1.0 
        };

        // Start the camera
        // Argument 1: Camera Config
        // Argument 2: App Config
        // Argument 3: THE SUCCESS CALLBACK (onScanSuccess)
        // Argument 4: THE ERROR CALLBACK (onScanFailure)
        html5QrCode.start(
            { facingMode: "environment" }, 
            config, 
            onScanSuccess, 
            onScanFailure
        ).catch((err) => {
            alert("Camera initialization failed. Ensure you are on HTTPS.");
        });
    });

    // 6. Form Submission Validation
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('companyEmail').value.toLowerCase();
        const domain = email.split('@')[1];

        if (forbiddenDomains.includes(domain)) {
            alert("Error: Please use a corporate email address.");
            return;
        }

        alert("HyperPulse SIM Registration Submitted Successfully!");
        form.reset();
    });
});
