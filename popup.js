const startBtn = document.querySelector(".sendButton");
const stopBtn = document.getElementById("stopButton");

let count = 0;

let intervalId;

startBtn.addEventListener("click", async () => {
    intervalId = setInterval(() => {
        let [tab] = chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            let tab = tabs[0];
            chrome.scripting.executeScript({
                target: { tabId: tab.id },


                // This function will interact with the HTML page of linkedIn.

                function: startConnecting,
            });

            let count = document.getElementById("count").innerHTML;
            let c = parseInt(count);
            c += 1;
            document.getElementById("count").innerHTML = c;

        });

    }, 5000);
});

stopBtn.addEventListener("click", () => {
    clearInterval(intervalId);
});

/* 
    1. Here we will find all the 'Connect' buttons in the page and store it in an array.
    2. Next, we will click each the button one at a time by using a for loop. 
    3. As linkedIn recommends you to add an additional note to the connection request, we will handle that case by adding a short conenction note.
    4. In that case, we need to wait until the HTML elements of the page loads for fetching the exact class name of the note and the send button.
    5. Then we add our short note and send the request.
    6. This process starts when the user clicks on the 'Send Requests' button.
    7. This process will repeat until the user clicks on the 'Stop' button OR the array of all the buttons have been clicked.

*/

function startConnecting() {
    var x = document.getElementsByClassName('artdeco-button__text');
    var noteValue = "Hi, I stumbled upon your profile and was really impressed by your background and achievements. I'd love to connect and learn more about your experiences in the industry. Looking forward to connecting and hopefully chatting more soon!";


    for (var i = 0; i < x.length; i++) {
        if (x[i].textContent.trim() === 'Connect') {
            x[i].click();

            setTimeout(function () {
                var [addNote] = document.getElementsByClassName("artdeco-button artdeco-button--muted artdeco-button--2 artdeco-button--secondary ember-view mr1");
                addNote.click();

                setTimeout(function (noteValue) {
                    var textarea = document.getElementById("custom-message")
                    textarea.value = noteValue;

                    var evt = new Event('change', { bubbles: true });
                    textarea.dispatchEvent(evt);

                    setTimeout(() => {
                        var [sendButton] = document.getElementsByClassName("artdeco-button artdeco-button--2 artdeco-button--primary ember-view ml1")
                        console.log(sendButton.click());
                    }, 500);
                }, 500, noteValue);

            }, 500);
        }
    }
}
