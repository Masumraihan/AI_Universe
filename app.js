const loadData = async () => {
  const URL = `https://openapi.programming-hero.com/api/ai/tools`;
  try {
    const res = await fetch(URL);
    const data = await res.json();
    displaySliceData(data.status ? data.data : data.status);
  } catch (error) {
    console.log(error);
  }
};

const displaySliceData = data => {
  console.log(data.tools);

  data.tools.slice(0, 6).forEach((singleAi) => {
    console.log(singleAi);

    const card = document.getElementById("aiCards");
    card.innerHTML += `
       <div class="col">
       <div class="card h-100">
           <img src="${singleAi.image}" class="card-img-top p-3 rounded h-100" alt="...">
           <div id="cardBody" class="card-body">
               <h5 class="card-title fw-bold">Features</h5>
               <ol id="features">
                <li>${singleAi.features[0]}</li>
                <li>${singleAi.features[1]}</li>
                <li>${singleAi.features[2]? singleAi.features[2]:"Not available"}</li>
               </ol>
               
           </div>
           <div class="card-footer">
               <div class="d-flex align-items-center justify-content-between">
                <div>
                <h5 class="fw-bold">${singleAi.name}</h5>
                <i class="fa-solid fa-calendar-days"></i>
                <small>${singleAi.published_in}</small>
                </div>
                <div>
                    <button class="btn bg-danger-subtle rounded-circle opacity-.1"><i class="fa-solid fa-arrow-right text-danger"></i></button>
                </div>
               </div>
           </div>
       </div>
   </div>
       `;
  });
};

loadData();
