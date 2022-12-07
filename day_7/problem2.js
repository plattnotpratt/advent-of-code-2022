const { dir } = require('node:console');
const fs = require('node:fs/promises');



async function readInput(){
  const data = [];
  const file = await fs.open('input.txt');
  for await (let line of file.readLines()){
    data.push( line.split(' '));
  }
  //console.log(data);
  return data;
}

async function init(){
  let totalSize = 0;
  const dirTrace = [];
  const data = await readInput();
  let dir = new Dir('/');
  const root = dir;
  for (let i = 1; i < data.length; i++){
    if(data[i][0] === '$'){
      if(data[i][1] === 'cd'){
        if(data[i][2] === '..'){
          dir = dir.getParentDir();
        }
        else{
          dir = dir.getChildDirWithName(data[i][2]);
        }
      }
    }
    else if(data[i][0] === 'dir'){
      dir.addChildDir(data[i][1]);
    }
    else{
      dir.addSize(parseInt(data[i][0]));
    }
  }
  function getAllDirectories(dir){
    for(let i = 0; i < dir.childDir.length; i++){
      getAllDirectories(dir.childDir[i]);
    }
    if(dir.size >= 6233734){
      dirTrace.push([dir.name, dir.size]);
    }
    
  }
  // console.log(totalSize);
  // console.log(root.size);
  getAllDirectories(root);
  console.log(dirTrace);
  //console.log(root);
}



class Dir{
  size = 0;
  name = "";
  childDir = [];
  parentDir = null;

  constructor(name) {
    this.name = name;
  }

  addChildDir(childDir){
    const cdir = new Dir(childDir);
    cdir.setParentDir(this);
    this.childDir.push(cdir);
  }

  setParentDir(dir){
    this.parentDir = dir;
  }

  addSize(size){
    this.size += size;
    if(this.parentDir != null){
      this.parentDir.addSize(size);
    }
  }

  getName(){
    return this.name;
  }

  getChildDirWithName(name){
    for(let i = 0; i < this.childDir.length; i++){
      if(this.childDir[i].getName() === name){
        return this.childDir[i];
      }
    }
  }

  getParentDir(){
    return this.parentDir;
  }
}

init();