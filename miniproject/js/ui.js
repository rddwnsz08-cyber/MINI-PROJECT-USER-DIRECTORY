// js/ui.js
const list = document.querySelector("#user-list");
const status = document.querySelector("#status");

const dialog = document.querySelector("#user-dialog");
const dialogBody = document.querySelector("#dialog-body");
const dialogClose = document.querySelector("#dialog-close");

const INFO_ICON = `<img src="./asset/iconinfo.png" alt="" width="24" height="24" />`;

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
  status.textContent =
    users.length > 0
      ? `${users.length} pengguna ditemukan`
      : "Pengguna tidak ditemukan";

  users.forEach((user) => {
    const item = document.createElement("li");
    const name = document.createElement("strong");
    const email = document.createElement("span");
    name.textContent = user.name;
    email.textContent = user.email;

    // Tombol icon detail
    const detailBtn = document.createElement("button");
    detailBtn.type = "button";
    detailBtn.className = "detail-btn";
    detailBtn.setAttribute("aria-label", `Lihat detail ${user.name}`);
    detailBtn.title = "Lihat detail";
    detailBtn.innerHTML = INFO_ICON;

    item.append(name, email, detailBtn);

    // Klik di mana saja pada card (atau tombol) membuka popup
    item.addEventListener("click", () => openDetail(user));

    list.append(item);
  });
}

/* ===== Popup detail ===== */

function row(label, value) {
  const wrap = document.createElement("div");
  wrap.className = "detail-row";
  const dt = document.createElement("dt");
  const dd = document.createElement("dd");
  dt.textContent = label;
  dd.textContent = value || "-";
  wrap.append(dt, dd);
  return wrap;
}

function section(title, rows) {
  const sec = document.createElement("section");
  sec.className = "detail-section";
  const h = document.createElement("h3");
  h.textContent = title;
  const dl = document.createElement("dl");
  dl.append(...rows);
  sec.append(h, dl);
  return sec;
}

function openDetail(user) {
  const { address = {}, company = {} } = user;

  // Header: avatar inisial + nama + username
  const header = document.createElement("div");
  header.className = "detail-header";

  const avatar = document.createElement("div");
  avatar.className = "detail-avatar";
  avatar.textContent = user.name
    .replace(/^(Mr|Mrs|Ms|Dr)\.?\s+/i, "")
    .charAt(0)
    .toUpperCase();

  const titles = document.createElement("div");
  const title = document.createElement("h2");
  title.id = "dialog-title";
  title.textContent = user.name;
  const username = document.createElement("p");
  username.textContent = `@${user.username}`;
  titles.append(title, username);
  header.append(avatar, titles);

  dialogBody.replaceChildren(
    header,
    section("Kontak", [
      row("Email", user.email),
      row("Telepon", user.phone),
      row("Website", user.website),
    ]),
    section("Perusahaan", [
      row("Nama", company.name),
      row("Slogan", company.catchPhrase),
      row("Bidang", company.bs),
    ]),
    section("Alamat", [
      row("Jalan", [address.street, address.suite].filter(Boolean).join(", ")),
      row("Kota", address.city),
      row("Kode pos", address.zipcode),
    ]),
  );

  dialog.showModal();
}

dialogClose.addEventListener("click", () => dialog.close());

// Klik di area gelap (backdrop) menutup popup
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
