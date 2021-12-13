const prompt = require("prompt-sync")();

const expres = require("express");

const app = expres();

//checks if a string contains only digits
function isOnlyNum(number)
{
    let isnum = /^\d+$/.test(number);
    if(isnum)
        return true;
    else
        return false;   
}


//ask for altitude if not between 0 to 3000
let altitude = prompt("Please Enter Altitude: ");

while (altitude > 3000 || altitude < 0 || altitude == null || altitude.trim() == "" || !isOnlyNum(altitude)) {
  console.log("try again...");
  altitude = prompt("Please Enter Altitude: ");
}
//ask for HIS if not between 0 to 360
let HIS = prompt("Please Enter HIS: ");
while (HIS > 360 || HIS < 0 || HIS == null || HIS.trim() == "" || !isOnlyNum(HIS)) {
  console.log("try again...");
  HIS = prompt("Please Enter HIS: ");
}
//ask for altitude if not between -100 to 100
let ADI = prompt("Please Enter ADI: ");
while (ADI < -100 || ADI > 100 || ADI == null || ADI.trim() == "" || !isOnlyNum(ADI)) {
  console.log("try again...");
  ADI = prompt("Please Enter ADI: ");
}

// console.log('Press any key to exit');
// process.stdin.setRawMode(true);
// process.stdin.resume();
// process.stdin.on('data', process.exit.bind(process, 0));

app.listen(3000, () => {
console.log("Server Liensing");
});
