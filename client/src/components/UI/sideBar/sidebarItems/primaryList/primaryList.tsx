import React from "react";
import classes from "./primaryList.module.scss";

interface Props {
  children: JSX.Element;
}

const primaryList = (props: Props) => {
  return <ul className={classes.primaryList}>{props.children}</ul>;
};

export default primaryList;
