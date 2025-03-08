
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const nameForm = document.getElementById('name-form');
const nameInput = document.getElementById('name-input');
const submitNameBtn = document.getElementById('submit-name');
const messageForm = document.getElementById('message-form');
const modal = document.getElementById('submission-modal');
const closeModal = document.querySelector('.close-modal');
const submissionDetails = document.getElementById('submission-details');

if (hamburger) {
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
  });
}


if (submitNameBtn) {
  submitNameBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name) {
      localStorage.setItem('visitorName', name);
      visitorName.textContent = name;
      nameForm.style.display = 'none';
    } else {
      alert('Please enter your name');
    }
  });
}


document.addEventListener('DOMContentLoaded', () => {
  const savedName = localStorage.getItem('visitorName');
  if (savedName && visitorName) {
    visitorName.textContent = savedName;
    if (nameForm) {
      nameForm.style.display = 'none';
    }
  }
});


if (messageForm) {

  const validateName = (name) => {
    if (name.length < 2) {
      return 'Name must be at least 2 characters';
    }
    return '';
  };

  const validateEmail = (email) => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validateSubject = (subject) => {
    if (subject.length < 3) {
      return 'Subject must be at least 3 characters';
    }
    return '';
  };

  const validateMessage = (message) => {
    if (message.length < 10) {
      return 'Message must be at least 10 characters';
    }
    return '';
  };


  const showError = (fieldId, message) => {
    const errorElement = document.getElementById(`${fieldId}-error`);
    const inputElement = document.getElementById(fieldId);

    if (errorElement && inputElement) {
      errorElement.textContent = message;
      errorElement.style.display = message ? 'block' : 'none';
      inputElement.style.borderColor = message ? 'var(--error-color)' : 'var(--medium-grey)';
    }

    return message === '';
  };


  messageForm.addEventListener('submit', (e) => {
    e.preventDefault();


    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');


    const nameValid = showError('name', validateName(nameField.value.trim()));
    const emailValid = showError('email', validateEmail(emailField.value.trim()));
    const subjectValid = showError('subject', validateSubject(subjectField.value.trim()));
    const messageValid = showError('message', validateMessage(messageField.value.trim()));


    if (nameValid && emailValid && subjectValid && messageValid) {

      const formData = {
        name: nameField.value.trim(),
        email: emailField.value.trim(),
        subject: subjectField.value.trim(),
        message: messageField.value.trim(),
        timestamp: new Date().toLocaleString(),
      };


      submissionDetails.innerHTML = `
                <div class="form-submission">
                    <p><strong>Name:</strong> ${formData.name}</p>
                    <p><strong>Email:</strong> ${formData.email}</p>
                    <p><strong>Subject:</strong> ${formData.subject}</p>
                    <p><strong>Message:</strong> ${formData.message}</p>
                    <p><strong>Submitted at:</strong> ${formData.timestamp}</p>
                </div>
            `;

      modal.style.display = 'flex';


      messageForm.reset();
    }
  });

  const fields = [
    { id: 'name', validator: validateName },
    { id: 'email', validator: validateEmail },
    { id: 'subject', validator: validateSubject },
    { id: 'message', validator: validateMessage },
  ];

  fields.forEach((field) => {
    const element = document.getElementById(field.id);
    if (element) {
      element.addEventListener('blur', () => {
        showError(field.id, field.validator(element.value.trim()));
      });

   
      element.addEventListener('input', () => {
        const errorElement = document.getElementById(`${field.id}-error`);
        if (errorElement) {
          errorElement.style.display = 'none';
          element.style.borderColor = 'var(--medium-grey)';
        }
      });
    }
  });
}


if (closeModal) {
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });


  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}


document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, 
        behavior: 'smooth',
      });

      
      if (hamburger && hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
      }
    }
  });
});


window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && menu.classList.contains('active')) {
    menu.classList.remove('active');
    hamburger.classList.remove('active');
  }
});


if (hamburger) {
  document.head.insertAdjacentHTML(
    'beforeend',
    `
        <style>
            @media (max-width: 768px) {
                .menu {
                    position: fixed;
                    top: 70px;
                    left: -100%;
                    width: 100%;
                    background-color: white;
                    flex-direction: column;
                    align-items: center;
                    padding: 2rem 0;
                    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
                    transition: left 0.3s ease;
                }
                
                .menu.active {
                    left: 0;
                }
                
                .menu li {
                    margin: 1rem 0;
                }
                
                .hamburger {
                    display: flex;
                }
                
                .hamburger.active span:nth-child(1) {
                    transform: translateY(7px) rotate(45deg);
                }
                
                .hamburger.active span:nth-child(2) {
                    opacity: 0;
                }
                
                .hamburger.active span:nth-child(3) {
                    transform: translateY(-7px) rotate(-45deg);
                }
                
                .contact-container {
                    grid-template-columns: 1fr;
                }
                
                .hero-content h1 {
                    font-size: 2.5rem;
                }
                
                .hero-content h2 {
                    font-size: 1.5rem;
                }
                
                .cta-buttons {
                    flex-direction: column;
                    gap: 1rem;
                }
                
                .about-content, .vm-content {
                    flex-direction: column;
                }
            }
        </style>
    `
  );
}
