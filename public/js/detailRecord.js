const socket = io();
const kebutuhanAir = document.querySelector(".kebutuhanAir");
const kecepatanAir = document.querySelector(".kecepatanAir");
const ketinggianAir = document.querySelector(".ketinggianAir");

console.log("HELLO");
socket.on("connect", () => {
    console.log(socket.id);
});
const listener = (eventName, ...args) => {
    const { waterDepth, waterFlow, soilHumidity } = args[0];
    kebutuhanAir.textContent = soilHumidity;
    kecepatanAir.textContent = waterFlow;
    ketinggianAir.textContent = waterDepth;
};
socket.on("record", (data) => {
    console.log(`connect_error due to`);
});
socket.onAny(listener);
