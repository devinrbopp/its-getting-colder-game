let shelters = 0
let farmPlots = 0

document.addEventListener('DOMContentLoaded', () => {
    console.log('dom content loaded')
    buildShelter.addEventListener('click', () => {
        shelters++
        if (shelters == 1) {
            shelterNum.innerText = shelters
        } else {
            shelterNum.innerText = shelters
        }
    })
    buildFarmPlot.addEventListener('click', () => {
        farmPlots++
        if (farmPlots == 1) {
            farmPlotNum.innerText = farmPlots
        } else {
            farmPlotNum.innerText = farmPlots
        }
    })
})