document.addEventListener("DOMContentLoaded", () => {
    
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    const currentPage = window.location.pathname.split("/").pop()
  
    
    if (isLoggedIn) {
     
      if (currentPage === "login.html" || currentPage === "signup.html") {
        window.location.href = "planner.html"
      }
    } else {
      
      if (currentPage === "planner.html" || currentPage === "profile.html") {
        window.location.href = "login.html"
      }
    }
  
    
    const loginForm = document.getElementById("login-form")
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
  
        
        if (!email || !password) {
          alert("Please fill in all fields")
          return
        }
  
        
        simulateLogin(email, password)
      })
    }
  
    
    const signupForm = document.getElementById("signup-form")
    if (signupForm) {
      signupForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        const confirmPassword = document.getElementById("confirm-password").value
        const termsChecked = document.getElementById("terms").checked
  
        
        if (!name || !email || !password || !confirmPassword) {
          alert("Please fill in all fields")
          return
        }
  
        if (password !== confirmPassword) {
          alert("Passwords do not match")
          return
        }
  
        if (!termsChecked) {
          alert("Please agree to the terms and conditions")
          return
        }
  
        
        simulateSignup(name, email, password)
      })
    }
  
    
    const logoutButtons = document.querySelectorAll("#logout-btn, #footer-logout")
    logoutButtons.forEach((button) => {
      if (button) {
        button.addEventListener("click", (e) => {
          e.preventDefault()
          logout()
        })
      }
    })
  
    /
    function simulateLogin(email, password) {
      
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userEmail", email)
      localStorage.setItem("userName", email.split("@")[0]) 
  
      
      window.location.href = "planner.html"
    }
  
    
    function simulateSignup(name, email, password) {
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userEmail", email)
      localStorage.setItem("userName", name)
  
      
      window.location.href = "planner.html"
    }
  
    
    function logout() {
      localStorage.removeItem("isLoggedIn")
      localStorage.removeItem("userEmail")
      localStorage.removeItem("userName")
  
      
      window.location.href = "index.html"
    }
  })
  