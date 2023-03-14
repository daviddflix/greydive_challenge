import db from "../../database/db.json";
import { useFormik } from "formik";
import s from "./form.module.css";
import * as Yup from "yup";
import {store} from '../../firebase/config'
import { collection, addDoc } from "firebase/firestore";

export default function Form() {

  const { handleSubmit, errors, touched, getFieldProps } = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      birth_date: "",
      country_of_origin: "",
      terms_and_conditions: false,
    },
    validationSchema: Yup.object().shape({
      full_name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      birth_date: Yup.date()
        .nullable()
        .transform((value, originalValue) => {
          const date = new Date(originalValue);
          return isNaN(date) ? null : date;
        })
        .max(new Date(), "Birth date must be in the past")
        .required("Birth date is required"),
      country_of_origin: Yup.string().required("Country of origin is required"),
      terms_and_conditions: Yup.boolean()
        .oneOf([true], "Must accept terms and conditions")
        .required("Must accept terms and conditions"),
    }),
    onSubmit: async(values, {resetForm}) => {
      
    try {
    const docRef =  await addDoc(collection(store, "contact Info"), { values });
      console.log("Document written with ID: ", docRef.id);
      resetForm();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    
      alert(JSON.stringify(values, null, 2));
    },
  });





  return (
    <form noValidate onSubmit={handleSubmit}>
      {db.items.slice(0, 3).map((item) => {
        return (
          <div key={item.label}>
             <label>{item.label}</label>
            <input
              type={item.type}
              placeholder={item.label}
              {...getFieldProps(item.name)}
              className={`${touched.full_name && errors.full_name && "error_input"}`}
            />
           {(touched[item.name] && errors[item.name]) && <span className="error">{errors[item.name]}</span>} 
          </div>
        );
      })}
      {
        db.items.slice(3,4).map(item => {
          return(
            <div key={item.label}>
               <label htmlFor="rol">{item.label}</label>
               <select id="rol" {...getFieldProps(item.name)} >
                        <option value="">--- Select ---</option>
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
                    {(touched[item.name] && errors[item.name]) && <span className="error">{errors[item.name]}</span>}
            </div>
          )
        })
      }
      {
         db.items.slice(4,5).map(item => {
          return(
            <label key={item.label} className="label_check">
            <span>{item.label}</span>
            <input type={item.type}  {...getFieldProps(item.name)}  />
            {(touched[item.name] && errors[item.name]) && <span className="error">{errors[item.name]}</span>}
          </label>
          )
         })
      }
      <button type="submit">Enviar</button>
    </form>
  );
}


