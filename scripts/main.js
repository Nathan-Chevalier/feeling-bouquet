import { flowersList } from "./flowers.js";

const render = async () => {
  const flowersHTML = await flowersList();
  const container = document.querySelector("#container");
  container.innerHTML = flowersHTML;
};

render();
