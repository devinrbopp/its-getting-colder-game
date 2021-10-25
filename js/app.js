/*
==========================GLOBAL VARIABLES==========================
*/
let timer = 1
let season = 'spring'
let isPaused = false
let crowsFavor = false

// buildable items
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
        winPoints: 2,
        rate: .002
    }
}
/*
============================EVENT SCENARIOS=============================
*/
const scenarios = {
    testScenario: {
        alertText: 'This is scenario 1',
        buttonOneText: 'This is choice 1',
        buttonTwoText: 'This is choice 2',
        choiceOneResultText: 'You chose 1',
        choiceTwoResultText: 'You chose 2',
        choiceOneFunction: () => {console.log('choice 1')},
        choiceTwoFunction: () => {console.log('choice 2')},
    },
    crows: {
        alertText: 'crows are eating your crops',
        buttonOneText: 'scare them away',
        buttonTwoText: 'let them eat',
        choiceOneResultText: 'the crows are mad',
        choiceTwoResultText: `the crow god smiles upon you\nlose half of your food & gain the favor of the crows`,
        choiceOneFunction: () => {console.log('no change')},
        choiceTwoFunction: () => {
            build.food.count = Math.floor(build.food.count/2)
            crowsFavor = true
            console.log(crowsFavor)
        }
    },
    summerFarming: {
        alertText: 'summer is here. what will you grow',
        buttonOneText: 'strawberries',
        buttonTwoText: 'potatoes',
        choiceOneResultText: 'you enjoy the delicious red fruit',
        choiceTwoResultText: 'a practical choice. you can store them for the winter\nfood production speed doubled',
        choiceOneFunction: () => {console.log('no change')},
        choiceTwoFunction: () => {build.farmPlot.rate *= 2}

    },
    crowsGift: {
        alertText: 'the crows have returned to repay your gift--a plethora of rabbits, perfect for jerky',
        buttonOneText: 'thank you',
        buttonTwoText: 'we are in your debt',
        choiceOneResultText: 'caw',
        choiceTwoResultText: 'caw caw',
        choiceOneFunction: () => {build.food.count *= 1.5},
        choiceTwoFunction: () => {build.food.count *= 1.5}
    }
}

/*
===========================REUSABLE FUNCTIONS===========================
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

// alert function
const createScenario = (scenarioNumber) => {
    // alerts pause the game
    isPaused =  true
    // and display a message with two choices
    alertP.innerText = scenarioNumber.alertText
    const choice1 = document.createElement('button')
    choice1.innerText = scenarioNumber.buttonOneText
    const choice2 = document.createElement('button')
    choice2.innerText = scenarioNumber.buttonTwoText
    alertDiv.appendChild(choice1)
    alertDiv.appendChild(choice2)
    // choice button event listeners that execute functions
    // and display a result message
    choice1.addEventListener('click', () => {
        isPaused = false
        alertP.innerText = scenarioNumber.choiceOneResultText
        alertDiv.removeChild(choice1)
        alertDiv.removeChild(choice2)
        scenarioNumber.choiceOneFunction()
        setTimeout(() => {
            alertP.innerText = ''
        }, 7000)
    })
    choice2.addEventListener('click', () => {
        isPaused = false
        alertP.innerText = scenarioNumber.choiceTwoResultText
        alertDiv.removeChild(choice1)
        alertDiv.removeChild(choice2)
        scenarioNumber.choiceTwoFunction()
        setTimeout(() => {
            alertP.innerText = ''
        }, 7000)
    })
}

// scenario listener RETURN TO THIS LATER
// const scenarioListener = (scenarioNumber, criteria) => {
//     const checker = setInterval(() => {
//         console.log('checking for crows')
//         if (criteria) {
//             createScenario(scenarioNumber)
//             clearInterval(checker)
//         }
//     }, 10)
// }

/*
=================================GAME FUNCTIONS=================================
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

// interval at which farms produce food; starts here with the start of the game
const foodInterval = setInterval(()=> {
    if (!isPaused) {
        // console.log(farmPlots)
        build.food.count += (build.farmPlot.count * build.farmPlot.rate)
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


// startTimer kicks off the interval function that cycles through the seasons
const startTimer = () => {
    // console.log('timer started')
    seasonDisplay.innerText = `${season} ${Math.floor(timer)}%`
    const timerMechanism = setInterval(()=>{
        if (!isPaused) {
            if (timer < 75) {
                timer += .5
            } else {
                timer += .75
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
                isPaused = true
                winCheck()
            }
        }
    },100) // change back to 2500
}

/*
===========================EVENT LISTENERS, ALERT INTERVALS, AND FUNCTION CALLS===========================
*/
document.addEventListener('DOMContentLoaded', () => {
    // event listener to mark end of tutorial and start of timer
    window.addEventListener('click',shelterTutorial)
    // starts the interval for population increase
    intervalRandomizer(addPerson, 7000, 3000)
    
    // gather food event listener
    gatherFood.addEventListener('click', () => {
        if (!isPaused) {
            build.food.count++
        }
    })
    
    // make build shelter button appear after 10 food are gathered
    const addBuildShelter = setInterval(() => {
        if (build.food.count >= 10) {
            const buildShelterButton = document.createElement('button')
            buildShelterButton.setAttribute('id', 'buildShelter')
            buildShelterButton.innerText = 'build shelter'
            controls.appendChild(buildShelterButton)
            // build shelter event listener
            buildShelter.addEventListener('click', () => {
                if (!isPaused) {
                    if (build.food.count >= build.shelter.cost) {
                        build.shelter.count++
                        shelterNum.innerText = build.shelter.count
                        build.food.count -= build.shelter.cost
                    }
                }
            })
            clearInterval(addBuildShelter)
        }
    }, 10)

    // make build farm plot appear after 3 shelters are built
    const addBuildFarmPlot = setInterval(() => {
        if (build.shelter.count >= 3) {
            const buildFarmPlotButton = document.createElement('button')
            buildFarmPlotButton.setAttribute('id', 'buildFarmPlot')
            buildFarmPlotButton.innerText = 'build farm plot'
            controls.appendChild(buildFarmPlotButton)
            // build farm plot event listener
            buildFarmPlot.addEventListener('click', () => {
                if (!isPaused) {
                    if (build.food.count >= build.farmPlot.cost) {
                        build.farmPlot.count++
                        farmPlotNum.innerText = build.farmPlot.count
                        build.food.count -= build.farmPlot.cost
                    }
                }
            })
            clearInterval(addBuildFarmPlot)
        }
    })
    
    // pause button
    // pause.addEventListener('click', () => {
    //     if (!isPaused) {
    //         isPaused = true
    //         pause.innerText = 'unpause'
    //     } else {
    //         isPaused = false
    //         pause.innerText = 'pause'
    //     }
    //     console.log('the game is paused:',isPaused)
    // })

    // listen for curcumstances to be met for events
    const crowsCheck = setInterval(() => {
        if (build.farmPlot.count >= 2) {
            createScenario(scenarios.crows)
            clearInterval(crowsCheck)
        }
    }, 10)

    const summerFarmingCheck = setInterval(() => {
        if (timer >= 26) {
            createScenario(scenarios.summerFarming)
            clearInterval(summerFarmingCheck)
        }
    }, 10)

    const crowsGiftCheck = setInterval(() => {
        if (timer >= 80 && crowsFavor) {
            createScenario(scenarios.crowsGift)
            clearInterval(crowsGiftCheck)
        }
    }, 10)
})