import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Appointment() {
  const { id } = useParams()
  const [appt, setAppt] = useState(null)

  useEffect(() => {
    supabase.from('appointments').select('*, patients(*)').eq('id', id).single()
      .then(({ data }) => setAppt(data))
  }, [id])

  if (!appt) return null
  return (
    <div>
      <h2>{appt.patients.full_name}</h2>
      <div dangerouslySetInnerHTML={{ __html: appt.notes }} />
    </div>
  )
}
