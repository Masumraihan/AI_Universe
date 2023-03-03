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
  togglePreloader(false);
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
  togglePreloader(true);
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

const togglePreloader = (isLoading) => {
  if (isLoading) {
    document.getElementById("spinner").classList.remove("d-none");
  } else {
    document.getElementById("spinner").classList.add("d-none");
  }
};

const loadSingleData = async (id) => {
  const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  try {
    const res = await fetch(URL);
    const data = await res.json();
    displaySingleData(data);
  } catch (error) {
    console.log(error);
  }
};

const displaySingleData = (data) => {
  const info = data.data;
  const accuracy = info.accuracy;
  const modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = `
    <div id="modal-body" class="modal-body">
    <div class="row row-cols-1 row-cols-lg-2 g-4 p-3">
    <div class="col">
        <div class="card bg-danger-subtle border border-danger h-100"> 
            <div class="card-body">
                <h5 class="card-title px-5 pt-4">${info.description}</h5>
                <div class="row row-cols-4 align-items-center justify-content-between text-center p-3">
                    <div class="col bg-white px-1 py-5 rounded">
                        <p class="m-auto fw-bold text-success">${
                          info.pricing[0].price
                        }</p>
                        <p class="m-auto fw-bold text-success">${
                          info.pricing[0].plan
                        }</p>
                    </div>
                    <div class="col bg-white px-1 py-5 rounded">
                        <p class="m-auto fw-bold text-warning">${
                          info.pricing[1].price
                        }</p>
                        <p class="m-auto fw-bold text-warning">${
                          info.pricing[1].plan
                        }</p>
                    </div>
                    <div class="col bg-white px-1 py-5 rounded">
                        <p class="m-auto fw-bold text-danger">${
                          info.pricing[2].price
                        }</p>
                        <p class="m-auto fw-bold text-danger">${
                          info.pricing[2].plan
                        }</p>
                    </div>
                </div>
                <div class="row row cols-2 px-2 align-items-center justify-content-between">
                    <div class="col">
                        <h5>Features</h5>
                        <ul>
                            <li>${
                              info.features[1].feature_name
                                ? info.features[1].feature_name
                                : "not available"
                            }</li>
                            <li>${
                              info.features[2].feature_name
                                ? info.features[2].feature_name
                                : "not available"
                            }</li>
                            <li>${
                              info.features[3].feature_name
                                ? info.features[3].feature_name
                                : "not available"
                            }</li>
                        </ul>
                    </div>
                    <div class="col">
                        <h5>Integrations</h5>
                        <ul>
                            <li>${
                              info.integrations[0]
                                ? info.integrations[0]
                                : "not available"
                            }</li>
                            <li>${
                              info.integrations[1]
                                ? info.integrations[1]
                                : "not available"
                            }</li>
                            <li>${
                              info.integrations[2]
                                ? info.integrations[2]
                                : "not available"
                            }</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col">
        <div class="card h-100">
            <img src="${
              info.image_link[0]
            }" class="card-img-top px-4 pt-4 rounded" alt="...">
            <div class="card-body text-center px-4">
                <h5 class="card-title">${
                  info.input_output_examples[0].input
                }</h5>
                <p class="card-text">${
                  info.input_output_examples[0].output
                    ? info.input_output_examples[0].output
                    : "No! Not Yet! Take a break!!!"
                }</p>
            </div>
            <div id="accuracy-container" class="position-absolute" style="top: 7%; right: 7%;">
                <div class="bg-danger position-relative rounded" style="width: 250px; height: 40px;">
                    <p id="accuracy-text" class="text-white fw-bold position-absolute top-50 start-50 translate-middle">hlw</p>
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
  if (accuracy.score) {
    document.getElementById("accuracy-text").innerText = `${
      accuracy.score * 100
    }% accuracy`;
  } else document.getElementById("accuracy-container").style.display = "none";
};
