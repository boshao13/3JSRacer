import { useState } from 'react'

export function Name() {
  const [name, setName]= useState('')
  const [clicked, setClicked] = useState(false)
  const handleClick = ()=>{
    setClicked(true)
  }
  return (
    <div>
      {!clicked &&
        <div className="controls">
          <p> Enter your name  </p>
          <input value={name} onChange={(e)=>{setName(e.target.value)}}/>
          <button onClick={handleClick}> Start </button>
     </div>}
      {clicked &&
      <div className="info">
        "I live my life a quarter mile at a time  - {name}"
        </div>}
     </div>
  )
}