# NHS Booking — Progress

## Project
NHS Appointment Booking System by TRM. Repo root `D:\NHS Website`, GitHub Pages `https://tanjimdhrubo.github.io/nhs-booking-trm/`, Supabase ref `ataqzfyppitexytlitsw`.

## Current task (2026-08-04)
Follow-up fix batch — see `docs/FIXES-2026-08-04.md`. Item #6 (dependent appointment, PRN-based) implemented + verified.

## Status
- Audit fixes 1–3 + doctor reschedule shipped (commits `ad576d0`, `59d57cb`), all verified live.
- Batch 2 in progress: homepage icon alignment, auth-page spacing, footer link dedup, logo links home, shared navbar menu, AI-chat booking flow, ephemeral chat, sign-out from home menu. #6 dependent booking now PRN-based via new RPCs (`verify_patient_prn`, `book_dependent_appointment`). Uncommitted.
