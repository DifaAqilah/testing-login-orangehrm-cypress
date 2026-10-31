# DOKUMENTASI FINAL PROJECT
# Automation Testing OrangeHRM dengan Cypress: Login, Directory, dan Recruitment (POM + Intercept)

- Nama : Difa Aqilah
- Kelas / Batch : 81

Project ini fokus pada automation testing pada OrangeHRM aplikasi *Human Resource Management System* (HRMS) berbasis web yang bersifat open source. Aplikasi ini dipakai perusahaan untuk mengelola data dan proses sumber daya manusia (SDM) dalam satu tempat.

Modul utama yang tersedia di OrangeHRM:

 Admin       : Pengaturan pengguna, job title, lokasi, dan konfigurasi sistem 
 PIM         : Mengelola data karyawan (Personnel Information Management) 
 Leave       : Pengajuan dan persetujuan cuti 
 Time        : Pencatatan jam kerja dan absensi 
 Recruitment : Mengelola lowongan (vacancy) dan kandidat pelamar 
 My Info     : Data pribadi pengguna yang sedang login 
 Performance : Penilaian kinerja karyawan 
 Dashboard   : Ringkasan informasi setelah login 
 Directory   : Mencari dan melihat informasi kontak karyawan 
 Claim       : Pengajuan klaim biaya 
 Buzz        : Media sosial internal perusahaan 

## Website yang diuji: https://opensource-demo.orangehrmlive.com
Ini adalah versi demo publik yang disediakan OrangeHRM untuk mencoba aplikasi dan
sering dipakai untuk latihan testing. Akun yang dipakai: `Admin` / `admin123`.
Data pada demo direset secara berkala dan server-nya kadang lambat.

## Fitur yang diuji pada project akhir automation testing:

Login       : Pintu masuk aplikasi, memeriksa username dan password 
Directory   : Mencari karyawan berdasarkan nama, job title, dan lokasi 
Recruitment : Melihat kandidat dan lowongan, serta menambah kandidat baru

Ada 24 test case dengan masing-masing fitur 8 test case
# Login (login.cy.js)
Login dengan username dan password valid        (positive)
Login dengan password tidak valid               (negative)
Login dengan username tidak valid               (negative)
Login dengan username dan password kosong       (negative)
Login dengan username kosong                    (negative)
Login dengan password kosong                    (negative)
Link Forgot your password                       (positive)
Login menggunakan tombol Enter	                (positive)

# Directory (directory.cy.js)
Membuka menu Directory                          (positive)
Form filter Directory tampil lengkap            (positive)
Search tanpa filter menampilkan daftar karyawan (positive)
Search berdasarkan nama karyawan                (positive)
Search dengan nama karyawan tidak valid         (negative)
Tombol Reset mengosongkan kolom nama            (positive)
Filter berdasarkan Job Title                    (positive)
Filter berdasarkan Location                     (positive)

# Recruitment (recruitment.cy.js)
Membuka menu Recruitment                        (positive)
Form filter kandidat tampil lengkap             (positive)
Search kandidat tanpa filter                    (positive)
Membuka tab Vacancies                           (positive)
Filter kandidat berdasarkan Status              (positive)
Tambah kandidat dengan data wajib kosong        (negative)
Tambah kandidat dengan format email tidak valid (negative)
Tambah kandidat dengan data valid               (positive)

## Tools

Cypress            : Framework untuk menjalankan automation test pada web dan API 
Node.js dan npm    : Menjalankan Cypress dan memasang package 
Visual Studio Code : Editor untuk menulis kode 
Google Chrome      : Browser tempat test dijalankan 
Git                : Menyimpan riwayat perubahan kode 
GitHub             : Menyimpan project secara online dan membagikannya lewat link 
Microsoft Excel    : Menyusun dokumen manual testing 

## Struktur folder dan file lengkap

