import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount } from "enzyme";
import { shallow } from "enzyme";
import App from "../App";

const feature = loadFeature("./src/__features__/specifyNumberOfEvents.feature");

defineFeature(feature, test => {
  test("When a user hasn't specified a number, ten is the default number", ({
    given,
    when,
    then
  }) => {
    let AppWrapper;
    given("that the user has loaded the events page", () => {
      AppWrapper = mount(<App />);
    });
    when("the events page has loaded", () => {
      AppWrapper.update();
    });

    then("they see up to ten events on their page", () => {
      expect(AppWrapper.find(".Event")).toHaveLength(10);
      AppWrapper.unmount();
    });
  });

  test("User can choose number of events they want to see", ({
    given,
    when,
    then
  }) => {
    let AppWrapper;
    given("that the user has selected the drop down", () => {
      AppWrapper = mount(<App />);
      AppWrapper.update();
    });

    when("they change the number to five", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".select-css")).toHaveLength(1);
      AppWrapper.setState({ eventsToShow: 5 });
      expect(AppWrapper.state("eventsToShow")).toEqual(5);
      // AppWrapper.update();
    });

    then("the list shrinks to show five events", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".Event")).toHaveLength(5);
      AppWrapper.unmount();
    });
  });
});
