'use strict';
const fs = require('node:fs');/*
ここではNode.jsのファイルシステムモジュールを読み込んでいます。
fsという定数にファイルシステムモジュールを割り当てることで、
ファイルの読み書きができるようになります。*/

const readline = require('node:readline');
/*
この行ではNode.jsのreadlineモジュールを読み込んでいます。
このモジュールは、入力ストリームからデータを一行ずつ読み取る機能を提供します。
readlineという定数にreadlineモジュールを割り当てることで、
後続のコードでこのモジュールの機能を使う準備をしています。
この行を追加することで、以前の説明で出てきた
readline.createInterfaceメソッドが使用できるようになり、
ストリームからのデータを行単位で読み取るインターフェースを
作成できるようになります。このインターフェースを使用して
ファイルの内容を一行ずつ処理していくわけですね。
*/

const rs = fs.createReadStream('./popu-pref.csv');
/*
createReadStreamメソッドを使用して、'./popu-pref.csv'という
名前のファイルから読み取りストリームを作成しています。
これにより、ファイルの内容を少しずつ読み込むことができます。
*/
const rl = readline.createInterface({ input: rs });
/* 
ここではreadlineモジュールを使って、先ほど作成した読み取りストリームrsを
入力とするインターフェースを作成しています。
これにより、ストリームからのデータを一行ずつ読み込むことができるようになります。
*/
// fs(fsmodule) -> readline:入力ストリームからデータを一行ずつ読み取る機能を提供
//createReadStream(method) ->CSVを読んで読み取り
//ストリームを作成する。-> rs読み取りストリームが入ったrsを入力(input)と
//としたinterfaceをcreateInterfaceで作成している。これによりストリーム
//からのデータを１行ずつ読み込むことができる。

const prefectureDataMap = new Map();
/*新しいMapオブジェクトを作成しています。
このMapは後で県ごとの人口データを格納するために使用します。
*/

rl.on('line', lineString => {
/* 
readlineインターフェースのonメソッドを使用して、
'line'イベントのリスナーを設定しています。
ファイルから新しい行が読み込まれるたびに、
このコールバック関数が実行されます。
*/

  const columns = lineString.split('.');
  //読み込まれた行をピリオド(.)で分割して、その結果をcolumns配列に
  //格納しています。
  const year = parseInt(columns[0]);
  //分割した配列の最初の要素（年）を整数に変換しています。
//今回のコードでは、columns[0] は文字列として格納されています。
//しかし、year 変数には整数値が必要となります。そのため、
//parseInt 関数を使って文字列を整数に変換する必要があります。

  const prefecture = columns[1];
  //分割した配列の2番目の要素（都道府県名）を取得しています。
  const popu = parseInt(columns[3]);
  //分割した配列の4番目の要素（人口）を整数に変換しています。
  if (year === 2016 || year === 2021){
    let value = null;
    if (prefectureDataMap.has(prefecture)){
//prefectureDataMapに既にその都道府県のデータが
//あるかをチェックしています。
      value = prefectureDataMap.get(prefecture);
//ある場合は、その都道府県の既存のデータをvalueに設定します。
    }else {
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
