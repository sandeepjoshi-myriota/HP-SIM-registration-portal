document.addEventListener("DOMContentLoaded", () => {
    const forbiddenDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
    const scanBtn = document.getElementById('scanBtn');
    const iccidInput = document.getElementById('iccid');
    const wrapper = document.getElementById('scanner-wrapper');
    const status = document.getElementById('statusMessage');
    const html5QrCode = new Html5Qrcode("interactive");

    scanBtn.addEventListener('click', () => {
        wrapper.style.display = 'block';
        scanBtn.innerText = "⌛ Opening...";
        scanBtn.disabled = true;

        const config = { 
            fps: 20, 
            qrbox: { width: 260, height: 100 },
            aspectRatio: 1.0 
        };

        html5QrCode.start(
            { facingMode: "environment" }, 
            config, 
            (decodedText) => {
                // SUCCESS ACTION
                wrapper.classList.add('flash-success');
                iccidInput.value = decodedText;
                iccidInput.classList.add('success-fill');
                if (navigator.vibrate) navigator.vibrate(100);

                setTimeout(() => {
                    html5QrCode.stop().then(() => {
                        wrapper.style.display = 'none';
                        wrapper.classList.remove('flash-success');
                        scanBtn.innerText = "📸 Re-Scan";
                        scanBtn.disabled = false;
                    });
                }, 600);
            }
        ).catch((err) => {
            wrapper.style.display = 'none';
            scanBtn.innerText = "📸 Open Scanner";
            scanBtn.disabled = false;
            if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
                alert("Security Error: Camera requires an HTTPS connection.");
            } else {
                alert("Camera Error: " + err);
            }
        });
    });

    document.getElementById('hyperPulseForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('companyEmail').value.toLowerCase();
        const domain = email.split('@')[1];

        if (forbiddenDomains.includes(domain)) {
            status.innerText = "❌ Use a corporate email address.";
            status.className = "error";
            return;
        }

        status.innerText = "✅ Registration Successful!";
        status.className = "success";
        document.getElementById('hyperPulseForm').reset();
        iccidInput.classList.remove('success-fill');
    });
});
