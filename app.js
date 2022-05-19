const canvas = document.getElementById("jsCanvas");

let painting = false;


function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    //canvas가 마우스 움직임 인식하기
    const x = event.offsetX;
    const y = event.offsetY;

}

function onMouseDown(event){    
    //canvas에 마우스 누르면 그림 그리기 시작
    painting = true;
}

function onMouseUp(event){
    //canvas에 마우스 떼면 그림 그리기 중지
    stopPainting();
}


if (canvas){
    canvas.addEventListener("mousemove", onMouseMove); // 마우스 움직임 인식
    canvas.addEventListener("mousedown", onMouseDown); // 마우스 누르기 인식
    canvas.addEventListener("mouseup", onMouseUp); // 마우스 떼기 인식
    canvas.addEventListener("mouseleave", stopPainting);
}else{
    
}
