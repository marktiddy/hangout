import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount } from "enzyme";
import { shallow } from "enzyme";
import App from "../App";
import Event from "../Event";

const feature = loadFeature(
  "./src/__features__/showHideAnEventsDetails.feature"
);

defineFeature(feature, test => {
  test("An event is collapsed by default", ({ given, when, then }) => {
    let AppWrapper;
    given(
      "that a user has opened the app and default events are showing",
      () => {
        AppWrapper = mount(<App />);
      }
    );

    when("the user looks at the list", () => {});

    then(
      "they see a show details button for each event with no details expanded",
      () => {
        expect(AppWrapper.find(".EventList")).toHaveLength(1);
        expect(AppWrapper.find(".Event .DetailsButton"));
        AppWrapper.unmount();
      }
    );
  });

  test("User can expand an event to see its details", ({
    given,
    when,
    then
  }) => {
    let EventWrapper;
    given("that a user wants to find out more about an event", () => {
      EventWrapper = shallow(<Event event={dummyData[0]} />);
    });

    when("a user clicks the show details button", () => {
      EventWrapper.find(".detailsButton").simulate("click");
    });

    then("the details for the chosen event are expanded and shown", () => {
      expect(EventWrapper.find(".eventDetails")).toHaveLength(1);
    });
  });

  test("User can collapse an event to hide its details", ({
    given,
    when,
    then
  }) => {
    let EventWrapper;
    given("that a user has clicked show details button on an event", () => {
      EventWrapper = shallow(<Event event={dummyData[0]} />);
      EventWrapper.find(".detailsButton").simulate("click");
      expect(EventWrapper.find(".eventDetails")).toHaveLength(1);
    });

    when("they click the hide details button", () => {
      EventWrapper.find(".detailsButton").simulate("click");
    });

    then("the details are collapsed", () => {
      expect(EventWrapper.find(".eventDetails")).toHaveLength(0);
    });
  });
});

const dummyData = [
  {
    created: 1549399662000,
    duration: 10800000,
    id: "rbzgrqybcfbdb",
    name: "Purple Dog Pub Quiz",
    rsvp_limit: 20,
    date_in_series_pattern: false,
    status: "upcoming",
    time: 1583177400000,
    local_date: "2020-03-02",
    local_time: "19:30",
    updated: 1549399662000,
    utc_offset: 0,
    waitlist_count: 0,
    yes_rsvp_count: 4,
    venue: {
      id: 23203552,
      name: "The Purple Dog",
      lat: 51.883201599121094,
      lon: 0.9101499915122986,
      repinned: true,
      address_1: "Corner of Trinity St and St Isaac's Walk",
      city: "Colchester",
      country: "gb",
      localized_country_name: "United Kingdom"
    },
    group: {
      created: 1534442279000,
      name: "Colchester Weekenders Social Group",
      id: 29541448,
      join_mode: "approval",
      lat: 51.880001068115234,
      lon: 0.8999999761581421,
      urlname: "Colchester-Weekenders-Social-Group",
      who: "Members",
      localized_location: "Colchester, United Kingdom",
      state: "E4",
      country: "gb",
      region: "en_US",
      timezone: "Europe/London"
    },
    link:
      "https://www.meetup.com/Colchester-Weekenders-Social-Group/events/rbzgrqybcfbdb/",
    description:
      "<p>For those who haven't been before, this quiz is about film, music and TV. It can vary in toughness from month to month. It cost £2 a head, all money goes to charity and we always have one, sometimes two tables to the left of the bar where you come in. The Quiz starts at 8 but I would recommend most people to get there earlier if you can. The Meetup will start at 7.30. We also only have a 20 person limit to this event so in the event of a waiting list, please change your RSVP if you can't make it! This event is always on the first Monday of every Month.</p> ",
    visibility: "public",
    member_pay_fee: false
  }
];
