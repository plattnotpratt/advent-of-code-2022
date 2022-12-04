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
    const a = parseInt(s[0]);
    const b = parseInt(s[1]);
    const c = parseInt(s[2]);
    const d = parseInt(s[3]);
    if(a <= c && b >= c){
      total += 1;
    }else if(b >= d && a <= d){
      total += 1;
    }else if(a >= c && b <= d){
      total += 1;
    }else if(c >= a && d <= b){
      total += 1;
    }
  }
  console.log(total);
  //console.log(sections.length);
}

getSections();