const loadData = async() => {
    const URL = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(URL);
    const data = await res.json();
    console.log(data.status ? data.data:data.status);
}

loadData()