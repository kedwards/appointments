import React from "react";
import ReactDOM from "react-dom";

import { Appointment } from "../src/Appointment";

describe("Appointment", () => {
    let container;
    let customer;

    beforeEach(() => {
        container = document.createElement("div");
    });

    const render = component => ReactDOM.render(component, container);

    it("renders the customer first name", () => {
        customer = { firstName: "Leanne" };
        render(<Appointment customer={customer} />);
        expect(container.textContent).toMatch("Leanne");
    });

    it("renders the customer first name", () => {
        customer = { firstName: "Kevin" };
        render(<Appointment customer={customer} />);
        expect(container.textContent).toMatch("Kevin");
    });
});
