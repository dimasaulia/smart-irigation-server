const socket = io();
const kebutuhanAir = document.querySelector(".kebutuhanAir");
const kecepatanAir = document.querySelector(".kecepatanAir");
const ketinggianAir = document.querySelector(".ketinggianAir");
const lastUpdate = document.querySelector("#lastUpdate");

console.log("HELLO");
socket.on("connect", () => {
    console.log(socket.id);
});

const dateTimeFormat = (d) => {
    const date = new Date(d);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return new Intl.DateTimeFormat("id-ID", options).format(date);
};

lastUpdate.textContent = dateTimeFormat(Date.now());

const listener = (eventName, ...args) => {
    const { waterDepth, waterFlow, soilHumidity } = args[0];
    kebutuhanAir.textContent =
        soilHumidity === "1" ? "Tidak memerlukan" : "Memerlukan Air";
    kecepatanAir.textContent = waterFlow;
    ketinggianAir.textContent = waterDepth;
    console.log(args[0]);
};
socket.on("record", (data) => {
    console.log(`connect_error due to`);
});
socket.onAny(listener);
