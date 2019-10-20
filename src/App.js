import React from "react";
import { AppointmentsDayView } from "./component/appointments-day-view/AppointmentsDayView";
import { sampleAppointments } from "./resource/sampleData";

import "./App.styles.scss";

const App = () => {
    return <AppointmentsDayView appointments={sampleAppointments} />;
};

export default App;
