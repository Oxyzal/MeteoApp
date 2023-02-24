import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground,TextInput } from 'react-native';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native-web';
import {KEY} from '@env';

const  App = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

const api = { 
  key: KEY,
  url: 'https://api.openweathermap.org/data/3.0/'
}
  

  const fetchData = useCallback(() => {
    setLoading(true);
    setInput('');
    axios({
      method:'GET',
      url:`https://api.openweathermap.org/data/3.0/weather?q=${input}$units=metric$appid=${api.key}`,
    })
    .then(res=>{
      
    })
  }, [api.key , input]);
  
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/img/bg.jpg')} resizeMode='cover' style={styles.image}>
        <View>
          <TextInput placeholder='Entrer le nom de la ville' 
            style={styles.textInput} 
            onChangeText={text => setInput(text)}
            value={input}
            onSubmitEditing={fetchData}
          />
        </View>
        {loading && (
          <View>
            <ActivityIndicator></ActivityIndicator>
          </View>
        )};
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image:{
    flex:1,
    flexDirection:'column',
  },
  textInput:{
    borderBottomWidth:3,
    backgroundColor:'#fff',
  }
});



export default App;