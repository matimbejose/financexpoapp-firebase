import React, { useContext} from 'react';
import { Container,Nome, NewLink,NewText,Logout,LogoutText} from './style';
import { AuthContext } from '../../contexts/auth'
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';

export default function Profile() {
    const navigation = useNavigation()

    const {user, signOut} = useContext(AuthContext)

 return (

    <Container>
        {/* <Header /> */}
        <Nome>
            { user && user.nome}
        </Nome>

        <NewLink onPress={ () => navigation.navigate('Profile')}>
            <NewText>Registar gastos</NewText>
        </NewLink>

        <Logout onPress={  () => signOut() }>
            <LogoutText>Sair</LogoutText>
        </Logout>


    </Container>
  );
}