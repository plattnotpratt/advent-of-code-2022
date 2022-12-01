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
  let maxCal1 = 0;
  let maxCal2 = 0;
  let maxCal3 = 0;
  for(const cal of calList){
    if(cal > maxCal1){
      maxCal3 = maxCal2;
      maxCal2 = maxCal1
      maxCal1 = cal;
      
    }else if(cal > maxCal2){
      maxCal3 = maxCal2;
      maxCal2 = cal;
    }else if(cal > maxCal3){
      maxCal3 = cal;
    }
  }
  maxCal = maxCal1 + maxCal2 + maxCal3;
  console.log(maxCal);
}
get_totals_list();


