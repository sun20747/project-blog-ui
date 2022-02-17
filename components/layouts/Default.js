import React from "react";
import Topbar from "./reusable/Topbar";
import styles from "./Default.module.css";
import Root from './Root'
export default function Default({ children }) {
  return (
    <Root>
      <Topbar></Topbar>
      <div className={styles.container}>{children}</div>
    </Root>
  );
}
