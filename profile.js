document.addEventListener("DOMContentLoaded", () => {
    
    const userName = localStorage.getItem("userName") || "User"
    const userEmail = localStorage.getItem("userEmail") || "user@example.com"
  
    
    const profileName = document.getElementById("profile-name")
    const profileEmail = document.getElementById("profile-email")
    const fullNameInput = document.getElementById("full-name")
    const profileEmailInput = document.getElementById("profile-email-input")
  
    if (profileName) profileName.textContent = userName
    if (profileEmail) profileEmail.textContent = userEmail
    if (fullNameInput) fullNameInput.value = userName
    if (profileEmailInput) profileEmailInput.value = userEmail
  
    
    const tabButtons = document.querySelectorAll(".tab-btn")
    const tabContents = document.querySelectorAll(".tab-content")
  
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const tabId = button.getAttribute("data-tab")
  
        
        tabButtons.forEach((btn) => btn.classList.remove("active"))
        button.classList.add("active")
  
        // Show corresponding tab content
        tabContents.forEach((content) => {
          content.classList.remove("active")
          if (content.id === tabId) {
            content.classList.add("active")
          }
        })
      })
    })
  
    // Personal info form submission
    const personalForm = document.getElementById("personal-form")
    if (personalForm) {
      personalForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        const newName = document.getElementById("full-name").value
        const newEmail = document.getElementById("profile-email-input").value
  
        // Update localStorage
        localStorage.setItem("userName", newName)
        localStorage.setItem("userEmail", newEmail)
  
        // Update displayed info
        if (profileName) profileName.textContent = newName
        if (profileEmail) profileEmail.textContent = newEmail
  
        // Show success message
        alert("Profile updated successfully!")
      })
    }
  
    // Preferences form submission
    const preferencesForm = document.getElementById("preferences-form")
    if (preferencesForm) {
      preferencesForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // In a real app, these would be saved to user preferences
        const theme = document.getElementById("theme").value
        const timeFormat = document.getElementById("time-format").value
        const startDay = document.getElementById("start-day").value
        const emailNotif = document.getElementById("email-notif").checked
        const browserNotif = document.getElementById("browser-notif").checked
  
        // Save to localStorage for demo purposes
        localStorage.setItem("userTheme", theme)
        localStorage.setItem("userTimeFormat", timeFormat)
        localStorage.setItem("userStartDay", startDay)
        localStorage.setItem("userEmailNotif", emailNotif)
        localStorage.setItem("userBrowserNotif", browserNotif)
  
        // Show success message
        alert("Preferences saved successfully!")
      })
    }
  
    // Profile image upload simulation
    const profileImage = document.getElementById("profile-image")
    const avatarOverlay = document.querySelector(".avatar-overlay")
  
    if (avatarOverlay && profileImage) {
      avatarOverlay.addEventListener("click", () => {
        // In a real app, this would open a file picker
        // For demo, we'll just cycle through a few avatar options
        const avatars = ["images/default-avatar.png", "images/user1.png", "images/user2.png", "images/user3.png"]
  
        const currentSrc = profileImage.src
        const currentIndex = avatars.findIndex((avatar) => currentSrc.includes(avatar))
        const nextIndex = (currentIndex + 1) % avatars.length
  
        profileImage.src = avatars[nextIndex]
  
        // Save to localStorage
        localStorage.setItem("userAvatar", avatars[nextIndex])
      })
    }
  
    // Load saved avatar if exists
    const savedAvatar = localStorage.getItem("userAvatar")
    if (savedAvatar && profileImage) {
      profileImage.src = savedAvatar
    }
  })
  