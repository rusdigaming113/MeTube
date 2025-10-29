// File: global.js (Diperbarui)

document.addEventListener('DOMContentLoaded', () => {
    const headerUserContainer = document.getElementById('header-user');
    const uploadIconLink = document.getElementById('upload-icon-link');
    const searchForm = document.getElementById('search-form'); // <-- BARU
    
    // --- Logika Login/Profil (Tetap Sama) ---
    const currentUserJSON = localStorage.getItem('metube_currentUser');
    if (currentUserJSON) {
        const currentUser = JSON.parse(currentUserJSON);
        showProfileIcon(headerUserContainer, currentUser);
        showUploadIcon(uploadIconLink);
    } else {
        showSignInButton(headerUserContainer);
        if (uploadIconLink) {
            uploadIconLink.style.display = 'none';
        }
    }

    // --- Logika Search Bar (BARU) ---
    if (searchForm) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Mencegah form me-reload halaman
            const searchInput = document.getElementById('search-input');
            const query = searchInput.value.trim();
            
            if (query) {
                // Arahkan ke halaman search.html dengan query
                window.location.href = `search.html?q=${encodeURIComponent(query)}`;
            }
        });
    }
});

// --- Fungsi showUploadIcon (Tetap Sama) ---
function showUploadIcon(container) {
    if (!container) return;
    container.innerHTML = `
        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" width="24" height="24" fill="white">
            <path d="M14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2zm3-7H7v1h10V6zM20 4H4v1h16V4zM22 9H2v12h20V9zM3 10h18v10H3V10z"></path>
        </svg>
    `;
    container.href = 'upload.html';
}

// --- Fungsi showSignInButton (Tetap Sama) ---
function showSignInButton(container) {
    if (!container) return;
    container.innerHTML = `
        <a href="signin.html" class="signin-button">
            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" width="24" height="24" style="fill: #FF0000;">
                <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,6c2.21,0,4,1.79,4,4s-1.79,4-4,4 s-4-1.79-4-4S9.79,6,12,6z M12,20c-2.42,0-4.63-0.91-6.3-2.38C7.11,15.93,9.83,15,12,15s4.89,0.93,6.3,2.62 C16.63,19.09,14.42,20,12,20z"></path>
            </svg>
            <span>Sign In</span>
        </a>
    `;
}

// --- Fungsi showProfileIcon (Tetap Sama) ---
function showProfileIcon(container, user) {
    if (!container) return;
    let iconContent;
    if (user.profilePic) {
        iconContent = `<img src="${user.profilePic}" class="profile-pic-img" alt="Foto Profil">`;
    } else {
        iconContent = user.firstName ? user.firstName[0].toUpperCase() : 'M';
    }

    let largeIconContent;
    if (user.profilePic) {
        largeIconContent = `<img src="${user.profilePic}" class="profile-pic-img" alt="Foto Profil">`;
    } else {
        largeIconContent = user.firstName ? user.firstName[0].toUpperCase() : 'M';
    }

    container.innerHTML = `
        <div class="profile-menu">
            <button class="profile-icon-button" id="profile-icon-button">
                <div class="profile-icon">${iconContent}</div>
            </button>
            <div class="profile-dropdown" id="profile-dropdown">
                <div class="dropdown-header">
                    <div class="profile-icon large">${largeIconContent}</div>
                    <div class="user-info">
                        <strong>${user.firstName} ${user.lastName}</strong>
                        <p>${user.email}</p>
                    </div>
                </div>
                <a href="account.html" class="dropdown-item">
                    Setelan Akun
                </a>
                <a href="#" id="signout-button" class="dropdown-item">
                    Sign Out
                </a>
            </div>
        </div>
    `;

    const iconButton = document.getElementById('profile-icon-button');
    const dropdown = document.getElementById('profile-dropdown');

    if (iconButton && dropdown) {
        iconButton.addEventListener('click', () => {
            dropdown.classList.toggle('active');
        });

        window.addEventListener('click', (event) => {
            if (!iconButton.contains(event.target) && !dropdown.contains(event.target)) {
                dropdown.classList.remove('active');
            }
        });
    }

    document.getElementById('signout-button').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('metube_currentUser');
        window.location.href = 'index.html';
    });
}