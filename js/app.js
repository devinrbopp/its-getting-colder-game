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
        count: 0,
        rate: .001
    },
    food: {
        count: 0,
        cost: 0,
        winPoints: 0,
        max: 100
    },
    shelter: {
        count: 0,
        cost: 10,
        winPoints: 1,
        priceIncrease: 1.2
    },
    farmPlot: {
        count: 0,
        cost: 10,
        winPoints: 2,
        rate: .005,
        priceIncrease: 1.2
    },
    foodStorage: {
        count: 0,
        cost: 30,
        priceIncrease: 1.2,
        storage: 50
    }
}
/*
============================EVENT SCENARIOS=============================
*/
const scenarios = {
    tutorialOne: {
        alertText: 'this is an alert\nwhile these alerts are onscreen, the game will pause for you to click either button',
        buttonOneText: 'click me',
        buttonTwoText: 'or me to continue',
        choiceOneResultText: 'very good\nnow gather 10 food',
        choiceTwoResultText: 'very good\nnow gather 10 food',
        choiceOneFunction: () => {console.log('no change')},
        choiceTwoFunction: () => {console.log('no change')}
    },
    tutorialTwo: {
        alertText: 'now you have enough food to build your first shelter',
        buttonOneText: 'finally a warm place to rest',
        buttonTwoText: 'it\'s not much but it\'s home',
        choiceOneResultText: 'build 3 shelters\nnote that the price will increase each time you build one',
        choiceTwoResultText: 'build 3 shelters\nnote that the price will increase each time you build one',
        choiceOneFunction: () => {console.log('no change')},
        choiceTwoFunction: () => {console.log('no change')}
    },
    tutorialThree: {
        alertText: 'as you build shelters, more people will move in\ngathering food takes time. let\'s try farming instead',
        buttonOneText: 'good idea',
        buttonTwoText: 'if we must',
        choiceOneResultText: 'start building farm plots\none farm plot will sustain one shelter\'s worth of people',
        choiceTwoResultText: `
            i\'m not a fan of that attitude\nstart building farm plots\n
            one farm plot will sustain one shelter\'s worth of people
        `,
        choiceOneFunction: () => {console.log('no change')},
        choiceTwoFunction: () => {console.log('no change')}
    },
    tutorialFour: {
        alertText: 'excellent. you are on your own now. best of luck',
        buttonOneText: 'thank you',
        buttonTwoText: 'will we survive?',
        choiceOneResultText: 'it has been a pleasure',
        choiceTwoResultText: 'we\'ll see',
        choiceOneFunction: () => {startTimer()},
        choiceTwoFunction: () => {startTimer()}
    },
    crows: {
        alertText: 'crows are eating your crops',
        buttonOneText: 'scare them away',
        buttonTwoText: 'let them eat',
        choiceOneResultText: 'the crows are mad',
        choiceTwoResultText: `the crow god smiles upon you\nlose half of your food & gain the favor of the crows`,
        choiceOneFunction: () => {console.log('no change')},
        choiceTwoFunction: () => {
            build.food.count /= 2
            crowsFavor = true
        }
    },
    summerFarming: {
        alertText: 'what will you grow in your farms',
        buttonOneText: 'strawberries',
        buttonTwoText: 'potatoes',
        choiceOneResultText: 'you enjoy the delicious red fruit',
        choiceTwoResultText: 'a practical choice. you can store them for the winter\nfood production speed doubled',
        choiceOneFunction: () => {console.log('no change')},
        choiceTwoFunction: () => {build.farmPlot.rate *= 2}
    },
    summerFire: {
        alertText: 'the summer is unusually warm and dry, and a fire strikes your community',
        buttonOneText: 'evacuate',
        buttonTwoText: 'save the food',
        choiceOneResultText: 'your people are safe, but you lose two silos and the food within',
        choiceTwoResultText: 'you manage to save the food with minimal damage to the silo, but you lost 5 people in the inferno',
        choiceOneFunction: () => {
            build.foodStorage.count -= 2
            foodStorageNum.innerText = build.foodStorage.count
            build.food.count -= build.foodStorage.storage * 2
        },
        choiceTwoFunction: () => {
            build.population.count -= 5
        }
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
    outcome.innerText = ''
    alertDiv.innerHTML = '<p id="alertP"></p>'
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
        alertP.innerText = ''
        outcome.innerText = scenarioNumber.choiceOneResultText
        alertDiv.removeChild(choice1)
        alertDiv.removeChild(choice2)
        scenarioNumber.choiceOneFunction()
        // setTimeout(() => {
        //     alertP.innerText = ''
        // }, 7000)
    })
    choice2.addEventListener('click', () => {
        isPaused = false
        alertP.innerText = ''
        outcome.innerText = scenarioNumber.choiceTwoResultText
        alertDiv.removeChild(choice1)
        alertDiv.removeChild(choice2)
        scenarioNumber.choiceTwoFunction()
        // setTimeout(() => {
        //     alertP.innerText = ''
        // }, 7000)
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
    if (!isPaused && build.food.count < build.food.max) {
        // console.log(farmPlots)
        build.food.count += (build.farmPlot.count * build.farmPlot.rate)
        // console.log(food)
        foodNum.innerText = `${Math.floor(build.food.count)}`
    }
}, 10)

