let canvas = document.getElementById('canvas-image');
let ctx = canvas.getContext('2d');
let img = new Image();
let brightness = 100;
let filters = [{key: 'sepia', value: 'sepia(0)'}, {key: 'blackwhite', value: 'grayscale(0)'}, {key: 'brightness', value: 'brightness(100%)'}];
let filterString = '';

function readFile(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = (e) => {
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
    updateImage('sepia', 'sepia(1)');
}

function setBlackAndWhite() {
    updateImage('blackwhite', 'grayscale(100%)');
}

function brightnessUp() {
    updateImage('brightness', 'brightness(' + (brightness+10) + '%)');
    brightness += 10;
}

function brightnessDown() {
    updateImage('brightness', 'brightness(' + (brightness-10) + '%)');
    brightness -= 10;
}

function resetFilters() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = 'none';
    brightness = 100;
    resetFilterString();
    filters = [{key: 'sepia', value: 'sepia(0)'}, {key: 'blackwhite', value: 'grayscale(0)'}, {key: 'brightness', value: 'brightness(100%)'}];
    ctx.drawImage(img, 0, 0, img.width, img.height,0, 0, canvas.width, canvas.height);
}



const updateImage = (valueFilter, newVal) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setNewFilterValue(valueFilter, newVal);
    buildFilterString();
    ctx.drawImage(img, 0, 0, img.width, img.height,0, 0, canvas.width, canvas.height);
    resetFilterString();
}

function setNewFilterValue(valueFilter, newVal) {
    for (let i in filters) {
        if (filters[i].key == valueFilter) {
            filters[i].value = newVal;
        }
    }
}

function buildFilterString() {
    for (let i = 0; i < filters.length; i++) {
        filterString += ' ' + filters[i].value;
        ctx.filter = filterString;
    }
}

const resetFilterString = () => {
    filterString = '';
}
