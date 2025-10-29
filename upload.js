// File: upload.js
// Mengurus logika di halaman upload.html

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Cek Login
    const currentUserJson = localStorage.getItem('metube_currentUser');
    if (!currentUserJson) {
        // Jika tidak ada user login, tendang ke halaman signin
        window.location.href = 'signin.html';
        return;
    }
    // Ambil data user yang sedang login
    const currentUser = JSON.parse(currentUserJson);

    // Ambil elemen form
    const uploadForm = document.getElementById('upload-form');
    const successMessage = document.getElementById('upload-success');
    const errorMessage = document.getElementById('upload-error');

    // 2. Tambahkan listener ke form
    uploadForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Mencegah reload halaman
        
        successMessage.textContent = '';
        errorMessage.textContent = '';

        // Ambil data dari form
        const id = document.getElementById('videoId').value.trim();
        const title = document.getElementById('videoTitle').value.trim();
        // Nama channel tidak lagi diambil dari form
        const category = document.getElementById('videoCategory').value;

        if (!id || !title) {
            errorMessage.textContent = 'ID Video dan Judul Video harus diisi.';
            return;
        }

        // 3. Buat objek video baru (DIPERBARUI)
        const newVideo = {
            id: id,
            title: title,
            channel: `${currentUser.firstName} ${currentUser.lastName}`, // Otomatis
            uploaderUsername: currentUser.username, // Otomatis
            category: category
        };

        try {
            // 4. Ambil data video yang ada
            const allVideoData = getVideoData();

            // 5. Tambahkan video baru ke kategori yang dipilih
            if (!allVideoData[category]) {
                allVideoData[category] = [];
            }
            // Tambahkan di awal array (agar muncul paling atas)
            allVideoData[category].unshift(newVideo);

            // 6. Simpan kembali data yang sudah diperbarui
            saveVideoData(allVideoData);

            // 7. Beri pesan sukses dan reset form
            successMessage.textContent = 'Video berhasil ditambahkan!';
            uploadForm.reset();

            // 8. Arahkan kembali ke beranda setelah 2 detik
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);

        } catch (error) {
            console.error('Gagal menyimpan video:', error);
            errorMessage.textContent = 'Terjadi kesalahan saat menyimpan video.';
        }
    });
});