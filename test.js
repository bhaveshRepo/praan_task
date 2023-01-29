const { dataParameter } = require("./controller/dataController");

let text = "21/03/19,09:01:46";

let [date, time] = text.split(",")
date = date.split('/')
time = time.split(":");
let valid_date = `20${date[0]}-${date[1]}-${date[2]},${time[0]}:${time[1]}:${time[2]}`
console.log(new Date(valid_date).toISOString())