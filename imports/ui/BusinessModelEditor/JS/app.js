
(function() {

// Initialize Firebase
   var config = {
    apiKey: "AIzaSyBHDFRxjj9egOb-f3vxCytGNeomdsArvoM",
    authDomain: "editor-auth.firebaseapp.com",
    databaseURL: "https://editor-auth.firebaseio.com",
    projectId: "editor-auth",
    storageBucket: "editor-auth.appspot.com",
    messagingSenderId: "68595870554"
  };
  firebase.initializeApp(config);

  //Get elements

  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignUp = document.getElementById('btnSignUp');

  
// Add login event

btnLogin.addEventListener('click',e=>{

//Get email and pass


const email = txtEmail.value;
const pass = txtPassword.value;
const auth = firebase.auth();

// Sing in

const promise = auth.signInWithEmailAndPassword(email,pass);
console.log(promise);
promise.catch(e=>console.log(e.message));


});

btnSignUp.addEventListener('click',e=>{

const email = txtEmail.value;
const pass = txtPassword.value;
const auth= firebase.auth();

// Sign In

const promise = auth.createUserWithEmailAndPassword(email,pass);
promise.catch(e=> console.log(e.message));



});
//LogOut


//add realtimer listener
firebase.auth().onAuthStateChanged(firebaseUser=>{

if(firebaseUser){

window.location = 'Editor.html';
}
else{
  console.log('not logged in');
}
});



}());


