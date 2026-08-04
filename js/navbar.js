// ============================================
// NHS Appointment Booking System
// Developed by TRM
// Shared navigation menu — injected into every
// page's `.navbar-links`. index.html keeps its
// own inline menu (this script skips it).
// ============================================

import { supabase } from './supabase.js'
import { logout } from './auth.js'

const PATHS = {
  home: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  doctors: '<path d="M11 2v2"/><path d="M5 2v2"/><path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/><path d="M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/>',
  signin: '<path d="m10 17 5-5-5-5"/><path d="M15 12H3"/><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>',
  register: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>',
  dashboard: '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
  book: '<path d="M16 18h6"/><path d="M16 2v3"/><path d="M19 15v6"/><path d="M21 11.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.3"/><path d="M3 9h18"/><path d="M8 2v3"/>',
  checkin: '<path d="m16 11 2 2 4-4"/><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>',
  history: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>',
  notif: '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',
  ai: '<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>',
  privacy: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
  team: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/>',
  signout: '<path d="M10 17l5-5-5-5"/><path d="M15 12H3"/><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>',
  staff: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>'
}

function svg(path) {
  return '<svg class="sym" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + path + '</svg>'
}

function item(id, href, label, path, extraStyle) {
  const a = document.createElement('a')
  a.id = id
  a.href = href
  a.setAttribute('role', 'menuitem')
  a.style.cssText = 'display:flex;align-items:center;gap:10px;padding:9px 12px;font-size:14px;font-weight:500;color:var(--nhs-dark);text-decoration:none;border-radius:8px' + (extraStyle || '')
  a.innerHTML = svg(path)
  const span = document.createElement('span')
  span.textContent = label
  a.appendChild(span)
  return a
}

function li(el) {
  const wrap = document.createElement('li')
  wrap.setAttribute('role', 'none')
  wrap.appendChild(el)
  return wrap
}

function divider() {
  const d = document.createElement('div')
  d.setAttribute('aria-hidden', 'true')
  d.style.cssText = 'height:1px;background:var(--border);margin:6px 0'
  return d
}

function footerNote() {
  const d = document.createElement('div')
  d.style.cssText = 'padding:8px 10px 4px;font-size:11px;color:var(--nhs-muted);text-align:center'
  d.textContent = 'NHS Booking | TRM \u00a9 2026'
  return d
}

async function initMenu() {
  const links = document.querySelector('.navbar-links')
  if (!links || document.getElementById('menu-btn')) return

  links.style.position = 'relative'

  const btn = document.createElement('button')
  btn.id = 'menu-btn'
  btn.type = 'button'
  btn.setAttribute('aria-label', 'Open navigation menu')
  btn.setAttribute('aria-expanded', 'false')
  btn.innerHTML = '&#8943;'
  btn.style.cssText = 'width:36px;height:36px;border-radius:50%;background:transparent;border:1px solid var(--border);font-size:20px;color:var(--nhs-muted);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;margin-left:4px;vertical-align:middle;flex-shrink:0'
  links.appendChild(btn)

  const popup = document.createElement('div')
  popup.id = 'menu-popup'
  popup.setAttribute('role', 'menu')
  popup.setAttribute('aria-label', 'Navigation menu')
  popup.style.cssText = 'display:none;position:absolute;top:52px;right:0;background:var(--bg-card);border-radius:14px;box-shadow:0 8px 32px rgba(0,0,0,0.15);border:1px solid var(--border);padding:8px;width:220px;z-index:9999'
  links.appendChild(popup)

  let session = null
  let dashHref = 'dashboard.html'
  let isStaff = false

  try {
    const res = await supabase.auth.getSession()
    session = res.data.session
    if (session) {
      const { data } = await supabase
        .from('doctors_trm')
        .select('id')
        .eq('email', session.user.email)
        .maybeSingle()
      isStaff = !!data
      dashHref = isStaff ? 'admin-dashboard.html' : 'dashboard.html'
    }
  } catch (err) {
    console.error('navbar: session check failed', err)
  }

  const mainUl = document.createElement('ul')
  mainUl.style.cssText = 'list-style:none;padding:0;margin:0'
  popup.appendChild(mainUl)

  mainUl.appendChild(li(item('menu-home', 'index.html', 'Home', PATHS.home)))
  mainUl.appendChild(li(item('menu-doctors', 'doctors.html', 'Our Doctors', PATHS.doctors)))

  if (session) {
    mainUl.appendChild(li(item('menu-dashboard', dashHref, 'Dashboard', PATHS.dashboard, ';font-weight:600')))
    mainUl.appendChild(li(item('menu-book', 'book.html', 'Book Appointment', PATHS.book)))
    mainUl.appendChild(li(item('menu-checkin', 'checkin.html', 'Check In', PATHS.checkin)))
    mainUl.appendChild(li(item('menu-history', 'history.html', 'My History', PATHS.history)))
    mainUl.appendChild(li(item('menu-notif', 'notifications.html', 'Notifications', PATHS.notif)))
  } else {
    mainUl.appendChild(li(item('menu-signin', 'login.html', 'Sign In', PATHS.signin, ';font-weight:600')))
    mainUl.appendChild(li(item('menu-register', 'register.html', 'Register', PATHS.register, ';font-weight:600')))
    mainUl.appendChild(li(item('menu-book', 'login.html', 'Book Appointment', PATHS.book)))
  }

  popup.appendChild(divider())

  const infoUl = document.createElement('ul')
  infoUl.style.cssText = 'list-style:none;padding:0;margin:0'
  popup.appendChild(infoUl)
  infoUl.appendChild(li(item('menu-ai', 'chat.html', 'AI Health Assistant', PATHS.ai)))
  infoUl.appendChild(li(item('menu-privacy', 'privacy.html', 'Privacy Policy', PATHS.privacy)))
  infoUl.appendChild(li(item('menu-team', 'team.html', 'Meet the Team', PATHS.team)))

  popup.appendChild(divider())

  const staffUl = document.createElement('ul')
  staffUl.style.cssText = 'list-style:none;padding:0;margin:0'
  popup.appendChild(staffUl)
  staffUl.appendChild(li(item('menu-staff', 'admin-login.html', 'Doctor / Staff Login', PATHS.staff, ';font-weight:500;color:var(--nhs-blue)')))
  if (isStaff) {
    staffUl.appendChild(li(item('menu-staff-dash', 'admin-dashboard.html', 'Staff Dashboard', PATHS.dashboard, ';font-weight:600')))
  }

  const footerNoteEl = footerNote()
  popup.appendChild(footerNoteEl)

  if (session) {
    const so = item('menu-signout', '#', 'Sign Out', PATHS.signout, ';font-weight:600;color:var(--nhs-red)')
    so.addEventListener('click', async (e) => {
      e.preventDefault()
      await logout()
    })
    const soLi = li(so)
    soLi.style.cssText = 'border-top:1px solid var(--border);margin-top:2px'
    popup.insertBefore(soLi, footerNoteEl)
  }

  function open() { popup.style.display = 'block'; btn.setAttribute('aria-expanded', 'true') }
  function close() { popup.style.display = 'none'; btn.setAttribute('aria-expanded', 'false') }

  btn.addEventListener('click', (e) => {
    e.stopPropagation()
    if (popup.style.display === 'block') close()
    else open()
  })

  document.addEventListener('click', (e) => {
    if (e.target !== btn && !popup.contains(e.target)) close()
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close()
  })
}

initMenu()
