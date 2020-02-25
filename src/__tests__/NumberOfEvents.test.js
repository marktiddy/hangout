import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  const NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  test("check something rendered", () => {
    expect(NumberOfEventsWrapper.find(".numberComponent")).toHaveLength(1);
  });
  test("check input item rendered", () => {
    expect(NumberOfEventsWrapper.find("#numEventsChoice")).toHaveLength(1);
  });
});
