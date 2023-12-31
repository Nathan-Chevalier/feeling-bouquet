export const getFlowers = async () => {
  const response = await fetch("http://localhost:8088/flowers");
  const flowers = await response.json();
  return flowers;
};

export const flowersList = async () => {
  const flowers = await getFlowers();
  let html = `<h1> Flowers We Offer </h1>
                <section class="flowers__list">
                    <ul>`;
  const flowersHTML = flowers.map((flower) => {
    return `<li>${flower.color} ${flower.name}</li>`;
  });
  html += flowersHTML.join("");
  html += `</ul></section>`;
  return html;
};
