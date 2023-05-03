
# Ticket 1.#
    Task: Modal / UI promt to provide custom id for given Agent.

    Acceptance Criteria:

    1. UI prompt to enter custom id for given agent.
    2. There should be an Option to bulk edit entry by using exisiting details like name or any other details / method for easy recognition of given agent in report

    Regarding Point2: I'm assuming this can be helpful in case if number of agents are too much or there are many shifts with all having lots of agents, so it'll be too much manual process to provide each and every agent custom name, if we just want to avoid long database id, this can be useful.

    Implementaion Details:

    1. Implement rendering agent list for given shift in UI so that same can be used to show details to Facilities
    2. Implement custom text box against each agent for given shift, so that user can provide custom agent id for each agent
    3. Option in form of button / dropdown to update agent id with some formula like using generator / information can be fetched for given agent and same can be updated via backend avoiding manual process.
    4. Validation of custom agent id string.


    Time / Efforts Estimate:
    This should not take more than 1 week, where development time would be 2.5 days and same will be for Unit testing as well.

# Ticket 2.#
    New Endpoint, which accept custom id provided by client for given agent.
        This can be list / individual agent or their is an option to add custom name via supported rules like name, some friendly generator

    Acceptance Criteria:

        There should be validation whether custom id is valid string or not.
        In case if bulk edit option provided, based on rules from UI, we should update agent in database with that given formula

    Implementaion Details:

    
    1. In case of bulk edit, fetch agent metadata in given shift, it can be individual / list of agents.
        Generate custom agent name for each agent
    2. With or without bulk edit, we'd be able to update given agent by sending custom id of given individual / list of agent.


    Time / Efforts Estimate:
        This should not take more than 2 day, 
        1 day for development and other one for unit testing.


# Ticket 3.#

    Update `getShiftsByFacility` function so that while its returning all shifts metadata, it can also return custom id of assigned agent of that shift if provided.

    Acceptance Criteria:

        `getShiftsByFacility` should also return custom id as well if present for given agent

    Implementaion Details: 

        While fetching details, we'd check if custom id present and return the same.

    Time / Efforts Estimate:
        This should not take more than 1 day including unit testing


# Ticket 4.#

    Update `generateReport`, so that while we're passing list of shifts, it should check if custom id of given agent is present use that else, continue with existing internal database id.

    Acceptance Criteria:

        `generateReport` should add custom id in report, if this present for given shift.

    Implementaion Details: 

        While generating PDFs, we'd check if custom id present for given agent, then use it instead else go with existing one only.

    Time / Efforts Estimate:
        This should not take more than 1 day including unit testing