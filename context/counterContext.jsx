import { createContext, useEffect, useState } from 'react';

export const CounterContext = createContext(0);

export default function CounterContextProvider(props) {
    const [counter, setCounter] = useState(0);
    const[Login,setLogin]=useState(null)
     function changeCounter(){
        setCounter(counter +1)
    }
    useEffect(()=>{
        if(localStorage.getItem('usertoken')!==null){
            setLogin(localStorage.getItem('usertoken'))
        }
    },[])

    return (
        <CounterContext.Provider value={{ counter, setCounter,changeCounter,Login,setLogin }}>
            {props.children}
        </CounterContext.Provider>
    );
}

