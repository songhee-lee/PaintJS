const canvas = document.getElementById("jsCanvas");
let painting = false;

// canvas element에 그림 그릴 영역 지정
canvas.width = 500;
canvas.height = 500;

const ctx = canvas.getContext("2d");
ctx.strokeStyle = "#2c2c2c"; // 선의 색
ctx.lineWidth = 2.5;         // 선의 두께


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

function onMouseDown(event){    
    //canvas에 마우스 누르면 그림 그리기 시작
    painting = true;
}



if (canvas){
    canvas.addEventListener("mousemove", onMouseMove); // 마우스 움직임 인식
    canvas.addEventListener("mousedown", startPainting); // 마우스 누르기 인식
    canvas.addEventListener("mouseup", stopPainting); // 마우스 떼기 인식
    canvas.addEventListener("mouseleave", stopPainting); // canvas 나가는 것 인식
}else{
    
}
