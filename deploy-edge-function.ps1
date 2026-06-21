# Deploy the AI Agent Edge Function to Supabase
# Run this script one time to deploy

Write-Host "Step 1: Login to Supabase (opens browser)" -ForegroundColor Cyan
npx supabase login

Write-Host "`nStep 2: Deploy the edge function" -ForegroundColor Cyan
npx supabase functions deploy ai-agent --project-ref ataqzfyppitexytlitsw

Write-Host "`nStep 3: Set the Groq API key as a secret" -ForegroundColor Cyan
npx supabase secrets set GROQ_API_KEY=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 --project-ref ataqzfyppitexytlitsw

Write-Host "`nDone! The Edge Function is deployed at:" -ForegroundColor Green
Write-Host "https://ataqzfyppitexytlitsw.supabase.co/functions/v1/ai-agent" -ForegroundColor Yellow
