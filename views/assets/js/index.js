document.querySelector("#socials").addEventListener("change", (event) => {
  if (event.target.checked) {
    document.querySelector("#input_for_socials").style.display = "block";
  } else {
    document.querySelector("#input_for_socials").style.display = "none";
  }
});
document
  .querySelector("#options_switch")
  .addEventListener("change", (event) => {
    if (event.target.checked) {
      document.querySelector("#show_options").style.display = "block";
    } else {
      document.querySelector("#show_options").style.display = "none";
    }
  });
document.querySelector("#styles_switch").addEventListener("change", (event) => {
  if (event.target.checked) {
    document.querySelector("#styles").style.display = "block";
  } else {
    document.querySelector("#styles").style.display = "none";
  }
});
function retry() {
  document.getElementById("username").focus();
}

function validate() {
  var userName = document.getElementById("username").value;
  if (userName == "") {
    snackbar.open();
    document
      .getElementById("build-button")
      .addEventListener("click", function (event) {
        event.preventDefault();
      });
  } else {
    snackbar.close();
    document.getElementById("build-button").outerHTML =
      document.getElementById("build-button").innerHTML;
    document.getElementById("build").click();
  }
}
