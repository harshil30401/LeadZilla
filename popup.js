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
