import { sosekData } from '../lib/sosek'

export default function Page() {
  const data = sosekData()

  return <>
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  </>
}