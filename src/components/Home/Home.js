import React from "react";
import { Link } from "react-router-dom";
import styles from './home.module.css'
import Photouplaod from "../PhotoUpload/Photouplaod";

function Home(props) {
  return (
    <div className={styles.container}>
      <div>
        {props.name ? (
          <div style={{display:"flex", justifyContent:'space-between', alignItems:'center', padding:25,backgroundColor:'#CADCFC'}}>
            <h2 style={{marginLeft:100, fontSize:35}}>Welcome - {props.name}</h2>
            <button onClick={props.handleSignOut} className={styles.btn}>Sign Out</button>
          </div>
        ) : (
          <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',marginTop:20,marginBottom:20,padding:25}}>
            <h1 style={{fontSize:50}}>Login please</h1>
            <h1 className={styles.loginbtn}>
              <Link to="/login" className={styles.btnstyle}>Login</Link>
            </h1>

            <h1 className={styles.signupbtn}>
              <Link to="/signup" className={styles.btnstyle}>Sign Up</Link>
            </h1>
          </div>
        )}
      </div>
      <br />
      <br />
      <br />

      {/* <h2>{props.name ? `Welcome - ${props.name}`: "Login please"} </h2> */}
      {props.name && (
        <Photouplaod/>
      )}
    </div>
  );
}

export default Home;
