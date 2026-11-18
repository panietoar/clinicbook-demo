import { supabase } from '../lib/supabase'

export default function UploadDocument({ patientId }) {
  async function onChange(e) {
    const file = e.target.files[0]
    const path = `${patientId}/${file.name}`
    await supabase.storage.from('medical-records').upload(path, file)
    const { data } = supabase.storage.from('medical-records').getPublicUrl(path)
    alert('Uploaded: ' + data.publicUrl)
  }
  return <input type="file" onChange={onChange} />
}
