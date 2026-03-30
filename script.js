document.addEventListener("DOMContentLoaded", () => {
    const forbiddenDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
    const iccidInput = document.getElementById('iccid');
    const status = document.getElementById('statusMessage');
    const form = document.getElementById('hyperPulseForm');

    // 1. Initialize Scanner Automatically
    const html5QrCode = new Html5Qrcode("interactive");
    
    const startScanner = () => {
        const config = { 
            fps: 20, 
            qrbox: { width: 320, height: 150 },
            aspectRatio: 1.0 
        };

        html5QrCode.start(
            { facingMode: "environment" }, 
            config, 
            (decodedText) => {
                // SUCCESS: Fill input and provide feedback
                iccidInput.value = decodedText;
                iccidInput.style.borderColor = "#00ff88";
                
                // Vibrate if mobile supports it
                if (navigator.vibrate) navigator.vibrate(100);
                
                // Optional: Stop camera to save battery after successful scan
                // html5QrCode.stop(); 
            }
        ).catch((err) => {
            console.warn("Scanner failed to auto-start. Ensure HTTPS is used.", err);
        });
    };

    startScanner();

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
