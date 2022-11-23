const width = window.screen.width
const height = window.screen.height
const button = document.querySelector(".btn")
button.addEventListener("click", (e) => {
    e.preventDefault()
    alert(`Your screen size is ${width}x${height}`)
})