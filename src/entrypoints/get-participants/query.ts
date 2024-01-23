import {RequestParamsType} from './model';

export const createDbQuery = ({event_id, limit = 20, offset = 0}: RequestParamsType) => `
    DECLARE $limit AS Uint32;
    DECLARE $offset AS Uint32;
    DECLARE $event_id AS String;

    $event_id = "${event_id}";
    $limit = ${limit};
    $offset = ${offset};

    SELECT user_id FROM participants 
    WHERE event_id = $event_id
    LIMIT $limit
    OFFSET $offset;
`;

export const countDbQuery = ({event_id}: RequestParamsType) => `
    DECLARE $event_id AS String;

    $event_id = "${event_id}";

    SELECT Count(user_id) FROM participants 
    WHERE event_id = $event_id
`;