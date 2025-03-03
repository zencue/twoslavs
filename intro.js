title = document.getElementById("title");
body = document.getElementsByName("body")[0];
description = document.getElementById("desc-text");
function anim(str,element){
    let titleStr = Array.from(str);
    console.log(titleStr)
    let time = 0;
    function frame() {
    if (time == titleStr.length) {
        clearInterval(id);
    } else {
        console.log("g")
        element.textContent =element.textContent+titleStr[time];
        time++;
    }
    }
    let id = setInterval(frame, 50);
}

anim("Slav Clamp", title);
anim("Slav Clamp is a platform dedicated to sharing insightful articles, innovative projects, and engaging blog content. Focused on diverse topics, it serves as a hub for knowledge, creativity, and collaboration. Whether you're looking for in-depth research, practical projects, or thought-provoking discussions, Slav Clamp provides a space for exploration and learning.", description);