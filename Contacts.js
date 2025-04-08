import React from 'react';

const Contacts = () => {
    return (
        <main className="container">
            <section className="contact-section">
                <h2>Контакти</h2>
                <p><strong>📞 Телефон:</strong> 0888 123 456</p>
                <p><strong>📧 Имейл:</strong> info@autoservice.bg</p>
                <p><strong>🏢 Адрес:</strong> гр. Варна, ул. Сервизна №10</p>
                <iframe
                    title="Google Maps"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2934.0293087997144!2d27.9165!3d43.2141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a453c1ec2b9435%3A0x69b6d184b5c7c3e4!2z0JLQtdC90LjQutCw0YDQvdC-0Lkg0LrQuNC10L3QsA!5e0!3m2!1sbg!2sbg!4v1711822800000"
                    width="100%"
                    height="300"
                    style={{ border: 0, marginTop: '20px', borderRadius: '8px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </section>
        </main>
    );
};

export default Contacts;
