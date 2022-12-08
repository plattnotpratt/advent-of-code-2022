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
  let visibleCount = 0;
  for(let i = 0; i < data.length; i++){
    for(let k = 0; k < data[i].length; k++){
      
      if(data[i][k].isVisible(k, i, data)){
        visibleCount++;
      }
    }
  }
  console.log(visibleCount);
}

init();

class Tree{
  
  constructor(height, x, y){
    this.height = parseInt(height);
    this.x = x;
    this.y = y;
    this.visible = [true, true, true, true, true];
  }

  isVisible(x, y, data){
    if(x == 0 || y == 0 || x == data[y].length-1 || y == data.length-1){
      //Edge
      this.visible[0] = true;
    }else{
      this.visible[0] = false;
      this.checkNorth(data);
      this.checkEast(data);
      this.checkSouth(data);
      this.checkWest(data);
    }
    
    console.log(this.visible, this.height, this.x, this.y);

    for(let v of this.visible){
      if(v == true){
        return true;
      }
    }
    return false;
  }
  checkNorth(data){
    for(let i = this.y-1; i >= 0; i--){
      if(data[i][this.x].height >= this.height){
        this.visible[1] = false;
        break;
      }
    }
  }
  checkEast(data){
    for(let i = this.x+1; i < data[this.y].length; i++){
      if(data[this.y][i].height >= this.height){
        this.visible[2] = false;
        break;
      }
    }
  }
  checkSouth(data){
    for(let i = this.y+1; i < data.length; i++){
      if(data[i][this.x].height >= this.height){
        this.visible[3] = false;
        break;
      }
    }
  }
  checkWest(data){
    for(let i = this.x-1; i >= 0; i--){
      if(data[this.y][i].height >= this.height){
        this.visible[4] = false;
        break;
      }
    }
  }
  

}