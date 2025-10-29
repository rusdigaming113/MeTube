// File: channel.js
// Mengurus logika di halaman channel.html

document.addEventListener('DOMContentLoaded', () => {

    const channelHeader = document.getElementById('channel-header');
    const videoGrid = document.getElementById('channel-video-grid');

    // 1. Dapatkan info user dari URL
    const params = new URLSearchParams(window.location.search);
    const targetUsername = params.get('user');
    
    if (!targetUsername) {
        channelHeader.innerHTML = '<h2>Channel tidak ditemukan.</h2>';
        return;
    }

    // 2. Dapatkan data user pemilik channel
    const allUsers = JSON.parse(localStorage.getItem('metube_users')) || [];
    const targetUser = allUsers.find(user => user.username === targetUsername); 
    
    // 3. Hitung jumlah followers (BARU)
    // Ini berfungsi untuk user nyata DAN channel default (hasilnya akan 0)
    const followerCount = getFollowerCount(targetUsername);

    if (!targetUser) {
        // Tampilkan header channel default
        renderBasicChannelHeader(targetUsername, followerCount);
    } else {
        // Tampilkan header channel user penuh
        renderFullChannelHeader(targetUser, followerCount); 
        renderChannelActions(targetUser); 
    }

    // 4. Muat video-video milik channel ini
    loadChannelVideos(targetUsername);

});


/**
 * Merender header channel untuk user yang terdaftar
 * DIPERBARUI: Menerima 'followerCount'
 */
function renderFullChannelHeader(user, followerCount) {
    const channelHeader = document.getElementById('channel-header');
    
    let iconContent;
    if (user.profilePic) {
        iconContent = `<img src="${user.profilePic}" class="profile-pic-img" alt="Foto Profil">`;
    } else {
        iconContent = user.firstName[0].toUpperCase();
    }

    channelHeader.innerHTML = `
        <div class="channel-info">
            <div class="profile-icon large">${iconContent}</div>
            <div class="channel-name">
                <h2>${user.firstName} ${user.lastName}</h2>
                <p>@${user.username} • ${followerCount} Followers</p>
            </div>
        </div>
        <div class="channel-actions" id="channel-actions"></div>
    `;
    document.title = `${user.firstName} ${user.lastName} - MeTube`;
}

/**
 * Merender header channel untuk channel default
 * DIPERBARUI: Menerima 'followerCount'
 */
function renderBasicChannelHeader(channelName, followerCount) {
    const channelHeader = document.getElementById('channel-header');
    const initial = channelName[0] ? channelName[0].toUpperCase() : '?';
    
    channelHeader.innerHTML = `
        <div class="channel-info">
            <div class="profile-icon large">${initial}</div>
            <div class="channel-name">
                <h2>${channelName}</h2>
                <p>Channel (Default) • ${followerCount} Followers</p>
            </div>
        </div>
        <div class="channel-actions" id="channel-actions"></div>
    `;
    document.title = `${channelName} - MeTube`;
}


/**
 * Menampilkan tombol Follow, Unfollow, atau Edit Profile
 */
function renderChannelActions(targetUser) {
    const channelActions = document.getElementById('channel-actions');
    const currentUser = JSON.parse(localStorage.getItem('metube_currentUser'));

    if (!targetUser || !currentUser) {
        channelActions.innerHTML = '';
        return;
    }

    if (currentUser.username === targetUser.username) {
        channelActions.innerHTML = `
            <a href="account.html" class="follow-button edit-button">Kustomisasi Channel</a>
        `;
    } else {
        const following = isFollowing(currentUser.username, targetUser.username);
        if (following) {
            channelActions.innerHTML = `
                <button class="follow-button active" id="follow-toggle-btn">Mengikuti</button>
            `;
        } else {
            channelActions.innerHTML = `
                <button class="follow-button" id="follow-toggle-btn">Follow</button>
            `;
        }
        
        document.getElementById('follow-toggle-btn').addEventListener('click', () => {
            handleFollowToggle(targetUser);
        });
    }
}

/**
 * Menangani klik pada tombol follow/unfollow
 */
function handleFollowToggle(targetUser) {
    const currentUser = JSON.parse(localStorage.getItem('metube_currentUser'));
    
    toggleFollow(currentUser.username, targetUser.username);
    
    // --- PEMBARUAN PENTING ---
    // Setelah follow/unfollow, kita perlu update hitungan followers
    // Cara termudah adalah me-reload halaman channel
    window.location.reload();
    
    // Cara yang lebih rumit (tanpa reload) akan membutuhkan pembaruan
    // teks <p> secara manual, tapi reload lebih sederhana dan pasti.
}


/**
 * Memuat dan menampilkan video yang di-upload oleh user ini
 */
function loadChannelVideos(username) {
    const videoGrid = document.getElementById('channel-video-grid');
    const allVideoData = getVideoData();
    const allVideos = [
        ...(allVideoData.home || []),
        ...(allVideoData.recommendation || []),
        ...(allVideoData.noCopyright || []),
        ...(allVideoData.nonKategori || [])
    ];

    const userVideos = allVideos.filter(video => 
        video.uploaderUsername === username || video.channel === username
    );

    videoGrid.innerHTML = '';

    if (userVideos.length === 0) {
        videoGrid.innerHTML = '<p>Channel ini belum meng-upload video.</p>';
        return;
    }

    userVideos.forEach(video => {
        const itemLink = document.createElement('a');
        itemLink.classList.add('grid-item-link');
        itemLink.href = `watch.html?id=${video.id}`;
        itemLink.innerHTML = `
            <img class="grid-item-thumbnail" src="https://img.youtube.com/vi/${video.id}/mqdefault.jpg" alt="${video.title}">
            <div class="grid-item-info">
                <h4>${video.title}</h4>
                <p>${video.channel}</p> 
            </div>
        `;
        videoGrid.appendChild(itemLink);
    });
}