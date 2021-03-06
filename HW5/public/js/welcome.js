// Register the callback to be fired every time auth state changes
var ref = new Firebase("https://burning-heat-9490.firebaseio.com/");
//ref.unauth();
ref.onAuth(authDataCallback);
function authDataCallback(authData) {
  if (authData) {
    Rollbar.debug("User " + authData.uid + " is logged in with " + authData.provider);

  } else {
    Rollbar.info("User is logged out");
    window.location.href = "../src/login.html";
  }
}

