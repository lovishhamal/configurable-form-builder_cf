import { useFormContext, type FormField } from "../../../context/FormContext";
import LazyComponent from "../../Lazy";
import styles from "./preview.module.css";

function PreviewBuilder() {
  const { formData, deleteField, moveFieldUp, moveFieldDown } =
    useFormContext();

  return (
    <div className={styles.preview}>
      <div className={styles.header}>
        <div>
          <h2>Form Preview</h2>
          <p>Preview how your form will appear to users.</p>
        </div>
      </div>

      <div className={styles.canvas}>
        {formData.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>＋</div>
            <h3>No fields yet</h3>
            <p>Add fields to see your form preview here.</p>
          </div>
        ) : (
          <div className={styles.fields}>
            {formData.map((field: FormField, index) => (
              <div className={styles.field} key={field.id}>
                <div className={styles.fieldContent}>
                  <LazyComponent field={field} />
                </div>

                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.actionButton}
                    onClick={() => moveFieldUp(field.id)}
                    disabled={index === 0}
                    title="Move up"
                  >
                    ↑
                  </button>

                  <button
                    type="button"
                    className={styles.actionButton}
                    onClick={() => moveFieldDown(field.id)}
                    disabled={index === formData.length - 1}
                    title="Move down"
                  >
                    ↓
                  </button>

                  <button
                    type="button"
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    onClick={() => deleteField(null, field.id)}
                    title="Delete"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PreviewBuilder;
