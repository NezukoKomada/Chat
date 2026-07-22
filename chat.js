document.addEventListener("DOMContentLoaded", () => {


    const chatName = document.getElementById("chatName");
    const chatAvatar = document.getElementById("chatAvatar");

    const chatBox = document.getElementById("chatBox");

    const messageInput = document.getElementById("messageInput");
    const sendButton = document.getElementById("sendMessage");

    const backButton = document.getElementById("backButton");



    // Get characters

    const characters =
        JSON.parse(
            localStorage.getItem("characters")
        ) || [];



    const activeIndex =
        localStorage.getItem("activeCharacter");



    if (activeIndex === null) {

        window.location.href = "index.html";
        return;

    }



    const character =
        characters[activeIndex];



    if (!character) {

        window.location.href = "index.html";
        return;

    }





    // Load character info

    chatName.textContent =
        character.name;


    chatAvatar.src =
        character.avatar ||
        "assets/default-avatar.png";








    // Chat storage key

    const chatKey =
        "chat_" + activeIndex;






    let messages =
        JSON.parse(
            localStorage.getItem(chatKey)
        ) || [];






    // Add message to screen

    function addMessage(
        text,
        sender
    ) {


        const message =
            document.createElement("div");


        message.classList.add(
            "message",
            sender
        );


        message.textContent =
            text;


        chatBox.appendChild(
            message
        );


        chatBox.scrollTop =
            chatBox.scrollHeight;


    }







    // Load old messages

    function loadChat() {


        if (messages.length === 0) {


            addMessage(
                character.greeting,
                "ai"
            );


            messages.push({

                sender: "ai",
                text: character.greeting

            });


            saveChat();


        }



        else {


            messages.forEach(message => {


                addMessage(
                    message.text,
                    message.sender
                );


            });


        }


    }






    // Save chat

    function saveChat() {


        localStorage.setItem(
            chatKey,
            JSON.stringify(messages)
        );


    }








    // Send message

    sendButton.addEventListener(
        "click",
        () => {


            const text =
                messageInput.value.trim();



            if (!text) return;



            addMessage(
                text,
                "user"
            );



            messages.push({

                sender: "user",
                text: text

            });



            saveChat();



            messageInput.value = "";



            /*
                AI RESPONSE WILL GO HERE LATER

                This is where we connect Ollama
                or another AI model.
            */


        }
    );







    // Enter key sends message

    messageInput.addEventListener(
        "keydown",
        (event) => {


            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {


                event.preventDefault();

                sendButton.click();


            }


        }
    );







    // Back button

    backButton.addEventListener(
        "click",
        () => {


            window.location.href =
                "index.html";


        }
    );






    loadChat();



});
