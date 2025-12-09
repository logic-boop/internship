/* contact.js — simple form validation and password toggle
   - Real-time validation for name, email, phone (optional), message
   - Phone basic pattern: allow digits and plus, simple length check
   - Password show/hide button
*/

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const nameIn = document.getElementById('name');
    const emailIn = document.getElementById('email');
    const phoneIn = document.getElementById('phone');
    const msgIn = document.getElementById('message');
    const passIn = document.getElementById('password');

    const nameErr = document.getElementById('name-error');
    const emailErr = document.getElementById('email-error');
    const phoneErr = document.getElementById('phone-error');
    const msgErr = document.getElementById('message-error');
    const passErr = document.getElementById('password-error');
    const successEl = document.getElementById('form-success');
    const togglePass = document.getElementById('toggle-password');

    // helper validators (very simple and beginner-friendly)
    function isEmail(v) {
        // small, safe regex for email structure
        return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v);
    }
    function isPhone(v) {
        // allow + and digits, 7-15 chars
        return /^[+\\d][\\d\\s-]{6,14}$/.test(v);
    }

    // real-time listeners
    nameIn.addEventListener('input', () => {
        nameErr.textContent = nameIn.value.trim() ? '' : 'Name is required.';
    });

    emailIn.addEventListener('input', () => {
        emailErr.textContent = isEmail(emailIn.value.trim()) ? '' : 'Enter a valid email.';
    });

    phoneIn.addEventListener('input', () => {
        const v = phoneIn.value.trim();
        phoneErr.textContent = v && !isPhone(v) ? 'Enter a valid phone number.' : '';
    });

    msgIn.addEventListener('input', () => {
        msgErr.textContent = msgIn.value.trim() ? '' : 'Message is required.';
    });

    passIn && passIn.addEventListener('input', () => {
        passErr.textContent = passIn.value.length >= 6 ? '' : 'Password must be at least 6 characters.';
    });

    // password toggle
    togglePass && togglePass.addEventListener('click', () => {
        if (passIn.type === 'password') {
            passIn.type = 'text';
            togglePass.textContent = 'Hide';

        } else {
            passIn.type = 'password';
            togglePass.textContent = 'Show';
        }
    });

    // form submission (demo only)
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // final checks
        let ok = true;
        if (!nameIn.value.trim()) {
            nameErr.textContent = 'Name is required.';
            ok = false;
        }
        if (!isEmail(emailIn.value.trim())) {
            emailErr.textContent = 'Enter a valid email.';
            ok = false;
        }
        if (phoneIn.value.trim() && !isPhone(phoneIn.value.trim())) {
            phoneErr.textContent = 'Enter a valid phone number.';
            ok = false;
        }
        if (!msgIn.value.trim()) {
            msgErr.textContent = 'Message is required.';
            ok = false;
        }
        if (passIn && passIn.value.length < 6) {
            passErr.textContent = 'Password must be at least 6 characters.';
            ok = false;
        }

        if (!ok) return;

        // success (demo) — show success message and reset form
        successEl.style.display = 'block';
        form.reset();

        // hide success after a few seconds
        setTimeout(() => successEl.style.display = 'none', 6000);
    });
});
