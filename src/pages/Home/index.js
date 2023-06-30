import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth'
import { Background, Nome, Saldo, Container, Title, List } from './style'
import Header from '../../components/Header/index'
import HistoricoList from '../../components/HistoricoList';
import firebase from '../../services/firebaseConnection';
import { format, isBefore } from 'date-fns';
import { Alert } from 'react-native';


export default function Home() {

  const [historico, setHistorico] = useState([])
  const [saldo, setSaldo] = useState(0);

  const { user } = useContext(AuthContext);

  const uid = user && user.uid;

  function handleDelete(data) {


    //pegando  refazendo a data do dia
    const [diaItem, mesItem, anoItem] = data.date.split('/');

    const dateItem = new Date(`${anoItem}/${mesItem}/${diaItem}`); 
    
  

    console.log(dateItem)
    
  
    if (true) {
      Alert.alert("vc  nao pode apagar um registo antigo")
      return
    }


    Alert.alert(
      'Cuidado Atencao!',
      `Voce deseja excluir ${data.tipo} - Valor: ${data.valor}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        }, {
          text: 'Continuar',
          onPress: () => handleDeleteSucess(data)
        }
      ]
    )
  }

   async function handleDeleteSucess(data) {
    await firebase.database().ref('historico')
      .child(uid).child(data.key).remove()
      .then( async () => {
        let saldoAtual  = saldo;
        data.tipo === 'despesa' ? saldoAtual += parseFloat(data.valor) : saldoAtual -= parseFloat(data.valor)

        await firebase.database().ref('users').child(uid)
          .child('saldo').set(saldoAtual)
      })
      .catch((error)=> {
        console.log(error);
      })
  }


  useEffect(() => {
    async function loadList() {

      await firebase.database().ref('users').child(uid).on('value', (snapshot) => {
        setSaldo(snapshot.val().saldo)
      })


      await firebase.database().ref('historico')
        .child(uid)
        // ordenar segundo o formato
        .orderByChild('date').equalTo(format(new Date, 'dd/MM/yyyy'))
        .limitToLast(10).on("value", (snapshot) => {


          setHistorico([])

          snapshot.forEach((childItem) => {

            let list = {
              key: childItem.key,
              tipo: childItem.val().tipo,
              valor: childItem.val().valor,
              date: childItem.val().date
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
        renderItem={({ item }) => (<HistoricoList data={item} deleteItem={handleDelete} />)}
      />

    </Background>

  );
}