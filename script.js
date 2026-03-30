document.addEventListener("DOMContentLoaded", () => {
    const scanBtn = document.getElementById('scanBtn');
    const readerElement = document.getElementById('interactive');
    const iccidInput = document.getElementById('iccid');
    const html5QrCode = new Html5Qrcode("interactive");

    scanBtn.addEventListener('click', async () => {
        // 1. UI Feedback: Show the scanner box
        readerElement.style.display = 'block';
        scanBtn.innerText = "⌛ Initializing...";
        scanBtn.disabled = true;

        const config = { 
            fps: 20, 
            qrbox: { width: 280, height: 150 },
            aspectRatio: 1.0 
        };

        // 2. Check Permissions & Start
        html5QrCode.start(
            { facingMode: "environment" }, 
            config, 
            (decodedText) => {
                // SUCCESS: Fill and Stop
                iccidInput.value = decodedText;
                html5QrCode.stop().then(() => {
                    readerElement.style.display = 'none';
                    scanBtn.innerText = "📸 Scan Again";
                    scanBtn.disabled = false;
                });
            }
        ).catch((err) => {
            // 3. Handle Permission or Hardware Errors
            readerElement.style.display = 'none';
            scanBtn.innerText = "📸 Open Scanner";
            scanBtn.disabled = false;

            if (err.name === 'NotAllowedError' || err.includes("Permission")) {
                alert("PERMISSION BLOCKED: Please click the lock icon in your browser address bar and set Camera to 'Allow'.");
            } else {
                alert("CAMERA ERROR: " + err);
            }
            console.error("Scanner Error:", err);
        });
    });

    // --- Form Validation (Same as before) ---
    document.getElementById('hyperPulseForm').addEventListener('submit', (e) => {
        // ... validation logic ...
    });
});
    // 2. Form Submission & Logic
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        status.innerHTML = ""; 

        const email = document.getElementById('companyEmail').value.toLowerCase();
        const phone = document.getElementById('contactNumber').value;
        const domain = email.split('@')[1];

        if (forbiddenDomains.includes(domain)) {
            showStatus("❌ Corporate email required (No Gmail/Yahoo).", "error");
            return;
        }

        if (!/^\d{7,15}$/.test(phone)) {
            showStatus("❌ Invalid mobile number format.", "error");
            return;
        }

        showStatus("✅ Registration complete! Your HyperPulse SIM is active.", "success");
        form.reset();
        iccidInput.style.borderColor = "#333";
    });

    function showStatus(msg, type) {
        status.innerText = msg;
        status.className = type;
    }
});
