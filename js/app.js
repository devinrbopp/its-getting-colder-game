// global variables
let timer = 1
let season = 'spring'
let shelters = 0
let farmPlots = 0
let food = 0

const builds = {
    shelter: {
        cost: 10,
        winPoints: 1
    },
    farmPlot: {
        cost: 10,
        winPoints: 2
    }
}

// display a message when 5 shelters are built
const shelterTutorial = () => {
    if (shelters == 5) {
        console.log('5 shelters built')
        startTimer()
        // this will need to change later--don't want to use removeEventListener
        window.removeEventListener('click',shelterTutorial)
    }
}

// simple win check placeholder
const winCheck = () => {
    if (food > 10 && shelters > 10) {
        console.log('you win')
    } else {
        console.log('you lose')
    }
}

// intervals for initiation later
const foodInterval = setInterval(()=> {
        console.log(farmPlots)
        food += (farmPlots * .002)
        console.log(food)
        foodNum.innerText = `${Math.floor(food)}`
    }, 10)

// startTimer kicks off the interval function that cycles through the seasons
const startTimer = () => {
    console.log('timer started')
    seasonDisplay.innerText = `${season}, ${Math.floor(timer)}%`
    const timerMechanism = setInterval(()=>{
        if (timer < 75) {
            timer++
        } else {
            timer += 1.5
        }
        seasonDisplay.innerText = `${season}, ${Math.floor(timer)}%`
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
        } else if (timer >= 100) {
            console.log('game over')
            seasonDisplay.innerText = 'winter is here.'
            // scope 
            clearInterval(foodInterval)
            clearInterval(timerMechanism)
            winCheck()
        }
    },5000)
}

document.addEventListener('DOMContentLoaded', () => {
    // build shelter event listener
    window.addEventListener('click',shelterTutorial)
    gatherFood.addEventListener('click', () => {
        food++
    })
    buildShelter.addEventListener('click', () => {
        if (food >= builds.shelter.cost) {
            shelters++
            shelterNum.innerText = shelters
            food-=builds.shelter.cost
        } else {
            console.log('you need more food to do that')
        }
    })
    // build farm plot event listener
    buildFarmPlot.addEventListener('click', () => {
        if (food >= builds.farmPlot.cost) {
            farmPlots++
            farmPlotNum.innerText = farmPlots
            food-=builds.farmPlot.cost
        }
    })
})