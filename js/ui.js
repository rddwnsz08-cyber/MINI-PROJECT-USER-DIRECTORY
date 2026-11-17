// js/ui.js
const list = document.querySelector("#user-list");
const status = document.querySelector("#status");

export function showLoading() {
  status.textContent = "Memuat pengguna...";
  list.replaceChildren();
}

export function showError(message) {
  status.textContent = message;
  list.replaceChildren();
}

export function renderUsers(users) {
  list.replaceChildren();
  status.textContent = `${users.length} pengguna ditemukan`;

  users.forEach((user) => {
    const item = document.createElement("li");
    const name = document.createElement("strong");
    const email = document.createElement("span");
    name.textContent = user.name;
    email.textContent = user.email;
    item.append(name, email);
    list.append(item);
  });
}
