import { createClient } from 'npm:@supabase/supabase-js@2'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

Deno.serve(async (req) => {
  const event = await req.json()
  console.log('stripe event', JSON.stringify(event))

  if (event.type === 'checkout.session.completed') {
    const appointmentId = event.data.object.metadata.appointmentId
    await supabase.from('appointments').update({ paid: true }).eq('id', appointmentId)
    await supabase.from('payments').insert({ appointment_id: appointmentId, amount: event.data.object.amount_total })
  }
  return new Response('ok')
})
