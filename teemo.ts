import { CountUp } from './js/countUp.min.js';

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

var totalDisplayMode = true;

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
  var divName = team + "-bet-total";
  var totalDiv = document.getElementById(divName);
  var individualDivName = team + "-individual-bets";
  var individualDiv = document.getElementById(individualDivName);
  var breakdownCounterName = team + "-breakdown-counter";
  var breakdownCounter = document.getElementById(breakdownCounterName);
  getTeamBets(team).then(function (response) {
      // console.log("update")

      individualDiv.innerHTML = '';
      individualDiv.appendChild(makeIndividualBetsDiv(response.bets));

      var teamBetsResponse = getTeamBetsTotal(response);

      // if-else checks whether central counter is in total display mode, or no. of bets per side display mode
      if (totalDisplayMode) {
          var total = teamBetsResponse;

          var current;

          // team total div counter
          if (totalDiv.innerHTML == '') {
              current = 0;
          }
          else {
              // replace due to countUp conversion of int to string with commas
              current = parseInt(totalDiv.innerHTML.replace(/,/g, ''));
          }

          totalDiv.dataset.total = total.toString();

          const options = {
              startVal: current,
          };

          let totalCounter = new CountUp(divName, total, options);
          totalCounter.start();
      }
      else {
          var total = individualDiv.children[0].children.length;

          var current;

          // team total div counter
          current = parseInt(totalDiv.innerHTML.replace(/,/g, ''));

          totalDiv.dataset.total = total.toString();

          const options = {
              startVal: current,
          };

          let totalCounter = new CountUp(divName, total, options);
          totalCounter.start();
      }

      // individual div parent counter

      var breakdownCurrent = parseInt(breakdownCounter.innerHTML.replace(/,/g, ''));

      const individualOptions = {
            startVal: breakdownCurrent,
      };

      let individualDivCounter = new CountUp(breakdownCounterName, teamBetsResponse, individualOptions);
      individualDivCounter.start();


  });
}

document.getElementById("show-breakdown-button").addEventListener('click', function() {
    var redIndividualBets = document.getElementById("red-individual-bets");
    var blueIndividualBets = document.getElementById("blue-individual-bets");
    var redBetsTotal =  document.getElementById("red-bet-total");
    var blueBetsTotal =  document.getElementById("blue-bet-total");
    var redBreakdownCounter = document.getElementById("red-breakdown-counter");
    var blueBreakdownCounter = document.getElementById("blue-breakdown-counter");

    // determines if breakdowns are visible or not

        var redTotal = redBetsTotal.dataset.total;
        var blueTotal = blueBetsTotal.dataset.total;

        redBreakdownCounter.style.display = "block";
        blueBreakdownCounter.style.display = "block";


        const redOptions = {
                  startVal: redTotal,
        };

        const blueOptions = {
                  startVal: blueTotal,
        };

        var noRedBets = redIndividualBets.children[0].children.length;
        var noBlueBets = blueIndividualBets.children[0].children.length;

        let redCounter = new CountUp(redBetsTotal, noRedBets, redOptions);
        let blueCounter = new CountUp(blueBetsTotal, noBlueBets, blueOptions);
        let redBreakdown = new CountUp(redBreakdownCounter, redTotal);
        let blueBreakdown = new CountUp(blueBreakdownCounter, blueTotal);

        totalDisplayMode = false;

        redCounter.start();
        blueCounter.start();
        redBreakdown.start();
        blueBreakdown.start();



        redIndividualBets.style.display = "inline-block";
        blueIndividualBets.style.display = "inline-block";


        document.getElementById("red-bet-label").textContent = "Bets for Red";
        document.getElementById("blue-bet-label").textContent = "Bets for Blue";
        this.textContent = "Hide Bet Breakdown";
    }
    else {

        totalDisplayMode = true;
        updateBetInfo("red");
        updateBetInfo("blue");

        redBreakdownCounter.style.display = "none";
        blueBreakdownCounter.style.display = "none";

        redIndividualBets.style.display = "none";
        blueIndividualBets.style.display = "none";

        document.getElementById("red-bet-label").textContent = "Mushrooms";
        document.getElementById("blue-bet-label").textContent = "Mushrooms";
        this.textContent = "Show Bet Breakdown";
    }
});

updateBetInfo("red")
updateBetInfo("blue")
setInterval(function(){ updateBetInfo("red"); updateBetInfo("blue") }, 3000)
