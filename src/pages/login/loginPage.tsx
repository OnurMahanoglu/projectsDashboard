import Login from "../../components/login/login"; 
import styles from "./loginPage.module.css";

function LoginPage() {
  return (
    <div className={styles.loginPageWrapper}>
      <Login />
    </div>
  );
}

export default LoginPage;