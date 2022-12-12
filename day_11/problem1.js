

function init(){
  const monkeys = [
    new Monkey([66, 71, 94],'m',5,3),
    new Monkey([70],'a', 6, 17),
    new Monkey([62, 68, 56, 65, 94, 78], 'a', 5, 2),
    new Monkey([89, 94, 94, 67], 'a', 2, 19),
    new Monkey([71, 61, 73, 65, 98, 98, 63],'m',7,11),
    new Monkey([55, 62, 68, 61, 60], 'a',7, 5),
    new Monkey([93, 91, 69, 64, 72, 89, 50, 71], 'a', 1, 13),
    new Monkey([76, 50],'m', 'o', 7)
  ]  
  const testMonkeys = [
    new Monkey([79,98],'m',19,23),
    new Monkey([54, 65, 75, 74],'a',6 ,19),
    new Monkey([79, 60, 97],'m','o',13),
    new Monkey([74],'a',3,17),
  ];
  testMonkeys[0].setmt(testMonkeys[2]);
  testMonkeys[0].setmf(testMonkeys[3]);
  testMonkeys[1].setmt(testMonkeys[2]);
  testMonkeys[1].setmf(testMonkeys[0]);
  testMonkeys[2].setmt(testMonkeys[1]);
  testMonkeys[2].setmf(testMonkeys[3]);
  testMonkeys[3].setmt(testMonkeys[0]);
  testMonkeys[3].setmf(testMonkeys[1]);


  monkeys[0].setmt(monkeys[7]);
  monkeys[0].setmf(monkeys[4]);
  monkeys[1].setmt(monkeys[3]);
  monkeys[1].setmf(monkeys[0]);
  monkeys[2].setmt(monkeys[3]);
  monkeys[2].setmf(monkeys[1]);
  monkeys[3].setmt(monkeys[7]);
  monkeys[3].setmf(monkeys[0]);
  monkeys[4].setmt(monkeys[5]);
  monkeys[4].setmf(monkeys[6]);
  monkeys[5].setmt(monkeys[2]);
  monkeys[5].setmf(monkeys[1]);
  monkeys[6].setmt(monkeys[5]);
  monkeys[6].setmf(monkeys[2]);
  monkeys[7].setmt(monkeys[4]);
  monkeys[7].setmf(monkeys[6]);
  let count = 0;
  while(count != 20){
    round(monkeys);
    count ++;
  }
  for(let monkey of monkeys){
    console.log(monkey.timesInspected);
  }

}

function round(monkeys){
  for(let i = 0; i < monkeys.length; i++){
    monkeys[i].inspectAll();
  }
}



class Monkey{
  constructor(items, op, val, test){
    this.items = items;
    this.op = op;
    this.val = val
    this.test = test;
    this.monkeyT = null;
    this.monkeyF = null;
    this.timesInspected = 0;
  }

  mTest(item){
    if(item % this.test == 0){
      this.monkeyT.addItem(item);
    }else{
      this.monkeyF.addItem(item);
    }
  }

  inspectAll(){
    for(let i = 0; i < this.items.length; i){
      this.timesInspected ++;
      this.inspect(this.items.splice(0,1)[0]);

    }
  }
  inspect(item){
    if(this.op == 'a'){
      item = item + this.val;
    }else if(this.op == 'm'){
      if(this.val == 'o'){
        item *= item
      }else{
        item *= this.val;
      }
    }
    item = Math.floor(item / 3);
    this.mTest(item);
  }
  

  addItem(item){
    this.items.push(item);
  }
  
  setmt(monkey){
    this.monkeyT = monkey;
  }

  setmf(monkey){
    this.monkeyF = monkey;
  }


}
init();