function generatePassword(userPwdLength) {
  const char = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const spclChar = "#$%^&()@?/";
  const keys = [char, digits, spclChar, char.toUpperCase()];

  let pwd = "";

  while (pwd.length < userPwdLength) {
    keys.forEach((key) => {
      if (pwd.length < userPwdLength) {
        pwd += key.charAt(Math.floor(Math.random() * (key.length - 1) + 1));
      }
    });
  }
  return pwd;
}

const showPassword = () => {
  const pwdLength = parseInt(document.getElementById("pwd-len").value);
  if (pwdLength !== 0) {
    document.getElementById("pwd-input").value = generatePassword(pwdLength);
    document.querySelector("button").textContent = " Generate New Password";
  } else {
    showPopPup("Please select length of your password !");
  }
};

const copyPassword = () => {
  let copiedPwd = document.getElementById("pwd-input");
  copiedPwd.select();
  if (copiedPwd.value) {
    navigator.clipboard.writeText(copiedPwd.value);
    showPopPup("Password Copied !");
  }
};

function showPopPup(msg) {
  let popUp = document.getElementById("pop-up");
  popUp.textContent = msg;
  popUp.style.transform = "translateX(-5px)";
  setTimeout(() => {
    popUp.style.transform = "translateX(500px)";
  }, 3000);
}

document.getElementById("pwdBtn").addEventListener("click", showPassword);
document.getElementById("pwd-input").addEventListener("click", copyPassword);
