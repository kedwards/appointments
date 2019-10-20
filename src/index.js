import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./App";
import { CustomerForm } from "./CustomerForm";
import { AppointmentForm } from "./AppointmentForm";

ReactDOM.render(
    <AppContainer>
        <Fragment>
            <App />
            <CustomerForm />
            <AppointmentForm />
        </Fragment>
    </AppContainer>,
    document.getElementById("root"),
);

if (module.hot) {
    module.hot.accept("./App", () => {
        const NextApp = require("./App").default;
        render(NextApp);
    });
}
