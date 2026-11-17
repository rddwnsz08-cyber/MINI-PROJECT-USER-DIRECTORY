# MINI PROJECT USER DIRECTORY

Tugas Javascript Lanjutan - Desain dan Pemrograman Web

## Identitas
- **Nama :** Ridwan Septian
- **NIM  :** 2407058
- **Kelas:** Pendidikan Multimedia - 5B

## Deskripsi Website
Website ini mengambil data dari Public API (`(https://jsonplaceholder.typicode.com/users)`), menampilkan kartu pengguna secara responsif, dilengkapi fitur pencarian real-time, filter berdasarkan perusahaan, serta pengurutan nama (A-Z / Z-A).

## Cara Menjalankan
1. Clone atau download repository ini.
2. Buka folder proyek di Visual Studio Code.
3. Jalankan menggunakan **Open with Live Server** (ekstensi VS Code) untuk membuka file `index.html`.

## Pembagian File & Module (Struktur Arsitektur)
- `index.html`     : Struktur utama tampilan halaman web.
- `css/style.css`  : Pengaturan desain, tata letak grid, dan tema warna utama.
- `js/main.js`     : Logika utama aplikasi (event listener, filter, sorting, dan inisialisasi).
- `js/api.js`      : Modul untuk menangani pengambilan data (*fetch*) dari API publik.
- `js/ui.js`       : Modul untuk manipulasi DOM (menampilkan loading state, error state, empty state, dan render data kartu pengguna).
