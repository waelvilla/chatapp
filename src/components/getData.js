import React from "react";

class getData {
  sendData(data) {}
  getData() {
    let myData = [];
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        let json = JSON.parse(req.responseText);
        myData.push(json);
        return myData;
      }
    };
    req.open("GET", "https://api.jsonbin.io/b/5ba21bdd1bf1ca33b06dcbfe", true);
    req.setRequestHeader(
      "secret-key",
      "$2a$10$5tY3ZYkn6peumLUskAdx8OqEaOjhOCK6Fg0fE/BoLqecNj7DjnhMK"
    );
    req.send();
  }
}

export default getData;
