import React from "react";
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.fade_in_image}>
      <div className={styles.loader}>
        <div className={styles.loader_inner}>
          <div className={styles.loader_line_wrap}>
            <div className={styles.loader_line}></div>
          </div>
          <div className={styles.loader_line_wrap}>
            <div className={styles.loader_line}></div>
          </div>
          <div className={styles.loader_line_wrap}>
            <div className={styles.loader_line}></div>
          </div>
          <div className={styles.loader_line_wrap}>
            <div className={styles.loader_line}></div>
          </div>
          <div className={styles.loader_line_wrap}>
            <div className={styles.loader_line}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
