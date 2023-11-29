const fontstrokeBtn = document.getElementById("fontstroke-btn");
const dropDown = document.getElementById("fontStyle");
const fontStlye = document.getElementById("fontStyle");
const textWeight = document.getElementById("text-weight");
const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const eraserBtn = document.getElementById("eraser-btn");
const destoryBtn = document.getElementById("destory-btn");
const modeBtn = document.getElementById("mode-btn");
const color = document.getElementById("color");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HIGHT;

ctx.lineCap = "round";
ctx.lineWidth = lineWidth.value;

let textWeightValue = textWeight.value;
let isPainting = false;
let isFilling = false;
let isStroke = false;
let fontStyleValue = "Serif";




function onMove(event){

    if(isFilling){
        console.log("isFilling");
        return;
    }
    
    if(isPainting){
        console.log("isPainting");
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.beginPath();

    ctx.moveTo(event.offsetX, event.offsetY);


}


function onMouseDown(){
    isPainting = true;
    console.log("onMouseDown")
}

function cancelPainting(){
    isPainting = false;
    console.log("cancelPainting")
}


function onLineWidthChange(event){
    ctx.lineWidth = event.target.value;
}



function onColorChange(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event){
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}


function onModeClick(){
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "🎨Draw";
    } else{
        isFilling = true;
        modeBtn.innerText = "🎨Fill";

    }

}


function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HIGHT);
    }
}

function onDestoryClick(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HIGHT);
}

function onEraserclick(){
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "🎨Draw";
}

function onFileChange(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image( );
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image, 0 , 0, CANVAS_WIDTH, CANVAS_HIGHT);
        fileInput.value = null;
    }
    console.log(url);
}

function onDoubleClick(event){

    const text = textInput.value;
   
    if(text !== ""){
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = `${textWeightValue}px ${fontStyleValue}`;
        if(isStroke){
            ctx.strokeText(text, event.offsetX, event.offsetY);
        }else{
            ctx.fillText(text, event.offsetX, event.offsetY);
        }
        ctx.restore();
    }else{
        
        alert("텍스트를 입력 해 주세요.");
    }

    window.getSelection().removeAllRanges()
  
}

function onSaveClick(){
    const url =  canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

 function onTextChange(event){
    textWeightValue = event.target.value;
} 

function onDropDownChange(event){
    fontStyleValue = event.target.value;
    console.log(fontStyleValue);
}

function onStrokeClick(){
    if(isStroke){
        isStroke = false;
        fontstrokeBtn.innerText = "⬛TEXT";
    }else{
        isStroke = true;
        fontstrokeBtn.innerText = "🔲TEXT";
    }
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach(color => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destoryBtn.addEventListener("click", onDestoryClick);
eraserBtn.addEventListener("click", onEraserclick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);

textWeight.addEventListener("change", onTextChange);
dropDown.addEventListener("change", onDropDownChange);
fontstrokeBtn.addEventListener("click", onStrokeClick);

