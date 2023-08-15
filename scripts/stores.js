import { getFlowers } from "./flowers.js";

const getStores = async () => {
  const response = await fetch(
    "http://localhost:8088/stores?_expand=distributor"
  );
  const stores = await response.json();
  return stores;
};

// ? Link Table, Contains both Nursery & Distributor information
const getDistributors = async () => {
  const response = await fetch(
    "http://localhost:8088/distributorNursery?_expand=distributor&_expand=nursery"
  );
  const distributors = await response.json();
  return distributors;
};

const getNurseries = async () => {
  const response = await fetch("http://localhost:8088/nurseries");
  const nurseries = await response.json();
  return nurseries;
};

// ? Link table
const getNurseryFlowers = async () => {
  const response = await fetch("http://localhost:8088/nurseryFlowers");
  const nurseryFlowers = await response.json();
  return nurseryFlowers;
};

export const storesList = async () => {
  const stores = await getStores();
  const distributors = await getDistributors();
  const nurseries = await getNurseries();
  const nurseryFlowers = await getNurseryFlowers();
  const flowers = await getFlowers();
  let html = `<h1> Our Stores </h1>
                  <section class="stores__list">`;
  const storesHTML = stores.map((store) => {
    return `<div class="stores__single">${store.name} - ${store.city}, ${store.state} - 
            Receiving flowers from ${store.distributor.name} in ${store.distributor.city}, ${store.distributor.state}</div>
            `;
  });
  html += storesHTML.join("");
  html += `</section>`;
  return html;
};
