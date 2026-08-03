// ============================================
// NHS Appointment Booking System
// Developed by TRM
// Dark/Light Theme Toggle
// ============================================

const STORAGE_KEY = 'trm-theme'

export function applyTheme() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'dark') {
    document.documentElement.classList.add('dark')
  }
  updateToggleUI()
}

export function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark')
  localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light')
  updateToggleUI()
  return isDark
}

export function isDarkMode() {
  return document.documentElement.classList.contains('dark')
}

export function updateToggleUI() {
  const label = document.getElementById('theme-label')
  if (label) {
    label.textContent = isDarkMode() ? 'On' : 'Off'
  }
}
