// GLOBAL VARIABLES
let timer = 1
let season = 'spring'
let isPaused = false

/*
=========BUILDABLE ITEMS=========
*/
const build = {
    population: {
        count: 0
    },
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

/*
=========REUSABLE FUNCTIONS=========
*/

// intervalRandomizer creates the sense that something occurs at random intervals
// it triggers setTimeout using setInterval
const intervalRandomizer = (func, avgTime, maxDelay) => {
    setInterval( () => {
        if (!isPaused) {
            setTimeout(func,(Math.random() * maxDelay))
        }
    }, avgTime)
}

/*
=====GAME FUNCTIONS=====
*/
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
// interval at which farms produce food
const foodInterval = setInterval(()=> {
    if (!isPaused) {
        // console.log(farmPlots)
        build.food.count += (build.farmPlot.count * .002)
        // console.log(food)
        foodNum.innerText = `${Math.floor(build.food.count)}`
    }
}, 10)

// intervals at which people move into shelters (every 10 seconds)
const addPerson = () =>{
    if (!isPaused) {
        if (build.population.count < build.shelter.count * 5) {
            build.population.count++
            // console.log('population',build.population.count)
            populationNum.innerText = build.population.count
        }
    }
}

intervalRandomizer(addPerson, 7000, 3000)

// startTimer kicks off the interval function that cycles through the seasons
const startTimer = () => {
    // console.log('timer started')
    seasonDisplay.innerText = `${season} ${Math.floor(timer)}%`
    const timerMechanism = setInterval(()=>{
        if (!isPaused) {
            if (timer < 75) {
                timer++
            } else {
                timer += 1.5
            }
            seasonDisplay.innerText = `${season} ${Math.floor(timer)}%`
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
        }
    },5000)
}

/*
=====EVENT LISTENERS=====
*/
document.addEventListener('DOMContentLoaded', () => {
    // event listener to mark end of tutorial and start of timer
    window.addEventListener('click',shelterTutorial)
    
    // gather food event listener
    gatherFood.addEventListener('click', () => {
        if (!isPaused) {
            build.food.count++
        }
    })

    // build shelter event listener
    buildShelter.addEventListener('click', () => {
        if (!isPaused) {
            if (build.food.count >= build.shelter.cost) {
                build.shelter.count++
                shelterNum.innerText = build.shelter.count
                build.food.count-=build.shelter.cost
            }
        }
    })

    // build farm plot event listener
    buildFarmPlot.addEventListener('click', () => {
        if (!isPaused) {
            if (build.food.count >= build.farmPlot.cost) {
                build.farmPlot.count++
                farmPlotNum.innerText = build.farmPlot.count
                build.food.count-=build.farmPlot.cost
            }
        }
    })

    // dummy alert for testing
    setTimeout(() => {
        alertP.innerText = 'here is an alert'
        const choice1 = document.createElement('button')
        choice1.innerText='choice one'
        const choice2 = document.createElement('button')
        choice2.innerText='choice two'
        alertDiv.appendChild(choice1)
        alertDiv.appendChild(choice2)
    }, 2000)

    // pause button
    pause.addEventListener('click', () => {
        if (!isPaused) {
            isPaused = true
            pause.innerText = 'unpause'
        } else {
            isPaused = false
            pause.innerText = 'pause'
        }
        console.log('the game is paused:',isPaused)
    })

})
