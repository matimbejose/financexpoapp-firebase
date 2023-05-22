import React, { useContext, useState} from 'react';
import { AuthContext } from '../../contexts/auth'
import {Background, Nome, Saldo, Container, Title, List} from './style'
import Header from '../../components/Header/index'
import HistoricoList from '../../components/HistoricoList';


export default function Home() {
  const { user } = useContext(AuthContext);

  const [historico,setHistorico] = useState([

    { key: '1', tipo: 'receita',  valor: 1200},
    { key: '2', tipo: 'despesa',  valor: 200},
    { key: '3', tipo: 'receita',  valor: 40},
    { key: '4', tipo: 'receita',  valor: 60.78},

  ])


  return (

      <Background>

        <Header />

        <Container>
          <Nome>Matimbe jose</Nome>
          <Saldo>1500 MT</Saldo>
        </Container>


        <Title>Ultimas movimentacoes</Title>

        <List
        showVerticalScrollIndicator={false}
        data={ historico }
        keyExtractor={ item => item.key }
        renderItem={ ( { item  }) => ( <HistoricoList /> ) }
        />

      </Background>

  );
}