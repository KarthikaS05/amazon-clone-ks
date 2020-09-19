import axios from "axios";

const instance = axios.create({
  //the API (cloud function) URL
  baseURL: "https://us-central1-clone-ks-d479a.cloudfunctions.net/api",
  //"http://localhost:5001/clone-ks-d479a/us-central1/api", //local API end point url from functions index.js
  //'...' give this when we dont have an API url at begining, but we dont have one now; no functions
});

export default instance;
