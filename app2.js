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

  if (year === 2016 || year === 2021) {
    let value = null;

    if(prefectureDataMap.has(prefecture)){
      value = prefectureDataMap.get(prefecture);
    }else{
      value ={
        before: 0,
        after: 0,
        change: null
      };
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