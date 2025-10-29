// File: video-manager.js
// Bertugas mengelola data video di localStorage

// 1. Data video default Anda (DIPERBARUI)
const DEFAULT_VIDEO_DATA = {
    home: [
        { id: '3JZ_D3ELwOQ', title: 'Google I/O 2024 Keynote', channel: 'Google', uploaderUsername: 'google' },
        { id: 's49v93_0dFw', title: 'Lofi Hip Hop Radio - Beats to Relax/Study to', channel: 'Lofi Girl', uploaderUsername: 'lofigirl' },
        { id: 'M5QY2_8704o', title: 'Coffee Shop Radio ☕ - 24/7 Lo-fi Hip-Hop Beats', channel: 'STEEZYASFUCK', uploaderUsername: 'steezyasfuck' }
    ],
    recommendation: [
        { id: 'uYPbbksJxIg', title: 'Oppenheimer | Official Trailer', channel: 'Universal Pictures', uploaderUsername: 'universal' },
        { id: '9T01sQGf-ko', title: 'iPhone 15 Pro Review: The Good, The Bad, and The iPhone 14.', channel: 'MKBHD', uploaderUsername: 'mkbhd' },
        { id: 'd2iY0sBi-Gg', title: 'Planet Earth III | Official Trailer', channel: 'BBC', uploaderUsername: 'bbc' }
    ],
    noCopyright: [
        { id: 'bM7SZ5SBzyY', title: 'DEAF KEV - Invincible [NCS Release]', channel: 'NoCopyrightSounds', uploaderUsername: 'ncs' },
        { id: 'MkNeIUgNPQ8', title: 'A HIMITSU - Adventures', channel: 'Audio Library', uploaderUsername: 'audiolibrary' },
        { id: 'dux8sPftVs8', title: 'THBD - Good For You', channel: 'Audio Library', uploaderUsername: 'audiolibrary' }
    ],
    nonKategori: [] // <-- KATEGORI BARU DITAMBAHKAN
};

/**
 * Fungsi ini menginisialisasi data video.
 * Jika 'metube_videos' belum ada di localStorage, ia akan membuatnya.
 */
function initVideoData() {
    const existingData = localStorage.getItem('metube_videos');
    if (!existingData) {
        // Data belum ada, simpan data default
        localStorage.setItem('metube_videos', JSON.stringify(DEFAULT_VIDEO_DATA));
    } else {
        // PERBAIKAN: Jika data sudah ada, cek apakah 'nonKategori' ada. Jika tidak, tambahkan.
        // Ini untuk user yang sudah memakai versi lama.
        const data = JSON.parse(existingData);
        if (!data.nonKategori) {
            data.nonKategori = [];
            localStorage.setItem('metube_videos', JSON.stringify(data));
        }
    }
}

/**
 * Fungsi untuk mengambil SEMUA data video dari localStorage
 * @returns {object} Objek data video
 */
function getVideoData() {
    const videoData = localStorage.getItem('metube_videos');
    if (!videoData) {
        initVideoData();
        return DEFAULT_VIDEO_DATA;
    }
    return JSON.parse(videoData);
}

/**
 * Fungsi untuk menyimpan data video yang sudah diperbarui ke localStorage
 * @param {object} data Objek data video yang lengkap
 */
function saveVideoData(data) {
    localStorage.setItem('metube_videos', JSON.stringify(data));
}

// Langsung panggil inisialisasi saat script ini dimuat
initVideoData();