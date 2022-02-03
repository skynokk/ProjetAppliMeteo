import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favoris = ({ navigation }: any) => {
    var tableauVille: { Nom: any }[] = [];

    const apiKey = "032cf4f8f4ea0479f5a02354c7508195";

    //Récupération des favoris a l'affichage de la page
    useEffect(() => {
        async function AsyncFonction() {
            await recupData();
        }
        AsyncFonction();
    }, []);

    //Récupération des favoris
    const recupData = async () => {
        let jsonValue = await AsyncStorage.getItem('@favoris');
        jsonValue = jsonValue != null ? JSON.parse(jsonValue) : null;

        if (jsonValue != null) {
            for (let k of jsonValue) {
                if (k != "") {
                    tableauVille.push({ Nom: k });
                }
            }

        } else {
            //Pas de favoris
        }

    }

    tableauVille.push({ Nom: "Liste des Favoris" });
    var MeteoTableau: { Timestamp: any, Date: any; Temps: any; Temperature: any; Image: any }[] = [];

    //Ouverture de la ville
    const favorisOuverture = (ville: any) => {
        MeteoTableau = [];

        if (ville != "" && ville != "Liste des Favoris") {
            fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + ville + '&units=metric&appid=' + apiKey)
                .then((response) => response.json())
                .then((json) => {
                    var date = null;
                    var temps = null;
                    var temperature = null;

                    for (let k of json.list) {
                        //console.log(date);
                        if (date == null) {
                            date = k.dt_txt;
                            var dateSplit = date.split(' ');
                            date = dateSplit[0];
                            temps = k.weather[0].main;
                            temperature = k.main.temp;

                            var dateSplitFormat = date.split('-');
                            var dateFinal = dateSplitFormat[2] + "/" + dateSplitFormat[1] + "/" + dateSplitFormat[0];

                            var timeStamp = k.dt;

                            MeteoTableau.push({ Timestamp: timeStamp, Date: dateFinal, Temps: temps, Temperature: temperature, Image: null });
                        } else {
                            var date2 = k.dt_txt;
                            var dateSplit2 = date2.split(' ');
                            date2 = dateSplit2[0];
                            if (date == date2) {
                                //Même jour
                            } else {
                                date = date2;
                                temps = k.weather[0].main;
                                temperature = k.main.temp;

                                var date2SplitFormat = date2.split('-');
                                var dateFinal = date2SplitFormat[2] + "/" + date2SplitFormat[1] + "/" + date2SplitFormat[0];

                                var timeStamp = k.dt;

                                MeteoTableau.push({ Timestamp: timeStamp, Date: dateFinal, Temps: temps, Temperature: temperature, Image: null });
                            }
                        }
                        navigation.navigate("info", { ville: ville, tableau: MeteoTableau });
                    }
                })
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={tableauVille}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => { favorisOuverture(item.Nom) }}>
                        <View style={styles.item}>
                            {item.Nom != "Liste des Favoris" ? <Text style={styles.textInfo}>{item.Nom}</Text> : <Text style={styles.textInfoFavoris}>{item.Nom}</Text>}
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.Nom}
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
    textInfoFavoris:{
        fontSize: 25,
        color: 'white',
        textAlign: 'center'
    },
    textInfo: {
        fontSize: 18,
        color: 'white',
    },
    item: {
        backgroundColor: '#161B22',
        width: '100%',
        height: '100%',
        padding: 6,
        marginTop: 5,
        marginBottom: 5,
        // borderWidth: 2,
        // borderColor: '#30363D',
        flex: 1,
        color: 'white',
    }
});

export default Favoris;