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
  let x = 1;
  let instructionCount = 0;
  let output = "";
  let cycle = 0;
  let flag = false;
  const data = await readInput();
  while(cycle != 240){
    if(cycle % 40 == 0){
      output += '\n';
    }
    //console.log(x, cycle );
    if(x - 1 <= cycle % 40 && x + 1 >= cycle % 40){
      output += '#';
    }else{
      output += '.';
    }
    if(data[instructionCount][0] == 'noop'){
      instructionCount ++;
    }
    else if(data[instructionCount][0] == 'addx'){
      if(flag){
        x += parseInt(data[instructionCount][1]);
        instructionCount ++;
        flag = false;
      }else{
        flag = true;
      }
    }
    cycle ++;
  }
  console.log(output);
}

init();