// global variables
let timer = 0
let season = 'spring'
let shelters = 0
let farmPlots = 0

// display a message when 5 shelters are built
const shelterTutorial = () => {
    if (shelters == 5) {
        console.log('5 shelters built')
        startTimer()
    }
}

// startTimer kicks off the interval function that cycles through the seasons
const startTimer = () => {
    console.log('timer started')
    const timerMechanism = setInterval(()=>{
        console.log(timer)
        if (timer < 25) {
            console.log('spring')
            season = 'spring'
        } else if (timer >= 25 && timer < 50) {
            console.log('summer')
            season = 'summer'
        } else if (timer >= 50 && timer < 75) {
            console.log('fall')
            season = 'fall'
        } else if (timer >= 75 && timer < 100) {
            console.log('it\'s getting colder....')
            season = 'it\'s getting colder'
        } else if (timer == 100) {
            console.log('game over')
            clearInterval(timerMechanism)
        }
        timer++
        
    },10000)
}


document.addEventListener('DOMContentLoaded', () => {
    // build shelter event listener
    window.addEventListener('click', () => {
        shelterTutorial()
    })
    buildShelter.addEventListener('click', () => {
        shelters++
        shelterNum.innerText = shelters
        })
    // build farm plot event listener
    buildFarmPlot.addEventListener('click', () => {
        farmPlots++
        farmPlotNum.innerText = farmPlots
        })
})