var inputLeft = document.getElementById("left_input");
var inputRight = document.getElementById("right_input");
var inputCursor = document.getElementById("cursor");
var terminalDiv = document.getElementById('terminal');

var commandText = "";
var cursorIndex = commandText.length;

terminalDiv.onclick = inputLeft.focus();

/////////////////////////////////////
// Cursor flashing
/////////////////////////////////////
var oddOrEven = 0;
setInterval(function() {
        if (oddOrEven % 2 == 0) {
            inputCursor.className = "cursor";
        }
        else {
            inputCursor.className = "cursorHide";
        }
        oddOrEven++;
    }
    , 500);

window.onload = inputLeft.focus();

// listen for characters typed
window.onkeypress = (function (e) {

    if (e.charCode > 32 && e.charCode <= 126) {
        addCharByCursor(String.fromCharCode(parseInt(e.charCode)));
        e.preventDefault();
    }
    else if (e.charCode == 32)
    {
        addCharByCursor(String.fromCharCode(160));
        e.preventDefault();
    }
    render();
});


window.onkeydown = (function (e) {

    if (e.keyCode == 37) // arrow left
    {
        e.preventDefault();
        if (cursorIndex != 0) {
            cursorIndex--;
        }
    }
    if (e.keyCode == 39) // arrow right
    {
        e.preventDefault();
        if (cursorIndex != commandText.length) {
            cursorIndex++;
        }
    }


    if (e.keyCode == 8) // backspace
    {
        e.preventDefault();
        if (cursorIndex != 0) {
            cursorIndex--;
            backSpace();
        }
    }
    if (e.keyCode == 13) // enter
    {
        e.preventDefault();
        submitCommand(commandText);
        commandText = "";
        cursorIndex = 0;
    }
    render();

});


function render()
{
    // render left

    inputLeft.textContent = commandText.slice(0, cursorIndex);



    // render cursor
    if (cursorIndex > commandText.length-1)
    {
        inputCursor.textContent = String.fromCharCode(160); // non-breakable space
    }
    else
    {
        inputCursor.textContent = commandText[cursorIndex];
    }

    // render right

    inputRight.textContent = commandText.slice(cursorIndex+1, commandText.length);

}

function addCharByCursor(char) {
    var leftPart = commandText.slice(0, cursorIndex);
    var rightPart = commandText.slice(cursorIndex,commandText.length);
    commandText = leftPart + char + rightPart;
    cursorIndex++;
    //console.log(commandText + "   (added char: " + char +") cursorIndex = " + cursorIndex);

}

function backSpace()
{
    var leftPart = commandText.slice(0, cursorIndex);
    var rightPart = commandText.slice(cursorIndex+1,commandText.length);
    commandText = leftPart + rightPart;
    //console.log(commandText + "   (backspace) cursorIndex = " + cursorIndex);
}

function submitCommand(command)
{
    console.log("command='"+ command + "'");

}