const modal = document.querySelector("#modal");
const openButton = document.querySelector(".open-button");

openButton.addEventListener("click", (e) => {
  modal.showModal();
});
