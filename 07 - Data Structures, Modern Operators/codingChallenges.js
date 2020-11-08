//TODO ----------- Objects Used --------------   //
const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
        [
            'Neuer',
            'Pavard',
            'Martinez',
            'Alaba',
            'Davies',
            'Kimmich',
            'Goretzka',
            'Coman',
            'Muller',
            'Gnarby',
            'Lewandowski',
        ],
        [
            'Burki',
            'Schulz',
            'Hummels',
            'Akanji',
            'Hakimi',
            'Weigl',
            'Witsel',
            'Hazard',
            'Brandt',
            'Sancho',
            'Gotze',
        ],
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski',
    'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5,
    },
};
//TODO ---------------------------------------   //

// * ---------- Coding Challenge #1 ---------- * //


const playersOne = game.players[0];
const playersTwo = game.players[1];

const [pOneGK, ...pOneFieldPlayers] = playersOne;
const [pTwoGK, ...pTwoFieldPlayers] = playersTwo;

// console.log(pOneGK, pOneFieldPlayers);

const allPlayers = [...playersOne, ...playersTwo];
// console.log(allPlayers);

const playerOneFinal = [...playersOne, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(playerOneFinal); 

const {odds: {team1: team1, x: draw, team2: team2}} = game;
console.log(team1, draw, team2);

const printGoals = function(...players) {
    console.log(`Goals = ${players.length}`);
    console.log(`Players = ${players}`);
};

printGoals('Davies', 'Muller', 'Lewandowski','Kimmich');
printGoals(...game.scored);

team1 < team2 && console.log("Team 1 wins.");
team1 > team2 && console.log("Team 2 wins");


// * ---------- ******************* ---------- * //
// ! ----------------------------------------- ! //
// * ---------- Coding Challenge #2 ---------- * //

for (let [i, player] of game.scored.entries()) {
    console.log(`Goal ${i + 1}: ${player}`);
}

const odds = Object.values(game.odds);
let sum = 0;
for (odd of odds) sum = sum + odd;

console.log(`Average of Odds = ${sum/odds.length}`);

const oddsEntries = Object.entries(game.odds);

for (let [key, value] of oddsEntries) {
    let str = game[key] ? "victory " + game[key] : "draw";
    console.log(`Odds of ${str} ${value}`);
}

const scorers = new Object();

for (let scorer of game.scored) {
    scorers[scorer] ? scorers[scorer]++ : (scorers[scorer] = 1);
} 

console.log(scorers);

// * ---------- ******************* ---------- * //
// ! ----------------------------------------- ! //

//TODO ----------- Objects Used --------------   //

const gameEvents = new Map([
    [17, '⚽ GOAL'],
    [36, '🔁 Substitution'],
    [47, '⚽ GOAL'],
    [61, '🔁 Substitution'],
    [64, '🔶 Yellow card'],
    [69, '🔴 Red card'],
    [70, '🔁 Substitution'],
    [72, '🔁 Substitution'],
    [76, '⚽ GOAL'],
    [80, '⚽ GOAL'],
    [92, '🔶 Yellow card'],
]);

//TODO ---------------------------------------   //

// * ---------- Coding Challenge #3 ---------- * //

const events = [...new Set(gameEvents.values())];
console.log(events);

gameEvents.delete(64);
console.log(gameEvents);

const eventsCount = gameEvents.size;
const time = [...gameEvents.keys()].pop();
console.log(`An event happened, on average, every ${time/eventsCount} minutes.`);

for (const [key, value] of gameEvents) {
    key < 45 ? console.log(`[FIRST HALF]${key}: ${value}`) : console.log(`[SECOND HALF]${key}: ${value}`);
}

// * ---------- ******************* ---------- * //
// ! ----------------------------------------- ! //