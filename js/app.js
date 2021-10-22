let shelters = 0

document.addEventListener('DOMContentLoaded', () => {
    console.log('dom content loaded')
    buildShelter.addEventListener('click', () => {
        shelters++
        if (shelters == 1) {
            const shelterDiv = document.createElement('div')
            shelterDiv.innerText = `shelters: ${shelters}`
            shelterCounter.appendChild(shelterDiv)
        } else {
            shelterCounter.removeChild(shelterCounter.childNodes[0])
            const shelterDiv = document.createElement('div')
            shelterDiv.innerText = `shelters: ${shelters}`
            console.log('shelters:', shelters)
            shelterCounter.appendChild(shelterDiv)
        }
    })
})