document.addEventListener("DOMContentLoaded", () => {


    const nameInput = document.getElementById("characterName");
    const greetingInput = document.getElementById("characterGreeting");
    const personalityInput = document.getElementById("characterPersonality");
    const scenarioInput = document.getElementById("characterScenario");
    const exampleInput = document.getElementById("exampleDialogue");

    const avatarInput = document.getElementById("avatarInput");
    const avatarPreview = document.getElementById("avatarPreview");

    const saveButton = document.getElementById("saveCharacter");


    let avatarData = "";



    // Preview uploaded avatar

    avatarInput.addEventListener("change", () => {


        const file = avatarInput.files[0];


        if (!file) return;



        const reader = new FileReader();


        reader.onload = () => {

            avatarData = reader.result;

            avatarPreview.src = avatarData;

        };


        reader.readAsDataURL(file);


    });






    // Check if editing

    const editIndex =
        localStorage.getItem("editCharacter");



    if (editIndex !== null) {


        const characters =
            JSON.parse(
                localStorage.getItem("characters")
            ) || [];



        const character =
            characters[editIndex];



        nameInput.value =
            character.name;


        greetingInput.value =
            character.greeting;


        personalityInput.value =
            character.personality;


        scenarioInput.value =
            character.scenario;


        exampleInput.value =
            character.example;



        avatarData =
            character.avatar;


        if (avatarData) {

            avatarPreview.src =
                avatarData;

        }


    }






    // Save character

    saveButton.addEventListener("click", () => {



        const character = {


            name:
                nameInput.value.trim(),


            avatar:
                avatarData,


            greeting:
                greetingInput.value.trim(),


            personality:
                personalityInput.value.trim(),


            scenario:
                scenarioInput.value.trim(),


            example:
                exampleInput.value.trim()



        };





        if (!character.name) {


            alert(
                "Please enter a character name."
            );


            return;

        }






        let characters =
            JSON.parse(
                localStorage.getItem("characters")
            ) || [];







        // Editing existing character

        if (editIndex !== null) {


            characters[editIndex] =
                character;


            localStorage.removeItem(
                "editCharacter"
            );


        }



        // Creating new character

        else {


            characters.push(
                character
            );


        }





        localStorage.setItem(
            "characters",
            JSON.stringify(characters)
        );




        window.location.href =
            "index.html";



    });



});