Cypress/                           (folder utama project)
├── cypress/
│   ├── e2e/
│   │   ├── login.cy.js            (quiz 3)
│   │   ├── login.intercept.cy.js  (tugas 16)
│   │   ├── POM/                   (tugas 17)
│   │   │   ├── data/
│   │   │   ├── pages/
│   │   │   └── login.pom.cy.js
│   │   ├── API/                   (tugas 18)
│   │   │   └── (file test API)
│   │   └── final-project/         (final project)
│   │       ├── data/               
│   │       ├── pages/
│   │       ├── login.cy.js
│   │       ├── directory.cy.js
│   │       └── recruitment.cy.js
│   ├── fixtures/
│   │   └── example.json
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── hasil-running/
├── dokumen/
├── node_modules/
├── .gitignore
├── cypress.config.js
├── package.json
├── package-lock.json
└── README.md

Isi tiap file `pages/` ada empat bagian:

Locator     : Alamat elemen di halaman (kolom input, tombol, pesan) 
Intercept   : Memasang pemantau pada request jaringan 
Action      : Aksi pengguna (ketik, klik, pilih dropdown, buka menu) 
Assertion   : Pengecekan hasil (tampilan, teks, URL, status, dan isi response)

## Teknik yang digunakan

1. Page Object Model (POM)    : Memisahkan data, halaman, dan test. Jika selector atau data berubah, cukup diperbaiki di satu tempat, dan test menjadi pendek serta mudah dibaca 
2. Intercept (`cy.intercept`) : Memantau request antara halaman dan server, untuk memastikan aksi di layar benar-benar berdampak ke server 
3. Assertion                  : Membuktikan hasil sesuai harapan (expected result) 
4. `beforeEach`               : Menyiapkan kondisi awal sebelum tiap test (membuka halaman atau login), sehingga tiap test berdiri sendiri 
5. API testing (`cy.request`) : Menguji API langsung tanpa membuka halaman web 
6. Manual testing             : Menjalankan test secara manual dan mencatat hasilnya, serta melaporkan bug 

## Perintah Cypress yang dipakai

`describe`                 : Mengelompokkan test dalam satu fitur 
`it`                       : Satu test case 
`cy.visit()`               : Membuka halaman 
`cy.get()`                 : Mengambil elemen lewat selector 
`cy.contains()`            : Mengambil elemen berdasarkan teks 
`.type()`                  : Mengetik pada kolom input 
`.click()`                 : Mengklik elemen 
`.should()` dan `expect()` : Assertion (memeriksa hasil) 
`cy.intercept()`           : Memantau atau mengubah request jaringan 
`cy.wait()`                : Menunggu request tertentu selesai, lalu memeriksa responsnya 
`cy.request()`             : Mengirim request langsung ke API 


## Project Akhir

Project akhir menguji tiga fitur OrangeHRM, masing-masing 8 test case
(total 24 test case) :

1. Manual testing     : test scenario, test case, dan bug report 
2. Automation testing : Cypress dengan format POM yang mencakup
   *action*, *assertion*, *data*, dan *intercept*.

## Cara Menjalankan

1. Install dependensi
npm install

2. Mode visual
npx cypress open

3. Mode terminal (jalankan satu per satu)
npx cypress run --spec "cypress/e2e/final-project/login.cy.js"
npx cypress run --spec "cypress/e2e/final-project/directory.cy.js"
npx cypress run --spec "cypress/e2e/final-project/recruitment.cy.js"


Catatan:
- Selalu tentukan file dengan `--spec`. Tanpa itu, Cypress menjalankan semua test di semua folder.
- Server demo OrangeHRM kadang lambat, jadi satu file bisa memakan beberapa menit.
- Test API ReqRes memerlukan API key pribadi (ambil dari reqres.in). 


## Hasil

`login.cy.js`       : 8 passing 
`directory.cy.js`   : 8 passing 
`recruitment.cy.js` : 8 passing 

Screenshot hasil running ada di folder `hasil-running/`.