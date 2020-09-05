
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
function countNumbers() {
    let result =0;
    [].forEach.call(arguments, function (arg) {
        if(arg ===9){
            result++;
        }
    });
    return result;
}
function updatevalues (gameMap) {
    const rows = gameMap.length-1;
    const colunms = gameMap[0].length-1;
    gameMap[0][0] = gameMap[0][0]!== 9 ? countNumbers(gameMap[0][1],gameMap[1][0],gameMap[1][1]) : 9;
    gameMap[0][colunms] = gameMap[0][colunms] !== 9 ?countNumbers(gameMap[0][colunms-1],gameMap[1][colunms],gameMap[1][colunms-1]) : 9;
    gameMap[rows][0] = gameMap[rows][0] !==9 ? countNumbers(gameMap[rows][1],gameMap[rows-1][0],gameMap[rows-1][1]) : 9;
    gameMap[rows][colunms] = gameMap[rows][colunms] !== 9 ? countNumbers(gameMap[rows][colunms-1],gameMap[rows-1][colunms],gameMap[rows-1][colunms-1]) : 9;
    for(let j = 1; j < gameMap[0].length-1; j ++){
        if(gameMap[0][j] !=9){
            gameMap[0][j] = countNumbers(gameMap[0][j-1],gameMap[0][j+1],gameMap[1][j-1],gameMap[1][j],gameMap[1][j+1]);
        }
        if(gameMap[rows][j]!=9) {
            gameMap[rows][j] = countNumbers(gameMap[rows][j-1], gameMap[rows][j+1],gameMap[rows-1][j-1],gameMap[rows-1][j],gameMap[rows-1][j+1]);

        }
    }
    for(let i = 1; i < gameMap.length-1; i ++){
        if(gameMap[i][0]!=9) {
            gameMap[i][0] =countNumbers(gameMap[i-1][0],gameMap[i+1][0],gameMap[i-1][1],gameMap[i][1],gameMap[i+1][1]);
        }
        if(gameMap[i][colunms] !=9){
            gameMap[i][colunms] = countNumbers(gameMap[i-1][colunms],gameMap[i+1][colunms],gameMap[i-1][colunms-1],gameMap[i][colunms-1], gameMap[i+1][colunms-1]);

        }
    }
    for (let i = 1; i < gameMap.length-1; i ++){
        for(let j = 1; j < gameMap[0].length-1; j ++) {
            if(gameMap[i][j] !=9) {
                gameMap[i][j] = countNumbers(gameMap[i-1][j-1],gameMap[i-1][j],gameMap[i-1][j+1]
                ,gameMap[i][j-1],gameMap[i][j+1]
                ,gameMap[i+1][j-1],gameMap[i+1][j],gameMap[i+1][j+1]);
            }

        }
    }
}

function generateBooms(rowNumber, cloumnNumber, leinumber) {
    let numberOfLei = leinumber || rowNumber*cloumnNumber/4;
    const numberOfElement = rowNumber * cloumnNumber;
    const gameMap = [];
    const elements = [];
    for ( let i = 0; i < numberOfLei; i ++) { //16 colunms
        elements.push(9);
    }
    for (let i = numberOfLei; i < numberOfElement; i ++) {
        elements.push(0);
    }
    shuffle(elements);
    for (let i = 0 ; i < rowNumber; i ++){
        gameMap.push(elements.slice(i*cloumnNumber, (i+1)*cloumnNumber))
    }
    return gameMap;
}

export const generateGame = (rowNumber, cloumnNumber, leinumber) => {
    const gameMap = generateBooms(rowNumber, cloumnNumber, leinumber);
    updatevalues(gameMap);
    return gameMap;
}
