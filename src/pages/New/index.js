import React, { useState } from 'react';
import { SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Header from '../../components/Header/index'
import { Background,Input,SubmitButton,SubmitText} from './styles'
import Picker from '../../components/Picker/index.android';

export default function New() {
    const [valor,setValor] = useState('');
    const [tipo, setTipo] = useState('receita')

    return (

        //ao clicar numa area fora vai fechar o meu  teclado
        <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>


            <Background>
    
                <Header />
    
                <SafeAreaView style={{ alignItems: 'center' }}>
    
                    <Input
                    placeholder="Valor desejado"
                    keyboardType="numeric"
                    returnKeyType="next"
                    onSubmitEditing={ () => Keyboard.dismiss() }
                    valor ={ valor}
                    onChangeText={ (text) => setValor(text) }
                    />


                    <Picker onChange={ setTipo } tipo={tipo} />
    
                    <SubmitButton>
                        <SubmitText>Registar</SubmitText>
                    </SubmitButton>
    
                </SafeAreaView>
            </Background>
            

        </TouchableWithoutFeedback>
    );
}