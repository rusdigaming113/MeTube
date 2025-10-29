// File: watch.js (Diperbarui)

document.addEventListener('DOMContentLoaded', () => {

    // --- DATA VIDEO ---
    const allVideoData = getVideoData();
    // PERBARUI 'allVideos' untuk memasukkan 'nonKategori'
    const allVideos = [
        ...(allVideoData.home || []), 
        ...(allVideoData.recommendation || []), 
        ...(allVideoData.noCopyright || []),
        ...(allVideoData.nonKategori || []) // <-- BARIS INI DITAMBAHKAN
    ];

    // Mengambil elemen dari HTML
    const mainVideoPlayer = document.getElementById('main-video-player');
    const mainVideoTitle = document.getElementById('main-video-title');
    const mainVideoChannelContainer = document.getElementById('main-video-channel');
    const videoList = document.getElementById('video-list');


    /**
     * Fungsi untuk memuat video utama di pemutar.
     */
    function loadMainVideo(video) {
        mainVideoPlayer.innerHTML = `
            <iframe 
                src="https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        `;
        mainVideoTitle.textContent = video.title;
        
        if (video.uploaderUsername) {
            mainVideoChannelContainer.innerHTML = `
                <a href="channel.html?user=${video.uploaderUsername}" class="main-channel-link">${video.channel}</a>
            `;
        } else {
            mainVideoChannelContainer.textContent = video.channel;
        }
        
        document.title = `${video.title} - MeTube`;
    }

    /**
     * Fungsi untuk mengisi daftar video di sidebar.
     */
    function populateVideoList(videoArray) {
        videoList.innerHTML = ''; 
        videoArray.forEach(video => {
            const item = document.createElement('div');
            item.classList.add('video-item');
            
            item.innerHTML = `
                <a href="watch.html?id=${video.id}" class="sidebar-thumb-link">
                    <img src="https://img.youtube.com/vi/${video.id}/mqdefault.jpg" alt="${video.title}">
                </a>
                <div class="video-info">
                    <a href="watch.html?id=${video.id}" class="sidebar-title-link">
                        <h4>${video.title}</h4>
                    </a>
                    <a href="channel.html?user=${video.uploaderUsername}" class="sidebar-channel-link">
                        <p>${video.channel}</p>
                    </a>
                </div>
            `;
            videoList.appendChild(item);
        });
    }

    /**
     * Fungsi untuk mendapatkan parameter ID dari URL
     */
    function getVideoIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }

    
    // --- INISIALISASI ---
    const videoId = getVideoIdFromUrl();
    let videoToLoad = null;

    if (videoId) {
        videoToLoad = allVideos.find(video => video.id === videoId);
    }

    if (videoToLoad) {
        loadMainVideo(videoToLoad);
    } else if (allVideos.length > 0) {
        loadMainVideo(allVideos[0]);
    } else {
        mainVideoTitle.textContent = 'Tidak ada video';
        mainVideoChannelContainer.textContent = 'Silakan upload video terlebih dahulu.';
    }

    // Filter video 'Berikutnya' agar tidak menampilkan video yang sedang diputar
    // dan juga tidak menampilkan video 'Non Kategori' di sidebar
    const nextVideos = allVideos.filter(video => 
        video.id !== videoId && // Bukan video yg sedang diputar
        (allVideoData.nonKategori || []).find(v => v.id === video.id) === undefined // Bukan video non-kategori
    );
    populateVideoList(nextVideos);

});