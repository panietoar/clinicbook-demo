import { useEffect, useState } from 'react'
import { supabaseAdmin } from '../lib/supabase'
import { getUser, isAdmin } from '../lib/auth'

export default function AdminDashboard() {
  const [patients, setPatients] = useState([])
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    getUser().then((user) => {
      if (!isAdmin(user)) return
      setAllowed(true)
      supabaseAdmin.from('patients').select('*').then(({ data }) => setPatients(data || []))
    })
  }, [])

  if (!allowed) return <p>Not authorized</p>
  return (
    <table>
      <tbody>
        {patients.map((p) => (
          <tr key={p.id}><td>{p.full_name}</td><td>{p.email}</td><td>{p.diagnosis}</td></tr>
        ))}
      </tbody>
    </table>
  )
}
