const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const ctx = canvas.getContext("2d");

let painting = false;   // 그림 그리는 모드인지
let filling = false;    // 배경 채우는 모드인지

// canvas element에 그림 그릴 영역 지정
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// 먼저 canvas를 흰 배경으로 채우기
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

// Canvas 그림 그리기 관련 초기 설정
const INITIAL_COLOR = "#2c2c2c";
ctx.strokeStyle = INITIAL_COLOR; // 선의 색
ctx.lineWidth = 2.5;         // 선의 두께

ctx.fillStyle = INITIAL_COLOR; // 네모 상자의 색

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    //canvas가 마우스 움직임 인식하기
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        // mousedown 안되어 있을 때는 마우스를 따라 움직이기만 함
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else{
        // mousedown 되어 있으면 그림 그리기 
        ctx.lineTo(x, y); // 이전 위치에서 지금 위치까지 선 잇기
        ctx.stroke();     // Stroke the current sub-paths with the current stroke style.
    }
    

}

function changeColor(event){
    // 색 변경 이벤트. 
    // 선택된 팔레트의 color 가져와서 선의 색으로 변경
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color; // 네모상자의 색상
}

function handleRangeChange(event){
    // 선 굵기 변경 이벤트
    // range의 움직인 값이 value 가져와서 선 굵기로 변경
    ctx.lineWidth = event.target.value;
}

function hanldeModeClick(){
    // Fill 모드와 Paint 모드 변경하기
    if (filling === true){
        filling = false;
        mode.innerText = "FILL";
    }else{
        filling = true;
        mode.innerText = "PAINT";
    }
}

function handleCanvasClick(){
    // fill 모드에서 배경색 채우기
    if (filling){
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT) // (x좌표, y좌표, 가로크기, 세로크기)
    }
}

function handleCM(event){ // 우클릭 방지
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL();             // canvas를 png 이미지로 저장
    const link = document.createElement("a");     // 링크 만들어서
    link.href = image;                              // href가 이미지 url이 되어야 하고
    link.download = "PaintJS[EXPORT]";              // download는 그 이름을 가져와야 함.
    link.click();
}

if (canvas){
    canvas.addEventListener("mousemove", onMouseMove); // 마우스 움직임 인식
    canvas.addEventListener("mousedown", startPainting); // 마우스 누르기 인식
    canvas.addEventListener("mouseup", stopPainting); // 마우스 떼기 인식
    canvas.addEventListener("mouseleave", stopPainting); // canvas 나가는 것 인식
    canvas.addEventListener("click", handleCanvasClick); // Fill mode에서 canvas 클릭시 배경 채우기
    canvas.addEventListener("contextmenu", handleCM); // 우클릭 이벤트 발생 인식
}

// 팔레트 클릭할 때 색 변경 이벤트 발생
Array.from(colors).forEach(color => color.addEventListener("click", changeColor));

// range 건드리면 선 굵기 변경 이벤트 발생
if(range){
    range.addEventListener("input", handleRangeChange);
}

// fill 버튼 클릭 시 canvas 전체에 색 채우기
if(mode){
    mode.addEventListener("click", hanldeModeClick);
}

// save 버튼 클릭시 canvas 저장
if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}