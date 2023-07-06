import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth'
import { Background, Nome, Saldo, Container, Title, List, Area } from './style'
import Header from '../../components/Header/index'
import HistoricoList from '../../components/HistoricoList';
import firebase from '../../services/firebaseConnection';
import { format, isPast } from 'date-fns';
import { Alert,Platform,TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import DatePicker from '../../components/DatePicker';

export default function Home() {

  const [historico, setHistorico] = useState([])
  const [saldo, setSaldo] = useState(0);
  const [newDate, setNewDate] = useState(new Date());
  const [show, setShow] = useState(false);

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
        .orderByChild('date').equalTo(format(newDate, 'dd/MM/yy'))
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
  }, [newDate])


  function handleDelete(data) {
    
    if (isPast(new Date(data.date))) {
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

  function handleShowPicker() {
    setShow(true)
  }

  function handleClose() {
    setShow(false)
  }


  const onChange = (date) => {
    setShow(Platform.OS === 'ios')
    setNewDate(date)
    console.log(date)
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


  return (

    <Background>

      <Header />

      <Container>
        <Nome>{user && user.nome}</Nome>
        <Saldo>{saldo.toFixed(2)} MT</Saldo>
      </Container>


      <Area>
      <TouchableOpacity onPress={ handleShowPicker }>
      <Entypo name="calendar" size={30} color="#FFF" />
      <Title>Ultimas movimentacoes</Title>

      </TouchableOpacity>
      </Area>

      <List
        showsVerticalScrollIndicator={false}
        data={historico}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (<HistoricoList data={item} deleteItem={handleDelete} />)}
      />

      {
        show &&  (
          <DatePicker  
          onClose={ handleClose }
          date={ newDate }
          onChange={ onChange }
          />
        )
      }

    </Background>

  );
}