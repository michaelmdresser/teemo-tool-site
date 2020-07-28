interface TeamBetsResponse {
    bets: number[]
}

async function getTeamBets(team: string): Promise<TeamBetsResponse> {
    return fetch("https://teemotool.com/api/bets/" + team, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        return res.json().then(d => d as TeamBetsResponse)
    })
}

function getTeamBetsTotal(bets: TeamBetsResponse): number {
    return bets.bets.reduce((a, b) => a + b)
}

function makeIndividualBetsDiv(bets: number[]) {
    let div = document.createElement("div")

    bets.sort(function (a, b) {return b - a})
    bets.map(amount => {
        let child = document.createElement("div")
        child.innerText = String(amount)
        div.appendChild(child)
    })

    return div
}

function updateBetInfo(team: string) {
    const divName = team + "-bet-total"
    let totalDiv = document.getElementById(divName)
    let individualDiv = document.getElementById(team + "-individual-bets")

    getTeamBets(team).then(response => {
        totalDiv.innerText = String(getTeamBetsTotal(response))
        individualDiv.innerHTML = ''
        individualDiv.appendChild(makeIndividualBetsDiv(response.bets))
    })
}

function showIndividualBets() {
    let redIndividualBets = document.getElementById("red-individual-bets")
    let blueIndividualBets = document.getElementById("blue-individual-bets")

    if (redIndividualBets.style.display === "none") {
        redIndividualBets.style.display = "block";
    } else {
        redIndividualBets.style.display = "none";
    }

    if (blueIndividualBets.style.display === "none") {
        blueIndividualBets.style.display = "block";
    } else {
        blueIndividualBets.style.display = "none";
    }
}

updateBetInfo("red")
updateBetInfo("blue")
setInterval(function(){ updateBetInfo("red"); updateBetInfo("blue") }, 3000)
