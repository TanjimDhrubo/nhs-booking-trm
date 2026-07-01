// ============================================
// NHS Appointment Booking System
// Developed by TRM
// Shared Helpers — imported by every page
// ============================================

import { supabase } from './supabase.js'

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric',
    month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

export function formatDateShort(iso) {
  return new Date(iso).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric',
    month: 'long', year: 'numeric'
  })
}

export function formatTime(iso) {
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', hour12: true
  })
}

export function formatTimeShort(iso) {
  return new Date(iso).toLocaleTimeString('en-GB', {
    hour: '2-digit', minute: '2-digit'
  })
}

export function getDay(iso) {
  return new Date(iso).getDate()
}

export function getMonth(iso) {
  return new Date(iso).toLocaleDateString('en-GB', { month: 'short' })
}

export function renderBadge(status) {
  const cls = 'badge badge-' + status.replace('_', '').toLowerCase()
  const label = status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')
  return '<span class="' + cls + '">' + label + '</span>'
}

export function showMsg(elementId, message, type) {
  const el = document.getElementById(elementId)
  if (!el) return
  el.innerHTML = ''
  const div = document.createElement('div')
  div.className = 'alert alert-' + type
  div.setAttribute('role', 'alert')
  div.textContent = message
  el.appendChild(div)
}

export function generateTimeSlots() {
  const slots = []
  for (let h = 9; h <= 16; h++) {
    for (let m = 0; m < 60; m += 30) {
      if (h === 16 && m === 30) break
      const hh = String(h).padStart(2, '0')
      const mm = String(m).padStart(2, '0')
      slots.push({ label: formatTimeShort('2024-01-01T' + hh + ':' + mm + ':00'), value: hh + ':' + mm })
    }
  }
  return slots
}

export function getDayBounds(date) {
  const start = new Date(date)
  start.setHours(0, 0, 0, 0)
  const end = new Date(date)
  end.setHours(23, 59, 59, 999)
  return { start: start.toISOString(), end: end.toISOString() }
}

export function timeAgo(isoString) {
  const diff = Date.now() - new Date(isoString).getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return mins + ' minutes ago'
  if (hours < 24) return hours + ' hours ago'
  if (days === 1) return 'Yesterday'
  return new Date(isoString).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric'
  })
}

export function getTomorrow() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

export async function insertNotification(userId, message) {
  await supabase.from('notifications_trm').insert({
    user_id: userId,
    message,
    type: 'in-app'
  })
}
