document.addEventListener("DOMContentLoaded", () => {
    const forbiddenDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
    const form = document.getElementById('hyperPulseForm');
    const scanBtn = document.getElementById('scanBtn');
    const status = document.getElementById('statusMessage');

    // --- BARCODE SCANNING LOGIC ---
    scanBtn.addEventListener('click', () => {
        const scanner = document.getElementById('interactive');
        scanner.style.display = 'block';
        
        Quagga.init({
            inputStream: {
                type: "LiveStream",
                target: scanner,
                constraints: { facingMode: "environment" }
            },
            decoder: { readers: ["code_128_reader", "ean_reader", "code_39_reader"] }
        }, (err) => {
            if (err) { alert("Camera error: " + err); return; }
            Quagga.start();
        });

        Quagga.onDetected((data) => {
            document.getElementById('iccid').value = data.codeResult.code;
            Quagga.stop();
            scanner.style.display = 'none';
        });
    });

    // --- FORM VALIDATION LOGIC ---
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        status.innerHTML = ""; // Clear old messages
        
        const email = document.getElementById('companyEmail').value.toLowerCase();
        const phone = document.getElementById('contactNumber').value;
        const domain = email.split('@')[1];

        // 1. Business Email Check
        if (forbiddenDomains.includes(domain)) {
            showStatus("Error: Personal emails (Gmail/Yahoo etc.) are not permitted.", "error");
            return;
        }

        // 2. Mobile Validation (Digits only, 7-15 chars)
        if (!/^\d{7,15}$/.test(phone)) {
            showStatus("Error: Invalid mobile number format.", "error");
            return;
        }

        showStatus("Success! Your SIM registration is complete.", "success");
        form.reset();
    });

    function showStatus(msg, type) {
        status.innerText = msg;
        status.className = type;
    }
});
