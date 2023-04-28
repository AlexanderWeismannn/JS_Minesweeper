const grid = document.getElementById("grid");
let lockGame = false;
//setting test mode to true reveals mine locations
const testMode = true;
generateGrid();

//start grid creation
function generateGrid(){
    lockGame = false;
    grid.innerHTML = "";
    for(var i = 0; i < 10; i++){
        row = grid.insertRow(i);
        for(var j = 0; j < 10; j++){
            cell = row.insertCell(j);
            cell.onclick = function() {init(this);};

            var mine = document.createAttribute("mine");
            mine.value = "false";
            cell.setAttributeNode(mine);
        } 

    }

    generateMines();    
}

//randomly generate mines for the grid
function generateMines(){
    //randomly populate the game with 20 mines
    for(var i = 0; i < 20; i++){
        //random location, potential for duplicates
        var row = Math.floor(Math.random() * 10);
        var col = Math.floor(Math.random() * 10);

        var cell = grid.rows[row].cells[col];
        cell.setAttribute("mine","true");
        if(testMode){
            cell.innerHTML="X";
        }
    }

}

//Highlight all mines red
function revealMines(){
    for(var i = 0; i < 10; i++){
        for(var j = 0; j < 10; j++){
            var cell = grid.rows[i].cells[j];
            // change the class type to mine
            if(cell.getAttribute("mine") == "true"){
                cell.className = "mine";
            }
        }
    }
}

function checkGameCompleted(){
    var gameComplete = true;
    for(var i = 0; i < 10; i++){
        for(var j = 0; j < 10; j++){
            if((grid.rows[i].cells[j].getAttribute("mine") == "false") &&
            (grid.rows[i].cells[j].innerHTML == "")){
                gameComplete = false;
            }

        }
    }
    if(gameComplete){
        alert("You WIN!");
        revealMines();
    }
}

function init(cell){
    //check if the game is completed or not
    if(lockGame){
        return;
    }else{
        //check user clicked on mine
        if(cell.getAttribute("mine") == "true"){
            revealMines();
            lockGame = true;
        }else{
            cell.className = "active";
            // display the number of mine around it
            var mineCount = 0;
            var cellRow = cell.parentNode.rowIndex;
            var cellCol = cell.cellIndex;
            for(var i = Math.max(cellRow - 1,0); i <= Math.min(cellRow + 1, 9); i++){
                for(var j = Math.max(cellCol - 1,0); j <= Math.min(cellCol + 1, 9); j++){
                    if(grid.rows[i].cells[j].getAttribute("mine") == "true"){
                        mineCount++;
                    }
                }
                cell.innerHTML = mineCount;
                if(mineCount == 0){
                    //if cell doesn't have a mine
                    for(var i = Math.max(cellRow - 1,0); i <= Math.min(cellRow + 1, 9); i++){
                        for(var j = Math.max(cellCol - 1,0); j <= Math.min(cellCol + 1, 9); j++){
                            if(grid.rows[i].cells[j].innerHTML == ""){
                                init(grid.rows[i].cells[j]);

                            }
                        }
                    }    
                }
                checkGameCompleted();
            }
        }
    }


}