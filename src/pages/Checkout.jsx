import { supabase } from '../lib/supabase'

export default function Checkout({ appointment }) {
  async function pay() {
    const { data } = await supabase.functions.invoke('create-checkout', {
      body: { appointmentId: appointment.id, amount: appointment.price_cents }
    })
    window.location.href = data.url
  }
  return <button onClick={pay}>Pay ${(appointment.price_cents / 100).toFixed(2)}</button>
}
