import React, { useState,useContext } from 'react';
import { Platform } from 'react-native';
import { Container, Backgroud,AreaInput, Input, SubmitButton, SubmitText } from '../SignIn/style'
import { AuthContext } from '../../contexts/auth'


export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [nome, setNome] = useState('')

  const { signUp } = useContext(AuthContext)



  function handleSignUp() {
    signUp(email, password, nome)
  }

  return (

    <Backgroud>

      <Container
        behavior={Platform.OS == 'ios' ? 'padding' : ''}
        enabled
      >

        <AreaInput>

          <Input
            placeholder="Nome"
            outCorrent={false}
            autoCapitalize="none"
            value={nome}
            onChangeText={(text) => setNome(text)}
          />

        </AreaInput>

        <AreaInput>

          <Input
            placeholder="Email"
            outCorrent={false}
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

        </AreaInput>


        <AreaInput>

          <Input
            placeholder="Senha"
            outCorrent={false}
            autoCapitalize="none"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

        </AreaInput>

        <SubmitButton onPress={handleSignUp}>
          <SubmitText > Cadastrar</SubmitText>
        </SubmitButton>

      </Container>

    </Backgroud>
  );


}