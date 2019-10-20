import React, { Fragment } from "react";

import "./Appointment.styles.scss";

export const appointmentTimeOfDay = startsAt => {
    const [h, m] = new Date(startsAt).toTimeString().split(":");
    return `${h}:${m}`;
};

export const Appointment = ({ customer }) => {
    return (
        <div>
            <Fragment>
                <h2>
                    Appointment for{" "}
                    <span>
                        {customer.firstName} {customer.lastName}
                    </span>
                </h2>
            </Fragment>
            <div id='appointmentsDayView'>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                            <th>Stylist</th>
                            <th>Service</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <th>{customer.firstName}</th>
                            <th>{customer.lastName}</th>
                            <th>{customer.phoneNumber}</th>
                            <th>Stylist</th>
                            <th>Service</th>
                            <th>Notes</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
