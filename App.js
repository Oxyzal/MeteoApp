import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground,TextInput } from 'react-native';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native-web';
import {KEY} from '@env';

const  App = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

const api = { 
  key: KEY,
  url: 'https://api.openweathermap.org/data/2.5/'
}
  

  const fetchData = useCallback(() => {
    setLoading(true);
    setInput('');
    axios({
      method:'GET',
      url:`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`,
    })
    .then(res=>{
      setData(res.data);
      console.log(res.data)
    })
    .finally(() => setLoading(false))
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
            <ActivityIndicator />
          </View>
        )}

        {data && (
          <View>
            <Text style={styles.city}>{`${data?.name} ${data?.sys?.country}`}</Text>
          </View>
        )}
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
  },
  city:{
    color:'#fff',
    fontSize:40,
  }
});



export default App;