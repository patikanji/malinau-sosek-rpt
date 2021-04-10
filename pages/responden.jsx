import { useState } from 'react'
import sosekFinal from '../lib/sosek-final-abrv.json'

/*
DELETE 1616509617118-5C5D28AAFB	ROMI BIAT

ADD 1618041386720-E234318FC5

GANTI
  Budi bujung = Rian Tubu   1618047795855-92E7967DFE
  Agustina musa = paking    1618049668906-CFF3C2C78D
  Ibung Alang = Long pada   1616977015912-194053B1AE


*/



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

export default function Responden() {
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
      if (item[topik] === "") {
        obj._BLANK++
      } else {
        const key = item[topik]
        if (obj[key] === undefined) obj[key] = 0
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
      <h2>Responden Sosek</h2>
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
              {/* <th>enum</th> */}
              <th>gender</th>
              <th>umur</th>
              <th>anggota</th>
              <th>hubungan</th>
              <th>marital</th>
              <th>pendidikan</th>
              <th>pekerjaan</th>
              <th>agama</th>
              <th>suku</th>
              <th>bahasa</th>
              <th>mukim</th>
              <th>kerentanan</th>
            </tr>
          {getData().map((d,index) => (
            <tr key={d.id}>
              <td>{index + 1}</td>
              <td><code>{d.id}</code></td>
              <td>{d.nama}</td>
              <td>{d.kecamatan}</td>
              <td>{d.desa}</td>
              {/* <td>{d.enumerator}</td> */}
              <td>{d.gender}</td>
              <td>{d.umur}</td>
              <td>{d.anggota.length}</td>
              <td>{d.hubungan}</td>
              <td>{d.marital}</td>
              <td>{d.pendidikan}</td>
              <td>{d.pekerjaan}</td>
              <td>{d.agama}</td>
              <td>{d.suku}</td>
              <td>{d.bahasa}</td>
              <td>{d.mukim}</td>
              <td>{d.kerentanan}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>



      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <TabelTopik topik="gender" />
        <TabelTopik topik="hubungan" />
        <TabelTopik topik="marital" />
        <TabelTopik topik="pendidikan" />
        <TabelTopik topik="pekerjaan" />
        <TabelTopik topik="suku" />
        <TabelTopik topik="bahasa" />
        <TabelTopik topik="mukim" />
      </div>

      <br/>
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

function Nova() {
  const lol = kolo
  useState
}