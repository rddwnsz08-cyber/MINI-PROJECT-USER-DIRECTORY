// js/main.js
import { fetchUsers } from "./api.js";
import { showLoading, showError, renderUsers } from "./ui.js";

const searchInput = document.querySelector("#search");
const sortSelect = document.querySelector("#sort-select");
const companySelect = document.querySelector("#company-select");

let allUsers = [];

async function init() {
  showLoading();
  try {
    allUsers = await fetchUsers();
    populateCompanyDropdown(allUsers);
    renderUsers(allUsers);
  } catch (error) {
    showError(error.message);
  }
}

// Fungsi untuk mengisi pilihan perusahaan secara otomatis ke dalam dropdown (<select>)
function populateCompanyDropdown(users) {
  const companies = [...new Set(users.map((user) => user.company.name))];
  companies.sort();

  companies.forEach((companyName) => {
    const option = document.createElement("option");
    option.value = companyName;
    option.textContent = companyName;
    companySelect.appendChild(option);
  });
}

// Fungsi gabungan untuk memproses pencarian, filter perusahaan, dan sorting A-Z
function updateAndRender() {
  const keyword = searchInput.value.trim().toLowerCase();
  const selectedCompany = companySelect.value;
  const sortOrder = sortSelect.value;

  // 1. Filter berdasarkan keyword (nama/email) dan perusahaan
  let result = allUsers.filter((user) => {
    const matchesKeyword =
      user.name.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword);

    const matchesCompany =
      selectedCompany === "" || user.company.name === selectedCompany;

    return matchesKeyword && matchesCompany;
  });

  // 2. Sorting A-Z atau Z-A
  if (sortOrder === "az") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOrder === "za") {
    result.sort((a, b) => b.name.localeCompare(a.name));
  }

  renderUsers(result);
}

// Event Listeners
searchInput.addEventListener("input", updateAndRender);
sortSelect.addEventListener("change", updateAndRender);
companySelect.addEventListener("change", updateAndRender);

init();
