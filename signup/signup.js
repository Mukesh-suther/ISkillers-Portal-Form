function signin() {
  var username = document.getElementById("name");
  var Fname = document.getElementById("fname");
  var Email = document.getElementById("email");
  var Password = document.getElementById("password");
  var cnic = document.getElementById("cnic");
  var mobileno = document.getElementById("mobileno");
  var courses = document.getElementById("courses");
  var message = document.getElementById("signupmessage");
  var selectedcourse = courses.options[courses.selectedIndex];
  //gender
  var gender = document.getElementsByName("gender");
  for (var i = 0; i < gender.length; i++) {
    if (gender[i].checked) {
      var gendervalue = gender[i].value;
    }
  }
  //qualification
  var selectqualification = document.getElementsByName("Qualification");
  for (var i = 0; selectqualification[i]; i++) {
    if (selectqualification[i].checked) {
      var Qualification = selectqualification[i].value;
    }
  }
  var ary = {
    USERNAME: username.value,
    FATHERNAME: Fname.value,
    EMAIL: Email.value,
    PASSWORD: Password.value,
    CNIC: cnic.value,
    MOBILENO: mobileno.value,
    COURSES: selectedcourse.value,
    GENDER: gendervalue,
    QUALIFICATON: Qualification,
  };
  //conditions
  if (username.value === "") {
    setTimeout(() => {
      message.innerHTML = "Please Enter Your Name";
      message.style.color = "red";
    }, 2000);
  } else if (Fname.value === "") {
    setTimeout(() => {
      message.innerHTML = "Please Enter Your Father's Name";
      message.style.color = "red";
    }, 2000);
  } else if (Email.value === "") {
    setTimeout(() => {
      message.innerHTML = "Please Enter Your Email";
      message.style.color = "red";
    }, 2000);
  } else if (Password.value === "") {
    setTimeout(() => {
      message.innerHTML = "Please Enter Your Password";
      message.style.color = "red";
    }, 2000);
  } else if (cnic.value === "") {
    setTimeout(() => {
      message.innerHTML = "Please Enter Your CNIC";
      message.style.color = "red";
    }, 2000);
  } else if (mobileno.value === "") {
    setTimeout(() => {
      message.innerHTML = "Please Enter Your Mobile No.";
      message.style.color = "red";
    }, timeout);
  } else if (selectedcourse.value === "") {
    setTimeout(() => {
      message.innerHTML = "Please Select Your Course";
      message.style.color = "red";
    }, 2000);
  } else if (gendervalue === undefined) {
    setTimeout(() => {
      message.innerHTML = "Please Select Your Gender";
      message.style.color = "red";
    }, 2000);
  } else if (Qualification === undefined) {
    setTimeout(() => {
      message.innerHTML = "Please Select Your Qualification";
      message.style.color = "red";
    }, timeout);
  } else {
    //signup
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
      .createUserWithEmailAndPassword(ary.EMAIL, ary.PASSWORD)
      .then((user) => {
        //database
        function writeUserData() {
          var userId = firebase.auth().currentUser.uid;
          firebase.database().ref("users/" + userId).set({
            ary
          });
        }
        writeUserData();
        firebase
          .auth()
          .currentUser.sendEmailVerification()
          .then(() => {
            setInterval(() => {
              window.location.assign("./emailverification.html");
            }, 2000);
          });
        message.innerHTML = "Successful Login";
        message.style.color = "green";
      })
      .catch((error) => {
        message.innerHTML = error.message;
        message.style.color = "red";
        console.log(error);
      });
  }
  return false;
}
