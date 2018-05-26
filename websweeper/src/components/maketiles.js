// make base elements and set attributes
var boardTile = document.getElementById("board");
var width = 20;
var height = width;
var row = 0;
var col = 0;
var numberOfBombs = 0;
var xcord = 0;
var ycord = 0;

// affected by user input
var gameType = '';
var lastRow = 0;
var lastCol = 0;

var tile = document.createElementNS("http://www.w3.org/2000/svg", "svg");
tile.setAttribute("width", "1000");
tile.setAttribute("height", "1000");
boardTile.appendChild(tile);

var formDiv = document.getElementById("sizeSelection");
var htmlForm = document.getElementById("htmlform");

function getValue() {
  for (let i = 0; i < htmlForm.length; i++) {
   if (htmlForm[i].checked) {
    // alert(htmlForm[i].value);
    gameType = htmlForm[i].value;
    console.log(gameType);
    genGuiBoard(gameType);
    // hide user input for board selection for now
    // this might be changed to a new menu with "pause, restart, etc"
    formDiv.style.display = "none";
   }
  }
  console.log(submitsize.value);
}

function testReplaceClass(colNumRowNum) {
  


  // getAttributes - future function
  //var x = document.getElementsByTagName("H1")[0].getAttribute("class");
  var svgElement = document.getElementsByTagName("rect")[0].getAttribute("class");
  var countRects = document.getElementsByTagName("rect").length;
  //var svgElementAttribs = document.getElementsByClassName("rect-col15-row16").getAttribute("class");
  console.log(svgElement);
  console.log(`Number of rect elements=${countRects}`);

  var svgSelectElement = document.getElementsByClassName(svgElement); 
  console.log(svgSelectElement);
  colNumRowNum.style.fill='black';
  //svgSelectElement.setAttribute("fill", "black");
  
  // replace element

}

function genGuiBoard(gameType) {
    if ( gameType === 'Large' ) {
        lastRow = 20;
        lastCol = 20;
    } else if ( gameType === 'Medium' ) {
        lastRow = 15;
        lastCol = 15;
    } else if ( gameType === 'Small' ) {
        lastRow = 10;
        lastCol = 10;
    }
  // row
  for (row = 0; row < lastRow; row++) {
    // col
    for (col = 0; col < lastCol; col++) {
      var squareElem = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      squareElem.setAttribute("class", `rect-col${col}-row${row}`);
      squareElem.setAttribute("id", `col${col}row${row}`);
      squareElem.setAttribute("width", `${width}px`);
      squareElem.setAttribute("height", `${height}px`);
      squareElem.setAttribute("x", `${xcord}`)
      squareElem.setAttribute("y", `${ycord}`)
      squareElem.setAttribute("stroke", "black");
      squareElem.setAttribute("stroke-opacity", "0.8");
      squareElem.setAttribute("fill", "grey");
      squareElem.setAttribute("fill-opacity", "0.5");
      squareElem.setAttribute("onclick", `testReplaceClass(col${col}row${row})`);    
      tile.appendChild(squareElem);
      xcord+=width;
      //console.log(`colloop: ycord=${ycord}, row=${row} | xcord=${xcord}, col=${col}`);
    }
    xcord=0;
    ycord+=width;
  }
}
