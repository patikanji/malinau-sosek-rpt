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

  function getTopik(topik) {
    const data = getData()
    let obj = { _BLANK: 0 }
    data.forEach(item => {
      if (item[topik] === "" || item[topik].length === 0 || item[topik][0] === "") {
        obj._BLANK++
      } else {
        const key = Array.isArray(item[topik]) ? item[topik].sort().join(", ") : item[topik]
        if (obj[key] === undefined) obj[key] = 0
        console.log(key)
        obj[key]++
      }
    })

    return obj
  }

  function getLongTopik(topik) {
    const data = getData()
    let answers = []
    data.forEach(item => {
      if (!answers.includes(item[topik])) {
        answers.push(item[topik])
      }
    })
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
      <h2>Obervasi Rumah</h2>
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
        <table>
          <tbody>
            <tr>
              <th>#</th>
              <th>id</th>
              <th>nama</th>
              <th>kecamatan</th>
              <th>desa</th>
              <th>Langit</th>
              <th>Dinding</th>
              <th>Lantai</th>
              <th>JendelaKamar</th>
              <th>JendelaRuang</th>
              <th>Ventilasi</th>
              <th>Pencahayaan</th>
              <th>Asap</th>
              <th>Kepadatan</th>
            </tr>
          {getData().map((d,index) => (
            <tr key={d.id}>
              <td>{index + 1}</td>
              <td><code>{d.id}</code></td>
              <td>{d.nama}</td>
              <td>{d.kecamatan}</td>
              <td>{d.desa}</td>
              <td>{d.observasiLangit}</td>
              <td>{d.observasiDinding}</td>
              <td>{d.observasiLantai}</td>
              <td>{d.observasiJendelaKamar}</td>
              <td>{d.observasiJendelaRuang}</td>
              <td>{d.observasiVentilasi}</td>
              <td>{d.observasiPencahayaan}</td>
              <td>{d.observasiAsap}</td>
              <td>{d.observasiKepadatan}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <TabelTopik topik="observasiLangit" />
        <TabelTopik topik="observasiDinding" />
        <TabelTopik topik="observasiLantai" />
        <TabelTopik topik="observasiJendelaKamar" />
        <TabelTopik topik="observasiJendelaRuang" />
        <TabelTopik topik="observasiVentilasi" />
        <TabelTopik topik="observasiPencahayaan" />
        <TabelTopik topik="observasiAsap" />
        <TabelTopik topik="observasiKepadatan" />
      </div>
      <br/>
      <div>
observasiLangit:
&bull; Bersih
&bull; Tidak ada
&bull; Kotor, sulit dibersihkan dan rawan kecelakaan
<br/>
observasiLangit:
&bull; Bersih
&bull; Tidak ada
&bull; Kotor, sulit dibersihkan dan rawan kecelakaan
<br/>
observasiDinding:
&bull; Bukan tembok (terbuat dari anyaman bambu/papan)
&bull; Semi permanen / tanpa plester / papan tidak kedap air
&bull; Permanen / dengan plester / papan kedap air
<br/>
observasiLantai:
&bull; Papan dekat tanah, plesteran retak dan berdebu
&bull; Diplester/ubin/keramik/papan (rumah panggung)
<br/>
observasiJendelaKamar:
&bull; Semua ada
&bull; Tidak ada
&bull; Sebagian ada
<br/>
observasiJendelaRuang:
&bull; Semua ada
&bull; Sebagian ada
&bull; Tidak ada
<br/>
observasiVentilasi:
&bull; Lebih besar atau sama dengan 10% luas lantai
&bull; Sebagian Ruangan tanpa ventilasi / kurang dari 10% luas lantai
&bull; Tidak ada
<br/>
observasiPencahayaan:
&bull; Terang, tidak silau, nyaman untuk membaca
&bull; Kurang terang, tidak nyaman untuk membaca dengan normal
&bull; Tidak terang (tidak dapat digunakan untuk membaca)
<br/>
observasiAsap:
&bull; Lubang Ventilasi dapur lbh besar atau sama dengan 10% Luas lantai
&bull; Tidak ada
<br/>
observasiKepadatan:
&bull; Ruang tidur kurang dari 8 meter untuk lebih dari 2 orang
&bull; Ruang tidur lebih 8 meter digunakan untuk tidur oleh 2 orang
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