import {RequestParamsType} from './model';

export const createDbQuery = ({event_id}: RequestParamsType) => `
    DECLARE $event_id as String;
        
    $event_id = "${event_id}";
    
    SELECT e.*, es.status as status FROM \`event\` as e
    Left Join \`event_status\` as es
    On e.event_id = es.event_id
    WHERE e.event_id = $event_id
`;
export const tagsDbQuery = ({event_id}: RequestParamsType) => `
    DECLARE $event_id AS String;

    $event_id = "${event_id}";

    SELECT t.* FROM \`tag\` as t 
    Left Join \`event_tag\` as ct
    On t.tag_id = ct.tag_id
    WHERE event_id = $event_id;
`;