const fs = require('node:fs/promises');

let most_kcal = 0;
async function get_totals_list(){
  const calList = [];
  const file = await fs.open('calories.txt');
  let cal = 0;
  for await (const line of file.readLines()){
    //console.log(parseInt(line));

    if(isNaN(parseInt(line))){
      console.log("new line:", cal);
      calList.push(cal);
      cal = 0;
    }else{
      cal += parseInt(line);
    }
  }
  let maxCal = 0;
  for(const cal of calList){
    if(cal > maxCal){
      maxCal = cal;
    }
    
  }
  console.log(maxCal);
}
get_totals_list();


