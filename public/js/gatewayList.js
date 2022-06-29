const notify = document.querySelector(".notify");
const btn = document.querySelector("#save");
const form = document.querySelector("form");
const container = document.querySelector("#gateway-container");

const template = ({
    id,
    name,
    online,
    transmitFrequency: transmit,
    receiverFrequency: receiv,
}) => {
    return `
    <div class="col-12 main--manage--menu--list border-line rounded-15 bg-neutral-5 p-0">
        <div class="d-flex main--manage--menu--item  p-3">
            <div
                class="gateway--info d-flex flex-column justify-content-center align-items-center p-4 rounded-15">
                <h2 class="fs-sm-2 fs-4 fw-bolder">GWID</h2>
                <h3 class="fs-sm-3 fs-5 fw-normal">${id}</h3>
            </div>

            <div class="gateway--detail py-2 px-4">
                <h5 class="fw-bolder fs-sm-5 fs-6">Gateway name :</h5>
                <p class="fs-sm-5 fs-6 fw-normal text-neutral-2-feed">${name}
                </p>

                <h5 class="fw-bolder fs-sm-5 fs-6 mt-3">Last Online :</h5>
                <p class="fs-sm-5 fs-6 fw-normal text-neutral-2-feed">${online}</p>

                <h5 class="fw-bolder fs-sm-5 fs-6 mt-3">Transmit & Receiv Frequency :</h5>
                <p class="fs-sm-5 fs-6 fw-normal text-neutral-2-feed">${transmit} Mhz, ${receiv} Mhz</p>
            </div>
        </div>

        <div class="main--manage--menu--link d-flex justify-content-end">
            <div class="optional--menu bg-blue-3 d-flex align-items-center justify-content-end">
                <a href="" class="optional--menu-link" data-help="Detail data">
                    <img src="/assets/icon-detail.svg" class="me-4" alt="icon more">
                </a>
                <a href="" class="optional--menu-link" data-help="Edit data">
                    <img src="/assets/icon-edit.svg" class="me-4" alt="icon more">
                </a>
                <a href="" class="optional--menu-link" data-help="Hapus data">
                    <img src="/assets/icon-trash.svg" class="me-4" alt="icon more">
                </a>
            </div>
        </div>
    </div>
    `;
};

const activateLoadingBar = () => {
    notify.classList.add("active");
};

const deactivateLoadingBar = () => {
    notify.classList.remove("active");
};

const loadData = () => {
    activateLoadingBar();
    fetch("/api/gateway/list")
        .then((res) => res.json())
        .then((datas) => {
            datas.forEach((data) => {
                console.log(data);
                container.insertAdjacentHTML("afterbegin", template(data));
            });
            deactivateLoadingBar();
        });
};

loadData();
