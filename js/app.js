// global variables
let timer = 1
let season = 'spring'

const build = {
    food: {
        count: 0,
        cost: 0,
        winPoints: 0
    },
    shelter: {
        count: 0,
        cost: 10,
        winPoints: 1
    },
    farmPlot: {
        count: 0,
        cost: 10,
        winPoints: 2
    }
}


// display a message when 5 shelters are built
const shelterTutorial = () => {
    if (build.shelter.count == 5) {
        console.log('5 shelters built')
        startTimer()
        // this will need to change later--don't want to use removeEventListener
        window.removeEventListener('click',shelterTutorial)
    }
}

// simple win check placeholder
const winCheck = () => {
    if (build.food.count > 10 && build.shelter.count > 10) {
        console.log('you win')
    } else {
        console.log('you lose')
    }
}

// intervals for initiation later
const foodInterval = setInterval(()=> {
        // console.log(farmPlots)
        build.food.count += (build.farmPlot.count * .002)
        // console.log(food)
        foodNum.innerText = `${Math.floor(build.food.count)}`
    }, 10)

// startTimer kicks off the interval function that cycles through the seasons
const startTimer = () => {
    // console.log('timer started')
    seasonDisplay.innerText = `${season}, ${Math.floor(timer)}%`
    const timerMechanism = setInterval(()=>{
        if (timer < 75) {
            timer++
        } else {
            timer += 1.5
        }
        seasonDisplay.innerText = `${season}, ${Math.floor(timer)}%`
        // console.log(timer)
        if (timer < 25) {
            // console.log('spring')
            season = 'spring'
        } else if (timer >= 25 && timer < 50) {
            // console.log('summer')
            season = 'summer'
        } else if (timer >= 50 && timer < 75) {
            // console.log('fall')
            season = 'fall'
        } else if (timer >= 75 && timer < 100) {
            // console.log('it\'s getting colder....')
            season = 'it\'s getting colder.....'
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
        build.food.count++
    })
    buildShelter.addEventListener('click', () => {
        if (build.food.count >= build.shelter.cost) {
            build.shelter.count++
            shelterNum.innerText = build.shelter.count
            build.food.count-=build.shelter.cost
        }
    })
    // build farm plot event listener
    buildFarmPlot.addEventListener('click', () => {
        if (build.food.count >= build.farmPlot.cost) {
            build.farmPlot.count++
            farmPlotNum.innerText = build.farmPlot.count
            build.food.count-=build.farmPlot.cost
        }
    })
})