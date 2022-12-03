const fs = require('node:fs/promises');

async function createCompartmentsArray(){
  const rucksacks = [];
  const file = await fs.open('compartments.txt');
  for await (const line of file.readLines()){
    const items = Array.from(line);
    const compartments = []
    const comp1 = [];
    const comp2 = [];
    for(let i = 0; i < items.length; i++){
      if(i <  Math.floor(items.length/2)){
        comp1.push(items[i]);
      }else{
        comp2.push(items[i]);
      }
    }
    compartments.push(comp1, comp2);
    rucksacks.push(compartments);
  }
  return rucksacks;
}

async function createDuplicatesArray(rsa){
  let listOfDuplicates = [];
  for(const r of rsa){
    const comp1 = [...new Set(r[0])];
    const comp2 = [...new Set(r[1])];
    //console.log(comp1, comp2);
    for(let i = 0; i < comp1.length; i++){
      for(let k = 0; k < comp2.length; k++){
        if(comp1[i] === comp2[k]){
          listOfDuplicates.push(comp1[i]);
        }
      }
    }
  }
  console.log(listOfDuplicates.length);
  return listOfDuplicates;
}

function isUpperCase(str) {
  return str === str.toUpperCase();
}


async function getPriority(da){
  let total = 0;
  const offsetLower = "a".charCodeAt(0);
  const offsetUpper = "A".charCodeAt(0);
  console.log("offset result:", "a".charCodeAt(0) - offsetLower);
  console.log(offsetUpper);
  for(let i = 0; i < da.length; i++){
    if(isUpperCase(da[i])){
      const val = da[i].charCodeAt(0) - offsetUpper + 27;
      total += val;

    }else{
      const val = da[i].charCodeAt(0) - offsetLower + 1;
      total += val;
      //console.log(val);
    }

  }
  return total;
}

async function init(){
  const rsa = await createCompartmentsArray();
  const da = await createDuplicatesArray(rsa);
  const priority = await getPriority(da);
  console.log(priority);
}

init();
