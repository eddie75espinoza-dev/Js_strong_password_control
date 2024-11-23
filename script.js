const input = document.querySelector("input#password"); // Selector del campo de contraseña
const inputIcon = document.querySelector(".input_icon"); // Selector del ícono de ojo
const passwordStrength = document.querySelector(".progress-bar"); // Selector de la barra de progreso
const submitButton = document.querySelector("#submitButton"); // Selector del botón de enviar

// Evento para alternar visibilidad de la contraseña
inputIcon.addEventListener("click", (e) => {
  e.preventDefault();
  inputIcon.setAttribute(
    "src",
    input.getAttribute("type") === "password" ? "assets/eye-off.svg" : "assets/eye.svg"
  );
  input.setAttribute(
    "type",
    input.getAttribute("type") === "password" ? "text" : "password"
  );
});

// Evento para verificar la fuerza de la contraseña
input.addEventListener("keyup", function () {
  let pass = document.getElementById("password").value;
  checkStrength(pass);
});

const progressBarClasses = [
  "progress-bar-danger",
  "progress-bar-warning",
  "progress-bar-success",
];

// Función para verificar reglas específicas
const passwordRule = (rule, ruleClass, strength) => {
  if (rule) {
    strength++;
    const img = document.querySelector(`${ruleClass} img`);
    img.src = "assets/circle-check.svg";
  } else {
    const img = document.querySelector(`${ruleClass} img`);
    img.src = "assets/circle-cross.svg";
  }
  return strength;
};

// Manejar clases de la barra de fuerza
const handlePasswordStrengthClasses = (className, style) => {
  const classesToRemove = progressBarClasses.filter((barClass) => barClass !== className);

  classesToRemove.forEach((barClass) => passwordStrength.classList.remove(barClass));
  passwordStrength.classList.add(className);
  passwordStrength.style = style;

  // Habilitar o deshabilitar el botón en función de la fuerza
  submitButton.disabled = className !== "progress-bar-success";
};

// Función para verificar la fuerza de la contraseña
function checkStrength(password) {
  let strength = 0;

  strength = passwordRule(
    password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/),
    ".low-upper-case",
    strength
  );
  strength = passwordRule(password.match(/([0-9])/), ".one-number", strength);
  strength = passwordRule(
    password.match(/([!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?])/),
    ".one-special-char",
    strength
  );
  strength = passwordRule(password.length >= 8, ".eight-character", strength);

  if (strength < 2) {
    handlePasswordStrengthClasses(progressBarClasses[0], "width: 10%");
  } else if (strength === 3) {
    handlePasswordStrengthClasses(progressBarClasses[1], "width: 60%");
  } else if (strength === 4) {
    handlePasswordStrengthClasses(progressBarClasses[2], "width: 100%");
  }
}
