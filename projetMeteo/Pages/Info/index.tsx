import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Image, FlatList, TouchableOpacity } from 'react-native';

//Ajouter la température maximum et minimum de la journée
const Item = ({ date, temperature, image }: any) => (
    <View style={styles.item}>
      <Text style={styles.textInfo}>{date}</Text>
      <Text style={styles.textInfo}>{"\n"}{temperature} °C{"\n"}</Text>
      <Image style={styles.imageItem} source={image} />
    </View>
  );

const Info = ({ route, navigation }: any) => {
    const { ville } = route.params;
    const { tableau } = route.params;
    var favorisImage = require('../../assets/favoris_vide.png');

    console.log(tableau);

    for(var lucas of tableau){
        var image = null;
        console.log(lucas);
        switch(lucas.Temps){
            case "Clear":
                image = require('../../assets/clear.png');
                lucas.Image = image;
                break;
            case "Rain":
                image = require('../../assets/rain.png');
                lucas.Image = image;
                break;
            case "Storm":
                image = require('../../assets/storm.png');
                lucas.Image = image;
                break;
            case "Clouds":
                image = require('../../assets/cloud.png');
                lucas.Image = image;
                break;
            case "Snow":
                image = require('../../assets/snow.png');
                lucas.Image = image;
                break;
        }
    }

    //Vérifier si ville est dans les favoris ou non
    
    const renderItem = ({ item }: any) => (
        <Item date={item.Date} temperature={item.Temperature} image={item.Image}/>
    );

    //Ne fonctionne pas, à regarder
    //L'étoile favoris ne change pas
    // const favorisClick = async () => {  
    //     if(favorisImage == require('../../assets/favoris_vide.png')){
    //         favorisImage = require('../../assets/favoris.png');
    //         console.log("1");
    //     }else{
    //         favorisImage = require('../../assets/favoris_vide.png');
    //         console.log("2");
    //     }
    // }

    return (
        <View style={styles.container}>
            <Text style={styles.textTitre}>{ville}</Text>
            {/* <TouchableOpacity onPress={favorisClick}> */}
                <Image
                style={styles.image}
                source={favorisImage}
                />
            {/* </TouchableOpacity> */}
            <FlatList
                data={tableau}
                renderItem={renderItem}
                keyExtractor={(item) => item.Date}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D1117',
        height: '100%'
    },
    image: {
        width: 20,
        height: 20
    },
    textTitre:{
        fontSize: 20,
        color: 'white'
    },
    textInfo:{
        fontSize: 12,
        color: 'white'
    },
    item: {
        backgroundColor: '#161B22',
        width: '100%',
        height: '100%',
        padding: 2,
        marginTop: 8,
        borderWidth: 2,
        borderColor: '#30363D',
        flex: 1,
        flexDirection: 'row',
        color: 'white'
    },
    imageItem: {
        width: 100,
        height: 100
    }
});

export default Info;