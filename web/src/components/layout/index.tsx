import { Outlet } from "react-router";
import Nav from "../nav";
import styles from './index.module.scss'
const Layout = () => {
  return (
  <div className={styles.layout}>
    <Nav></Nav>
    <div className={styles.page}>
    <Outlet />
    </div>
    </div> 
    );
}
 
export default Layout;