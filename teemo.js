import { CountUp } from './countup.js/dist/countUp.js';

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var totalDisplayMode = true;
function getTeamBets(team) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetch("https://teemotool.com/api/bets/" + team, {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(function (res) {
                    return res.json().then(function (d) { return d; });
                })];
        });
    });
}
function getTeamBetsTotal(bets) {
    var total = bets.bets.reduce(function (a, b) { return a + b; });
    return total;
}
function makeIndividualBetsDiv(bets) {
    var div = document.createElement("div");
    bets.sort(function (a, b) { return b - a; });
    bets.map(function (amount) {
        var child = document.createElement("div");
        child.innerText = String(amount);
        div.appendChild(child);
    });
    return div;
}
function updateBetInfo(team) {
    var divName = team + "-bet-total";
    var totalDiv = document.getElementById(divName);
    var individualDivName = team + "-individual-bets";
    var individualDiv = document.getElementById(individualDivName);
    var breakdownCounterName = team + "-breakdown-counter";
    var breakdownCounter = document.getElementById(breakdownCounterName);
    getTeamBets(team).then(function (response) {
        console.log("update")

        individualDiv.innerHTML = '';
        individualDiv.appendChild(makeIndividualBetsDiv(response.bets));

        var teamBetsResponse = getTeamBetsTotal(response);

        if (totalDisplayMode) {
            var total = teamBetsResponse;

            var current;

            // team total div counter
            if (totalDiv.innerHTML == '') {
                current = 0;
            }
            else {
                current = parseInt(totalDiv.innerHTML.replace(/,/g, ''));
            }

            totalDiv.dataset.total = total;

            const options = {
                startVal: current,
            };

            let totalCounter = new CountUp(divName, total, options);
            totalCounter.start();
        }
        else {
            var total = individualDiv.children[0].children.length;
            console.log(total);

            var current;

            // team total div counter
            current = parseInt(totalDiv.innerHTML.replace(/,/g, ''));

            totalDiv.dataset.total = total;

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

        //console.log(individualDiv.children)


    });
}

document.getElementById("show-breakdown-button").addEventListener('click', function() {
    var redIndividualBets = document.getElementById("red-individual-bets");
    var blueIndividualBets = document.getElementById("blue-individual-bets");
    var redBetsTotal =  document.getElementById("red-bet-total");
    var blueBetsTotal =  document.getElementById("blue-bet-total");
    var redBreakdownCounter = document.getElementById("red-breakdown-counter");
    var blueBreakdownCounter = document.getElementById("blue-breakdown-counter");
    if (redIndividualBets.style.display === "none" || blueIndividualBets.style.display === "none") {

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

        //let redIndividualCounter = new CountUp(redIndividualBets, redTotal)
        //let blueIndividualCounter = new CountUp(blueIndividualBets, blueTotal)

        //redIndividualCounter.start();
        //blueIndividualCounter.start();

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
document.getElementById("red-bet-total").addEventListener("DOMSubtreeModified", function () {
    if (this.innerHTML == 0){
      //this.style.display = "none";
    }
    else {
      this.style.display = "block";
    }
});
document.getElementById("blue-bet-total").addEventListener("DOMSubtreeModified", function () {
    if (this.innerHTML == 0){
      //this.style.display = "none";
    }
    else {
      this.style.display = "block";
    }
});

updateBetInfo("red");
updateBetInfo("blue");
setInterval(function () { updateBetInfo("red"); updateBetInfo("blue"); }, 3000);
