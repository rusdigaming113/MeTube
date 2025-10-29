// Menunggu sampai seluruh halaman HTML selesai dimuat
document.addEventListener('DOMContentLoaded', () => {

    // --- TEMPAT MEMASUKKAN VIDEO (LEWAT KODINGAN) ---
    // Data video sekarang dipisah berdasarkan kategori
    
    const allVideoData = {
        home: [
            {
                id: '3JZ_D3ELwOQ',
                title: 'Google I/O 2024 Keynote',
                channel: 'Google'
            },
            {
                id: 's49v93_0dFw',
                title: 'Lofi Hip Hop Radio - Beats to Relax/Study to',
                channel: 'Lofi Girl'
            },
            {
                id: 'M5QY2_8704o',
                title: 'Coffee Shop Radio ☕ - 24/7 Lo-fi Hip-Hop Beats',
                channel: 'STEEZYASFUCK'
            }
        ],
        recommendation: [
            {
                id: 'uYPbbksJxIg',
                title: 'Oppenheimer | Official Trailer',
                channel: 'Universal Pictures'
            },
            {
                id: '9T01sQGf-ko',
                title: 'iPhone 15 Pro Review: The Good, The Bad, and The iPhone 14.',
                channel: 'MKBHD'
            },
            {
                id: 'd2iY0sBi-Gg',
                title: 'Planet Earth III | Official Trailer',
                channel: 'BBC'
            }
        ],
        noCopyright: [
            {
                id: 'bM7SZ5SBzyY',
                title: 'DEAF KEV - Invincible [NCS Release]',
                channel: 'NoCopyrightSounds'
            },
            {
                id: 'MkNeIUgNPQ8',
                title: 'A HIMITSU - Adventures',
                channel: 'Audio Library'
            },
            {
                id: 'dux8sPftVs8',
                title: 'THBD - Good For You',
                channel: 'Audio Library'
            }
        ]
    };

    // --- AKHIR TEMPAT MEMASUKKAN VIDEO ---


    // Mengambil elemen dari HTML
    const mainVideoPlayer = document.getElementById('main-video-player');
    const mainVideoTitle = document.getElementById('main-video-title');
    const mainVideoChannel = document.getElementById('main-video-channel');
    const videoList = document.getElementById('video-list');

    // Mengambil elemen Navbar
    const navHome = document.getElementById('nav-home');
    const navRecommendation = document.getElementById('nav-recommendation');
    const navNoCopyright = document.getElementById('nav-nocopyright');
    const allNavLinks = document.querySelectorAll('.nav-link');


    /**
     * Fungsi untuk memuat video utama di pemutar.
     * @param {object} video - Objek video dari array videoData.
     */
    function loadMainVideo(video) {
        if (!video) {
            mainVideoPlayer.innerHTML = `<p style="padding: 20px;">Tidak ada video di kategori ini.</p>`;
            mainVideoTitle.textContent = 'Tidak ada video';
            mainVideoChannel.textContent = '';
            return;
        }

        mainVideoPlayer.innerHTML = `
            <iframe 
                src="https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        `;
        
        mainVideoTitle.textContent = video.title;
        mainVideoChannel.textContent = video.channel;
    }

    /**
     * Fungsi untuk mengisi daftar video di sidebar.
     * @param {Array} videoArray - Array video yang akan ditampilkan (misal: allVideoData.home)
     */
    function populateVideoList(videoArray) {
        // Membersihkan daftar video sebelumnya
        videoList.innerHTML = ''; 

        // Loop melalui setiap video di array yang diberikan
        videoArray.forEach(video => {
            const item = document.createElement('div');
            item.classList.add('video-item');
            item.innerHTML = `
                <img src="https://img.youtube.com/vi/${video.id}/mqdefault.jpg" alt="${video.title}">
                <div class="video-info">
                    <h4>${video.title}</h4>
                    <p>${video.channel}</p>
                </div>
            `;
            item.addEventListener('click', () => {
                loadMainVideo(video);
            });
            videoList.appendChild(item);
        });
    }
    
    /**
     * Fungsi untuk menangani status 'active' pada navbar
     * @param {HTMLElement} clickedLink - Elemen link yang diklik
     */
    function updateActiveNavLink(clickedLink) {
        // Hapus kelas 'active' dari semua link
        allNavLinks.forEach(link => {
            link.classList.remove('active');
        });
        // Tambahkan kelas 'active' ke link yang baru saja diklik
        clickedLink.classList.add('active');
    }

    
    // --- EVENT LISTENERS UNTUK NAVBAR ---

    navHome.addEventListener('click', (e) => {
        e.preventDefault(); // Mencegah link pindah halaman
        updateActiveNavLink(navHome);
        const videos = allVideoData.home;
        populateVideoList(videos);
        loadMainVideo(videos[0]);
    });

    navRecommendation.addEventListener('click', (e) => {
        e.preventDefault();
        updateActiveNavLink(navRecommendation);
        const videos = allVideoData.recommendation;
        populateVideoList(videos);
        loadMainVideo(videos[0]);
    });

    navNoCopyright.addEventListener('click', (e) => {
        e.preventDefault();
        updateActiveNavLink(navNoCopyright);
        const videos = allVideoData.noCopyright;
        populateVideoList(videos);
        loadMainVideo(videos[0]);
    });


    // --- INISIALISASI ---
    // Memuat daftar video 'home' saat halaman pertama kali dibuka
    const initialVideos = allVideoData.home;
    populateVideoList(initialVideos);
    loadMainVideo(initialVideos[0]);

});