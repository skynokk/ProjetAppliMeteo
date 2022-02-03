import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ImageBackground, Alert, TouchableOpacity, FlatList } from 'react-native';
import * as Location from 'expo-location';

const Item = ({ ville }: any) => (
  <View>
    <Text style={styles.ItemVille}>{ville}</Text>
  </View>
);

const Home = ({ navigation }: any) => {
  var [ville, setVille] = useState('');
  var [erreur, setErreur] = useState('');
  var [tableauVilleRecherche, setTableauVilleRecherche] = useState([{Id : "", Ville: ""}]);
  var [tableauVilleAutoComplete, setTableauVilleAutoComplete] = useState([{Id : "", Ville: ""}]);
  var MeteoTableau: { Timestamp: any, Date: any; Temps: any; Temperature: any; Image: any }[] = [];
  const apiKey = "032cf4f8f4ea0479f5a02354c7508195";

  //Rechercher la météo de la ville
  const Recherche = () => {
    MeteoTableau = [];

    //console.log(ville);
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

  //Géolocalisation
  const Geolocalisation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status === 'granted') {
      let location = await Location.getCurrentPositionAsync({});
      var lat = location.coords.latitude;
      var lon = location.coords.longitude;

      fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat.toString() + '&lon=' + lon.toString() + '&appid=' + apiKey)
        .then((response) => response.json())
        .then((json) => {
          ville = json.name;
          Recherche();
        })
    }else{
      console.log("Localisation interdite")
    }
  }

  //Navigation vers la page favoris
  const favoris = () => {
    navigation.navigate("favoris");
  }

  //Recherche d'une liste de 5 villes depuis l'api gouv et selon les informations rentré par l'utilisateur
  const trouverVille = (query: any) => {
    setVille(query);

    tableauVilleRecherche = [];
    tableauVilleAutoComplete = [];
    var tableauRecherche: { Id: any, Ville: any }[] = [];

    //API GOUV pour le nom des villes
    fetch('https://geo.api.gouv.fr/communes?nom='+ query+'&limit=5')
    .then((response) => response.json())
    .then((json) => {

      var i = 0;
      for (let k of json) {
        i++;
        tableauRecherche.push({ Id: i, Ville: k.nom });
      }

      setTableauVilleAutoComplete(tableauRecherche);

      for(let k of tableauVilleAutoComplete){
        tableauRecherche.push(k);
      }
    })

    setTableauVilleRecherche(tableauRecherche);
  }

  const renderItem = ({ item }: any) => (
    <TouchableOpacity 
      style={styles.AutoComplete}
      onPress={() => AutoCompleteSelection(item.Ville)}
    >
      <Item 
        ville={item.Ville} 
      />
    </TouchableOpacity>

  );

  const AutoCompleteSelection = async (villeAutocompletion: any) => {
    ville = villeAutocompletion;
    Recherche();
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

        <FlatList
          data={tableauVilleRecherche}
          renderItem={renderItem}
          keyExtractor={(item) => item.Id}
          extraData={tableauVilleRecherche}
        />

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
          <Text style={styles.favorisText}>Voir ses favoris
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
    color: '#ffffff',
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
    marginLeft: 10,
  },
  favorisText:{
    color: "black",
    fontSize: 20,
    margin: 20,
  },
  favorisDiv: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  AutoComplete: {
    // color: 'white',
    // alignItems: "center"
  },
  ItemVille:{
    margin: 4,
    fontSize: 18,
  },
});


export default Home;