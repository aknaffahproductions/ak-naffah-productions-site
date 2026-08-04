
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    document.body.classList.toggle("menu-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
  });
}

const filterButtons = document.querySelectorAll(".filter-button");
const cards = document.querySelectorAll("[data-project-card]");
const searchInput = document.querySelector("#project-search");
const emptyState = document.querySelector(".empty-state");
let activeFilter = "all";

function updateProjects() {
  const query = (searchInput?.value || "").trim().toLowerCase();
  let visible = 0;

  cards.forEach(card => {
    const matchesFilter = activeFilter === "all" || card.dataset.category === activeFilter;
    const matchesSearch = card.textContent.toLowerCase().includes(query);
    const show = matchesFilter && matchesSearch;
    card.hidden = !show;
    if (show) visible += 1;
  });

  if (emptyState) emptyState.style.display = visible ? "none" : "block";
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach(item => item.classList.toggle("active", item === button));
    updateProjects();
  });
});

searchInput?.addEventListener("input", updateProjects);

document.querySelectorAll("[data-year]").forEach(el => {
  el.textContent = new Date().getFullYear();
});
