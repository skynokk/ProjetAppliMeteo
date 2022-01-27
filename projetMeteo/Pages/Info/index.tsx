import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Image, FlatList, TouchableOpacity, Share } from 'react-native';

//Ajouter la température maximum et minimum de la journée
const Item = ({ jour, date, temperature, image }: any) => (
    <View style={styles.item}>
      <Text style={styles.textInfo}>{jour} : {date} {"\n"}{temperature} °C</Text>
      <Image style={styles.imageItem} source={image} />
    </View>
  );

const Info = ({ route, navigation }: any) => {
    const { ville } = route.params;
    const { tableau } = route.params;
    var [favoris, setFavoris] = useState(false);

    //console.log(tableau);

    for(var lucas of tableau){
        var image = null;
        //console.log(lucas);
        var Timestamp = new Date(lucas.Timestamp*1000).toString();
        //console.log(TimestampTest);
        var TimestampSplit = Timestamp.split(' ');
        var TimestampJour = TimestampSplit[0];

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

        switch(TimestampJour){
            case "Mon":
                lucas.Timestamp = "Lundi";
                break;
            case "Tue":
                lucas.Timestamp = "Mardi";
                break;
            case "Wed":
                lucas.Timestamp = "Mercredi";
                break;
            case "Thu":
                lucas.Timestamp = "Jeudi";
                break;
            case "Fri":
                lucas.Timestamp = "Vendredi";
                break;
            case "Sat":
                lucas.Timestamp = "Samedi";
                break;
            case "Sun":
                lucas.Timestamp = "Dimanche";
                break;
        }
    }

    //Fonction afin de vérifier si ville est dans les favoris ou non
    useEffect(() => {
      var villeBdd = "Aix-en-Provence";

      if(ville.toLowerCase() == villeBdd.toLowerCase()){
        setFavoris(true)
      }else{
        setFavoris(false)
      }
    }, []);

    const renderItem = ({ item }: any) => (
        <Item jour={item.Timestamp} date={item.Date} temperature={item.Temperature} image={item.Image}/>
    );


    //Manque la base de données
    const favorisClick = async () => {  
        if(favoris == false){
            setFavoris(true)
            //Ajout bdd du nom de la ville
            console.log(ville);
        }else{
            setFavoris(false)
            //suppresion bdd du nom de la ville
            console.log(ville);
        }
    }

    const partage = async () => {
        var message = "Voici la météo de "+ville+ " : ";
        for(let k of tableau){
            var temps = k.Temps;
            switch(temps){
                case "Clear":
                    temps = "il y aura du soleil"
                    break;
                case "Rain":
                    temps = "il y aura un temps pluvieux"
                    break;
                case "Storm":
                    temps = "il y aura de l'orage"
                    break;
                case "Clouds":
                    temps = "il y aura beaucoup de nuage"
                    break;
                case "Snow":
                    temps = "il y aura de la neige"
                    break;
            }

            message += "\n" + k.Timestamp + " : " + k.Date + ", " + temps + " avec une moyenne de " + k.Temperature + "°C";
        }

        message += "\n\n" + "Envoyé via l'application de météo !" + "\n\n";

        const result = await Share.share({
            message: message,
        });
    }

    return (
        <View style={styles.container}>
            <Button
                color="gray"
                title="Partager"
                onPress={partage}
            />
            <TouchableOpacity onPress={favorisClick}>
                {favoris == true ?
                    (
                        <Image
                        style={styles.imageFavoris}
                        source={require('../../assets/favoris.png')}
                        />
                    )
                    : (
                        <Image
                        style={styles.imageFavoris}
                        source={require('../../assets/favoris_vide.png')}
                        />
                    )
                }
            </TouchableOpacity>

            <Text style={styles.textTitre}>{ville}</Text>

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
        height: '100%',
    },
    imageFavoris: {
        width: 20,
        height: 20,
        margin: 5,
        alignSelf: 'flex-end',
    },
    textTitre:{
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        marginBottom: 10
    },
    textInfo:{
        fontSize: 18,
        color: 'white',
    },
    item: {
        backgroundColor: '#161B22',
        width: '100%',
        height: '100%',
        padding: 2,
        marginTop: 3,
        marginBottom: 3,
        // borderWidth: 2,
        // borderColor: '#30363D',
        flex: 1,
        color: 'white',
    },
    imageItem: {
        width: 75,
        height: 75,
        alignSelf: 'flex-end',
        marginRight: 5,
        marginBottom: 5,
        marginTop: -25,
        resizeMode: 'contain'
    }
});

export default Info;