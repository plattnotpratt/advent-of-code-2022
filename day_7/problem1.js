const fs = require('node:fs/promises');



async function readInput(){
  const data = [];
  const file = await fs.open('input.txt');
  for await (let line of file.readLines()){
    data.push( line.split(' '));
  }
  return data;
}

async function init(){
  let totalSize = 0;
  const data = await readInput();
  const dir = new Directory('/');
  const root = dir;
  for (let i = 1; i < data.length; i++){
    if(data[i][0] === '$'){
      if(data[i][1] === 'cd'){
        if(data[i][2] === '..'){
          if(dir.size <= 100000){
            totalSize += dir.size;
          }
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
  console.log(totalSize);
}



class Directory{
  size = 0;
  name = "";
  childDir = [];
  parentDir = null;

  constructor(name) {
    this.name = name;
  }

  /**
   * Function addChildDir(childDir)
   * @param {Directory} childDir 
   * Adds a child directory to the child directory array.
   * Sets the new child directories parent directory to the current
   * directory.
   */
  addChildDir(childDir){
    const cdir = new Directory(childDir);
    cdir.setParentDir(this);
    this.childDir.push(cdir);
  }

  /**
   * Function setParentDir(dir)
   * @param {Directory} dir 
   * Takes a directory and sets it to the current directories parent
   * directory.
   */
  setParentDir(dir){
    this.parentDir = dir;
  }

  /**
   * Funciton addSize()
   * @param {number} size 
   * if there is a file the size is added to the current directory 
   * and all parent directories recursively.
   */
  addSize(size){
    this.size += size;
    if(this.parentDir != null){
      this.parentDir.addSize(size);
    }
  }

  /**
   * function getName()
   * @returns {string}
   * returns the name of the directory.
   */
  getName(){
    return this.name;
  }

  /**
   * Function getChildDirWithName(name)
   * @param {string} name 
   * @returns {Directory}
   * finds a child dir within the current directory with a
   * given name and return it as reference.
   */
  getChildDirWithName(name){
    for(let i = 0; i < this.childDir.length; i++){
      if(this.childDir[i].getName() === name){
        return this.childDir[i];
      }
    }
  }

  /**
   * Function getParentDir()
   * @returns {string | null}
   * returns a reference to the parent directory of the current directory
   * returns null if parent directory doesn't exist.
   */ 
  getParentDir(){
    return this.parentDir;
  }
}

init();