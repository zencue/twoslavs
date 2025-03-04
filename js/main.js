

elements = document.getElementsByClassName("animate-typed")
function anim(str,element){
    element.textContent = "";
    let titleStr = Array.from(str);
    let time = 0;
    function frame() {
    if (time == titleStr.length) {
        clearInterval(id);
    } else {
        element.textContent =element.textContent+titleStr[time];
        time++;
    }
    }
    let id = setInterval(frame, 50);
}
for(let i = 0; i < elements.length; i++){
    anim(elements[i].textContent, elements[i])
}

