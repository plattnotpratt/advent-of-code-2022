const fs = require('node:fs/promises');



async function readInput(){
  const data = [];
  let lineCount = 0;
  const file = await fs.open('input.txt');
  for await (let line of file.readLines()){
    data.push( Array.from(line).map((val, index) => { return new Tree(val, index, lineCount)}));
    lineCount++;
  }
  return data;
}

async function init(){
  const data = await readInput()
  let maxScenicScore = 0;
  for(let i = 0; i < data.length; i++){
    for(let k = 0; k < data[i].length; k++){
      const sscore = data[i][k].getScenicScore(data);
      if(sscore > maxScenicScore){
        maxScenicScore = sscore;
      }
    }
  }
  console.log(maxScenicScore);
}

init();

class Tree{
  
  constructor(height, x, y){
    this.height = parseInt(height);
    this.x = x;
    this.y = y;
    this.score = [0,0,0,0];
    this.scenicScore = 1;
  }

  getScenicScore(data){
    this.checkNorth(data);
    this.checkEast(data);
    this.checkSouth(data);
    this.checkWest(data);
    for(let i = 0; i < this.score.length; i++){
      this.scenicScore = this.scenicScore * this.score[i];
    }
    return this.scenicScore;
  }
  checkNorth(data){
    for(let i = this.y-1; i >= 0; i--){
      this.score[0] += 1;
      if(data[i][this.x].height >= this.height){
        break;
      }
    }
  }
  checkEast(data){
    for(let i = this.x+1; i < data[this.y].length; i++){
      this.score[1] += 1;
      if(data[this.y][i].height >= this.height){
        break;
      }
    }
  }
  checkSouth(data){
    for(let i = this.y+1; i < data.length; i++){
      this.score[2] += 1;
      if(data[i][this.x].height >= this.height){
        break;
      }
    }
  }
  checkWest(data){
    for(let i = this.x-1; i >= 0; i--){
      this.score[3] += 1;
      if(data[this.y][i].height >= this.height){
        break;
      }
    }
  }
}