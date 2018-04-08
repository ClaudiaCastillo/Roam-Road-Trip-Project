
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBFJfhRZXMnD2Vq-_X0WOKo7LZp5ZaFyoU",
    authDomain: "roam-1222d.firebaseapp.com",
    databaseURL: "https://roam-1222d.firebaseio.com",
    projectId: "roam-1222d",
    storageBucket: "roam-1222d.appspot.com",
    messagingSenderId: "662204217511"
  };
  firebase.initializeApp(config);


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      document.getElementById('user_div').style.display = 'initial';
      document.getElementById('login_div').style.display = 'none';
      document.getElementById('sendVerfication').style.display = 'none';
      document.getElementById('beginTripBtn').style.display = 'initial';

      var user = firebase.auth().currentUser;
    }

    if(user != null){

        var email_id = user.email;
        var email_verified = user.emailVerified;

        if(email_verified){
          document.getElementById('sendVerfication').style.display = 'none';
          document.getElementById('beginTripBtn').style.display = 'initial';
        } else{
          document.getElementById('sendVerfication').style.display = 'initial';
          document.getElementById('beginTripBtn').style.display = 'none';
        }

        document.getElementById('user_para').innerHTML = 'User : ' + email_id + '<br><br>Currently you email verification status is : ' + email_verified;
    } 

    else {
      // No user is signed in.
       document.getElementById('user_div').style.display = 'none';
      document.getElementById('login_div').style.display = 'initial';
      document.getElementById('beginTripBtn').style.display = 'none';

    }
});




$('#login').on('click', function(){
    var userEmail = document.getElementById('inputEmail').value;
    var userPassword = document.getElementById('inputPassword').value;

   firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...

      alert('Error : ' + errorMessage);

    });
});


$('#createAccount').on('click', function(){

    var userEmail = document.getElementById('inputEmail').value;
    var userPassword = document.getElementById('inputPassword').value;

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...

      alert('Error : ' + errorMessage);

    });

});

$('#sendVerfication').on('click', function(){

    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {

      $('#verifyMessage').html('<b class="welcome-brand-name">Check your email to verify your email address</b>')

      document.getElementById('beginTripBtn').style.display = 'initial';
      document.getElementById('sendVerfication').style.display = 'none';
      // Email sent.
      // alert('Verification Sent');

    }).catch(function(error) {
      // An error happened.

      alert('Error : ' + errorMessage);

    });

});

$('#signOut').on('click', function(){
  firebase.auth().signOut();
});

