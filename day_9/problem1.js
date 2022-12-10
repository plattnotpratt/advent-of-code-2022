const fs = require('node:fs/promises');

async function readInput(){
  const data = [];
  const file = await fs.open('input.txt');
  for await (let line of file.readLines()){
    data.push( line.split(' '));
  }
  //console.log(data.length)
  return data;
}

async function init(){
  const data = await readInput();
  // console.log(data);
  
  const grid = new Grid(1000, 1000);
  const head = new Head(500, 500, grid);
  head.runInstructions(data);
  //console.log(head.grid.cells);
  console.log(head.grid.totalTouched());
}

class Head{
  constructor(x, y, grid){
    this.tail = {
      x, y,
    }
    this.grid = grid;
    this.x = x;
    this.y = y;
  }

  runInstructions(data){
    
    this.grid.flipXY(this.tail.x, this.tail.y);
    for(let d of data){
      //console.log("ranInstruction");
      if(d[0] == 'U'){
        this.moveUp(parseInt(d[1]));
      }else if(d[0] == 'D'){
        this.moveDown(parseInt(d[1]));
      }else if(d[0] == 'L'){
        this.moveLeft(parseInt(d[1]));
      }else if(d[0] == 'R'){
        this.moveRight(parseInt(d[1]));
      }else{
        //do nothing
      }
      
    }
  }


  moveUp(count){
    for(let i = 1; i <= count; i++){
      this.y --;
      this.evaluateTail('U');
      this.grid.flipXY(this.tail.x, this.tail.y);
    }
  }
  moveDown(count){
    for(let i = 1; i <= count; i++){
      this.y ++;
      this.evaluateTail('D');
      this.grid.flipXY(this.tail.x, this.tail.y);
    }
  }
  moveLeft(count){
    for(let i = 1; i <= count; i++){
      this.x --;
      this.evaluateTail('L');
      this.grid.flipXY(this.tail.x, this.tail.y);
    }
  }
  moveRight(count){
    for(let i = 1; i <= count; i++){
      this.x ++;
      this.evaluateTail('R');
      this.grid.flipXY(this.tail.x, this.tail.y);
    }
  }
  evaluateTail(headDir){
    //console.log(this.x, this.y);

    switch (headDir) {
      case 'U':
        if(this.y+2 == this.tail.y){
          if(this.x == this.tail.x){
            this.tail.y --;
          } 
          else if(this.x-1 == this.tail.x){
            this.tail.x += 1;
            this.tail.y -= 1;
          }
          else if(this.x+1 == this.tail.x){
            this.tail.x -= 1;
            this.tail.y -= 1;
          }
        }
        
      
        break;
      case 'D':
        if(this.y-2 == this.tail.y){
          
          if(this.x == this.tail.x){
            this.tail.y ++;
          } 
          else if(this.x-1 == this.tail.x){
            
            this.tail.x += 1;
            this.tail.y += 1;
          }
          else if(this.x+1 == this.tail.x){
            this.tail.x -= 1;
            this.tail.y += 1;
          }
        }
        break;
      case 'L':
        if(this.x + 2 == this.tail.x && this.y == this.tail.y){
          this.tail.x --;
        }else if(this.x + 2 == this.tail.x){
          if(this.y - 1 == this.tail.y){
            this.tail.x -= 1;
            this.tail.y += 1;
          }else if(this.y + 1 == this.tail.y){
            this.tail.x -= 1;
            this.tail.y -= 1;
          }
        }
        break;
      case 'R':
        if(this.x-2 == this.tail.x && this.y == this.tail.y){
          this.tail.x ++;
        }else if(this.x - 2 == this.tail.x){
          if(this.y - 1 == this.tail.y){
            this.tail.x += 1;
            this.tail.y += 1;
          }else if(this.y + 1 == this.tail.y){
            this.tail.x += 1;
            this.tail.y -= 1;
          }
        }
        break;
      
      default:
        break;
    }
  }
}

class Grid{
  constructor(width, height){
    this.cells = [];
    this.height = height;
    this.width = width;
    for(let i = 0; i < height; i++){
      this.cells[i] = [];
      for(let k = 0; k < width; k++){
        this.cells[i][k] = false;
      }
    }
  }
  flipXY(x, y){
    this.cells[y][x] = true;
  }
  totalTouched(){
    let total = 0;
    for(let i = 0; i < this.cells.length ; i++){
      for(let k = 0; k < this.cells[i].length; k++){
        if(this.cells[i][k]){
          total ++;
        }
      }
    }
    return total;
  }
}

init();