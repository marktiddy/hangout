import React from "react";
import { shallow, mount } from "enzyme";
import Header from "../Header";

describe("<Header /> component", () => {
  test("check header is rendering", () => {
    let HeaderWrapper = shallow(<Header />);
    expect(HeaderWrapper.find(".title")).toHaveLength(1);
  });
});
