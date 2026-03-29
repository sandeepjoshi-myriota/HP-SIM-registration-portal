document.addEventListener("DOMContentLoaded", () => {
    const scanBtn = document.getElementById('scanBtn');
    const readerElement = document.getElementById('interactive');
    
    // 1. Check if the library loaded
    if (typeof Html5Qrcode === 'undefined') {
        alert("Library Error: Html5Qrcode is not loaded. Check your internet or script link.");
        return;
    }

    const html5QrCode = new Html5Qrcode("interactive");

    scanBtn.addEventListener('click', () => {
        console.log("Button clicked. Attempting to start camera...");
        readerElement.style.display = 'block';

        const config = { 
            fps: 10, 
            qrbox: { width: 250, height: 150 },
            aspectRatio: 1.0 
        };

        // Start scanning
        html5QrCode.start(
            { facingMode: "environment" }, // Prioritize back camera
            config,
            (decodedText) => {
                document.getElementById('iccid').value = decodedText;
                html5QrCode.stop();
                readerElement.style.display = 'none';
            }
        ).catch((err) => {
            // THIS WILL TELL US THE TRUTH
            console.error("Detailed Camera Error:", err);
            
            if (err.name === 'NotAllowedError') {
                alert("PERMISSION DENIED: You must click 'Allow' when the browser asks for camera access.");
            } else if (err.name === 'NotFoundError') {
                alert("NO CAMERA: No camera detected on this device.");
            } else if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
                alert("SECURITY BLOCK: Camera only works on HTTPS or Localhost.");
            } else {
                alert("CAMERA ERROR: " + err.message);
            }
        });
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
