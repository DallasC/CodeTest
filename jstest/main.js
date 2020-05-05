

(function() {
   "use strict";
   const URL = "https://dog.ceo/api/breeds/image/random";
   const MAX_IMG = 12;
   const ERROR_MESSAGE_TIME = 5000;
   let timer = null;

   window.addEventListener("load", init);

   /**
    *  Initializes the web page by giving the buttons functionality
    */
   function init() {
      id("get-dog").addEventListener("click", addDog);
      id("clear").addEventListener("click", removeAll);
   }

   /**
    *  Gets a dog photo from Dog API and adds it to the page if getting the image was successful,
    *  sends error message otherwise
    */
   function addDog() {
      fetch(URL)
         .then(checkStatus)
         .then(JSON.parse)
         .then(addPic)
         .catch(errorMessage);
   }

   /**
    *  Adds given dog picture to the page
    *  @param {object} responseData - represents dog image to put on page
    */
   function addPic(responseData) {
      if (id("park").children.length < MAX_IMG) {
         let img = document.createElement("img");
         img.src = responseData.message;
         img.alt = "dog";
         img.classList.add("dog");
         id("park").appendChild(img);
         img.addEventListener("dblclick", removeDog);
      } else {
         alert("Max number of dogs reached. Reset or double-click a dog to get more!");
      }
   }

   /**
    *  Removes all dog images from the page
    */
   function removeAll() {
      id("park").innerHTML = "";
   }

   /**
    *  Removes dog image selected by the user
    */
   function removeDog() {
      this.remove();
   }

   /**
    *  Displays an error message if there is an error in the fetch call chain
    */
   function errorMessage() {
      let message = document.createElement("h2");
      message.id = "error";
      message.innerText = "Error getting dog photo :( Please try again later";
      id("park").appendChild(message);
      timer = setTimeout(removeMessage, ERROR_MESSAGE_TIME);
   }

   /**
    *  Removes the error message after a set time
    */
   function removeMessage() {
      id("park").removeChild(id("error"));
      clearTimeout(timer);
      timer = null;
   }

   /* ------------------------------ Helper Functions  ------------------------------ */
   // Note: You may use these in your code, but do remember that your code should not have
   // any functions defined that are unused.

   /**
    * Returns the element that has the ID attribute with the specified value.
    * @param {string} idName - element ID
    * @returns {object} DOM object associated with id.
    */
   function id(idName) {
     return document.getElementById(idName);
   }

   /**
    * Helper function to return the response's result text if successful, otherwise
    * returns the rejected Promise result with an error status and corresponding text
    * @param {object} response - response to check for success/error
    * @returns {object} - valid result text if response was successful, otherwise rejected
    *                     Promise result
    */
   function checkStatus(response) {
      if (response.status >= 200 && response.status < 300) {
        return response.text();
      } else {
        return Promise.reject(new Error(response.status + ": " + response.statusText));
      }
   }

})();
