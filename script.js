setDrawingArea(16);

function gridSize(){
    let value = document.querySelector("input#sizeSlider").value;
    return value;
};


let madeGridSize;

function creation(event){
    const value = gridSize();
    document.querySelector("#size").textContent = `${value} x ${value}`;

    document.querySelector("input#sizeSlider").addEventListener(event, () =>{
        let v = document.querySelector("#size").textContent.split(" ")[0]
        v = parseInt(v);

        if(madeGridSize != v)
        {
            destroyPixels();
            madeGridSize = setDrawingArea(v);
        }
    })
}


document.querySelector("input#sizeSlider").oninput = () => creation("change");


let prevButton;

function changeColourOfButton(){
    if(prevButton !== undefined)
        prevButton.style = "";
    
    let btns = document.querySelectorAll("button");
    
    for(let i=0; i<btns.length; i++)
        btns[i].addEventListener("click", ()=>{
            btns[i].style.backgroundColor = "#333333";
            btns[i].style.color = "white";
            prevButton = btns[i];
        })

}
document.querySelector(".buttons").addEventListener("focusin", ()=>changeColourOfButton());


function setDrawingArea(value){
    let doc = document.querySelector(".drawingArea");

    for(let i=1; i<=value; i++)
    {
        let parentDiv = document.createElement("div");
        parentDiv.classList.add("drawingRow");
        parentDiv.style.display = "flex";

        

        for(let j=1; j<=value; j++)
        {
            let childDiv = document.createElement("div");
            childDiv.classList.add("drawingPixel");
            childDiv.style.backgroundColor = "white";
            childDiv.style.height = `${50/value}vh`;
            childDiv.style.width = `${50/value}vh`;
            parentDiv.appendChild(childDiv);
        }
        doc.appendChild(parentDiv);
    }
    return value;
}


function destroyPixels(){
    let doc = document.querySelector(".drawingArea");
    let divs =  document.querySelectorAll(".drawingRow");

    divs.forEach((div) => doc.removeChild(div));
}


function makeChangesToPixel(event){
    let doc = document.querySelectorAll(".buttons > div > button");
    var randomColor = Math.floor(Math.random()*16777215).toString(16);

    if(doc[0].style.backgroundColor !== "" && event.target.style.backgroundColor === "white")
        event.target.style.backgroundColor = `${document.querySelector(".colourPicker > input").value}`;

    if(doc[1].style.backgroundColor !== "" && event.target.style.backgroundColor === "white")
        event.target.style.backgroundColor = "#"+randomColor;

    if(doc[2].style.backgroundColor !== "" && event.target.style.backgroundColor !== "white")
        event.target.style.backgroundColor = "white";
}

document.querySelector(".drawingArea").addEventListener('mousemove', (event) => makeChangesToPixel(event));
document.querySelector(".drawingArea").addEventListener('touchstart', (event) => makeChangesToPixel(event)); // for devices which are not computer


function clearDrawingArea(){
    let ParentDoc = document.querySelectorAll(".drawingPixel");
    ParentDoc.forEach((div) => div.style.backgroundColor = "white");
}