import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import {store} from '../../firebase/config'

export default function Responses(){

    const [data, setData] = useState([]);
    console.log('data', data);
    const fetchPost = async () => {
       
        await getDocs(collection(store, "contact Info"))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                    setData(newData);                
              
            })
       
    }
   
    useEffect(()=>{
        fetchPost();
    }, [])


    return(
        <h1>responses</h1>
    )
}