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
    return bets.bets.reduce(function (a, b) { return a + b; });
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
    var individualDiv = document.getElementById(team + "-individual-bets");
    getTeamBets(team).then(function (response) {
        totalDiv.innerText = String(getTeamBetsTotal(response));
        individualDiv.innerHTML = '';
        individualDiv.appendChild(makeIndividualBetsDiv(response.bets));
    });
}
function showIndividualBets() {
    var redIndividualBets = document.getElementById("red-individual-bets");
    var blueIndividualBets = document.getElementById("blue-individual-bets");
    if (redIndividualBets.style.display === "none") {
        redIndividualBets.style.display = "block";
    }
    else {
        redIndividualBets.style.display = "none";
    }
    if (blueIndividualBets.style.display === "none") {
        blueIndividualBets.style.display = "block";
    }
    else {
        blueIndividualBets.style.display = "none";
    }
}
updateBetInfo("red");
updateBetInfo("blue");
setInterval(function () { updateBetInfo("red"); updateBetInfo("blue"); }, 3000);
