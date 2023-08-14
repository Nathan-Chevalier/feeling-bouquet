import { flowersList } from "./flowers.js";
import { storesList } from "./stores.js";

const render = async () => {
  const flowersHTML = await flowersList();
  const storesHTML = await storesList();
  const container = document.querySelector("#container");
  container.innerHTML = flowersHTML;
  container.innerHTML += storesHTML;
};

render();
