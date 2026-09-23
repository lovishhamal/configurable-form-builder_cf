import { FORM_DATA } from "../../constants/form";
import LazyComponent from "../Lazy";
import styles from "./form.module.css";
const FormComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Editor</div>
      <div className={styles.formContainer}>
        <div>Form Fields</div>
        <div className={styles.formFields}>
          {FORM_DATA.map((field) => {
            return (
              <div key={field.key}>
                <LazyComponent field={field.type} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
