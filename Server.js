// Import dependencies
const prompt = require("prompt-sync")();
const express = require("express");
const { emitKeypressEvents } = require("readline");
const app = express();
const http = require("http").createServer(app);

//corsטיפול בשגיאות שנזרקות מה
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const port = 4001;

let altitude, HIS, ADI;
//הקמת שרת והאזנה לפורט 4001
http.listen(port, function () {
  console.log("Server is UP...");
  socketIO.on("connection", function (socket) {
    // קלט גובה מהמשתמש בטווח של 0 ל 3000
    altitude = prompt("Please Enter Altitude: ");
    //בדיקת תקינות הקלט
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
    //קלט כיוון בטווח של 0 ל360
    HIS = prompt("Please Enter HIS: ");
    //בדיקת תקינות קלט
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
    //קלט זווית האופק
    ADI = prompt("Please Enter ADI: ");
    //בדיקת תקינות הקלט
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

    //שמירת הערכים מהקונסול לתוך אובייקט שישלח ללקוח כפורמט של מפתח-ערך
    let dataObj = { altitude: altitude, his: HIS, adi: ADI };

    //להוסיף כאן לחיצה לשליחה
    console.log("Sending values...");
    socket.emit("SEND_OBJECT", dataObj);
  });
});
