
const ENQUIRY_ENDPOINT = "https://script.google.com/macros/s/AKfycbzbl3-NTvRsSHAb3jKyEld7UtLrSL3LIr1a-TI2uvlRzOaq5ja5JGraIIimBfeIJqXx/exec";

// Mobile navigation
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// Highlight the current page in the navigation
document.querySelectorAll('.nav a').forEach(a => {
  if (a.pathname.split('/').pop() === location.pathname.split('/').pop()) {
    a.classList.add('active');
  }
});

// Website enquiry form
const form = document.querySelector('#enquiry-form');

if (form) {
  const intro = form.parentElement.querySelector('p.muted');

  if (intro) {
    intro.textContent =
      'Complete the details below. Your enquiry will be sent directly to our team without opening an email application.';
  }

  const submitButton = form.querySelector('button[type="submit"]');

  if (submitButton) {
    submitButton.textContent = 'Send enquiry →';
  }

  // Confirmation message
  const status = document.createElement('p');
  status.className = 'form-note';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  status.style.marginTop = '12px';
  form.appendChild(status);

  // Hidden anti-spam field
  if (!form.querySelector('[name="website"]')) {
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = 'website';
    honeypot.autocomplete = 'off';
    honeypot.tabIndex = -1;
    honeypot.setAttribute('aria-hidden', 'true');
    honeypot.style.position = 'absolute';
    honeypot.style.left = '-10000px';
    form.appendChild(honeypot);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (form.dataset.submitting === 'true') return;
    if (!form.reportValidity()) return;

    form.dataset.submitting = 'true';

    if (submitButton) submitButton.disabled = true;

    status.textContent = 'Sending your enquiry...';

    // Send form fields in standard form-encoded format.
    const data = new URLSearchParams();

    new FormData(form).forEach((value, key) => {
      if (typeof value === 'string') {
        data.append(key, value);
      }
    });

    try {
      await fetch(ENQUIRY_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        body: data
      });

      status.textContent =
        'Thank you! Your enquiry has been submitted. Our team will contact you soon.';

      form.reset();

    } catch (error) {
      console.error('Enquiry submission failed:', error);

      status.textContent =
        'We could not submit your enquiry. Please try again or contact us by phone or email.';

    } finally {
      form.dataset.submitting = 'false';

      if (submitButton) submitButton.disabled = false;
    }
  });
}
