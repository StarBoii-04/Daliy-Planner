document.addEventListener("DOMContentLoaded", () => {
    // Initialize date display
    updateDateDisplay()
  
    // Date navigation
    const prevDayBtn = document.getElementById("prev-day")
    const nextDayBtn = document.getElementById("next-day")
    const todayBtn = document.getElementById("today-btn")
  
    if (prevDayBtn) {
      prevDayBtn.addEventListener("click", () => {
        const currentDate = getCurrentDisplayDate()
        currentDate.setDate(currentDate.getDate() - 1)
        setCurrentDisplayDate(currentDate)
        updateDateDisplay()
        loadTimeBlocks()
      })
    }
  
    if (nextDayBtn) {
      nextDayBtn.addEventListener("click", () => {
        const currentDate = getCurrentDisplayDate()
        currentDate.setDate(currentDate.getDate() + 1)
        setCurrentDisplayDate(currentDate)
        updateDateDisplay()
        loadTimeBlocks()
      })
    }
  
    if (todayBtn) {
      todayBtn.addEventListener("click", () => {
        setCurrentDisplayDate(new Date())
        updateDateDisplay()
        loadTimeBlocks()
      })
    }
  
    // Add time block button
    const addBlockBtn = document.getElementById("add-block-btn")
    if (addBlockBtn) {
      addBlockBtn.addEventListener("click", () => {
        openBlockModal()
      })
    }
  
    // Modal functionality
    const modal = document.getElementById("block-modal")
    const closeModal = document.querySelector(".close-modal")
    const cancelBtn = document.getElementById("cancel-block")
  
    if (closeModal) {
      closeModal.addEventListener("click", () => {
        closeBlockModal()
      })
    }
  
    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        closeBlockModal()
      })
    }
  
    // Close modal when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeBlockModal()
      }
    })
  
    // Form submission for adding/editing time blocks
    const blockForm = document.getElementById("block-form")
    if (blockForm) {
      blockForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        const blockId = document.getElementById("block-id").value
        const title = document.getElementById("block-title-input").value
        const startTime = document.getElementById("start-time").value
        const endTime = document.getElementById("end-time").value
        const description = document.getElementById("block-description").value
        const category = document.getElementById("block-category").value
  
        // Validate times
        if (startTime >= endTime) {
          alert("End time must be after start time")
          return
        }
  
        // Create or update time block
        if (blockId) {
          updateTimeBlock(blockId, title, startTime, endTime, description, category)
        } else {
          createTimeBlock(title, startTime, endTime, description, category)
        }
  
        closeBlockModal()
        loadTimeBlocks()
      })
    }
  
    // Initialize time blocks
    loadTimeBlocks()
  
    // Set up event delegation for edit and delete buttons
    const timeBlocksContainer = document.getElementById("time-blocks-container")
    if (timeBlocksContainer) {
      timeBlocksContainer.addEventListener("click", (e) => {
        // Edit button clicked
        if (e.target.closest(".edit-block")) {
          const blockElement = e.target.closest(".time-block")
          const blockId = blockElement.getAttribute("data-id")
          editTimeBlock(blockId)
        }
  
        // Delete button clicked
        if (e.target.closest(".delete-block")) {
          const blockElement = e.target.closest(".time-block")
          const blockId = blockElement.getAttribute("data-id")
          deleteTimeBlock(blockId)
        }
      })
    }
  
    // Helper Functions
  
    // Update the date display
    function updateDateDisplay() {
      const currentDateElement = document.getElementById("current-date")
      if (currentDateElement) {
        const currentDate = getCurrentDisplayDate()
        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
        currentDateElement.textContent = currentDate.toLocaleDateString("en-US", options)
      }
    }
  
    // Get the current display date from localStorage or default to today
    function getCurrentDisplayDate() {
      const storedDate = localStorage.getItem("currentDisplayDate")
      if (storedDate) {
        return new Date(storedDate)
      }
      return new Date()
    }
  
    // Set the current display date in localStorage
    function setCurrentDisplayDate(date) {
      localStorage.setItem("currentDisplayDate", date.toISOString())
    }
  
    // Open the modal for adding/editing a time block
    function openBlockModal(blockData = null) {
      const modalTitle = document.getElementById("modal-title")
      const blockIdInput = document.getElementById("block-id")
      const titleInput = document.getElementById("block-title-input")
      const startTimeInput = document.getElementById("start-time")
      const endTimeInput = document.getElementById("end-time")
      const descriptionInput = document.getElementById("block-description")
      const categoryInput = document.getElementById("block-category")
  
      // Reset form
      blockForm.reset()
      blockIdInput.value = ""
  
      // Set default times if not editing
      if (!blockData) {
        const now = new Date()
        const startHour = now.getHours()
        const endHour = startHour + 1
  
        startTimeInput.value = `${startHour.toString().padStart(2, "0")}:00`
        endTimeInput.value = `${endHour.toString().padStart(2, "0")}:00`
  
        modalTitle.textContent = "Add Time Block"
      } else {
        // Fill form with existing data
        blockIdInput.value = blockData.id
        titleInput.value = blockData.title
        startTimeInput.value = blockData.startTime
        endTimeInput.value = blockData.endTime
        descriptionInput.value = blockData.description
        categoryInput.value = blockData.category
  
        modalTitle.textContent = "Edit Time Block"
      }
  
      // Show modal
      modal.classList.add("active")
    }
  
    // Close the modal
    function closeBlockModal() {
      modal.classList.remove("active")
    }
  
    // Load time blocks for the current day
    function loadTimeBlocks() {
      const timeBlocksContainer = document.getElementById("time-blocks-container")
      if (!timeBlocksContainer) return
  
      // Clear existing blocks
      timeBlocksContainer.innerHTML = ""
  
      // Get blocks for current day
      const currentDate = getCurrentDisplayDate().toDateString()
      const blocks = getTimeBlocksForDate(currentDate)
  
      // Create HTML for each block
      blocks.forEach((block) => {
        const blockElement = createTimeBlockElement(block)
        timeBlocksContainer.appendChild(blockElement)
      })
    }
  
    // Create a time block element
    function createTimeBlockElement(block) {
      // Calculate position and height based on time
      const [startHour, startMinute] = block.startTime.split(":").map(Number)
      const [endHour, endMinute] = block.endTime.split(":").map(Number)
  
      const startPosition = (startHour - 6) * 60 + startMinute // 6 AM is the start of our day view
      const endPosition = (endHour - 6) * 60 + endMinute
      const height = endPosition - startPosition
  
      // Create the element
      const blockElement = document.createElement("div")
      blockElement.className = `time-block ${block.category}`
      blockElement.setAttribute("data-id", block.id)
      blockElement.style.top = `${startPosition}px`
      blockElement.style.height = `${height}px`
  
      // Format times for display
      const formattedStartTime = formatTime(block.startTime)
      const formattedEndTime = formatTime(block.endTime)
  
      blockElement.innerHTML = `
              <div class="block-header">
                  <span class="block-time">${formattedStartTime} - ${formattedEndTime}</span>
                  <div class="block-actions">
                      <button class="edit-block"><i class="fas fa-edit"></i></button>
                      <button class="delete-block"><i class="fas fa-trash"></i></button>
                  </div>
              </div>
              <h4 class="block-title">${block.title}</h4>
              <p class="block-description">${block.description}</p>
              <div class="block-category ${block.category}">${capitalizeFirstLetter(block.category)}</div>
          `
  
      return blockElement
    }
  
    // Format time from 24h to 12h format
    function formatTime(time24h) {
      const [hours, minutes] = time24h.split(":").map(Number)
      const period = hours >= 12 ? "PM" : "AM"
      const hours12 = hours % 12 || 12
      return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`
    }
  
    // Capitalize first letter of a string
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  
    // Get time blocks for a specific date
    function getTimeBlocksForDate(dateString) {
      const allBlocks = JSON.parse(localStorage.getItem("timeBlocks") || "{}")
      return allBlocks[dateString] || []
    }
  
    // Save time blocks for a specific date
    function saveTimeBlocksForDate(dateString, blocks) {
      const allBlocks = JSON.parse(localStorage.getItem("timeBlocks") || "{}")
      allBlocks[dateString] = blocks
      localStorage.setItem("timeBlocks", JSON.stringify(allBlocks))
    }
  
    // Create a new time block
    function createTimeBlock(title, startTime, endTime, description, category) {
      const currentDate = getCurrentDisplayDate().toDateString()
      const blocks = getTimeBlocksForDate(currentDate)
  
      const newBlock = {
        id: Date.now().toString(), // Use timestamp as ID
        title,
        startTime,
        endTime,
        description,
        category,
      }
  
      blocks.push(newBlock)
      saveTimeBlocksForDate(currentDate, blocks)
    }
  
    // Update an existing time block
    function updateTimeBlock(id, title, startTime, endTime, description, category) {
      const currentDate = getCurrentDisplayDate().toDateString()
      let blocks = getTimeBlocksForDate(currentDate)
  
      blocks = blocks.map((block) => {
        if (block.id === id) {
          return {
            ...block,
            title,
            startTime,
            endTime,
            description,
            category,
          }
        }
        return block
      })
  
      saveTimeBlocksForDate(currentDate, blocks)
    }
  
    // Delete a time block
    function deleteTimeBlock(id) {
      if (confirm("Are you sure you want to delete this time block?")) {
        const currentDate = getCurrentDisplayDate().toDateString()
        let blocks = getTimeBlocksForDate(currentDate)
  
        blocks = blocks.filter((block) => block.id !== id)
        saveTimeBlocksForDate(currentDate, blocks)
  
        loadTimeBlocks()
      }
    }
  
    // Edit a time block
    function editTimeBlock(id) {
      const currentDate = getCurrentDisplayDate().toDateString()
      const blocks = getTimeBlocksForDate(currentDate)
      const block = blocks.find((block) => block.id === id)
  
      if (block) {
        openBlockModal(block)
      }
    }
  })
  