const foodMax = setInterval(()=> {
    if(!isPaused) {
        build.food.max = 100 + (build.foodStorage.count * build.foodStorage.storage)
    }
})

const consumptionInterval = setInterval(()=> {
    if (!isPaused && build.food.count > 1) { // > 1 due to Math.floor errors
        build.food.count -= build.population.count * build.population.rate
        foodNum.innerText= `${Math.floor(build.food.count)}`
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
                timer += .6
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
    }, 2500) // set to 2500--every 5 sec = 1%
}

/*
==================EVENT LISTENERS, ALERT INTERVALS, AND FUNCTION CALLS==================
*/
document.addEventListener('DOMContentLoaded', () => {
    // event listener to mark end of tutorial and start of timer
    // window.addEventListener('click',shelterTutorial)
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
                        build.shelter.cost = Math.floor(build.shelter.cost*build.shelter.priceIncrease)
                        console.log('shelters now cost', build.shelter.cost)
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
                        build.farmPlot.cost = Math.floor(build.farmPlot.cost*build.farmPlot.priceIncrease)
                        console.log('farms now cost', build.farmPlot.cost)
                    }
                }
            })
            clearInterval(addBuildFarmPlot)
        }
    }, 10)

    const addBuildFoodStorage = setInterval(() => {
        if (build.farmPlot.count >= 8) {
            const buildFoodStorageButton = document.createElement('button')
            buildFoodStorageButton.setAttribute('id', 'buildFoodStorage')
            buildFoodStorageButton.innerText = 'build silo'
            controls.appendChild(buildFoodStorageButton)
            // build farm plot event listener
            buildFoodStorage.addEventListener('click', () => {
                if (!isPaused) {
                    if (build.food.count >= build.foodStorage.cost) {
                        build.foodStorage.count++
                        foodStorageNum.innerText = build.foodStorage.count
                        build.food.count -= build.foodStorage.cost
                        build.foodStorage.cost = Math.floor(build.foodStorage.cost*build.foodStorage.priceIncrease)
                        console.log('silo now costs', build.foodStorage.cost)
                    }
                }
            })
            clearInterval(addBuildFoodStorage)
        }
    }, 10)
    
    // pause button (may re-add later)
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

    // listen for circumstances to be met for events
    const tutorialOneCheck = setInterval(() => {
        if (timer) {
            createScenario(scenarios.tutorialOne)
            clearInterval(tutorialOneCheck)
        }
    }, 15) // these are slower than the food refresh so that those numbers have time to change via DOM manipulation

    const tutorialTwoCheck = setInterval(() => {
        if (build.food.count >= 10 && !isPaused) {
            createScenario(scenarios.tutorialTwo)
            clearInterval(tutorialTwoCheck)
        }
    }, 15)

    const tutorialThreeCheck = setInterval(() => {
        if (build.shelter.count >= 3 && !isPaused) {
            createScenario(scenarios.tutorialThree)
            clearInterval(tutorialThreeCheck)
        }
    }, 15)

    const tutorialFourCheck = setInterval(() => {
        if (build.farmPlot.count >= 3 && !isPaused) {
            createScenario(scenarios.tutorialFour)
            clearInterval(tutorialFourCheck)
        }
    }, 15)

    const crowsCheck = setInterval(() => {
        if (build.farmPlot.count >= 8 && !isPaused) {
            createScenario(scenarios.crows)
            clearInterval(crowsCheck)
        }
    }, 3000)

    const summerFarmingCheck = setInterval(() => {
        if (timer >= 26 && !isPaused) {
            createScenario(scenarios.summerFarming)
            clearInterval(summerFarmingCheck)
        }
    }, 3000)

    const summerFireCheck = setInterval(() => {
        if (build.foodStorage.count >= 2 && 
            build.food.count >= (build.foodStorage.storage * 2) && 
            build.population.count > 10 && 
            timer >= 30 && 
            timer < 50 && 
            !isPaused) {
            createScenario(scenarios.summerFire)
            clearInterval(summerFireCheck)
        }
    }, 3000)

    const crowsGiftCheck = setInterval(() => {
        if (timer >= 80 && crowsFavor && !isPaused) {
            createScenario(scenarios.crowsGift)
            clearInterval(crowsGiftCheck)
        }
    }, 3000)
})