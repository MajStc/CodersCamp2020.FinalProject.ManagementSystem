import React, { FunctionComponent } from "react";

import styles from "./button.module.scss";

interface Props {
  children: string;
  clicked?: () => void;
}

const button: FunctionComponent<Props> = (props: any) => {
  return (
    <button className={styles.button} onClick={props.clicked} type="submit">
      {props.children}
    </button>
  );
};

export default button;
