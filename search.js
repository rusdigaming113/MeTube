// File: search.js
// Mengurus logika di halaman search.html

document.addEventListener('DOMContentLoaded', () => {

    const queryDisplay = document.getElementById('search-query-display');
    const resultsList = document.getElementById('search-results-list');

    // 1. Dapatkan query pencarian dari URL
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');

    if (!query) {
        queryDisplay.textContent = '...';
        resultsList.innerHTML = '<p>Anda tidak mencari apa-apa.</p>';
        return;
    }

    const queryLower = query.toLowerCase();
    queryDisplay.textContent = query;
    document.title = `Pencarian: ${query} - MeTube`;

    // 2. Cari Channel (Akun)
    const allUsers = JSON.parse(localStorage.getItem('metube_users')) || [];
    const channelResults = allUsers.filter(user => 
        user.username.toLowerCase().includes(queryLower) ||
        user.firstName.toLowerCase().includes(queryLower) ||
        user.lastName.toLowerCase().includes(queryLower)
    );

    // 3. Cari Video
    const allVideoData = getVideoData();
    // PERBARUI 'allVideos' untuk memasukkan 'nonKategori'
    const allVideos = [
        ...(allVideoData.home || []),
        ...(allVideoData.recommendation || []),
        ...(allVideoData.noCopyright || []),
        ...(allVideoData.nonKategori || []) // <-- BARIS INI DITAMBAHKAN
    ];

    const videoResults = allVideos.filter(video =>
        video.title.toLowerCase().includes(queryLower) ||
        video.channel.toLowerCase().includes(queryLower)
    );

    // 4. Render Hasil (Sisanya sama seperti sebelumnya)
    resultsList.innerHTML = ''; 

    if (channelResults.length === 0 && videoResults.length === 0) {
        resultsList.innerHTML = '<p>Tidak ada channel atau video yang cocok dengan pencarian Anda.</p>';
        return;
    }

    if (channelResults.length > 0) {
        renderChannelResults(channelResults, resultsList);
    }

    if (videoResults.length > 0) {
        renderVideoResults(videoResults, resultsList);
    }
});

/**
 * Fungsi untuk merender hasil pencarian Channel
 */
function renderChannelResults(results, container) {
    const section = document.createElement('div');
    section.innerHTML = '<h3>Channel</h3>';

    results.forEach(user => {
        const item = document.createElement('a');
        item.classList.add('search-result-item');
        item.href = `channel.html?user=${user.username}`;

        let iconContent;
        if (user.profilePic) {
            iconContent = `<img src="${user.profilePic}" class="profile-pic-img" alt="Foto Profil">`;
        } else {
            iconContent = user.firstName[0].toUpperCase();
        }

        item.innerHTML += `
            <div class="profile-icon large">${iconContent}</div>
            <div class="channel-info">
                <h4>${user.firstName} ${user.lastName}</h4>
                <p>@${user.username}</p>
            </div>
        `;
        section.appendChild(item);
    });
    container.appendChild(section);
}

/**
 * Fungsi untuk merender hasil pencarian Video
 */
function renderVideoResults(results, container) {
    const section = document.createElement('div');
    section.innerHTML = '<h3>Video</h3>';

    results.forEach(video => {
        const item = document.createElement('a');
        item.classList.add('search-result-item-video');
        item.href = `watch.html?id=${video.id}`;

        item.innerHTML = `
            <img src="https://img.youtube.com/vi/${video.id}/mqdefault.jpg" alt="${video.title}">
            <div class="video-info">
                <h4>${video.title}</h4>
                <p>${video.channel}</p>
            </div>
        `;
        section.appendChild(item);
    });
    container.appendChild(section);
}