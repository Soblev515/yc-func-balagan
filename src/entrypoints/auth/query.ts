import {RequestParamsType} from './model';

export const createDbQuery = ({login, password}: RequestParamsType) => `
    DECLARE $login AS String;
    DECLARE $password AS String;

    $login = "${login}";
    $password = "${password}";

    SELECT Count(user_id) FROM \`auth\` 
    WHERE login = $login
    AND password = $password;
`;
