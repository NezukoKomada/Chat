document.addEventListener("DOMContentLoaded", () => {

    const characterContainer = document.getElementById("characterContainer");
    const emptyState = document.getElementById("emptyState");
    const createButton = document.getElementById("createCharacter");
    const template = document.getElementById("characterTemplate");


    // Open character creator
    createButton.addEventListener("click", () => {

        window.location.href = "creator.html";

    });



    // Get characters from storage
    function getCharacters() {

        return JSON.parse(localStorage.getItem("characters")) || [];

    }



    // Save characters
    function saveCharacters(characters) {

        localStorage.setItem(
            "characters",
            JSON.stringify(characters)
        );

    }




    // Display characters
    function displayCharacters() {


        const characters = getCharacters();


        characterContainer.innerHTML = "";


        if (characters.length === 0) {

            emptyState.style.display = "block";

            return;

        }


        emptyState.style.display = "none";



        characters.forEach((character, index) => {


            const card =
                template.content.cloneNode(true);



            const avatar =
                card.querySelector(".avatar");

            const name =
                card.querySelector(".name");

            const personality =
                card.querySelector(".personality");

            const scenario =
                card.querySelector(".scenario");



            avatar.src =
                character.avatar ||
                "assets/default-avatar.png";


            name.textContent =
                character.name;


            personality.textContent =
                "Personality: " +
                character.personality;


            scenario.textContent =
                "Scenario: " +
                character.scenario;




            // Start Chat button

            card.querySelector(".chatButton")
                .addEventListener("click", () => {


                    localStorage.setItem(
                        "activeCharacter",
                        index
                    );


                    window.location.href =
                        "chat.html";


                });






            // Edit button

            card.querySelector(".editButton")
                .addEventListener("click", () => {


                    localStorage.setItem(
                        "editCharacter",
                        index
                    );


                    window.location.href =
                        "create.html";


                });







            // Delete button

            card.querySelector(".deleteButton")
                .addEventListener("click", () => {



                    const confirmDelete =
                        confirm(
                            "Delete this character?"
                        );



                    if (confirmDelete) {


                        characters.splice(
                            index,
                            1
                        );


                        saveCharacters(
                            characters
                        );


                        displayCharacters();


                    }


                });




            characterContainer.appendChild(card);


        });


    }



    displayCharacters();


});
