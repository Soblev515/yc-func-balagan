import {RequestParamsType} from './model';

export const createDbQuery = (event_id, user_id,{name, description, place, price, url, time, date}: RequestParamsType) => `
    DECLARE $event_id AS String;
    DECLARE $organizer_id AS String;
    DECLARE $name AS String;
    DECLARE $description AS String;
    DECLARE $place AS String;
    DECLARE $url AS String;
    DECLARE $date AS String;
    DECLARE $time AS String;
    DECLARE $price AS Int;
    DECLARE $visible AS Bool;

    $event_id = "${event_id}";
    $organizer_id = "${user_id}";
    $name = "${name}";
    $description = "${description}";
    $place = "${place}";
    $price = ${price};
    $date = "${date}";
    $time = "${time}";
    $url = "${url}";
    
    UPSERT INTO event (event_id, organizer_id, name, description, place, price, url, time, visible, date)
    Values ($event_id, $organizer_id, $name, $description, $place, $price, $url, $time, false, $date);
    UPSERT INTO event_status (event_id, status)
    Values ($event_id, "check")
`;

export const idDbQuery = (login, password) => `
    DECLARE $login AS String;
    DECLARE $password AS String;

    $login = "${login}";
    $password = "${password}";

    SELECT user_id FROM auth 
    WHERE login = $login 
    AND password = $password
`;

export const NextIdDbQuery = () => `
    DECLARE $password AS String;
    SELECT MAX(event_id) FROM event
`;

export const tagDbQuery = (event_id, tag_id) => `
    DECLARE $tag_id AS String;
    DECLARE $event_id AS String;

    $event_id = "${event_id}";
    $tag_id = "${tag_id}";
    
    UPSERT INTO event_tag (event_id, tag_id)
    Values ($event_id, $tag_id)
`;
