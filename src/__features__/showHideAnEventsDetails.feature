Feature: Show and hide an events details

Scenario: An event is collapsed by default
  Given that a user has opened the app and default events are showing
  When the user looks at the list
  Then they see a show details button for each event with no details expanded

  Scenario: User can expand an event to see its details
  Given that a user wants to find out more about an event
  When a user clicks the show details button
  Then the details for the chosen event are expanded and shown

  Scenario: User can collapse an event to hide its details
  Given that a user has clicked show details button on an event 
  When they click the hide details button 
  Then the details are collapsed