import {RequestParamsType} from './model';

export const confirmDbQuery = ({event_id, status}: RequestParamsType) => `
    DECLARE $event_id AS String;
    DECLARE $status AS String;
    $event_id = "${event_id}";
    $status = "${status}";

    UPSERT INTO event_status (event_id, status)
    Values ($event_id, $status);
    
    UPSERT INTO event (event_id, visible)
    Values ($event_id, true)
`;

export const cancelDbQuery = ({event_id, status}: RequestParamsType) => `
    DECLARE $event_id AS String;
    DECLARE $status AS String;
    $event_id = "${event_id}";
    $status = "${status}";

    UPSERT INTO event_status (event_id, status)
    Values ($event_id, $status);
    
    UPSERT INTO event (event_id, visible)
    Values ($event_id, false)
`;