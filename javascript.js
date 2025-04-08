document.addEventListener('DOMContentLoaded', () => {
    function togglePasswordVisibility(passwordField, checkbox) {
        if (passwordField && checkbox) {
            checkbox.addEventListener('change', () => {
                passwordField.type = checkbox.checked ? 'text' : 'password';
            });
        }
    }

    // Вход
    const passwordFieldLogin = document.getElementById('password');
    if (passwordFieldLogin) {
        const togglePasswordCheckboxLogin = document.createElement('input');
        togglePasswordCheckboxLogin.type = 'checkbox';
        togglePasswordCheckboxLogin.id = 'toggle-password-checkbox-login';

        const checkboxLabelLogin = document.createElement('label');
        checkboxLabelLogin.setAttribute('for', 'toggle-password-checkbox-login');
        checkboxLabelLogin.textContent = 'Показване на паролата';

        passwordFieldLogin.insertAdjacentElement('afterend', checkboxLabelLogin);
        passwordFieldLogin.insertAdjacentElement('afterend', togglePasswordCheckboxLogin);

        togglePasswordVisibility(passwordFieldLogin, togglePasswordCheckboxLogin);
    }

    // Регистрация
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const username = document.getElementById('reg-username').value;
            const password = document.getElementById('reg-password').value;

            if (!username || !password) {
                Swal.fire({ text: 'Моля, попълнете всички полета.' });
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password })
                });

                const data = await response.json();
                Swal.fire({ text: data.message || data.error });

            } catch (error) {
                Swal.fire({ text: 'Грешка при регистрацията.' });
            }
        });
    }

    // Вход
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
    
            const email = document.getElementById('username').value;
            const password = document.getElementById('password').value;
    
            try {
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: email, password }) // Използвам username за API-то, но входът остава с имейл
                });
    
                // Проверяваме дали отговорът е JSON, ако не - хвърляме грешка
                if (!response.ok) {
                    throw new Error(`HTTP грешка: ${response.status}`);
                }
    
                const data = await response.json();
    
                if (data.token) {
                    Swal.fire({ text: 'Влязохте успешно!' });
                    localStorage.setItem('token', data.token);
                    window.location.href = "dashboard.html"; // Пренасочване към админ панела
                } else {
                    throw new Error(data.error || 'Грешка при влизане');
                }
            } catch (error) {
                Swal.fire({ text: error.message });
            }
        });
    }    

    // Администратор
   // Администраторски вход с имейл
const adminEmail = 'admin@autoservice.bg';
const adminPassword = 'admin123456.';
const loginSection = document.getElementById('login');
const registerSection = document.getElementById('register');
const adminPanel = document.getElementById('admin-panel');
const adminContent = document.getElementById('admin-content');

if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (email === adminEmail && password === adminPassword) {
            Swal.fire({ text: 'Успешен вход като администратор!' });
            loginSection.style.display = 'none';
            registerSection.style.display = 'none';
            adminPanel.style.display = 'block';
        } else {
            Swal.fire({ text: 'Грешен имейл или парола. Моля, опитайте отново.' });
        }
    });
}

    // Админ бутоните
    const viewAppointments = document.getElementById('view-appointments');
    const viewClients = document.getElementById('view-clients');
    const logoutButton = document.getElementById('logout');

    if (viewAppointments) {
        viewAppointments.addEventListener('click', () => {
            adminContent.innerHTML = '<h3>Записани часове</h3><p>Тук ще се показват всички записани часове.</p>';
        });
    }

    if (viewClients) {
        viewClients.addEventListener('click', () => {
            adminContent.innerHTML = '<h3>Информация за клиенти</h3><p>Тук ще се показва информация за клиенти и техните автомобили.</p>';
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            Swal.fire({ text: 'Излязохте от системата.' });
            adminPanel.style.display = 'none';
            loginSection.style.display = 'block';
            registerSection.style.display = 'block';
        });
    }
});
