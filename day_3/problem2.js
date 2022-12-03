const fs = require('node:fs/promises');

async function createBadgeArray(){
  const file = await fs.open('compartments.txt');
  const rucksacsArray =[];
  const badgeArray = []
  for await (const line of file.readLines()){
    const items = Array.from(line);
    rucksacsArray.push(items);
  }
  const bop = [];
  for(let i = 0; i < rucksacsArray.length; i+= 3){
    let flag = false;
    const bop1 = [... new Set(rucksacsArray[i])];
    const bop2 = [... new Set(rucksacsArray[i+1])];
    const bop3 = [... new Set(rucksacsArray[i+2])];
    for(let b1 = 0; b1 < bop1.length; b1++){
      for(let b2 = 0; b2 < bop2.length; b2++){
        for(let b3 = 0; b3 < bop3.length; b3++ ){
          if(bop1[b1] === bop2[b2] && bop2[b2] == bop3[b3]){
            bop.push(bop1[b1]);
            flag = true;
            break;
          }
        }
        if(flag){
          break;
        }
      }
      if(flag){
        break;
      }
    }
  }
  return bop;
  //return await getPriority(badgeArray);
}





function isUpperCase(str) {
  return str === str.toUpperCase();
}


async function getPriority(da){
  let total = 0;
  const offsetLower = "a".charCodeAt(0);
  const offsetUpper = "A".charCodeAt(0);
  for(let i = 0; i < da.length; i++){
    if(isUpperCase(da[i])){
      const val = da[i].charCodeAt(0) - offsetUpper + 27;
      total += val;

    }else{
      const val = da[i].charCodeAt(0) - offsetLower + 1;
      total += val;
    }

  }
  return total;
}

async function init(){
  // const rsa = await createCompartmentsArray();
  // const da = await createDuplicatesArray(rsa);
  const da = await createBadgeArray();
  const priority = await getPriority(da);
  console.log(priority);
}

init(); 
