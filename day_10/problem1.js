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
  instructionCount = 0;
  let cycle = 1;
  let flag = false;
  const test = []
  const data = await readInput();
  while(cycle != 240){
    if(cycle == 20 || cycle == 60 || cycle == 100 || cycle == 140 || cycle == 180 || cycle == 220){
      test.push(x * cycle);
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
  let testTotal = 0
  console.log(test);
  for(let i =0; i < test.length; i++){
    testTotal += test[i];
  }
  console.log(testTotal);
}

init();