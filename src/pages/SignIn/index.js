import React, {useState, useContext} from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { Container, Backgroud, Logo, AreaInput, Input, SubmitButton, SubmitText, LinkText, Link} from '../SignIn/style'
import { useNavigation  } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth'

export default function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const { signIn, loadingAuth } = useContext(AuthContext)

  function handleLogin() { 
    signIn(email, password)
  }

 return (


    <Backgroud>

      <Container
      behavior={Platform.OS == 'ios' ? 'padding' : ''}
      enabled
      >
        <Logo source={require('../../assets/Logo.png')} />

        <AreaInput>

        <Input
        placeholder="Email"
        outCorrent={false}
        autoCapitalize="none"
        value={ email }
        onChangeText={ (text) => setEmail(text) }
        />

        </AreaInput>


        <AreaInput>
        
        <Input
        placeholder="Senha"
        outCorrent={false}
        autoCapitalize="none"
        value={  password }
        onChangeText={ (text) => setPassword(text) }
        secureTextEntry={true}
        />

        </AreaInput>

        <SubmitButton onPress={handleLogin}>

          {
            loadingAuth ? (
              <ActivityIndicator size={20} color="#FFF" />
            ) : (
              
              <SubmitText>Acessar</SubmitText>
            )

          }
        </SubmitButton>



        <Link onPress={ () => navigation.navigate('SignUp')}>
        <LinkText>Criar uma Conta</LinkText>
        </Link>

      </Container>

    </Backgroud>
  );


}