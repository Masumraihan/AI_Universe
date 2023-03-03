const displayData = (singleAiData) => {
  const card = document.getElementById("aiCards");
  card.innerHTML += `
    <div class="col">
        <div class="card h-100">
            <img src="${singleAiData.image}" class="card-img-top p-3 rounded h-100" alt="...">
            <div id="cardBody" class="card-body">
                <h5 class="card-title fw-bold">Features</h5>
                <ol id="${singleAiData.id}">
                    
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
                        <button onclick="loadSingleData('${singleAiData.id}')" data-bs-toggle="modal" data-bs-target="#singleAiModal" class="btn bg-danger-subtle rounded-circle opacity-.1"><i class="fa-solid fa-arrow-right text-danger"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
       `;
  singleAiData.features.forEach((feature) => {
    const ol = document.getElementById(singleAiData.id);
    const li = document.createElement("li");
    li.innerText = feature;
    ol.appendChild(li);
  });
  togglePreloader(false);
};

const togglePreloader = (isLoading) => {
  if (isLoading) {
    document.getElementById("spinner").classList.remove("d-none");
  } else {
    document.getElementById("spinner").classList.add("d-none");
  }
};

const loadSliceData = async () => {
  togglePreloader(true);
  const URL = `https://openapi.programming-hero.com/api/ai/tools`;
  togglePreloader(true);
  try {
    const res = await fetch(URL);
    const data = await res.json();
    displaySliceData(data.status ? data.data : data.status);
    //displaySortData(data.status ? data.data : data.status);
  } catch (error) {
    console.log(error);
  }
};

const displaySliceData = (data) => {
  data.tools.slice(0, 6).forEach((singleAiData) => {
    displayData(singleAiData);
  });
  displaySortData(data.tools.slice(0,6));
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
    displaySortData(data.tools);
  });
};

const displaySortData = data => {
  document.getElementById("sort-btn").addEventListener("click", () => {
    //console.log(data.tools);
    const sortDate = (date1, date2) => {
      const firstDate = new Date(date1.published_in);
      const secondDate = new Date(date2.published_in);
      return firstDate - secondDate;
    };
    document.getElementById("aiCards").innerHTML = "";
    data.sort(sortDate).forEach(element => {
      displayData(element);
    });
  });
}


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
    console.log(error);
  }
};

const displaySingleData = (data) => {
  const info = data.data;
  const accuracy = info.accuracy;
  const inputOutput = info.input_output_examples;

  let input_output_examples = "No! Not Yet! Take a break!!!";
  if (info.input_output_examples) {
    input_output_examples = info.input_output_examples;
  }
  const integrations = info.integrations;
  const pricing = info.pricing;

  const modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = `
    <div id="modal-body" class="modal-body">
    <div class="row row-cols-1 row-cols-lg-2 g-4 p-3">
    <div class="col">
        <div class="card bg-danger-subtle border border-danger h-100"> 
            <div class="card-body">
                <h5 class="card-title px-5 pt-4">${info.description}</h5>
                <div id="pricing-container" class="row row-cols-4 align-items-center justify-content-evenly text-center p-3">
                  
                        
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
                        <ul id="${info.id * 2}">
                            
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
            }" class="card-img-top px-4 py-4 rounded" alt="...">
            <div id="input-output" class="card-body text-center px-4">
            </div>
            <div id="accuracy-container" class="position-absolute" style="top: 7%; right: 7%;">
                <div class="bg-danger position-relative rounded" style="width: 250px; height: 40px;">
                    <p id="accuracy-text" class="text-white fw-bold position-absolute top-50 start-50 translate-middle"></p>
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
  if (integrations) {
    integrations.forEach((integration) => {
      const ul = document.getElementById(info.id * 2);
      const li = document.createElement("li");
      li.innerText = integration;
      ul.appendChild(li);
    });
  } else {
    document.getElementById(info.id * 2).innerText = "No data Found";
  }

  if (accuracy.score) {
    document.getElementById("accuracy-text").innerText = `${
      accuracy.score * 100
    }% accuracy`;
  } else document.getElementById("accuracy-container").style.display = "none";

  if (pricing) {
    const pricingContainer = document.getElementById("pricing-container");
    pricing.forEach((element) => {
      const div = document.createElement("div");
      div.classList.add("col", "bg-white","d-flex","align-items-center","justify-content-center", "rounded","px-2","py-4");
      div.innerHTML = `
        <div>
        <p class="m-auto fw-bold text-danger">${element.price}</p>
        <p class="m-auto fw-bold text-success">${element.plan}</p>
        </div>
      `;
      pricingContainer.appendChild(div);
    });
  } else{
    const pricingContainer = document.getElementById("pricing-container");
    const div = document.createElement("div");
      div.classList.add("col", "bg-white","d-flex","align-items-center","justify-content-center", "rounded","px-2","py-4");
      div.innerHTML = `
        <div>
        <p class="m-auto fw-bold text-danger">Free Of Cost</p>
        </div>
      `;
      pricingContainer.appendChild(div);
  }

  if (inputOutput) {
    const inputOutputContainer = document.getElementById("input-output");
    inputOutput.forEach((text) => {
      const div = document.createElement("div");
      div.innerHTML = `
      <h5 class="card-title">${text.input}</h5>
      <p class="card-text">${text.output}</p>
      `;
      inputOutputContainer.appendChild(div);
    });
  } else
    document.getElementById("input-output").innerText =
      "No! Not Yet! Take a break!!!";
};
