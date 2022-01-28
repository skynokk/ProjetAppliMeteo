import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ImageBackground, Alert, TouchableOpacity, FlatList } from 'react-native';
import * as Location from 'expo-location';

const Item = ({ ville }: any) => (
  <View>
    <Text>{ville}</Text>
  </View>
);

const Home = ({ navigation }: any) => {
  var [ville, setVille] = useState('');
  var [erreur, setErreur] = useState('');
  const [filteredVille, setFilteredVille] = useState([]);
  const [villeAuto, setVilleAuto] = useState([]);

  const apiKey = "032cf4f8f4ea0479f5a02354c7508195";
  var MeteoTableau: { Timestamp: any, Date: any; Temps: any; Temperature: any; Image: any }[] = [];
  var tableauVilleAuto: { Ville: any }[] = [];

  tableauVilleAuto.push({ Ville: "test1" })
  tableauVilleAuto.push({ Ville: "test2" })
  tableauVilleAuto.push({ Ville: "test3" })

  const Recherche = () => {
    MeteoTableau = [];

    // console.log(ville);
    if (ville == "") {
      setErreur("Veuillez rentrer un nom de ville");
    } else {
      fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + ville + '&units=metric&appid=' + apiKey)
        .then((response) => response.json())
        .then((json) => {
          if (json.message == "city not found") {
            setErreur("La ville n'a pas été trouvé");
          } else {
            setErreur("");
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

            }
            navigation.navigate("info", { ville: ville, tableau: MeteoTableau });
          }
        })
    }
  }

  const Geolocalisation = async () => {
    // var lat = 0;
    // var lon = 0;
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      let location = await Location.getCurrentPositionAsync({});
      var lat = location.coords.latitude;
      var lon = location.coords.longitude;

      fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat.toString() + '&lon=' + lon.toString() + '&appid=' + apiKey)
        .then((response) => response.json())
        .then((json) => {
          //console.log(json.name);
          ville = json.name;
          Recherche();
        })
    }
  }

  const favoris = () => {
    navigation.navigate("favoris");
  }

  const apiGouvAdress = (search: any) => {
    tableauVilleAuto = [];

    fetch('https://api-adresse.data.gouv.fr/search/?q=' + search)
      .then((response) => response.json())
      .then((json) => {
        //console.log(json.features);
        // tableauVilleAuto = [];

        for (let k of json.features) {
          //console.log(k);
          tableauVilleAuto.push({ Ville: k.properties.city })
        }
        //console.log(tableauVilleAuto);
      })
  }

  const trouverVille = (query: any) => {
    setVille(query)
    // if (query) {
    //   const regex = new RegExp(`${query.trim()}`, 'i');
    //   apiGouvAdress(regex);
    // }
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity onPress={AutoCompleteSelection}>
      <Item ville={item.Ville} />
    </TouchableOpacity>

  );

  const AutoCompleteSelection = () => {
    console.log("test");
  }

  return (
    <ImageBackground source={require('../../assets/fond.jpg')} style={styles.imageBackground}>
      <View style={styles.container}>

        <Text style={styles.textTitre}>Appli météo</Text>

        <Image
          style={styles.image}
          source={require('../../assets/icon.jpg')}
        />

        <TextInput
          style={styles.input}
          placeholder="Nom de la ville"
          onChangeText={newVille => trouverVille(newVille)}
          keyboardType="default"
        />

        {/* <FlatList
          data={tableauVilleAuto}
          renderItem={renderItem}
          keyExtractor={(item) => item.Ville}
        /> */}

        <Text>{erreur}</Text>

        <TouchableOpacity style={styles.buttonValider}>
          <Button
            color="red"
            title="Valider"
            onPress={Recherche}
          />
        </TouchableOpacity>

        <Button
          color="green"
          title="Me géolocaliser"
          onPress={Geolocalisation}
        />

        <TouchableOpacity onPress={favoris} style={styles.favorisDiv}>
          <Text>Voir ses favoris
            <Image
              style={styles.favoris}
              source={require('../../assets/favoris.png')}
            />
          </Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
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
  textTitre: {
    fontSize: 20
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center"
  },
  buttonValider: {
    marginBottom: 10
  },
  favoris: {
    width: 20,
    height: 20,
  },
  favorisDiv: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  }
});


export default Home;