import type { FormField } from "../../../context/FormContext";
import styles from "./numberField.module.css";

function NumericField({ field }: { field: FormField }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>Number</label>

      <input
        className={styles.input}
        type="number"
        placeholder="Enter a number"
        required={field.required}
      />
      <div>{field.required && "This field is required"}</div>
    </div>
  );
}

export default NumericField;
