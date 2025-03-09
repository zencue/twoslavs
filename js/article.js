

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
const tags = document.getElementById("tags");

tagsList = articlesData[location.pathname.split("/").slice(-1)[0].split(".")[0]]["tags"]
tagsStr = ""

for(i in tagsList){
    tagsStr+="#"+tagsList[i]+" "
}
tags.textContent = tagsStr
console.log(tagsStr)

