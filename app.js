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
                        <button onclick="loadSingleData('${singleAiData.id}')" class="btn bg-danger-subtle rounded-circle opacity-.1"><i class="fa-solid fa-arrow-right text-danger"></i></button>
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

const displaySingleData = data => {
    console.log(data);
}