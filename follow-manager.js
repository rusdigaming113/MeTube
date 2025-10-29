// File: follow-manager.js
// Mengelola data 'follow' di localStorage

/**
 * Mengambil data follow dari localStorage.
 * Strukturnya: { "username1": ["username2", "username3"], "username2": ["username1"] }
 * @returns {object} Objek data follow.
 */
function getFollowData() {
    const data = localStorage.getItem('metube_follows');
    if (!data) {
        localStorage.setItem('metube_follows', JSON.stringify({}));
        return {};
    }
    return JSON.parse(data);
}

/**
 * Menyimpan data follow baru ke localStorage.
 * @param {object} data Objek data follow yang sudah diperbarui.
 */
function saveFollowData(data) {
    localStorage.setItem('metube_follows', JSON.stringify(data));
}

/**
 * Mengecek apakah seorang user (follower) mengikuti user lain (target).
 * @param {string} followerUsername Username yang melakukan follow.
 * @param {string} targetUsername Username yang di-follow.
 * @returns {boolean} True jika mengikuti, false jika tidak.
 */
function isFollowing(followerUsername, targetUsername) {
    const data = getFollowData();
    return data[followerUsername] && data[followerUsername].includes(targetUsername);
}

/**
 * Fungsi untuk Follow atau Unfollow seorang user.
 * @param {string} followerUsername Username yang melakukan follow.
 * @param {string} targetUsername Username yang di-follow.
 * @returns {boolean} Status follow yang baru (true jika sekarang follow, false jika unfollow).
 */
function toggleFollow(followerUsername, targetUsername) {
    const data = getFollowData();
    
    if (!data[followerUsername]) {
        data[followerUsername] = [];
    }

    const followIndex = data[followerUsername].indexOf(targetUsername);
    
    if (followIndex > -1) {
        // --- UNFOLLOW ---
        data[followerUsername].splice(followIndex, 1);
        saveFollowData(data);
        return false; 
    } else {
        // --- FOLLOW ---
        data[followerUsername].push(targetUsername);
        saveFollowData(data);
        return true; 
    }
}

/**
 * FUNGSI BARU: Menghitung jumlah followers seorang user
 * @param {string} targetUsername Username channel yang ingin dihitung followernya
 * @returns {number} Jumlah total followers
 */
function getFollowerCount(targetUsername) {
    const data = getFollowData();
    let count = 0;

    // Loop melalui setiap user di data follow
    for (const followerUsername in data) {
        // 'followerUsername' adalah user yang melakukan follow
        // 'data[followerUsername]' adalah array 'following' mereka
        if (data[followerUsername].includes(targetUsername)) {
            // Jika array 'following' mereka berisi target, tambah hitungan
            count++;
        }
    }
    return count;
}