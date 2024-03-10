'use strict';
const fs = require('node:fs');
const readline = require('node:readline');
const rs = fs.createReadStream('./popu-pref.csv');
const rl = readline.createInterface({ input:rs});
const prefectureDataMap = new Map();
rl.on('line', lineString => {
  const columns = lineString.split(',');
  const year = parseInt(columns[0]);
  const prefecture = columns[1];
  const popu = parseInt(columns[3]);

console.log('hello4');
console.log(prefectureDataMap)
console.log('hello5');

  if (year === 2016 || year === 2021) 
  {
    console.log(prefectureDataMap);
    let value = null;
    console.log('Hello1');
    console.log(value); //null
    console.log(prefectureDataMap);// Map(0) {}
    console.log(prefecture);//北海道 

    if(prefectureDataMap.has(prefecture)) 

    {
      value = prefectureDataMap.get(prefecture);
      console.log('Hello6');
      console.log(value);

    }
    
    else
    
    {
      value =
      {
        before: 0,
        after: 0,
        change: null
      };
      console.log('Hello3');
        console.log(value); // { before: 0, after: 0, change: null }
        console.log(prefecture); // 北海道
        console.log(prefectureDataMap);// Map(0) {}
    }
    if (year === 2016) {
      value.before = popu;
    }
    if (year === 2021) {
      value.after = popu;
    }
    prefectureDataMap.set(prefecture, value);
  }
});
rl.on('close', () => {
  console.log(prefectureDataMap);
});