import { useState } from 'react'
import sosekFinal from '../lib/sosek-final.json'

function defaultDesa() {
  let array = []
  sosekFinal.forEach(d => {
    if (!array.includes(d.desa.toUpperCase())) {
      array.push(d.desa.toUpperCase())
    }
  })

  return array.sort()
}

function defaultKecamatan() {
  let array = []
  sosekFinal.forEach(d => {
    if (!array.includes(d.kecamatan.toUpperCase())) {
      array.push(d.kecamatan.toUpperCase())
    }
  })

  return array.sort()
}

function sosekArray() {
  let array =[]
  sosekFinal.forEach(d => {
    array.push({...d, })
  })

  array.sort(function(a,b) {
    if (a.nama < b.nama) return -1
    if (a.nama > b.nama) return 1
    return 0
  })

  return array // .sort()
}

export default function RSP() {
  const data = sosekArray()

  const [rows, setRows] = useState(sosekArray())
  const [dfDesa, setDfDesa] = useState(defaultDesa())
  const [kecamatan, setKecamatan] = useState('')
  const [desa, setDesa] = useState('')
  const [kecamatanLength, setKecamatanLength] = useState(data.length)
  const [desaLength, setDesaLength] = useState(data.length)

  function changeKecamatan(e) {
    setDesa('')
    const val = e.target.value
    setKecamatan(val)


    let array = []
    data.filter(item => {
      if (val) {
        return item.kecamatan === val
      }
      return item.kecamatan.includes(val)
    }).forEach(item => {
      if (!array.includes(item.desa)) {
        array.push(item.desa)
      }
    })
    setDfDesa(array)
  }

  function changeDesa(e) {
    setDesa(e.target.value)
  }

  return (
    <div style={{ padding: "0 1rem" }}>
      <h1>Responden</h1>
      <div style={{ float: 'left' }}>
        <select
          value={kecamatan}
          onChange={changeKecamatan}
        >
          <option value="">- Seluruh Kecamatan</option>
          {defaultKecamatan().map(kcmt => (
            <option key={kcmt} value={kcmt}>{kcmt}</option>
          ))}
        </select>
        <span className="count">
          {kecamatanLength}
        </span>
      </div>
      <div style={{ float: 'left' }}>
        <select
          value={desa}
          onChange={changeDesa}
        >
          <option value="">- Pilih Desa</option>
          {dfDesa.map(kcmt => (
            <option key={kcmt} value={kcmt}>{kcmt}</option>
          ))}
        </select>
        <span className="count">
          {desaLength}
        </span>
      </div>
      <style jsx>{`
      select {
        padding: 6px 8px;
      }
      .count {
        display: inline-block;
        width: 50px;
        text-align: center;
        font-size: 13pt;
      }
      `}</style>
    </div>

  )
}