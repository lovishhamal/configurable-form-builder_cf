import styles from "./home.module.css";

import FormComponent from "../../components/Form";
import PreviewComponent from "../../components/Preview";

const Home = () => {
  return (
    <>
      <div>Configurable form Builder</div>
      <div className={styles.container}>
        <div className={styles.formPanel}>
          <FormComponent />
        </div>
        <div className={styles.previewPanel}>
          <PreviewComponent />
        </div>
      </div>
    </>
  );
};

export default Home;
