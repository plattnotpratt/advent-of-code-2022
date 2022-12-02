const fs = require('node:fs/promises');
const rock = {
  op: 'A',
  play: 'X',
  val: 1,
  win: 'C',
  draw: 'A',
  lose: 'B',
}
const paper = {
  op: 'B',
  play: 'Y',
  val: 2,
  win: 'A',
  draw: 'B',
  lose: 'C',
}

const scissors = {
  play: 'Z',
  val: 3,
  win: 'B',
  draw: 'C',
  lose: 'A',
}
let totalScore = 0;
async function getTotalScore(){
  const file = await fs.open('rps.txt');
  for await (const line of file.readLines()){
    const plays = line.split(' ');
    switch(plays[1]){
      case 'X':
        totalScore+=1;
        if( plays[0] === rock.win ){
          totalScore += 6;
        }else if( plays[0] === rock.draw){
          totalScore += 3;
        }
        else{
          //do nothing
        }
        break;
      case 'Y':
        totalScore+=2;
        if( plays[0] === paper.win ){
          totalScore += 6;
        }else if( plays[0] === paper.draw){
          totalScore += 3;
        }
        else{
          //do nothing
        }
        break;
      case 'Z':
        totalScore+=3;
        if( plays[0] === scissors.win ){
          totalScore += 6;
        }else if( plays[0] === scissors.draw){
          totalScore += 3;
        }
        else{
          //do nothing
        }
        break;
    }

  }
  console.log(totalScore);
}

getTotalScore();
