// File: home.js (Diperbarui)

document.addEventListener('DOMContentLoaded', () => {

    // --- DATA VIDEO ---
    const allVideoData = getVideoData();

    // Mengambil elemen grid dari HTML
    const gridHome = document.getElementById('grid-home');
    const gridRecommendation = document.getElementById('grid-recommendation');
    const gridNoCopyright = document.getElementById('grid-nocopyright');

    /**
     * Fungsi untuk mengisi grid video di Beranda.
     * @param {HTMLElement} gridElement - Elemen grid
     * @param {Array} videoArray - Array video yang akan ditampilkan
     */
    function populateVideoGrid(gridElement, videoArray) {
        if (!gridElement) return;
        gridElement.innerHTML = ''; 

        if (!videoArray || videoArray.length === 0) {
            gridElement.innerHTML = '<p>Belum ada video di kategori ini.</p>';
            return;
        }

        videoArray.forEach(video => {
            const itemContainer = document.createElement('div'); // Kontainer untuk link
            itemContainer.classList.add('grid-item-container');

            // Link untuk thumbnail (ke halaman nonton)
            const itemLink = document.createElement('a');
            itemLink.classList.add('grid-item-link');
            itemLink.href = `watch.html?id=${video.id}`;
            itemLink.innerHTML = `
                <img class="grid-item-thumbnail" src="https://img.youtube.com/vi/${video.id}/mqdefault.jpg" alt="${video.title}">
                <div class="grid-item-info">
                    <h4>${video.title}</h4>
                </div>
            `;
            
            // Link untuk channel (ke halaman channel) - (BARU)
            const channelLink = document.createElement('a');
            channelLink.classList.add('grid-item-channel-link');
            // Pastikan video.uploaderUsername ada
            if (video.uploaderUsername) { 
                channelLink.href = `channel.html?user=${video.uploaderUsername}`;
            } else {
                channelLink.href = '#'; // Link mati jika tidak ada username
            }
            channelLink.textContent = video.channel; // Tampilkan nama channel

            // Gabungkan
            itemLink.querySelector('.grid-item-info').appendChild(channelLink);
            itemContainer.appendChild(itemLink);
            gridElement.appendChild(itemContainer);
        });
    }

    // --- INISIALISASI ---
    populateVideoGrid(gridHome, allVideoData.home);
    populateVideoGrid(gridRecommendation, allVideoData.recommendation);
    populateVideoGrid(gridNoCopyright, allVideoData.noCopyright);

});