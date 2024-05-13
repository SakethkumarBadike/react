import { useCallback, useEffect, useRef, useState } from 'react'



function App() {
  const [length,setlength]=useState(6)
  const [numbersIncluded,setNumbersIncluded]=useState(false)
  const [charsIncluded,setcharsIncluded]=useState(false)
  const [password,setpassword]=useState("")
  const reference=useRef(null)

  function passwordGenerator(){
    let s='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if(numbersIncluded)s+='1234567890'
    if(charsIncluded){s+='!@#$%^&*()_~{}'}
    let char=""
    for(let i=0; i<length;i++){
      char+=s[Math.floor(Math.random()*s.length)]
    }
    setpassword(char)

  }
  const passwordGen=useCallback(passwordGenerator,[charsIncluded,numbersIncluded,length])
  useEffect(()=>
    passwordGen()
  ,[length,charsIncluded,numbersIncluded])

  return (
    <>
      <div className=" text-white relative flex justify-center bg-blue-600 h-screen w-full  align-middle">
      
        <div className=" absolute top-64 w-auto p-5  rounded-xl  bg-zinc-900">
        <h1 className='text-center text-2xl'>Password Generator</h1>
        <div className='block flex items-center'>
        <input type="text"  ref={reference} readOnly value= {password} placeholder='Password' className=" text-black w-96 h-11  m-4" />
        <button className='p-4 text-xl rounded-3xl bg-blue-500 cursor-pointer' onClick={()=>{
          window.navigator.clipboard.writeText(password)
          reference.current?.select(password)

        }}>Copy</button>
        </div>
        <input type="range" className='cursor-pointer' id="length" max={20} min={6} value={length}  onChange={()=>setlength(document.getElementById("length").value)} />
        <label htmlFor="length" className='mr-5'>Length :{length}</label>
       
        <input type="checkbox"  onChange={()=>setNumbersIncluded(!numbersIncluded)}  id="numbers" className='ml-2' />
        <label htmlFor="numbers" className='mr-2 cursor-pointer'> Numbers</label>
        <input type="checkbox" onChange={()=>setcharsIncluded(!charsIncluded)}  className='ml-2' id="chars" />
        <label htmlFor="chars" className='cursor-pointer'  > Special Characters</label>
        </div>
      </div>
    </>
  )
}

export default App
