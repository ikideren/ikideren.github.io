const text = "Computer Science Student | Machine Learning Enthusiast";

let index = 0;

function typeEffect() {

    if(index < text.length){

        document.getElementById("typing").textContent += text.charAt(index);

        index++;

        setTimeout(typeEffect,60);

    }

}

typeEffect();