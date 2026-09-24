import FormBuilder from "../Builder/FormBuilder";
import styles from "./form.module.css";
const FormComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div>Form</div>
        <div className={styles.formFields}>
          <FormBuilder />
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
