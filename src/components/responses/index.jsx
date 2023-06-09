import { useEffect, useState } from "react";
import { collection, getDocs, writeBatch } from "firebase/firestore";
import { store } from "../../firebase/config";
import s from "./responses.module.css";
import { AiOutlineForm } from "react-icons/ai";
import {BsFillFlagFill} from 'react-icons/bs'
import {BsCalendar2DateFill} from 'react-icons/bs'
import {MdEmojiPeople} from 'react-icons/md'
import {MdEmail} from 'react-icons/md'
import Loader from "../loader/loader";

export default function Responses() {
  const [data, setData] = useState([]);

  const fetchPost = async () => {
    await getDocs(collection(store, "contact Info")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData(newData);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const cleanCollection = async () => {
    const collectionRef = collection(store, "contact Info");
    const querySnapshot = await getDocs(collectionRef);
    const batch = writeBatch(store);

    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
  };

  return (
    <div className={s.mainContainer}>
      <div className={s.subContainer}>
        {/* <button onClick={cleanCollection}>Borrar todo</button> */}
        <AiOutlineForm className={s.responseIcon} />
        <h3 className={s.dataLength}>{data.length} Respuestas</h3>
      </div>
      <div className={s.containerResponses}>
        {data.length === 0 ? (
          <Loader/>
        ) : (
          data?.map((item, i) => {
    
            const inputDateStr = item.timeStamp.toDate().toString()
            const inputDate = new Date(inputDateStr);

            // Format output date string
            const outputDateStr = new Intl.DateTimeFormat("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }).format(inputDate);


            return (
              <Layout
                timestamp={outputDateStr}
                country={item.country_of_origin}
                birth_date={item.birth_date}
                email={item.email}
                full_name={item.full_name}
                key={i}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

function Layout({ country, birth_date, email, full_name, timestamp }) {
  return (
    <div className={s.containerLayout}>
      <h6 className={s.timeStamp}>{timestamp}</h6>
      <div className={s.subContainerLayout}>
        
        <MdEmojiPeople className={s.icons}/>
        <div className={s.containerIcons}>
            <h3>Nombre completo</h3>
            <h4 className={s.label}>{full_name}</h4>
        </div>
      </div>
      <div className={s.subContainerLayout}>
      <MdEmail className={s.icons}/>
      <div className={s.containerIcons}>
        <h3>Correo electrónico</h3>
        <h4>{email}</h4>
        </div>
      </div>
      <div className={s.subContainerLayout}>
      <BsCalendar2DateFill className={s.icons}/>
      <div className={s.containerIcons}>
        <h3>Fecha de nacimiento</h3>
        <h4>{birth_date}</h4>
        </div>
      </div>
      <div className={s.subContainerLayout}>

      <BsFillFlagFill className={s.icons}/>
      <div className={s.containerIcons}>
        <h3>País de origen</h3>
        <h4 className={s.label}>{country}</h4>
        </div>
      </div>
    </div>
  );
}
