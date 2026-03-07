console.log('hi allah pls help meeee');
document.getElementById('sign-btn').addEventListener('click', function () {
  // get the username input
  // 02 get the password
  // 03match pin and mobile number
  // 3.1 true::--->alert-->home page 
  // 3.2 false::--->alert-->return 
  const inputName = document.getElementById('input-name');
  const userName = inputName.value.toLowerCase();
  console.log(userName);

  // input password
  const inputPassword = document.getElementById("input-password");
  const adminPassword = inputPassword.value.toLowerCase();
  console.log(adminPassword);

  if (userName == "admin" && adminPassword == "admin123") {
    alert("Log in Successfull")
  } else {
    alert("Log in Failed");
    return;
  }

});
