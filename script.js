document.addEventListener("DOMContentLoaded", () => {
    const iccidInput = document.getElementById('iccid');
    const scanBtn = document.getElementById('scanBtn');
    const readerElement = document.getElementById('interactive');

    // Initialize the Scanner object
    const html5QrCode = new Html5Qrcode("interactive");

    scanBtn.addEventListener('click', () => {
        readerElement.style.display = 'block'; // Show the camera container

        const config = { 
            fps: 20, // High frame rate for faster barcode "catching"
            qrbox: { width: 300, height: 150 }, // Box shaped for long barcodes
            aspectRatio: 1.0
        };

        html5QrCode.start(
            { facingMode: "environment" }, 
            config,
            (decodedText) => {
                // --- THE MAGIC HAPPENS HERE ---
                // 1. Fill the input field with the scanned code
                iccidInput.value = decodedText;
                
                // 2. Add a visual "Success" flash to the input
                iccidInput.style.backgroundColor = "#152a1d";
                iccidInput.style.borderColor = "#00ff88";

                // 3. Stop the camera to save battery/processing
                html5QrCode.stop().then(() => {
                    readerElement.style.display = 'none'; // Hide camera
                    console.log("Scan successful, ICCID populated.");
                });
            },
            (errorMessage) => {
                // Silently ignore failed frames to keep the UI smooth
            }
        ).catch((err) => {
            alert("Camera failed: " + err);
        });
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
