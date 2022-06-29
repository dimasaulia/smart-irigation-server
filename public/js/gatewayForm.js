const notify = document.querySelector(".notify");
const btn = document.querySelector("#save");
const form = document.querySelector("form");

const activateLoadingBar = () => {
    notify.classList.add("active");
};

const deactivateLoadingBar = () => {
    notify.classList.remove("active");
};

btn.addEventListener("click", (e) => {
    activateLoadingBar();
    e.preventDefault();
});
