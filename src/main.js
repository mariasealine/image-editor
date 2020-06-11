let canvas = document.getElementById('canvas-image');
let ctx = canvas.getContext('2d');
let img = new Image();

function readFile(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = (e) => {
            // let img = new Image();
            img.onload = function() {
                canvas.width = img.width * 0.1;
                canvas.height = img.height * 0.1;
                ctx.drawImage(img, 0, 0, img.width, img.height,0, 0, canvas.width, canvas.height);
                
            }
            img.src = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);

    }
}


let downloadBtn = document.getElementById('editor__download-img');
downloadBtn.addEventListener('click', downloadEditedFile, false);


function downloadEditedFile() {
    let data = canvas.toDataURL('image/jpeg');
    this.href = data;
}

function setSepia() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = 'sepia(1)';
    ctx.drawImage(img, 0, 0, img.width, img.height,0, 0, canvas.width, canvas.height);
}

function setBlackAndWhite() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = 'grayscale(100%)';
    ctx.drawImage(img, 0, 0, img.width, img.height,0, 0, canvas.width, canvas.height);
}

function resetFilters() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = 'none';
    ctx.drawImage(img, 0, 0, img.width, img.height,0, 0, canvas.width, canvas.height);
}



