const textInput = document.getElementById('text');
const logoInput = document.getElementById('logo');
const generateBtn = document.getElementById('generate');
const qrContainer = document.getElementById('qrcode');

generateBtn.addEventListener('click', () => {
    const text = textInput.value.trim();
    if(!text) return alert("Please enter text or URL!");

    // Clear previous QR
    qrContainer.innerHTML = "";

    // Generate QR code on a canvas
    const canvas = document.createElement('canvas');
    QRCode.toCanvas(canvas, text, { width: 250, margin:2 }, function (error) {
        if(error) return console.error(error);
        qrContainer.appendChild(canvas);

        // If logo image is selected
        const file = logoInput.files[0];
        if(file){
            const reader = new FileReader();
            reader.onload = function(e){
                const img = document.createElement('img');
                img.src = e.target.result;
                img.classList.add('logo');
                qrContainer.appendChild(img);
            }
            reader.readAsDataURL(file);
        }
    });
});
