import PreviewBuilder from "../Builder/PreviewBuilder";
import styles from "./preview.module.css";

function PreviewComponent() {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.formFields}>
          <PreviewBuilder />
        </div>
      </div>
    </div>
  );
}

export default PreviewComponent;
