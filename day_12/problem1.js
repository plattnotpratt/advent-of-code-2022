const fs = require('node:fs/promises');

async function readInput(){
  const data = [];
  const file = await fs.open('input.txt');
  for await (let line of file.readLines()){
    data.push(Array.from(line));
  }
  //console.log(data)
  return data;
}

async function init(){
  const data = await readInput();
  const mapObj = new Map(data);
  const mover = new Mover(mapObj);
  console.log(mover.move(mover.pos));
  // console.log(mover);
}

class Mover{
  constructor(mapObj){
    this.mapObj = mapObj;
    this.end = mapObj.getEndPoint();
    this.moveCount = 0;
    this.pos = mapObj.getStartPoint();
    this.curElevation = mapObj.getCurElevation(this.pos);
    this.pastPoints = [];
    
  }

  move(pos){
    let flag = false;
    if(pos != this.end){
      const options = this.mapObj.getPosibleMoves(pos);
      console.log(options);
      for(let i = 0; i < options.length; i++){
        for(let k = 0; k < this.pastPoints.length; k++){
          if(options[i].x == this.pastPoints[k].x && options[i].y == this.pastPoints[k].y){
            flag = true;
            break;
          }
        }
        if(!flag){
          this.pastPoints.push(options[i]);
          console.log(this.pastPoints);
          return this.move(options[i]) + 1;
        }else{
          return this.move(options[i]) - 1;
        }
        
      }
    }else{
      return 0;
    } 
  }



}

class Map{
  
  constructor(data){
    this.grid = data;
    for(let k = 0; k < this.grid.length; k++){
      for(let i = 0; i < this.grid[k].length ; i++){

        this.grid[k][i] = this.grid[k][i].charCodeAt(0) - 96;
        if(this.grid[k][i] === -13){
          this.grid[k][i] = 0;
        }
        if(this.grid[k][i] === -27){
          this.grid[k][i] = 100;
        }
        
      }
    }
    //console.log(this.grid);
  }

  getStartPoint(){
    for(let i = 0; i < this.grid.length; i++){
      for(let k = 0; k < this.grid[i].length; k++){
        if(this.grid[i][k] == 0){
          return {x: k, y: i};
        }
      }
    }
  }
  getEndPoint(){
    for(let i = 0; i < this.grid.length; i++){
      for(let k = 0; k < this.grid[i].length; k++){
        if(this.grid[i][k] == 100){
          return {x: k, y: i};
        }
      }
    }
  }
  getCurElevation(pos){
    if(pos.x >= 0 && pos.y >= 0){
      if(this.grid[pos.y][pos.x] != undefined){
        return this.grid[pos.y][pos.x]
      }
    }else{
      return undefined;
    }
    
  }

  getPosibleMoves(pos){
    let moveOptions = [];
    const elevation = this.getCurElevation(pos);
    const up = {x:pos.x, y:pos.y-1};
    const down = {x:pos.x, y:pos.y+1};
    const left = {x:pos.x + 1, y:pos.y};
    const right = {x:pos.x - 1, y:pos.y};
    if((this.getCurElevation(up) == elevation + 1 ||this.getCurElevation(up) == elevation - 1 ) && this.getCurElevation(up) != undefined){
      moveOptions.push(up);
    }
    if((this.getCurElevation(down) == elevation + 1 ||this.getCurElevation(down) == elevation - 1) && this.getCurElevation(down) != undefined){
      moveOptions.push(down);
    }
    if((this.getCurElevation(left) == elevation + 1 ||this.getCurElevation(left) == elevation - 1) && this.getCurElevation(left) != undefined ){
      moveOptions.push(left);
    }
    if((this.getCurElevation(right) == elevation + 1 ||this.getCurElevation(right) == elevation - 1 ) && this.getCurElevation(right) != undefined){
      moveOptions.push(right);
    }
    console.log(moveOptions);
    return moveOptions;
  }

}



init();