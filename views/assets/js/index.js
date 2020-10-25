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
