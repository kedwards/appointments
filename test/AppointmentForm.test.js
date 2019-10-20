import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import { createContainer } from "./domManipulators";
import { AppointmentForm } from "../src/AppointmentForm";

describe("AppointmentForm", () => {
    let render, container;

    beforeEach(() => {
        ({ render, container } = createContainer());
    });

    const form = id => container.querySelector(`form[id="${id}"]`);

    const field = name => form("appointment").elements[name];

    const labelFor = formElement =>
        container.querySelector(`label[for='${formElement}']`);

    it("renders a form", () => {
        render(<AppointmentForm />);
        expect(form("appointment")).not.toBeNull();
    });

    describe("service field", () => {
        const findOption = (dropdownNode, textContent) => {
            const options = Array.from(dropdownNode.childNodes);
            return options.find(option => option.textContent === textContent);
        };

        it("renders as a select box", () => {
            render(<AppointmentForm />);
            expect(field("service")).not.toBeNull();
            expect(field("service").tagName).toEqual("SELECT");
        });

        const initialBlankValue = service =>
            it("initially has a blank value chosen", () => {
                render(<AppointmentForm />);
                const firstNode = field(service).childNodes[0];
                expect(firstNode.value).toEqual("");
                expect(firstNode.selected).toBeTruthy();
            });

        const listAllServices = () =>
            it("lists all salon services", () => {
                const selectableServices = ["Cut", "Blow-dry"];

                render(
                    <AppointmentForm selectableServices={selectableServices} />,
                );

                const optionNodes = Array.from(field("service").childNodes);
                const renderedServices = optionNodes.map(
                    node => node.textContent,
                );
                expect(renderedServices).toEqual(
                    expect.arrayContaining(selectableServices),
                );
            });

        const preSelectsWithExistingValue = () =>
            it("pre-selects the existing value", () => {
                const services = ["Cut", "Blow-dry"];
                render(
                    <AppointmentForm
                        selectableServices={services}
                        service='Blow-dry'
                    />,
                );
                const option = findOption(field("service"), "Blow-dry");
                expect(option.selected).toBeTruthy();
            });

        const itRendersALabel = (fieldName, textValue) =>
            it("renders a label", () => {
                render(<AppointmentForm />);
                expect(labelFor(fieldName)).not.toBeNull();
                expect(labelFor(fieldName).textContent).toEqual(textValue);
            });

        const itAssignsAnIdThatMatchesTheLabelId = fieldName =>
            it("assigns an id that matches the label id", () => {
                render(<AppointmentForm />);
                expect(field(fieldName).id).toEqual(fieldName);
            });

        const itSubmitsExistingValue = (service, props) =>
            it.skip("saves existing value when submitted", async () => {
                expect.hasAssertions();
                render(
                    <AppointmentForm
                        service={service}
                        onSubmit={({ fieldName }) =>
                            expect(fieldName).toEqual(fieldName)
                        }
                    />,
                );
                await ReactTestUtils.Simulate.submit(form("service"));
            });

        const itSubmitsNewValue = (fieldName, value) =>
            it.skip("saves new value when submitted", async () => {
                expect.hasAssertions();
                render(
                    <CustomerForm
                        {...{ [fieldName]: "existingValue" }}
                        onSubmit={props =>
                            expect(props[fieldName]).toEqual(value)
                        }
                    />,
                );
                await ReactTestUtils.Simulate.change(field(fieldName), {
                    target: { value, name: fieldName },
                });
                await ReactTestUtils.Simulate.submit(form("customer"));
            });

        describe("select box", () => {
            initialBlankValue("service");
            itRendersALabel("service", "Salon service");
            itAssignsAnIdThatMatchesTheLabelId("service");
            listAllServices();
            preSelectsWithExistingValue();
            itSubmitsExistingValue("Cut", "Cut");
            itSubmitsNewValue("service", "anotherService");
        });

        const timeSlotTable = () => container.querySelector("table#time-slots");

        describe("time slot table", () => {
            const startsAtField = index =>
                container.querySelectorAll(`input[name="startsAt"]`)[index];

            it("renders a table for time slots", () => {
                render(<AppointmentForm />);
                expect(timeSlotTable()).not.toBeNull();
            });

            it("renders a time slot for every half an hour between open and close times", () => {
                render(<AppointmentForm salonOpensAt={9} salonClosesAt={11} />);
                const timesOfDay = timeSlotTable().querySelectorAll(
                    "tbody >* th",
                );
                expect(timesOfDay).toHaveLength(4);
                expect(timesOfDay[0].textContent).toEqual("09:00");
                expect(timesOfDay[1].textContent).toEqual("09:30");
                expect(timesOfDay[3].textContent).toEqual("10:30");
            });

            it("renders an empty cell at the start of the header row", () => {
                render(<AppointmentForm />);
                const headerRow = timeSlotTable().querySelector("thead > tr");
                expect(headerRow.firstChild.textContent).toEqual("");
            });

            it("renders a week of available dates", () => {
                const today = new Date(2019, 9, 19);
                render(<AppointmentForm today={today} />);
                const dates = timeSlotTable().querySelectorAll(
                    "thead >* th:not(:first-child)",
                );
                expect(dates).toHaveLength(7);
                expect(dates[0].textContent).toEqual("Sat 19");
                expect(dates[1].textContent).toEqual("Sun 20");
                expect(dates[6].textContent).toEqual("Fri 25");
            });

            it("renders a radio button for each time slot", () => {
                const today = new Date();
                const availableTimeSlots = [
                    { startsAt: today.setHours(9, 0, 0, 0) },
                    { startsAt: today.setHours(9, 30, 0, 0) },
                ];
                render(
                    <AppointmentForm
                        availableTimeSlots={availableTimeSlots}
                        today={today}
                    />,
                );
                const cells = timeSlotTable().querySelectorAll("td");
                expect(
                    cells[0].querySelector('input[type="radio"]'),
                ).not.toBeNull();
                expect(
                    cells[7].querySelector('input[type="radio"]'),
                ).not.toBeNull();
            });

            it("does not render radio buttons for unavailable time slots", () => {
                render(<AppointmentForm availableTimeSlots={[]} />);
                const timesOfDay = timeSlotTable().querySelectorAll("input");
                expect(timesOfDay).toHaveLength(0);
            });

            it("sets radio button values to the index of the corresponding appointment", () => {
                const today = new Date();
                const availableTimeSlots = [
                    { startsAt: today.setHours(9, 0, 0, 0) },
                    { startsAt: today.setHours(9, 30, 0, 0) },
                ];
                render(
                    <AppointmentForm
                        availableTimeSlots={availableTimeSlots}
                        today={today}
                    />,
                );
                expect(startsAtField(0).value).toEqual(
                    availableTimeSlots[0].startsAt.toString(),
                );
                expect(startsAtField(1).value).toEqual(
                    availableTimeSlots[1].startsAt.toString(),
                );
            });

            it.skip("saves new value when submitted", () => {
                expect.hasAssertions();
                const today = new Date();
                const availableTimeSlots = [
                    { startsAt: today.setHours(9, 0, 0, 0) },
                    { startsAt: today.setHours(9, 30, 0, 0) },
                ];
                render(
                    <AppointmentForm
                        availableTimeSlots={availableTimeSlots}
                        today={today}
                        startsAt={availableTimeSlots[0].startsAt}
                        onSubmit={({ startsAt }) =>
                            expect(startsAt).toEqual(
                                availableTimeSlots[1].startsAt,
                            )
                        }
                    />,
                );
                ReactTestUtils.Simulate.change(startsAtField(1), {
                    target: {
                        value: availableTimeSlots[1].startsAt.toString(),
                        name: "startsAt",
                    },
                });
                ReactTestUtils.Simulate.submit(form("appointment"));
            });
        });
    });
});
