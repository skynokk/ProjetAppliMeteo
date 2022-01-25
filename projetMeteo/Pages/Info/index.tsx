import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';

const Info = ({ route, navigation }: any) => {
    const { ville } = route.params;
    const { tableau } = route.params;

    console.log(tableau);

    return (
        <View style={styles.container}>
            <Text style={styles.textTitre}>{ville}</Text>
            <Image
            style={styles.image}
            source={require('../../assets/favoris_vide.png')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    image: {
        width: 100,
        height: 100
    },
    textTitre:{
        fontSize: 20
    }
});

export default Info;