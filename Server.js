// Import dependencies
const prompt = require("prompt-sync")();

const express = require("express");
const app = express();
const http = require("http").createServer(app);
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const port = 4001;

let altitude, HIS, ADI;

http.listen(port, function () {
  console.log("server started...listening at 4001  ");
  socketIO.on("connection", function (socket) {
    console.log("user connected: " + socket.id);
    altitude = prompt("Please Enter Altitude: ");
    while (
      altitude > 3000 ||
      altitude < 0 ||
      altitude == null ||
      altitude.trim() == "" ||
      isNaN(altitude)
    ) {
      console.log("try again...");
      altitude = prompt("Please Enter Altitude: ");
    }
    //ask for HIS if not between 0 to 360
    HIS = prompt("Please Enter HIS: ");
    while (
      HIS > 360 ||
      HIS < 0 ||
      HIS == null ||
      HIS.trim() == "" ||
      isNaN(HIS)
    ) {
      console.log("try again...");
      HIS = prompt("Please Enter HIS: ");
    }
    //ask for altitude if not between -100 to 100
    ADI = prompt("Please Enter ADI: ");
    while (
      ADI < -100 ||
      ADI > 100 ||
      ADI == null ||
      ADI.trim() == "" ||
      isNaN(ADI)
    ) {
      console.log("try again...");
      ADI = prompt("Please Enter ADI: ");
    }

    let dataObj = { altitude: altitude, his: HIS, adi: ADI };

    // let dataArray = [altitude,HIS,ADI];

    //להוסיף כאן לחיצה לשליחה
    console.log("Sending values => " + dataObj);
    socket.emit("SEND_OBJECT", dataObj);
    // socket.json.send(dataObj);

    socketIO.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
});

// console.log('Press any key to exit');
// process.stdin.setRawMode(true);
// process.stdin.resume();
// process.stdin.on('data', process.exit.bind(process, 0));
