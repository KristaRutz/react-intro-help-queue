import React from "react";
import firebase, { firestore } from "firebase/app";

function SignIn() {
  function doSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function () {
        console.log("successfully signed up!");
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }
  function doSignIn(event) {
    event.preventDefault();
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function () {
        console.log("Successfully sign in!");
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }
  function doSignOut() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        console.log("successfully signed out!");
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }
  return (
    <React.Fragment>
      <h1>Sign Un</h1>
      <form onSubmit={doSignUp}>
        <input type="text" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <button type="submit">Sign Up</button>
      </form>
      <hr />
      <h1>Sign In </h1>
      <form onSubmit={doSignIn}>
        <input type="text" name="signinEmail" placeholder="email" />
        <input type="password" name="signinPassword" placeholder="password" />
        <button type="submit">Sign In</button>
      </form>
      <hr />
      <h1>Sign Out</h1>
      <button onClick={doSignOut}>Sign out</button>
    </React.Fragment>
  );
}

export default SignIn;
