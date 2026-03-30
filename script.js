document.addEventListener("DOMContentLoaded", () => {
    const forbiddenDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
    const scanBtn = document.getElementById('scanBtn');
    const iccidInput = document.getElementById('iccid');
    const readerElement = document.getElementById('interactive');
    const status = document.getElementById('statusMessage');
    const advice = document.getElementById('cameraAdvice');

    // Initialize Scanner instance
    const html5QrCode = new Html5Qrcode("interactive");

    scanBtn.addEventListener('click', async () => {
        // Clear previous errors
        status.innerHTML = "";
        
        // Show the scanner window
        readerElement.style.display = 'block';
        advice.style.display = 'block';
        scanBtn.innerText = "⌛ Opening...";
        scanBtn.disabled = true;

        const config = { 
            fps: 20, 
            qrbox: { width: 300, height: 150 },
            aspectRatio: 1.0 
        };

        // START CAMERA & CHECK PERMISSIONS
        html5QrCode.start(
            { facingMode: "environment" }, 
            config, 
            (decodedText) => {
                // SUCCESS: Scanned barcode
                iccidInput.value = decodedText;
                
                // Stop camera to save battery
                html5QrCode.stop().then(() => {
                    readerElement.style.display = 'none';
                    advice.style.display = 'none';
                    scanBtn.innerText = "📸 Re-Scan";
                    scanBtn.disabled = false;
                });
            }
        ).catch((err) => {
            // ERROR: Permission Denied or Not Secure (No HTTPS)
            readerElement.style.display = 'none';
            advice.style.display = 'none';
            scanBtn.innerText = "📸 Open Scanner";
            scanBtn.disabled = false;

            console.error("Scanner Error:", err);

            if (err.toString().includes("NotAllowedError") || err.toString().includes("Permission")) {
                alert("PERMISSION DENIED: Please go to your browser settings and allow camera access for this site.");
            } else if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
                alert("SECURITY ERROR: Cameras only work on 'https://' URLs. Please deploy to a secure server.");
            } else {
                alert("CAMERA ERROR: " + err);
            }
        });
    });

    // Form Submission Logic
    document.getElementById('hyperPulseForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('companyEmail').value.toLowerCase();
        const domain = email.split('@')[1];

        if (forbiddenDomains.includes(domain)) {
            showStatus("❌ Use a business email (no Gmail/Yahoo).", "error");
            return;
        }

        showStatus("✅ Success! SIM Registration complete.", "success");
        document.getElementById('hyperPulseForm').reset();
    });

    function showStatus(msg, type) {
        status.innerText = msg;
        status.className = type;
    }
});
