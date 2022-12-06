const fs = require('node:fs/promises');


async function getData(){
  let data;
  const file = await fs.open('data.txt');
  for await (let line of file.readLines()){
    data = Array.from(line);
  }
  return data;
}


async function init(){
  let data = await getData();
  for(let i = 0; i < data.length; i++){
    const s = new Set(data.slice(i, i+4));
    const a = Array.from(s);
    if(a.length === 4){
      console.log(i + 4);
      break;
    }
  }
}

init();