// File: account.js
// Mengurus logika di halaman account.html

document.addEventListener('DOMContentLoaded', () => {
    const settingsForm = document.getElementById('settings-form');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const profilePicPreview = document.getElementById('profile-pic-preview');
    const changePicBtn = document.getElementById('change-pic-btn');
    const fileInput = document.getElementById('file-input');
    const successMessage = document.getElementById('settings-success');

    let currentUser = null;
    let newProfilePicDataUrl = null; // Untuk menyimpan data gambar baru

    // 1. Inisialisasi Halaman
    function initPage() {
        const userJson = localStorage.getItem('metube_currentUser');
        if (!userJson) {
            // Jika tidak ada user login, tendang ke halaman signin
            window.location.href = 'signin.html';
            return;
        }
        
        currentUser = JSON.parse(userJson);

        // Isi form dengan data yang ada
        firstNameInput.value = currentUser.firstName;
        lastNameInput.value = currentUser.lastName;

        // Muat pratinjau foto profil
        loadProfilePreview();
    }

    // 2. Muat Pratinjau Foto Profil
    function loadProfilePreview() {
        if (currentUser.profilePic) {
            // Jika user punya foto profil, tampilkan
            profilePicPreview.innerHTML = `<img src="${currentUser.profilePic}" alt="Foto Profil">`;
        } else {
            // Jika tidak, tampilkan inisial
            const initial = currentUser.firstName[0].toUpperCase();
            profilePicPreview.innerHTML = `<span class="initial-preview">${initial}</span>`;
        }
    }

    // 3. Saat Tombol "Ubah Foto" di-klik
    changePicBtn.addEventListener('click', () => {
        fileInput.click(); // Memicu input file yang tersembunyi
    });

    // 4. Saat User Memilih File Gambar
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Cek tipe file
        if (!file.type.startsWith('image/')) {
            alert('Harap pilih file gambar (jpg, png, gif).');
            return;
        }
        
        // Ubah gambar menjadi Data URL (Base64 string)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // Tampilkan pratinjau gambar baru
            newProfilePicDataUrl = reader.result;
            profilePicPreview.innerHTML = `<img src="${newProfilePicDataUrl}" alt="Pratinjau Foto Profil">`;
        };
        reader.onerror = () => {
            alert('Gagal membaca file gambar.');
        };
    });

    // 5. Saat Tombol "Simpan Perubahan" di-klik
    settingsForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const newFirstName = firstNameInput.value;
        const newLastName = lastNameInput.value;

        // Update data di objek currentUser
        currentUser.firstName = newFirstName;
        currentUser.lastName = newLastName;
        if (newProfilePicDataUrl) {
            currentUser.profilePic = newProfilePicDataUrl;
        }

        // Simpan kembali ke localStorage (user yang sedang login)
        localStorage.setItem('metube_currentUser', JSON.stringify(currentUser));

        // Update juga di daftar user utama (metube_users)
        const users = JSON.parse(localStorage.getItem('metube_users')) || [];
        const userIndex = users.findIndex(user => user.username === currentUser.username);
        
        if (userIndex !== -1) {
            users[userIndex] = currentUser; // Ganti data lama dengan data baru
            localStorage.setItem('metube_users', JSON.stringify(users));
        }

        // Tampilkan pesan sukses
        successMessage.textContent = 'Perubahan berhasil disimpan!';
        
        // Refresh header (cara sederhana)
        // Kita bisa membuat fungsi update header di global.js, tapi reload lebih mudah
        setTimeout(() => {
            window.location.reload(); 
        }, 1500);
    });

    // Jalankan inisialisasi
    initPage();
});