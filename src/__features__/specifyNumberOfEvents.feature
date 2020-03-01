Feature: Show and hide an events details

Scenario: When a user hasn't specified a number, ten is the default number
  Given that the user has loaded the events page
  When the events page has loaded 
  Then they see up to ten events on their page

  Scenario: User can choose number of events they want to see
  Given that the user has selected the drop down
  When they change the number to five 
  Then the list shrinks to show five events