let timer = 0
let shelters = 0
let farmPlots = 0

// display a message when 5 shelters are built
const shelterTutorial = () => {
    if (shelters == 5) {
        console.log('5 shelters built')
        startTimer()
    }
}

const startTimer = () => {
    console.log('timer started')
    setInterval(()=>{
        console.log(timer)
        timer++
    },1000)
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