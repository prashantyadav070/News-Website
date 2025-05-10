const API_KEY = "fffc9721b168c876c90b7f641af89a78"; // replace with your GNews API key
const url = "https://gnews.io/api/v4/search?q=";

window.addEventListener("load", () => fetchNews("Technology"));

async function fetchNews(query) {
  try {
    const res = await fetch(`${url}${query}&lang=en&token=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
  } catch (err) {
    console.error("Error fetching news:", err);
  }
}

function bindData(articles) {
  const cardsContainer = document.getElementById("cardscontainer");
  const newsCardTemplate = document.getElementById("template-news-card");
  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.image) return;

    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.image;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });

  newsSource.innerHTML = `${article.source.name} • ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let curSelectedNav = null;

function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});





