import Register from "../../components/register/register.tsx";
import styles from "./loginPage.module.css";

function RegisterPage() {
  return (
    <div className={styles.loginPageWrapper}>
      <Register />
    </div>
  );
}

export default RegisterPage;