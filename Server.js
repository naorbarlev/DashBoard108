// Import dependencies
const prompt = require("prompt-sync")();
const express = require("express");
const { emitKeypressEvents } = require("readline");
const app = express();
const http = require("http").createServer(app);
const pressAnyKey = require("press-any-key");

//corsטיפול בשגיאות שנזרקות מה
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const port = 4001;

let altitude, HSI, ADI;
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
    HSI = prompt("Please Enter HSI: ");
    //בדיקת תקינות קלט
    while (
      HSI > 360 ||
      HSI < 0 ||
      HSI == null ||
      HSI.trim() == "" ||
      isNaN(HSI)
    ) {
      console.log("try again...");
      HSI = prompt("Please Enter HSI: ");
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
    let dataObj = { altitude: altitude, hsi: HSI, adi: ADI };

    //פונקציית לחיצה על מקש לשליחה
    pressAnyKey("Press any key to resolve, or CTRL+C to reject", {
      ctrlC: "reject",
    }).then(() => {
      console.log("Sending values...");
      socket.emit("SEND_OBJECT", dataObj);
    });
  });
});
