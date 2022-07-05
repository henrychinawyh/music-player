import RouterWrapper from "./routers";
import { connect } from "react-redux";
import styles from "./app.less";
import { useEffect } from "react";

function App(props: any) {
  const {dispatch,login } = props || {}


  useEffect(() => {

  },[]);

  return <div className={styles.app}><RouterWrapper /></div>;
}

export default connect((state) => state)(App);
