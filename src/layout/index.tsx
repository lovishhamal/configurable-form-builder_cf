import styles from "./layout.module.css";

function Layout({ children }: { children: React.ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}

export default Layout;
