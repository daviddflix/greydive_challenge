import db from "../../database/db.json";
import { useFormik } from "formik";
import s from "./form.module.css";
import * as Yup from "yup";
import {store} from '../../firebase/config'
import { serverTimestamp, collection, addDoc } from "firebase/firestore";
import Swal from 'sweetalert2'
import Checkbox from '@mui/material/Checkbox';

export default function Form() {

  const { handleSubmit, errors, touched, getFieldProps, isSubmitting } = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      birth_date: "",
      country_of_origin: "",
      terms_and_conditions: false,
    },
    validationSchema: Yup.object().shape({
      full_name: Yup.string().required("Por favor Ingrese nombre completo."),
      email: Yup.string().email("Correo invalido.").required("Correo electrónico requerido."),
      birth_date: Yup.date()
        .nullable()
        .transform((value, originalValue) => {
          const date = new Date(originalValue);
          return isNaN(date) ? null : date;
        })
        .max(new Date(), "Fecha inválida.")
        .required("Fecha de nacimiento requerida."),
      country_of_origin: Yup.string().required("Pais de nacimiento es requerido"),
      terms_and_conditions: Yup.boolean()
        .oneOf([true], "Deben ser aceptados")
        .required("Deben ser aceptados"),
    }),
    onSubmit: async(values, {resetForm}) => {
      
    try {
      const docRef =  await addDoc(collection(store, "contact Info"), { ...values, timeStamp: serverTimestamp() });
      Swal.fire({
        title: 'Información enviada con éxito',
        text: 'Para visualizar los datos dirijirse a la sección respuestas.',
        icon: 'success'
      });
      resetForm();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    
    },
  });


  return (
    <form className={s.mainContainer} noValidate onSubmit={handleSubmit}>
      <h4 className={s.message}>
        Por favor proporcione la información requerida en el siguiente
        formulario. Asegúrese de responder todas las preguntas de manera precisa
        y completa.
      </h4>
      <div className={s.mainContainerInputs}>{db.items.slice(0, 3).map((item) => {
        return (
          <div className={s.container} key={item.label}>
             <label className={s.label}>{item.label} *</label>
            <input
              type={item.type}
              placeholder={item.label}
              {...getFieldProps(item.name)}
              className={s.input}
              
            />
           {(touched[item.name] && errors[item.name]) ? <span className={s.error}>{errors[item.name]}</span> : <span className={s.error}></span>} 
          </div>
        );
      })}
      </div>
      <div className={s.mainContainerInputs}>{
        db.items.slice(3,4).map(item => {
          return(
            <div className={s.container} key={item.label}>
               <label className={s.label} htmlFor="rol">{item.label} *</label>
               <select className={s.select} id="rol" {...getFieldProps(item.name)} >
                        <option value="">--- Selecciona ---</option>
                        {
                          item.options.map(({label, value}) => {
              
                            return(
                              <option value={value} key={value}>
                              {label}
                            </option>
                            )
                          })
                        }
                    </select>
                    {(touched[item.name] && errors[item.name]) ? <span className={s.error}>{errors[item.name]}</span> : <span className={s.error}></span>}
            </div>
          )
        })
      }
      </div>
      <div className={s.mainContainerTerms}>{
         db.items.slice(4,5).map(item => {
          return(
            <label key={item.label} className={s.containerTerms}>
             <div className={s.subContainerTerms}>
             <span className={s.labelTerms}>{item.label}</span>
             <Checkbox className={s.checkbox} {...getFieldProps(item.name)} color="success" size="medium" />
             </div>
            {(touched[item.name] && errors[item.name]) ? <span className={s.errorTerms}>{errors[item.name]}</span> : <span className={s.errorTerms}></span>}
          </label>
          )
         })
      }
      </div>
      <button className={s.submitBtn} type="submit">{isSubmitting ? 'Enviando...' : 'Enviar'}</button>
    </form>
  );
}


