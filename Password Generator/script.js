function generatePassword(value) {
  const char = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const spclChar = "#$%^&()@?/";
  const keys = `${char}${digits}${char.toUpperCase()}${spclChar}}`;

  let password = "";
  while (password.length !== value) {
    password += keys.charAt(Math.floor(Math.random() * (keys.length - 1) + 1));
  }
  return password;
}

const showPassword = () => {
  const passwordLength = parseInt(
    document.getElementById("password-length").value
  );
  document.getElementById("password-input").value =
    generatePassword(passwordLength);
  document.querySelector("button").textContent = " Get New Password";
};

document.getElementById("passwordBtn").addEventListener("click", showPassword);
