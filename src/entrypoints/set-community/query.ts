import {RequestParamsType} from './model';

export const createDbQuery = (community_id, user_id,{name, description, visible}: RequestParamsType) => `
    DECLARE $community_id AS String;
    DECLARE $organizer_id AS String;
    DECLARE $name AS String;
    DECLARE $description AS String;
    DECLARE $visible AS Bool;

    $community_id = "${community_id}";
    $organizer_id = "${user_id}";
    $name = "${name}";
    $description = "${description}";
    $visible = ${visible};
    
    UPSERT INTO community (community_id, organizer_id, name, description, visible)
    Values ($community_id, $organizer_id, $name, $description, $visible)
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
    SELECT MAX(community_id) FROM community
    where length(community_id) = 2 
`;

export const tagDbQuery = (community_id, tag_id) => `
    DECLARE $tag_id AS String;
    DECLARE $community_id AS String;

    $community_id = "${community_id}";
    $tag_id = "${tag_id}";
    
    UPSERT INTO community_tag (community_id, tag_id)
    Values ($community_id, $tag_id)
`;
