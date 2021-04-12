import { useState } from 'react'
import sosekFinal from '../lib/sosek-final-abrv.json'

function sosekArray() {
  let dfKecamatan = []
  let dfDesa = []
  let dfResponden = []

  sosekFinal.forEach(d => {
    if (!dfDesa.includes(d.desa.toUpperCase())) {
      dfDesa.push(d.desa.toUpperCase())
    }

    if (!dfKecamatan.includes(d.kecamatan.toUpperCase())) {
      dfKecamatan.push(d.kecamatan.toUpperCase())
    }

    let pekerjaan = [d.pekerjaan] // , ...d.pekerjaanLain]
    d.pekerjaanLain.forEach(p => {
      if (p && !pekerjaan.includes(p)) {
        pekerjaan.push(p)
      }
    })

    pekerjaan.sort()

    dfResponden.push({
      ref: d.id,
      kecamatan: d.kecamatan,
      desa: d.desa,
      enumerator: d.enumerator,
      nama: d.nama,
      jmlPekerjaan: pekerjaan.length,
      dfPekerjaan: pekerjaan,
      strPekerjaan: pekerjaan.join(", "),
    })
  })

  dfKecamatan.sort()
  dfDesa.sort()
  dfResponden.sort(function(a,b) {
    if (a.nama < b.nama) return -1
    if (a.nama > b.nama) return 1
    return 0
  })

  return { dfKecamatan, dfDesa, dfResponden }
}

export default function Pekerjaan() {
  const { dfKecamatan, dfDesa, dfResponden } = sosekArray()

  const [desa, setDesa] = useState("")
  const [kecamatan, setKecamatan] = useState("")

  const [daftarDesa, setDaftarDesa] = useState(dfDesa)
  // const [rows, setRows] = useState(dfAnggota)

  function getData() {
    return dfResponden
    .filter(item => {
      if (kecamatan) {
        return item.kecamatan === kecamatan
      }
      return item.kecamatan.trim().includes(kecamatan)
    })
    .filter(item => item.desa.includes(desa))
  }

  function getDfPekerjaan() {
    let table = {}
    getData().forEach(d => {
      d.dfPekerjaan.forEach(p => {
        if (table[p] == undefined) table[p] = 0
        table[p]++
      })
    })
    return table
  }

  function getJmlPekerjaan() {
    let table = {
      satu_pekerjaan: 0,
      dua_pekerjaan: 0,
      tiga_pekerjaan: 0
    }
    getData().forEach(d => {
      if (d.jmlPekerjaan == 1) table.satu_pekerjaan++
      else if (d.jmlPekerjaan == 2) table.dua_pekerjaan++
      else table.tiga_pekerjaan++
    })
    return table
  }

  function getTopik(topik) {
    const data = getData()
    let obj = { _BLANK: 0 }
    data.forEach(item => {
      if (item[topik] === "" || item[topik].length === 0 || item[topik][0] === "") {
        obj._BLANK++
      } else {
        const key = Array.isArray(item[topik]) ? item[topik].sort().join(", ") : item[topik]
        if (obj[key] === undefined) obj[key] = 0
        // console.log(key)
        obj[key]++
      }
    })

    return obj
  }

  function TabelTopik({topik}) {
    const data = getTopik(topik)
    const keys = Object.keys(data)

    return (
      <>
      <div>
        <h4>{topik.toUpperCase()}</h4>
        <table>
          <tbody>
          {keys.map((key) => (
            <tr key={key}><td>{key}</td><td>{data[key]}</td></tr>
          ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
      div {
        margin-right: 1rem;
      }
      h4 {
        margin-bottom: .5rem;
      }
      td {
        padding: 4px;
        border: 1px solid #aaa;
      }
      `}</style>
      </>
    )
  }


  return (
    <div style={{ padding: '1rem' }}>
      <h2>Jenis dan Jumlah Pekerjaan</h2>
      <select
        defaultValue={kecamatan}
        onChange={e => {
        const val = e.target.value
        setKecamatan(val)
        setDesa("")
        let array = []
        dfResponden
        .filter(item => {
          if (val) {
            return item.kecamatan === val
          }
          return item.kecamatan.includes(val)
        })
        .forEach(item => {
          if (!array.includes(item.desa)) {
            array.push(item.desa)
          }
        })
        setDaftarDesa(array)
        // setRows(getData())
      }} >
        <option value="">- Pilih Kecamatan</option>
        {dfKecamatan.map(d => <option key={d} value={d}>{d}</option>)}
      </select>
      <span style={{ margin: '0 .5rem', fontWeight: 500, fontSize: '13pt' }}>
        {dfResponden.filter(item => {
          if (kecamatan) {
            return item.kecamatan === kecamatan
          }
          return item.kecamatan.includes(kecamatan)
        }).length}
      </span>
      <select
        value={desa}
        onChange={e => setDesa(e.target.value)} >
        <option value="">- Pilih Desa</option>
        {daftarDesa.map(d => <option key={d} value={d}>{d}</option>)}
      </select>
      <span style={{ margin: '0 .5rem', fontWeight: 500, fontSize: '13pt' }}>
        {getData().filter(item => item.desa.includes(desa)).length} - {getData().length}
      </span>

      <pre>
        FREKUENSI JENIS PEKERJAAN:<br/>
        {JSON.stringify(getDfPekerjaan(), null, 2)}<br/>
        RESPONDEN DENGAN JUMLAH PEKERJAAN:<br/>
        {JSON.stringify(getJmlPekerjaan(), null, 2)}
      </pre>

      <div className="container">
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <th>#</th>
              <th>id</th>
              <th>enumerator</th>
              <th>kecamatan</th>
              <th>desa</th>
              <th>nama</th>
              <th>jml</th>
              <th>pekerjaan</th>
            </tr>
            {getData().map((item, index) => (
              <tr key={`${item}-${index}`}>
                <td>{index + 1}</td>
                <td><code>{item.ref}</code></td>
                <td>{item.enumerator}</td>
                <td>{item.kecamatan}</td>
                <td>{item.desa}</td>
                <td>{item.nama.toUpperCase()}</td>
                <td>{item.jmlPekerjaan}</td>
                <td>{item.strPekerjaan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <TabelTopik topik="strPekerjaan" />
        {/* <TabelTopik topik="hubungan" />
        <TabelTopik topik="marital" />
        <TabelTopik topik="pendidikan" />
        <TabelTopik topik="pekerjaan" />
        <TabelTopik topik="kerentanan" /> */}
      </div>
      <br/>
      <div>
      </div>
      <style jsx>{`
      .container {
        overflow: auto;
        max-height: 400px;
        border: 1px solid #666;
      }
      table {
        border-collapse: collapse;
      }
      th {
        text-align: left;
        padding: 8px 4px;
        background-color: #eee;
        border-bottom: 1px solid #999;
      }
      td {
        padding: 6px 4px;
        white-space: nowrap;
        border-bottom: 1px solid #ddd;
      }
      select {
        padding: 4px 8px;
        margin-bottom: 1rem;
      }
      `}</style>
    </div>
  )
}

/*

pendapatanPerBulan
sumberPendapatan
pengeluaranPerBulan
sumberPengeluaran

*/