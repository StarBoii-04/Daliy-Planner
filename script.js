document.addEventListener("DOMContentLoaded", () => {
    
    const testimonials = document.querySelectorAll(".testimonial")
    let currentTestimonial = 0
  
    function showTestimonial(index) {
      testimonials.forEach((testimonial, i) => {
        if (i === index) {
          testimonial.style.opacity = "1"
        } else {
          testimonial.style.opacity = "0.5"
        }
      })
    }
  
   
    if (testimonials.length > 0) {
      showTestimonial(currentTestimonial)
  
      
      setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length
        showTestimonial(currentTestimonial)
      }, 5000)
    }
  
    
    const menuToggle = document.querySelector(".menu-toggle")
    const navMenu = document.querySelector("nav ul")
  
    if (menuToggle && navMenu) {
      menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active")
      })
    }
  
    
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          })
        }
      })
    })
  })
  