import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Container,Tipo,IconView, ValorText,TipoText} from './style'


export default function HistoricoList(  {  data }) {
  return (
    <Container>

      <Tipo>

        <IconView tipo={ data.tipo} >
          <AntDesign 
          name= { data.tipo == 'despesa' ? 'arrowdown':'arrowup'} 
          size={24} 
          color="#FFF" 
          />
          <TipoText>{ data.tipo }</TipoText>

        </IconView>

      </Tipo>

      <ValorText>
        { data.valor } MT
      </ValorText>

    </Container>
  );
}