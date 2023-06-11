import React from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import { Container, ButtonMenu }   from './style'
import { useNavigation  } from '@react-navigation/native';


export default function Header() {
    const navigation = useNavigation()

 return (
    <Container>
        <ButtonMenu  onPress={() => navigation.toggleDrawer() }>

        <Ionicons name="menu" size={30} color="white" />


        </ButtonMenu>

    </Container>

    );
}

