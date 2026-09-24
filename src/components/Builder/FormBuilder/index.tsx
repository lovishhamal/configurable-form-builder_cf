import { useState } from "react";
import { useFormContext, type FormField } from "../../../context/FormContext";
import styles from "./formbuilder.module.css";

function FormBuilder() {
  const { formData, formFields, addField, setData } = useFormContext();

  const [activeTab, setActiveTab] = useState<null | string>(null);
  const [json, setJson] = useState("");
  const [error, setError] = useState<null | string>(null);

  const onClickFormFields = (field: FormField) => {
    addField(null, field.type);
  };

  const onClickImport = () => {
    try {
      setError(null);
      const data = JSON.parse(json);

      if (!Array.isArray(data)) {
        setError("JSON is invalid");
        return;
      }

      setData(data);
    } catch (error) {
      setError("JSON is invalid");
    }
  };

  const onClickExport = () => {
    try {
      setError(null);
      setJson(JSON.stringify(formData));
    } catch (error) {
      setError("JSON is invalid");
    }
  };

  const setTab = (type: string) => {
    setError(null);
    setJson("");
    setActiveTab(type);
  };

  return (
    <div className={styles.container}>
      <div className={styles.fields}>
        {formFields.map((field: any) => (
          <button
            type="button"
            key={field.id}
            onClick={() => onClickFormFields(field)}
            className={styles.formButton}
          >
            {field.label}
          </button>
        ))}
      </div>

      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tab} ${
            activeTab === "input" ? styles.active : ""
          }`}
          onClick={() => setTab("input")}
        >
          Input
        </button>

        <button
          type="button"
          className={`${styles.tab} ${
            activeTab === "export" ? styles.active : ""
          }`}
          onClick={() => setTab("export")}
        >
          Export
        </button>
      </div>

      <div className={styles.jsonContainer}>
        <textarea
          value={json}
          onChange={(e) => setJson(e.target.value)}
          className={styles.textarea}
        />

        {activeTab === "input" && (
          <button
            type="button"
            className={styles.actionButton}
            onClick={onClickImport}
          >
            Import JSON
          </button>
        )}
        {activeTab === "export" && (
          <button
            type="button"
            className={styles.actionButton}
            onClick={onClickExport}
          >
            Export JSON
          </button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}

export default FormBuilder;
