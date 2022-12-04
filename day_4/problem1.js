const fs = require('node:fs/promises');

async function getSections(){
  let total = 0;
  const sections = []
  const file = await fs.open('sections.txt');
  for await (const line of file.readLines()){
    const pair = line.split(/,|-/);
    sections.push(pair);
  }
  for(let s of sections){
    if(parseInt(s[0]) >= parseInt(s[2]) && parseInt(s[1]) <= parseInt(s[3])){
      total += 1;
    }
    else if(parseInt(s[2]) >= parseInt(s[0]) && parseInt(s[3]) <= parseInt(s[1])){
      total += 1;
    }
  }
  console.log(total);
}

getSections();