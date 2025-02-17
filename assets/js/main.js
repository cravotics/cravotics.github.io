/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 


/*===== CV DOWNLOAD FUNCTION =====*/
document.getElementById('download-cv').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default link behavior
    const cvFilePath = 'assets/docs/Sai_Jagadeesh_Muralikrishnan_CV.pdf'; // Make sure the path is correct
    const link = document.createElement('a');
    link.href = cvFilePath;
    link.download = 'Sai_Jagadeesh_CV.pdf'; // Renaming downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const button = document.getElementById("button");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevents default form submission

        button.innerText = "Sending..."; // Change button text while sending
        button.disabled = true; // Disable button during submission

        const serviceID = "service_4him7fb"; // Your EmailJS Service ID
        const templateID = "template_blal98i"; // Your EmailJS Template ID

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                button.innerText = "Send Message 🚀";
                button.disabled = false;
                alert("Message sent successfully! ✅");
                form.reset(); // Reset form after submission
            })
            .catch((err) => {
                button.innerText = "Send Message 🚀";
                button.disabled = false;
                alert("Oops! Something went wrong. Please try again.");
                console.error("EmailJS Error:", err);
            });
    });
});

// Award Certificate Click to Zoom
document.addEventListener("DOMContentLoaded", function () {
    const certificateImage = document.getElementById("certificateImage");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
  
    certificateImage.addEventListener("click", function () {
      lightbox.classList.add("active");
    });
  
    lightbox.addEventListener("click", function () {
      lightbox.classList.remove("active");
    });
  });
  