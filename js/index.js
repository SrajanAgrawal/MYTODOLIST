const user_name = document.querySelector("#user_name")
const submitButton = document.querySelector("#bttn")
const body = document.body
const form = document.form
const speechMessage = document.querySelector("#speechMessage");
const exploreButton = document.getElementById('exploreButton');

submitButton.addEventListener('click',()=>{
    var data = user_name.value;
    if(data != ""){
        var msg = "Hi " + data + " welcome, So glad to see you here , Click On Explore Now and you will be managing your daily tasks using simple and attractive UI Design"
        var namee = data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
        speechMessage.innerHTML = '<b>HI ' + namee + '</b> <br> Welcome, So glad to see you here , Click On Explore Now and you will be managing your daily tasks using simple and attractive UI Design';
    
        randFunc(msg);
        exploreButton.style.visibility = 'visible';

    }
    user_name.value = "";
})
// Convert the text into speech
const randFunc = text => {
    let message = new SpeechSynthesisUtterance(text);
    message.rate = 1;
    message.pitch = 1;
    message.volume = 2;
    window.speechSynthesis.speak(message);
    
}