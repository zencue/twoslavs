title = document.getElementById("article-title");
function anim(str,element){
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
anim("Article Title",title)
