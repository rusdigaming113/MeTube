// File: auth.js
// Mengurus logika di halaman signin.html dan signup.html

document.addEventListener('DOMContentLoaded', () => {
    
    // Cek apakah kita di halaman signup
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignUp);
    }

    // Cek apakah kita di halaman signin
    const signinForm = document.getElementById('signin-form');
    if (signinForm) {
        signinForm.addEventListener('submit', handleSignIn);
    }
});

/**
 * Mengambil semua akun 'palsu' dari localStorage
 */
function getUsers() {
    const users = localStorage.getItem('metube_users');
    return users ? JSON.parse(users) : [];
}

/**
 * Menampilkan pesan error di form
 */
function showAuthError(message) {
    const errorElement = document.getElementById('auth-error');
    errorElement.textContent = message;
}

/**
 * Logika untuk Sign Up (Daftar)
 */
function handleSignUp(event) {
    event.preventDefault(); // Mencegah form mengirim
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const username = document.getElementById('username').value.toLowerCase();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // 1. Validasi
    if (!firstName || !lastName || !username || !password) {
        return showAuthError('Semua field harus diisi.');
    }
    if (password !== confirmPassword) {
        return showAuthError('Password tidak cocok.');
    }
    if (username.includes(' ') || username.includes('@')) {
        return showAuthError('Username tidak boleh mengandung spasi atau "@".');
    }

    // 2. Cek apakah username sudah ada
    const users = getUsers();
    const userExists = users.find(user => user.username === username);

    if (userExists) {
        return showAuthError('Username ini sudah diambil. Coba yang lain.');
    }

    // 3. Simpan user baru (tanpa enkripsi, karena ini hanya mainan)
    const newUser = {
        firstName,
        lastName,
        username, // ini adalah 'testes123'
        email: `${username}@metube.com`, // ini adalah 'testes123@metube.com'
        password,
        profilePic: null // <-- INI ADALAH BARIS BARU YANG DITAMBAHKAN
    };
    
    users.push(newUser);
    localStorage.setItem('metube_users', JSON.stringify(users));

    // 4. Langsung loginkan user
    localStorage.setItem('metube_currentUser', JSON.stringify(newUser));

    // 5. Arahkan ke halaman utama
    window.location.href = 'index.html';
}

/**
 * Logika untuk Sign In (Masuk)
 */
function handleSignIn(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.toLowerCase();
    const password = document.getElementById('password').value;

    // 1. Validasi
    if (!username || !password) {
        return showAuthError('Harap masukkan username dan password.');
    }

    // 2. Cari user
    const users = getUsers();
    const foundUser = users.find(user => user.username === username && user.password === password);

    if (foundUser) {
        // 3. Jika ketemu, simpan sebagai user aktif
        localStorage.setItem('metube_currentUser', JSON.stringify(foundUser));
        // Arahkan ke halaman utama
        window.location.href = 'index.html';
    } else {
        // 4. Jika tidak ketemu, beri error
        showAuthError('Username atau password salah. Pastikan Anda hanya memasukkan username (bukan email lengkap).');
    }
}