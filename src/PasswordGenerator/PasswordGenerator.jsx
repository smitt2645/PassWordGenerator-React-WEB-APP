import React, { useCallback, useEffect, useRef, useState } from 'react'
import "../index.css"

function PasswordGenerator() {
    const [theme,setTheme] = useState(false);
    const [length,setlength] = useState(6);
    // here we have password we are getting from the PasswordGeneretor function!
    const [pass,setPass] = useState("");
    //  if we want numbers in password so we can add numbers
    const [num,setNum] = useState(false);
    //  if we want char in password so we can add char
    
    const [char,setChar] = useState(false);

    // here we are getting reference of PassWord 
    const Passref = useRef(null)
    
    
    const PasswordGenerator = useCallback(()=>{
        let password = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        let chartrAllowed = "!@#$%^&*)(_+=><?{}][|"
        let numberAllowedr = "1234567890";
        
        if(char) str += chartrAllowed;
        if(num) str += numberAllowedr;

        for(let i=1;i<=length;i++){
             let char = Math.floor(Math.random() * str.length + 1 );
             console.log(char);
             password += str.charAt(char);
        }
        
        console.log(password);
        setPass(password);
        
        
    },[length,num,char,setPass]);

    const CopyPassWordClipBoard = useCallback(()=>{
        // if copyAnyValues or strings so use window object Globle Object!
        // it has default methods select it will highlight selceting values!
        Passref.current?.select()

        window.navigator.clipboard.writeText(pass);
        
        alert("Password Copied",pass);

    },[pass])

    // if at page Refresh PasswordGenereator calls so it will handle!  
    // and we will get updated Values 
    // if we not assign At pageRefresh so We will get bug we can not get Updatedvalues 
    // like if checked on num or char!

    // here we will Change any dependencies Function will call autometically!
    useEffect(()=>{
        PasswordGenerator();
    },[length,num,char,setPass,PasswordGenerator]);

    

    return (
        <>
            <div className=" MainContainer  "   
            style={{
                
    backgroundImage: 'url("https://www.malwarebytes.com/wp-content/uploads/sites/2/2023/08/password-generator-3.png?w=600")',
    backgroundSize: 'cover', // optional: to cover the entire div
    backgroundPosition: 'center', // optional: to center the image
    width: '100%', // optional: set the width of the div
    height: '100vh', // optional: set the height of the div
    backgroundColor: theme ? 'black' : 'white',
  }}>
                <div className='Head w-screen h-10 flex justify-center items-center bg-slate-700'>
                    <div className=' text-white '>PasswordGenerator</div>
                    <div className=' ml-2'>
                        <button  onClick={()=>setTheme((prev)=>!prev)} className={` p-1${theme ? " text-white  bg-indigo-800" :" text-black bg-indigo-800"}`}>{theme ? "LightMode":"DarkMode"}</button>
                    </div>
                </div>
                <div className=' Generator h-96 flex justify-center relative top-1/2 '>
                    <div className=' box w-1/2 h-1/2 border border-black border-solid p-3  bg-sky-900'>
                        <div className=' Upper border border-black border-solid'>
                            <div className='Input flex justify-center items-center p-6'>
                                <input className=' w-1/2' type='text' value={pass} readOnly/>
                                <button className=' px-3 bg-blue-500 ml-2 hover:bg-red-400' type='button' onClick={CopyPassWordClipBoard} >Copy</button>
                            </div>

                        </div>
                        <div className=' Lower border border-black border-solid'>
                            <div className=' Container w-auto border-red-700 border-solid'>
                                <div className=' bg-red-600 '>
                                    <div className=' Items grid grid-cols-3 h-10 '>
                                        <div className=' bg-red-500 flex items-center justify-center'>
                                        <input type='range' ref={Passref} value={length} min={6} max={50} onChange={(e)=>setlength(e.target.value)}/>
                                        <h3>{length}</h3>
                                        </div>
                                        <div className=' bg-green-500 flex items-center justify-center'>
                                        <input type='checkbox' defaultChecked={num} onChange={()=>{setNum((prev)=>!prev)}}/>
                                        <h3>Numbrs</h3>

                                        </div>
                                        <div className=' bg-sky-400 flex items-center justify-center'>
                                        <input type='checkbox' defaultChecked={char} onChange={()=>{setChar((prev)=>!prev)}}/>
                                        <h3>Char</h3>


                                        </div>
                                        
                                    </div>


                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default PasswordGenerator
