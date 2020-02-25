import React from "react";
import { shallow } from "enzyme";
import CitySearch from "../CitySearch";

describe("<CitySearch /> component", () => {
  let CitySearchWrapper;
  beforeAll(() => {
    CitySearchWrapper = shallow(<CitySearch updateEvents={() => {}} />);
  });
  test("render search input", () => {
    //Looks for an element with a class name of city
    expect(CitySearchWrapper.find(".city")).toHaveLength(1);
  });
  test("render list of suggestions", () => {
    expect(CitySearchWrapper.find(".suggestions")).toHaveLength(1);
  });
  test("render text input correctly", () => {
    const query = CitySearchWrapper.state("query");
    expect(CitySearchWrapper.find(".city").prop("value")).toBe(query);
  });

  test("change state when text input changes", () => {
    //We create a mock object which says to change a value to Berlin once the change event is called
    const eventObject = { target: { value: "Berlin" } };
    //Now we find out city component and simulate a change to the target of eventObject
    CitySearchWrapper.find(".city").simulate("change", eventObject);
    expect(CitySearchWrapper.state("query")).toBe("Berlin");
  });
  test("render list of suggestions correctly", () => {
    const suggestions = CitySearchWrapper.state("suggestions");
    //First we expect the number of li elements to be the same as the number of suggestions
    expect(CitySearchWrapper.find(".suggestions li")).toHaveLength(
      suggestions.length
    );
    //Then we run a loop over each suggestion and check the text matches the expected test
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(
        CitySearchWrapper.find(".suggestions li")
          .at(i)
          .text()
      ).toBe(suggestions[i].name_string);
    }
  });
  test("click on suggestion should change query state and empty list of suggestions", () => {
    CitySearchWrapper.setState({
      suggestions: [
        {
          city: "Munich",
          country: "de",
          localized_country_name: "Germany",
          name_string: "Munich, Germany",
          zip: "meetup3",
          lat: 48.14,
          lon: 11.58
        },
        {
          city: "Munich",
          country: "us",
          localized_country_name: "USA",
          state: "ND",
          name_string: "Munich, North Dakota, USA",
          zip: "58352",
          lat: 48.66,
          lon: -98.85
        }
      ]
    });
    expect(CitySearchWrapper.find(".suggestions li")).toHaveLength(2);

    CitySearchWrapper.find(".suggestions li")
      .at(0)
      .simulate("click");
    expect(CitySearchWrapper.state("query")).toBe("Munich, Germany");
    expect(CitySearchWrapper.find(".suggestions li")).toHaveLength(0);
  });
});

//New scope to separate unit tests from integration tests
describe("<CitySearch /> integration", () => {
  //A test to check if the value of suggestions in CitySearch is equal to given objects
  test("get list of cities when user searches for Munich", async () => {
    const CitySearchWrapper = shallow(<CitySearch />);
    CitySearchWrapper.find(".city").simulate("change", {
      target: { value: "Munich" }
    });
    await CitySearchWrapper.update();
    expect(CitySearchWrapper.state("suggestions")).toEqual([
      {
        city: "Munich",
        country: "de",
        localized_country_name: "Germany",
        name_string: "Munich, Germany",
        zip: "meetup3",
        lat: 48.14,
        lon: 11.58
      },
      {
        city: "Munich",
        country: "us",
        localized_country_name: "USA",
        state: "ND",
        name_string: "Munich, North Dakota, USA",
        zip: "58352",
        lat: 48.66,
        lon: -98.85
      }
    ]);
  });
});
