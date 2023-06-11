import styled from "styled-components/native";


export const Background =  styled.View`
flex: 1;
background: #131313;
` 

export const Input =  styled.TextInput.attrs({
    placheolderTextColor: '#222'
})`
height: 50px;
width: 90%;
background-color: rgba(225,225,255,0.8);
margin-top: 30px;
font-size: 16px;
` 

export const SubmitButton =  styled.TouchableOpacity`
height: 50px;
width: 90%;
margin-top: 20px;
align-items: center;
justify-content: center;
background-color: #00b94a;
` 

export const SubmitText =  styled.Text`
font-size: 20px;
font-weight: bold;
color: #FFF;
` 


