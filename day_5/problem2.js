const fs = require('node:fs/promises');

const stacks = [
  ['R','N','F','V','L','J','S','M'],
  ['P','N','D','Z','F','J','W','H'],
  ['W','R','C','D','G'],
  ['N','B','S'],
  ['M','Z','W','P','C','B','F','N'],
  ['P','R','M','W'],
  ['R','T','N','G','L','S','W'],
  ['Q','T','H','F','N','B','V'],
  ['L','M','H','Z','N','F'],
]
const instructions = createInstructions();

async function createInstructions(){
  const instructions = []
  const file = await fs.open('movement.txt');
  for await (let line of file.readLines()){
    line = line.substring(5);
    line = line.split(/ from | to /);
    line[0] = parseInt(line[0]);
    line[1] = parseInt(line[1]);
    line[2] = parseInt(line[2]);
    instructions.push(line);
  }
  return instructions;
}


function move(instruction, stacks){
  const temp = [];
  for(let i = 0; i < instruction[0]; i++){
    const item =stacks[instruction[1]-1].pop();
    temp.push(item);
  }
  //console.log("TEMP: ",temp);
  for(let i = 0; i < instruction[0]; i++){
    stacks[instruction[2]-1].push(temp.pop());
    //console.log(stacks[instruction[2]-1]);

  }
  //console.log("STACK: ",stacks[instruction[2]-1]);
}

async function init(){
  const stacks = [
    ['R','N','F','V','L','J','S','M'],
    ['P','N','D','Z','F','J','W','H'],
    ['W','R','C','D','G'],
    ['N','B','S'],
    ['M','Z','W','P','C','B','F','N'],
    ['P','R','M','W'],
    ['R','T','N','G','L','S','W'],
    ['Q','T','H','F','N','B','V'],
    ['L','M','H','Z','N','F'],
  ]
  const instructions = await createInstructions();

  for(let i = 0; i < instructions.length; i++){
    move(instructions[i], stacks);
  }
  let result = "";
  for(let i =0; i < stacks.length; i++){
    result += stacks[i].pop();
  }
  console.log(result);
}

init();