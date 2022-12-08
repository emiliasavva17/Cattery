/**
 * All routes of the SPA
 * "path": "id of page in DOM"
 */
const _routes = {
  "/": "home",
  "#/page2": "page2",
  // "#/OurCats": "OurCats",

  "#/KingsAndQueens": "KingsAndQueens",
  "#/Kittens": "Kittens",
  "#/Adoption": "Adoption",
  "#/AboutUs": "AboutUs",
  "/Contact": "Contact",
  "#/detail-view": "detail-view",
};
const _pages = document.querySelectorAll(".page");
//const _basePath = location.pathname.replace("index.html", ""); // remove index.html from path
const _navLinks = document.querySelectorAll(".nav-link");

/**
 * Changing display to none for all pages
 */
function hideAllPages() {
  for (const page of _pages) {
    page.style.display = "none";
  }
}

/**
 * Navigating SPA to specific page by given path
 */
function navigateTo(path) {
  window.history.pushState({}, path, location.origin+ path);
  showPage(path);
}

/**
 * Displaying page by given path
 */

function showPage(path) {
  hideAllPages(); // hide all pages

  if (_routes[path] != "home") {
    document.querySelector(".back").style.display = "block";
  } else {
    document.querySelector(".back").style.display = "none";
  }
  console.log(_routes[path]);
  if (_routes[path] != "Kittens") {
    window.scrollTo(0, 0);
  }
  document.querySelector(`#${_routes[path]}`).style.display = "block"; // show page by given path

  setActiveTab(path);
}

/**
 * sets active menu item by given path
 */
function setActiveTab(path) {
  for (const link of _navLinks) {
    if (path === link.getAttribute("href")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  }
}

/**
 * Attaching event to nav links and preventing default anchor link event
 */
function attachNavLinkEvents() {
  const navLinks = document.querySelectorAll(".nav-link");
  for (const link of navLinks) {
    link.addEventListener("click", function(event) {
      const path = link.getAttribute("href");
      navigateTo(path);
      event.preventDefault();
    });
  }
}

/**
 * Initialising the router, calling attachNavLinkEvents(), popstate event and navigateTo()
 */
function initRouter() {
  attachNavLinkEvents();
  window.addEventListener("popstate", () => showPage(location.pathname)); // change page when using back and forth in browser

  let path = "/"; // default path
  if (_routes[location.pathname]) {
    path = location.pathname;
  }
  navigateTo(path);
}

// async function Cat(path) {
//   console.log("Cat route path", path);
//   _cats = await fetchData();
//   if (path === "KingsAndQueens") {
//     console.log("king and Queens chbdnsvf");
//     appendCat(_cats);
//   }

//   if (path === "Kittens") {
//     console.log("kittens fcgvhbjn xdc");
//     appendCat(_cats);
//   }
// }

initRouter();
