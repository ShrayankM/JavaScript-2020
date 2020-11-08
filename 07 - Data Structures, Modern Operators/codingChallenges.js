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