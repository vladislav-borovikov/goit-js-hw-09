
const bodyEl = document.querySelector('body')
const buttonStart = document.querySelector('button[data-start]')
const buttonStop = document.querySelector('button[data-stop]')

buttonStop.setAttribute("disabled", "disabled")

buttonStart.addEventListener('click', changeColor)
buttonStop.addEventListener('click', stopFunction)

function stopFunction() {
    buttonStart.removeAttribute("disabled")
    buttonStop.setAttribute("disabled", "disabled")
    clearInterval(bodyBackgroundColor);
}
let bodyBackgroundColor = null

function changeColor() {
    buttonStart.setAttribute("disabled", "disabled")
    buttonStop.removeAttribute("disabled")
    bodyBackgroundColor = setInterval(setBodyColor, 1000)
}
function setBodyColor() {
    return bodyEl.style.backgroundColor = getRandomHexColor()
}
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}