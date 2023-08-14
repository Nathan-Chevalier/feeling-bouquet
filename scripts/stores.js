export const getStores = async () => {
  const response = await fetch("http://localhost:8088/stores");
  const stores = await response.json();
  return stores;
};

export const storesList = async () => {
  const stores = await getStores();
  let html = `<h1> Our Stores </h1>
                  <section class="stores__list">
                      <ul>`;
  const storesHTML = stores.map((store) => {
    return `<li>${store.name} - ${store.city}, ${store.state}</li>`;
  });
  html += storesHTML.join("");
  html += `</ul></section>`;
  return html;
};
