import { Container, Typography } from "@mui/material"
import React from 'react';
import { useTheme } from '@emotion/react';
import UsersService from "../services/api/users.service";

/** Translation */
import { useTranslation } from 'react-i18next';
import "../translations/i18n";

const Home = () => {
    const { t } = useTranslation('settings');

    const theme = useTheme();

    const [user, setUser] = React.useState([]);
    const loadUser = async() => {
        //Load aet list
        const response = await UsersService.me();
        if (response.error) {
            console.log(response.error);
            return;
        }

        setUser(response.items);
    }
    React.useEffect(() => {
        loadUser();
    }, []);

    const UserName = function() {
        if (!user) return <>{"Hello"}</>;
        if (user.last_name)return <>{user.title}+" "+{user.last_name}+" "+{user.first_name}</>;
        return  <>{user.login}</>;
    }

    return (
        <Container>
            <Typography variant="h1" style={{ color: theme.palette.primary.main }}>
                {t("welcome")},
            </Typography>

            <Typography variant="h5">
                <UserName/>
            </Typography>
        </Container>
    )
}
export default Home