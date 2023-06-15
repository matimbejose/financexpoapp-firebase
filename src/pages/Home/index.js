import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth'
import { Background, Nome, Saldo, Container, Title, List } from './style'
import Header from '../../components/Header/index'
import HistoricoList from '../../components/HistoricoList';
import firebase from '../../services/firebaseConnection';
import { format } from 'date-fns';


export default function Home() {

  const [historico, setHistorico] = useState([])
  const [saldo, setSaldo] = useState(0);

  const { user } = useContext(AuthContext);

  const uid = user && user.uid;


  useEffect(() => {
    async function loadList() {

      await firebase.database().ref('users').child(uid).on('value', (snapshot) => {
        setSaldo(snapshot.val().saldo)
      })


      await firebase.database().ref('historico')
        .child(uid)
        // ordenar segundo o formato
        .orderByChild('date').equalTo(format(new Date, 'dd/MM/yy'))
        .limitToLast(10).on("value", (snapshot) => {


          setHistorico([])

          snapshot.forEach(( childItem) => {

            let list  = {
              key: childItem.key,
              tipo: childItem.val().tipo,
              valor: childItem.val().valor
            }

            setHistorico(oldArray => [...oldArray, list].reverse())
          })
        })

    }
    loadList()
  }, [])


  return (

    <Background>

      <Header />

      <Container>
        <Nome>{user && user.nome}</Nome>
        <Saldo>{saldo.toFixed(2)} MT</Saldo>
      </Container>


      <Title>Ultimas movimentacoes</Title>

      <List
        showsVerticalScrollIndicator={false}
        data={historico}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (<HistoricoList data={item} />)}
      />

    </Background>

  );
}