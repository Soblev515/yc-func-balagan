import {RequestParamsType} from './model';

export const createDbQuery = ({user_id, community_id, limit = 20, offset = 0}: RequestParamsType) => `
    DECLARE $limit AS Uint32;
    DECLARE $offset AS Uint32;
    DECLARE $user_id AS String;
    DECLARE $community_id AS String;

    $user_id = "${user_id || ''}";
    $community_id = "${community_id || ''}";
    $limit = ${limit};
    $offset = ${offset};

    SELECT distinct e.* FROM event as e
    Left Join event_community as ec
    On e.event_id = ec.event_id
    Left Join participants as p
    On e.event_id = p.event_id
    Left Join event_status as s
    On e.event_id = s.event_id
    WHERE
        IF ($community_id = "", true, ec.community_id = $community_id)
        AND IF ($user_id = "", true, p.user_id = $user_id)
        AND date > "2024-1-23"
        AND s.status = "confirm"
    ORDER BY date ASC
    LIMIT $limit
    OFFSET $offset;
`;
export const organizerDbQuery = (user_id) => `
    DECLARE $user_id AS String;

    $user_id = "${user_id}";

    SELECT * FROM users 
    WHERE user_id = $user_id
`;
export const countDbQuery = () => `
    DECLARE $user_id AS String;
    SELECT Count(event_id) FROM event
`;

export const participantsDbQuery = (event_id) => `
    DECLARE $event_id AS String;

    $event_id = "${event_id}";

    SELECT  u.user_id as user_id, name  FROM \`users\` as u
    Left join \`participants\` as p
    On u.user_id = p.user_id
    WHERE event_id = $event_id
`;

export const communityDbQuery = (event_id) => `
    DECLARE $event_id AS String;

    $event_id = "${event_id}";

    SELECT distinct u.community_id as community_id, name FROM \`community\` as u
    Left join \`event_community\` as p
    On u.community_id = p.community_id
    WHERE event_id = $event_id
    And visible = true
    AND status = "confirm"
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

export const isFavoriteDbQuery = (user_id) => `
    DECLARE $user_id AS String;

    $user_id = "${user_id}";
    SELECT event_id FROM favorite_user_event 
    WHERE user_id = $user_id 
`;

export const tagsDbQuery = (event_id) => `
    DECLARE $event_id AS String;

    $event_id = "${event_id}";

    SELECT t.* FROM \`tag\` as t 
    Left Join \`event_tag\` as ct
    On t.tag_id = ct.tag_id
    WHERE event_id = $event_id;
`;