const fs = require('node:fs/promises');
const rock = {
  op: 'A',
  win: 8,
  draw: 4,
  lose: 3,
}
const paper = {
  op: 'B',
  win: 9,
  draw: 5,
  lose: 1,
}

const scissors = {
  op: 'C',
  win: 7,
  draw: 6,
  lose: 2,
}
let totalScore = 0;
async function getTotalScore(){
  const file = await fs.open('rps.txt');
  for await (const line of file.readLines()){
    const plays = line.split(' ');
    switch(plays[0]){
      case 'A':
        if( plays[1] === 'X' ){
          totalScore += rock.lose;
        }else if( plays[1] === 'Y'){
          totalScore += rock.draw;
        }
        else{
          totalScore += rock.win;
        }
        break;
      case 'B':
        if( plays[1] === 'X' ){
          totalScore += paper.lose;
        }else if( plays[1] === 'Y'){
          totalScore += paper.draw;
        }
        else{
          totalScore += paper.win;
        }
        break;
      case 'C':
        if( plays[1] === 'X' ){
          totalScore += scissors.lose;
        }else if( plays[1] === 'Y'){
          totalScore += scissors.draw;
        }
        else{
          totalScore += scissors.win;
        }
        break;
    }

  }
  console.log(totalScore);
}

getTotalScore();
