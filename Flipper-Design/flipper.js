const flipperUp = document.querySelector(".flipper-up")
const flipperDown = document.querySelector(".flipper-down")
let characters = ['2', 'A', 'b', '}']

function flipCard(newChar) {
    const currentCards = [flipperUp.lastElementChild, flipperDown.lastElementChild]
    console.log(currentCards)
    const newUpperCard = document.createElement('div')
    const newLowerCard = document.createElement('div')
    newUpperCard.innerHTML = `<p>${newChar}</p>`
    newLowerCard.innerHTML = `<p>${newChar}</p>`
    newUpperCard.classList.add('flip-card')
    newLowerCard.classList.add('flip-card')

    // Prepend newUpperCard so it sits BEHIND currentCards[0] in DOM stacking order
    flipperUp.prepend(newUpperCard)

    // Append newLowerCard so it animates and lands ON TOP of currentCards[1]
    flipperDown.append(newLowerCard)
    currentCards[0].classList.add('flipper-up-animate')

    // Remove old cards from DOM once animations complete
    currentCards[0].addEventListener('animationend', () => {
        currentCards[0].remove()
    }, { once: true })
    newLowerCard.addEventListener('animationend', () => {
        if (currentCards[1]) {
            currentCards[1].remove()
        }
    }, { once: true })
}
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function flipArrayWithDelay(array, delayMs) {
    for (const char of array) {
        flipCard(char)
        await sleep(delayMs);
    }
    console.log("Done!");
}
flipArrayWithDelay(characters, 700)