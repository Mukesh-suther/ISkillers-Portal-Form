function login() {
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const message = document.getElementById("login-message");
  if (email.value === "") {
    message.innerHTML = "Please Enter Email Address";
    message.style.color = "red";
    message.focus();
  } else if (password.value === "") {
    message.innerHTML = "Please Enter Password";
    message.style.color = "red";
    message.focus();
  } else {
    message.innerHTML = "Successfully Login";
    message.style.color = "green";
    
    const firebaseConfig = {
      apiKey: "AIzaSyBZAvOPxfGkcPTrsUPDSlpbcYcZ9Xw8WiY",
      authDomain: "form-832f3.firebaseapp.com",
      databaseURL: "https://form-832f3-default-rtdb.firebaseio.com",
      projectId: "form-832f3",
      storageBucket: "form-832f3.appspot.com",
      messagingSenderId: "753860250113",
      appId: "1:753860250113:web:b9131b88fbd07927fa8e00",
      measurementId: "G-LNRPRL414F"
    };  
    firebase
      .initializeApp(firebaseConfig)
      .auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .then((resolve) => {
        message.innerHTML = "Successfully Login";
        message.style.color = "green";
        setInterval(() => {
          window.location.assign("./../homepage.html")
        }, 1000);
      })
      .catch((error) => {
        message.innerHTML = error.message;
        message.style.color = "red";
      });
  }
  return false;
}
