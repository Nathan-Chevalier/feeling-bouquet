import { getFlowers } from "./flowers.js";

const getStores = async () => {
  const response = await fetch(
    "http://localhost:8088/stores?_expand=distributor"
  );
  const stores = await response.json();
  return stores;
};

const getDistributors = async () => {
  const response = await fetch("http://localhost:8088/distributors");
  const distributors = await response.json();
  return distributors;
};

// ? Link Table, Contains both Nursery & Distributor information
const getDistributorNursery = async () => {
  const response = await fetch(
    "http://localhost:8088/distributorNursery?_expand=distributor&_expand=nursery"
  );
  const distributorNursery = await response.json();
  return distributorNursery;
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
  const distributorNursery = await getDistributorNursery();
  const nurseries = await getNurseries();
  const nurseryFlowers = await getNurseryFlowers();
  const flowers = await getFlowers();
  let html = `<h1> Our Stores </h1>
                  <section class="stores__list">`;

  // ? Matches store to nurseries: Store -> Distributor -> Nursery
  const storesHTML = stores.map((store) => {
    const storeDistributor = distributors.find(
      (fDistributor) => fDistributor.id === store.distributorId
    );
    const distributorNurseries = distributorNursery.filter(
      (dNurseries) => dNurseries.distributorId === storeDistributor.id
    );
    const nurseriesArray = distributorNurseries.map((nurseryOut) => {
      return nurseries.find((nursery) => nurseryOut.nurseryId === nursery.id);
    });

    // ? Continues logic train to Flowers: Store -> Distributor -> Nursery -> Flowers
    const matchNurseryFlower = nurseriesArray.flatMap((nArray) => {
      return nurseryFlowers.filter(
        (nFlower) => nFlower.nurseryId === nArray.id
      );
    });
    const flowerIdArray = matchNurseryFlower.flatMap((fArray) => {
      return flowers.filter((flower) => flower.id === fArray.flowerId);
    });

    // ? Filters duplicates and outputs unique objects
    const finalFlowerArray = [
      ...new Set(flowerIdArray.map((flower) => flower)),
    ];

    // ? List outputs
    const nurseriesOutput = nurseriesArray
      .map((nArray) => {
        return `<li> ${nArray.name} from ${nArray.city}, ${nArray.state} </li>`;
      })
      .join("");

    const flowersOutput = finalFlowerArray
      .map((fflower) => {
        return `<li> ${fflower.color} ${fflower.name} </li>`;
      })
      .join("");

    // ? HTML Final Output
    return `<div class="stores__single">${store.name} - ${store.city}, ${store.state} - 
            Receiving flowers from ${store.distributor.name} in ${store.distributor.city}, ${store.distributor.state}</div>
            <h2>${store.name}'s Nurseries</h2>
            <ul>${nurseriesOutput}</ul>
            <ul>${flowersOutput}</ul>
            `;
  });
  html += storesHTML.join("");
  html += `</section>`;
  return html;
};
