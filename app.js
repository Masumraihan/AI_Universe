const displayData = (singleAiData) => {
  const card = document.getElementById("aiCards");
  card.innerHTML += `
    <div class="col">
        <div class="card h-100">
            <img src="${
              singleAiData.image
            }" class="card-img-top p-3 rounded h-100" alt="...">
            <div id="cardBody" class="card-body">
                <h5 class="card-title fw-bold">Features</h5>
                <ol id="features">
                    <li>${singleAiData.features[0]}</li>
                    <li>${singleAiData.features[1]}</li>
                    <li>${
                      singleAiData.features[2]
                        ? singleAiData.features[2]
                        : "Not available"
                    }</li>
                </ol>
            </div>
            <div class="card-footer py-4">
                <div class="d-flex align-items-center justify-content-between">
                    <div>
                    <h5 class="fw-bold">${singleAiData.name}</h5>
                    <i class="fa-solid fa-calendar-days"></i>
                    <small>${singleAiData.published_in}</small>
                    </div>
                    <div>
                        <button onclick="loadSingleData('${
                          singleAiData.id
                        }')" data-bs-toggle="modal" data-bs-target="#singleAiModal" class="btn bg-danger-subtle rounded-circle opacity-.1"><i class="fa-solid fa-arrow-right text-danger"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
       `;
};

const loadSliceData = async () => {
  const URL = `https://openapi.programming-hero.com/api/ai/tools`;
  try {
    const res = await fetch(URL);
    const data = await res.json();
    displaySliceData(data.status ? data.data : data.status);
  } catch (error) {
    console.log(error);
  }
};

const displaySliceData = (data) => {
  data.tools.slice(0, 6).forEach((singleAiData) => {
    displayData(singleAiData);
  });
};

const loadAllData = async () => {
  const URL = `https://openapi.programming-hero.com/api/ai/tools`;
  try {
    const res = await fetch(URL);
    const data = await res.json();
    displayAllData(data.status ? data.data : data.status);
  } catch (error) {
    console.log(error);
  }
};

const displayAllData = (data) => {
  data.tools.forEach((singleAiData) => {
    displayData(singleAiData);
  });
};

document.getElementById("see-more-btn").addEventListener("click", () => {
  document.getElementById("aiCards").innerHTML = "";
  loadAllData();
});

loadSliceData();

const loadSingleData = async (id) => {
  const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  try {
    const res = await fetch(URL);
    const data = await res.json();
    displaySingleData(data);
  } catch (error) {
    console.log(data);
  }
};

const displaySingleData = (data) => {
  console.log(data.data);
  const info = data.data;
  const modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = `
    <div id="modal-body" class="modal-body">
    <div class="row row-cols-1 row-cols-lg-2 g-4 p-5">
    <div class="col">
        <div class="card bg-danger-subtle border border-danger h-100"> 
            <div class="card-body">
                <h5 class="card-title px-5 pt-4">${info.description}</h5>
                <div class="row row-cols-4 align-items-center justify-content-between text-center p-5">
                    <div class="col bg-white px-3 py-5 rounded">
                        <p class="m-auto fw-bold text-success">hlw</p>
                    </div>
                    <div class="col bg-white px-3 py-5 rounded">
                        <p class="m-auto fw-bold text-warning">hlw</p>
                    </div>
                    <div class="col bg-white px-3 py-5 rounded">
                        <p class="m-auto fw-bold text-danger">hlw</p>
                    </div>
                </div>
                <div class="row row cols-2 px-5 align-items-center justify-content-between">
                    <div class="col">
                        <h5>Features</h5>
                        <ul>
                            <li>hlw</li>
                            <li>hlw</li>
                            <li>hlw</li>
                        </ul>
                    </div>
                    <div class="col">
                        <h5>Integrations</h5>
                        <ul>
                            <li>hlw</li>
                            <li>hlw</li>
                            <li>hlw</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col">
        <div class="card h-100">
            <img src="https://www.imgacademy.com/sites/default/files/2022-07/img-homepage-meta.jpg" class="card-img-top px-4 pt-4 rounded" alt="...">
            <div class="card-body text-center px-4">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title
                    and make up the bulk of the card's content.</p>
            </div>
            <div class="position-absolute" style="top: 7%; right: 7%;">
                <div class="bg-danger position-relative rounded" style="width: 160px; height: 40px;">
                    <p class="text-white fw-bold position-absolute top-50 start-50 translate-middle">hlw</p>
                </div>
            </div>
        </div>
    </div>
</div>
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
</div>
  `;
};
