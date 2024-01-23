import {RequestParamsType} from './model';

export const createDbQuery = ({event_id}: RequestParamsType) => `
    DECLARE $event_id AS String;

    $event_id = "${event_id}";

    SELECT * FROM \`event\`
    WHERE event_id = $event_id
`;

export const participantsDbQuery = ({event_id}: RequestParamsType) => `
    DECLARE $event_id AS String;

    $event_id = "${event_id}";

    SELECT  u.user_id as user_id, name  FROM \`users\` as u
    Left join \`participants\` as p
    On u.user_id = p.user_id
    WHERE event_id = $event_id
    AND visible = true
`;

export const communityDbQuery = ({event_id}: RequestParamsType) => `
    DECLARE $event_id AS String;

    $event_id = "${event_id}";

    SELECT u.community_id as community_id, name FROM \`community\` as u
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
export const organizerDbQuery = (user_id) => `
    DECLARE $user_id AS String;

    $user_id = "${user_id}";

    SELECT * FROM users 
    WHERE user_id = $user_id
`;
export const tagsDbQuery = ({event_id}: RequestParamsType) => `
    DECLARE $event_id AS String;

    $event_id = "${event_id}";

    SELECT t.* FROM \`tag\` as t 
    Left Join \`event_tag\` as ct
    On t.tag_id = ct.tag_id
    WHERE event_id = $event_id;
`;