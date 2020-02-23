import React, { Component } from "react";
import Event from "./Event";

class EventList extends Component {
  state = {
    events: [
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
    ]
  };

  render() {
    return (
      <ul className="EventList">
        {this.state.events.map(event => (
          <li key={event.id}>
            <Event event={event} />
          </li>
        ))}
      </ul>
    );
  }
}

export default EventList;
