var inputLeft = document.getElementById("left_input");
var inputRight = document.getElementById("right_input");
var inputCursor = document.getElementById("cursor");
var terminalDiv = document.getElementById("terminal");
var currentPrompt = document.getElementById("current_prompt");

var commandText = "";
var cursorIndex = commandText.length;

terminalDiv.onclick = (function() {
    inputLeft.focus();
    console.log("touch!");
});

//terminalDiv.children.reverse().add("test");

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

    var historyPrompt = document.createElement("div");
    historyPrompt.innerHTML = "<span class='prompt'>guest@jhladik.me:~</span><span class='prompt_dollar'>$&nbsp;</span><span class='input'>" + command + "</span>";
    terminalDiv.insertBefore(historyPrompt, currentPrompt);
    processCommand(command);

}

function printMessage(msg)
{
    var responsePrompt = document.createElement("div");
    responsePrompt.innerHTML = msg.replace(/\n/g, "<br />");
    terminalDiv.insertBefore(responsePrompt, currentPrompt);

    // scroll to the bottom if off-screen
    if ((currentPrompt.offsetTop+currentPrompt.offsetHeight) > window.innerHeight)
    {
        window.scrollTo(0,terminalDiv.scrollHeight);
    }
}

function printLogo(logo)
{
    var responsePrompt = document.createElement("div");
    responsePrompt.className="logo";
    responsePrompt.innerHTML = logo.replace(/ /g, "&nbsp;").replace(/\n/g, "<br />");
    terminalDiv.insertBefore(responsePrompt, currentPrompt);
}

printLogo(
    "**********************************************\n"+
    "   _  _    _         _  _  _                  \n"+
    "  |_|| |_ | | ___  _| ||_|| |_     _____  ___ \n"+
    "  | ||   || || .'|| . || || '_| _ |     || -_|\n"+
    " _| ||_|_||_||__,||___||_||_,_||_||_|_|_||___|\n"+
    "|___|                                         \n"+
    "                                              \n"+
    "             Welcome to my website!           \n"+
    "                                              \n"+
    "        Hint: Type 'help' and hit return.     \n"+
    "**********************************************\n");


function processCommand(command)
{
    console.log("processing command: " + command);

    switch(command)
    {
        case "exit":
            window.close();
            break;
        case "ls":
            printMessage("TERMINAL SHOULD LS WITH THIS COMMAND...");
            break;
        case "cd":
            printMessage("TERMINAL SHOULD CD WITH THIS COMMAND...");
            break;
        case "clear":
            printMessage("TERMINAL SHOULD CLEAR WITH THIS COMMAND...");
            break;
        case "test":
            printMessage("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
            break;
        default:
            printMessage("ERROR: Invalid command ٩(͡๏̯͡๏)۶");
        case "help":
            printMessage(
                "This web app emulates a terminal.\n" +
                "'ls' - list all pages \n"+
                "'cd [name]' - select page\n"+
                "'test' - lorem ipsum\n"+
                "'clear' - clears the terminal\n"+
                "'exit' - closes the window\n"
                );
            break;
    }
}
