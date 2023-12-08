import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store/store"; 
import CookieConsent from "react-cookie-consent";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.Fragment>
      <CookieConsent
        location="bottom"
        buttonText="Accept Cookies"
        cookieName="myAwesomeCookieName2"
        style={{
          background: "#2B373B",
          color: "white",
          fontSize: "16px",
          textAlign: "center",
          padding: "10px",
        }}
        buttonStyle={{
          background: "#4e503b",
          color: "white",
          fontSize: "14px",
          borderRadius: "5px",
        }}
        expires={1}
      >
        This website uses cookies to enhance your user experience.{" "}
        <span style={{ fontSize: "12px" }}>
         (By continuing to use this site, you consent to our use of cookies)
        </span>
      </CookieConsent>
      <App />
    </React.Fragment>
  </Provider>
);
