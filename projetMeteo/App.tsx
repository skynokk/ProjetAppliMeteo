import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

//import logo from "./assets/icon.png";
import { Home } from "./pages";
import Info from "./pages/Info";

const Stack = createNativeStackNavigator();

const config = {
  screens: {
    detail: "info/:ville",
  },
};

const linking = {
  prefixes: ["http://localhost:19006/"],
  config,
};

export default function App() {
  // //const [name, setName] = useState("")

  // // useEffect(() => {
  // //   Geolocation.setRNConfiguration(config);
  // // }, []);

  // const [city, setCity] = useState('');
  // const apiKey = "032cf4f8f4ea0479f5a02354c7508195";
  // var MeteoTableau: { Date: any; Temps: any; Temperature: any; }[] = [];

  // const Recherche = () => {
  //   console.log(city);
  //   fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=metric&appid=' + apiKey)
  //   .then((response) => response.json())
  //   .then((json) => {
  //     var date = null;
  //     var temps = null;
  //     var temperature = null;

  //     for(let k of json.list){
  //       console.log(date);
  //       if(date == null){
  //         date = k.dt_txt;
  //         var dateSplit = date.split(' ');
  //         date = dateSplit[0];
  //         temps = k.weather[0].main;
  //         temperature = k.main.temp;

  //         MeteoTableau.push({Date: date, Temps: temps, Temperature: temperature});
  //       }else{
  //         var date2 = k.dt_txt;
  //         var dateSplit2 = date2.split(' ');
  //         date2 = dateSplit2[0];
  //         if(date == date2){
  //           //Même jour
  //         }else{
  //           date = date2;
  //           temps = k.weather[0].main;
  //           temperature = k.main.temp;
  //           MeteoTableau.push({Date: date, Temps: temps, Temperature: temperature});
  //         }
  //       }

  //     }
  //     console.log(MeteoTableau);
  //     //rediriger vers la page 2 avec le tableau
  //     navigation.navigate('Home', { ville: city });
  //   })
  // }

  // const Geolocalisation = async () => {
  //   var lat = 0;
  //   var lon = 0;

  //   Geolocation.getCurrentPosition(
  //     info => 
  //     console.log(info.coords.latitude + " | " + info.coords.longitude)
  //   );

  //   Geolocation.getCurrentPosition(
  //     info => lat = info.coords.latitude
  //   );

  //   Geolocation.getCurrentPosition(
  //     info => lon = info.coords.longitude
  //   );

  //   console.log(lat);
  //   console.log(lon);

  //   // fetch('api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey, {
  //   //   method: 'GET',
  //   // })
  //   // .then((response) => response.json())
  //   // .then((json) => {
  //   //   console.log(json);
  //   // })

  // }

  // return (
  //   <View style={styles.container}>

  //     <Text style={styles.textTitre}>Appli météo</Text>

  //     <Image
  //       style={styles.image}
  //       source={require('./assets/icon.jpg')}
  //     />

  //     <TextInput
  //       style={styles.input}
  //       placeholder="Nom de la ville"
  //       onChangeText={newCity => setCity(newCity)}
  //       keyboardType="default"
  //     />

  //     <Button
  //       color="red"
  //       title="Valider"
  //       onPress={Recherche}
  //     />

  //     <Button
  //       color="green"
  //       title="Me géolocaliser"
  //       onPress={Geolocalisation}
  //     />

  //     <StatusBar style="auto" />
  //   </View>
  // );

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    setTimeout(() => SplashScreen.hideAsync(), 2000);
  }, []);

  return (
    <NavigationContainer  linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="home" component={Home} initialParams={{}} />
        <Stack.Screen name="info" component={Info} />
      </Stack.Navigator>
      <StatusBar style="light" backgroundColor="red" />
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   input: {
//     height: 40,
//     width: 300,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
//   },
//   image: {
//     width: 100,
//     height: 100
//   },
//   textTitre:{
//     fontSize: 20
//   }
// });
