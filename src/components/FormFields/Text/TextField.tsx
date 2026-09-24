import type { FormField } from "../../../context/FormContext";
import styles from "./textField.module.css";

function TextField({ field }: { field: FormField }) {
  console.log("field.required", field);

  return (
    <div className={styles.field}>
      <label className={styles.label}>Text</label>

      <input
        className={styles.input}
        type="text"
        placeholder="Enter text"
        required={field.required}
      />
      <div>{field.required && "This field is required"}</div>
    </div>
  );
}

export default TextField;
