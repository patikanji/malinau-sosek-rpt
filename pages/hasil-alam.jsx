import { useState } from 'react'
import sosekFinal from '../lib/sosek-final-abrv.json'

function daftarDesa() {
  let array = []
  sosekFinal.forEach(d => {
    if (!array.includes(d.desa.toUpperCase())) {
      array.push(d.desa.toUpperCase())
    }
  })

  return array.sort()
}



function daftarKecamatan() {
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

export default function Observasi() {
  const data = sosekArray()

  const dfKecamatan = daftarKecamatan()
  const [dfDesa, setDfDesa] = useState(daftarDesa())

  const [desa, setDesa] = useState("")
  const [kecamatan, setKecamatan] = useState("")

  function getData() {
    return data
    .filter(item => {
      if (kecamatan) {
        return item.kecamatan === kecamatan
      }
      return item.kecamatan.trim().includes(kecamatan)
    })
    .filter(item => item.desa.includes(desa))
  }

  function getTopik() {
    const data = getData()
    let rekap = {
      pertanian: 0,
      ternak: 0,
      ikan: 0,
      hutan: 0,
      satwa: 0,
    }
    let pertanian = []
    let ternak = []
    let ikan = []
    let hutan = []
    let satwa = []

    data.forEach(item => {
      rekap.pertanian += (item.hasilPertanian.length > 0 ? 1 : 0)
      rekap.ternak += (item.hasilTernak.length > 0 ? 1 : 0)
      rekap.ikan += (item.hasilIkan.length > 0 ? 1 : 0)
      rekap.hutan += (item.hasilHutan.length > 0 ? 1 : 0)
      rekap.satwa += (item.hasilSatwa.length > 0 ? 1 : 0)

      if (item.hasilPertanian.length > 0) {
        item.hasilPertanian.forEach(row => pertanian.push({
          id: item.id,
          nama: item.nama,
          desa: item.desa,
          ...row
        }))
      }

      if (item.hasilTernak.length > 0) {
        item.hasilTernak.forEach(row => ternak.push({
          id: item.id,
          nama: item.nama,
          desa: item.desa,
          ...row
        }))
      }

      if (item.hasilIkan.length > 0) {
        item.hasilIkan.forEach(row => ikan.push({
          id: item.id,
          nama: item.nama,
          desa: item.desa,
          ...row
        }))
      }

      if (item.hasilHutan.length > 0) {
        item.hasilHutan.forEach(row => hutan.push({
          id: item.id,
          nama: item.nama,
          desa: item.desa,
          ...row
        }))
      }

      if (item.hasilSatwa.length > 0) {
        item.hasilSatwa.forEach(row => satwa.push({
          id: item.id,
          nama: item.nama,
          desa: item.desa,
          ...row
        }))
      }
    })

    return { rekap, pertanian, ternak, ikan, hutan, satwa }
  }

/*

    "id": "1616833992453-BAF3F6E69B",
    "nama": "ADELIN",
    "desa": "PAKING",
    "jenis": "CABE",
    "untuk": "",
    "luas": 200,
    "dikonsumsi": 10,
    "dijual": 10,
    "nilai": 1000000

    "id": "1616507986128-315279AC4B",
    "nama": "ABIA",
    "desa": "LONG BERANG",
    "jenis": "ayam",
    "luas": 3,
    "untuk": "",
    "satuan": "0",
    "dikonsumsi": 7,
    "dijual": 0,
    "nilai": 0
*/

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Hasil Alam</h2>
      <select
        defaultValue={kecamatan}
        onChange={e => {
        const val = e.target.value
        setKecamatan(val)
        setDesa("")
        let array = []
        data
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
        setDfDesa(array)
      }} >
        <option value="">- Pilih Kecamatan</option>
        {dfKecamatan.map(d => <option key={d} value={d}>{d}</option>)}
      </select>
      <span style={{ margin: '0 .5rem', fontWeight: 500, fontSize: '13pt' }}>
        {data.filter(item => {
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
        {dfDesa.map(d => <option key={d} value={d}>{d}</option>)}
      </select>
      <span style={{ margin: '0 .5rem', fontWeight: 500, fontSize: '13pt' }}>
        {getData().filter(item => item.desa.includes(desa)).length}
      </span>

      <div className="container">
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <th>#</th>
              <th>id</th>
              <th>nama</th>
              <th>kecamatan</th>
              <th>desa</th>
              <th>enumerator</th>
              <th>pertanian</th>
              <th>ternak</th>
              <th>ikan</th>
              <th>hasilHutan</th>
              <th>berburu</th>
            </tr>
          {getData().map((d,index) => (
            <tr key={d.id}>
              <td>{index + 1}</td>
              <td><code>{d.id}</code></td>
              <td>{d.nama}</td>
              <td>{d.kecamatan}</td>
              <td>{d.desa}</td>
              <td>{d.enumerator}</td>
              <td>{d.hasilPertanian.length > 0 ? 'ADA' : '-'}</td>
              <td>{d.hasilTernak.length > 0 ? 'ADA' : '-'}</td>
              <td>{d.hasilIkan.length > 0 ? 'ADA' : '-'}</td>
              <td>{d.hasilHutan.length > 0 ? 'ADA' : '-'}</td>
              <td>{d.hasilSatwa.length > 0 ? 'ADA' : '-'}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      <h4>Jumlah keluarga yang memiliki/mengusahakan pertanian, dll.</h4>
      <table>
        <tbody>
          <tr><td>pertanian</td><td>{getTopik().rekap.pertanian} KK</td></tr>
          <tr><td>ternak</td><td>{getTopik().rekap.ternak} KK</td></tr>
          <tr><td>ikan</td><td>{getTopik().rekap.ikan} KK</td></tr>
          <tr><td>hasil hutan</td><td>{getTopik().rekap.hutan} KK</td></tr>
          <tr><td>berburu</td><td>{getTopik().rekap.satwa} KK</td></tr>
        </tbody>
      </table>
      <br/>

      <TabelHasilAlam hasil={getTopik().pertanian} title="pertanian" />
      <TabelHasilAlam hasil={getTopik().ternak} title="beternak" />
      <TabelHasilAlam hasil={getTopik().ikan} title="ikan" />
      <TabelHasilAlam hasil={getTopik().hutan} title="hasil hutan" />
      <TabelHasilAlam hasil={getTopik().satwa} title="berburu" />

      <br/><br/><br/><br/><br/>

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
        border: 1px solid #ddd;
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

function TabelHasilAlam({ hasil, title }) {
  return (
    <>
    <h3>{title}</h3>
    <div className="container">
      <table>
        <tbody>
          <tr>
            <th>#</th>
            <th>id</th>
            <th>nama</th>
            <th>desa</th>
            {/* <th>enumerator</th> */}
            <th>jenis</th>
            <th>satuan</th>
            <th>untuk</th>
            <th>luas</th>
            <th>dikonsumsi</th>
            <th>dijual</th>
            <th>nilai</th>
          </tr>
          {hasil.map((item, index) => (
            <tr key={`${item.id} ${index}`}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.nama}</td>
              <td>{item.desa}</td>
              {/* <td>{item.enumerator}</td> */}
              <td>{item.jenis}</td>
              <td>{item.satuan ? item.satuan : ''}</td>
              <td>{item.untuk}</td>
              <td>{item.luas}</td>
              <td>{item.dikonsumsi}</td>
              <td>{item.dijual}</td>
              <td>{item.nilai}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <style jsx>{`
      .container {
        overflow: auto;
        max-height: 400px;
        border: 1px solid #666;
      }
      table {
        width: 100%;
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
        border: 1px solid #ddd;
      }
      select {
        padding: 4px 8px;
        margin-bottom: 1rem;
      }
      `}</style>
    </>
  )
}