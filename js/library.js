console.log(articlesData)
const feed = document.getElementById("feed");
const windowWidth = window.innerWidth;
const columns = parseInt((windowWidth*0.7/250),10);
let index = 0;
for(i in articlesData){
    const data =articlesData[i];
    const element = document.createElement("a");
    element.setAttribute("class","article");
    element.setAttribute("style","grid-column:"+(index%columns+1)+";");
    element.setAttribute("href","articles/"+i+".html")

    //adding cover 
    const coverFrame = document.createElement("div");
    coverFrame.setAttribute("class","cover-frame");
    const img = document.createElement("img");
    img.src = data["cover"];
    img.setAttribute("class","article-cover");
    coverFrame.appendChild(img);
    element.appendChild(coverFrame);

    //adding description
    const description = document.createElement("div");
    description.setAttribute("class","description");
    const firstLine = document.createElement("div");
    firstLine.setAttribute("class","first-line");
    const descriptionTitle = document.createElement("div");
    descriptionTitle.setAttribute("class","description-title");
    descriptionTitle.textContent = data["title"];
    firstLine.appendChild(descriptionTitle);
    description.appendChild(firstLine);

    const secondLine = document.createElement("div");
    secondLine.setAttribute("class","second-line");

    const descriptionDate = document.createElement("div");
    descriptionDate.setAttribute("class","description-date");
    descriptionDate.textContent = data["date"];

    const descriptionAuthor = document.createElement("div");
    descriptionAuthor.setAttribute("class","description-author");
    descriptionAuthor.textContent = "by "+ data["authors"][0];

    secondLine.appendChild(descriptionDate);
    secondLine.appendChild(descriptionAuthor);
    description.appendChild(secondLine);

    element.appendChild(description);

    feed.appendChild(element);
    index+=1;
}