import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { userService } from "../src/userService.js";
import { userHelper } from "../src/userHelper.js";
import { showLogin } from "./views/loginView.js";
import { showHome } from "./views/homeView.js";
import { showRegister } from "./views/registerView.js";

const root = document.getElementById("content");
const userNav = document.getElementById("user-nav");
const guestNav = document.getElementById("guest-nav");

page(decorationContext);
page("/", showHome);
page("/login", showLogin);
page("/register", showRegister);
// page("/browse", );
// page("/contest", );
// page("/profile/:id", showDetails);
// page("/create/:id", showEdit);
// page("/result", );
page("/logout", logout);

page.start();
updateNav();

async function logout() {
  await userService.logout();
  updateNav();
  goTo("/");
}

function renderer(template) {
  render(template, root);
}

function updateNav() {
  const userData = userHelper.getUserData();
  if (userData) {
    userNav.style.display = "inline";
    guestNav.style.display = "none";
  } else {
    userNav.style.display = "none";
    guestNav.style.display = "inline";
  }
}

function goTo(path) {
  page.redirect(path);
}

function decorationContext(ctx, next) {
  ctx.render = renderer;
  ctx.updateNav = updateNav;
  ctx.goTo = goTo;

  next();
}
