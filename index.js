'use strict';
//モジュールの読み込み
const fs = require('fs');
const readline = require('readline');

//readstreamを作成
const rs = fs.createReadStream('./popu-pref.csv');

//writestreamを作成
const ws = fs.createWriteStream('./output.csv');

//インターフェースの設定
const rl = readline.createInterface({
  //読み込みたいストリームの設定
  input: rs,
  //書き出したいストリームの設定
  output: ws,
});

//１行ずつ読み込む設定
rl.on('line', (lineString) => {
  //wsに１行ずつ書き込む
  ws.write(lineString + '¥n');
});

rl.on('close', () => {
  console.log("END!");
});


