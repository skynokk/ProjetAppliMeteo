import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const Home = ({ navigation }: any) => {
  //const [name, setName] = useState("")

  // useEffect(() => {
  //   Geolocation.setRNConfiguration(config);
  // }, []);

  const [ville, setVille] = useState('');
  const apiKey = "032cf4f8f4ea0479f5a02354c7508195";
  var MeteoTableau: { Date: any; Temps: any; Temperature: any; }[] = [];

  const Recherche = () => {
    console.log(ville);
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + ville + '&units=metric&appid=' + apiKey)
    .then((response) => response.json())
    .then((json) => {
      var date = null;
      var temps = null;
      var temperature = null;

      for(let k of json.list){
        console.log(date);
        if(date == null){
          date = k.dt_txt;
          var dateSplit = date.split(' ');
          date = dateSplit[0];
          temps = k.weather[0].main;
          temperature = k.main.temp;

          MeteoTableau.push({Date: date, Temps: temps, Temperature: temperature});
        }else{
          var date2 = k.dt_txt;
          var dateSplit2 = date2.split(' ');
          date2 = dateSplit2[0];
          if(date == date2){
            //Même jour
          }else{
            date = date2;
            temps = k.weather[0].main;
            temperature = k.main.temp;
            MeteoTableau.push({Date: date, Temps: temps, Temperature: temperature});
          }
        }

      }
    //   console.log(MeteoTableau);
      navigation.navigate("info", { ville: ville, tableau: MeteoTableau });
    })
  }

  const Geolocalisation = async () => {
    var lat = 0;
    var lon = 0;

    Geolocation.getCurrentPosition(
      info => 
      console.log(info.coords.latitude + " | " + info.coords.longitude)
    );

    Geolocation.getCurrentPosition(
      info => lat = info.coords.latitude
    );

    Geolocation.getCurrentPosition(
      info => lon = info.coords.longitude
    );

    console.log(lat);
    console.log(lon);

    // fetch('api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey, {
    //   method: 'GET',
    // })
    // .then((response) => response.json())
    // .then((json) => {
    //   console.log(json);
    // })

  }

  return (
    <View style={styles.container}>

      <Text style={styles.textTitre}>Appli météo</Text>

      <Image
        style={styles.image}
        source={require('../../assets/icon.jpg')}
      />

      <TextInput
        style={styles.input}
        placeholder="Nom de la ville"
        onChangeText={newVille => setVille(newVille)}
        keyboardType="default"
      />

      <Button
        color="red"
        title="Valider"
        onPress={Recherche}
        // onPress={() => {
        //     navigation.navigate("info", { ville: ville });
        //   }}
      />

      <Button
        color="green"
        title="Me géolocaliser"
        onPress={Geolocalisation}
      />

      <StatusBar style="auto" />
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
  

export default Home;