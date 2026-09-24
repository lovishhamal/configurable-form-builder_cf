import { useFormContext, type FormField } from "../../../context/FormContext";
import LazyComponent from "../../Lazy";
import styles from "./groupField.module.css";

function GroupField({ field }: { field: FormField }) {
  const { formFields, addField, deleteField, moveFieldUp, moveFieldDown } =
    useFormContext();

  const onClickFormFields = (value: string) => {
    addField(field.id, value);
  };

  return (
    <div className={styles.group}>
      <div className={styles.groupHeader}>
        <div className={styles.groupTitle}>{field.label}</div>

        <div className={styles.groupBadge}>Group</div>
      </div>

      <div className={styles.groupContent}>
        <div className={styles.children}>
          {field.children?.map((childField: any, index) => (
            <div className={styles.childField} key={childField.id}>
              <div className={styles.childContent}>
                <LazyComponent field={childField} />
              </div>

              <div className={styles.childActions}>
                <button
                  type="button"
                  onClick={() => moveFieldUp(childField.id)}
                  disabled={index === 0}
                  title="Move up"
                >
                  ↑
                </button>

                <button
                  type="button"
                  onClick={() => moveFieldDown(childField.id)}
                  disabled={index === (field.children?.length ?? 0) - 1}
                  title="Move down"
                >
                  ↓
                </button>

                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() => deleteField(field.id, childField.id)}
                  title="Delete"
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.addSection}>
          <div className={styles.addTitle}>Add field</div>

          <div className={styles.buttons}>
            {formFields.map((formField: any) => (
              <button
                type="button"
                key={formField.id}
                className={styles.addButton}
                onClick={() => onClickFormFields(formField.type)}
              >
                <span className={styles.plus}>+</span>
                {formField.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupField;
