import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground,TextInput } from 'react-native';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import {KEY} from '@env';

const  App = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

const api = { 
  key: KEY,
  url: 'https://api.openweathermap.org/data/2.5/'
}
  

  const FetchData = useCallback(() => {
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
            onSubmitEditing={FetchData}
          />
        </View>
        {loading && (
          <View>
            <ActivityIndicator size={'large'} />
          </View>
        )}

        {data && (
          <View>
            <Text style={styles.city}>{`${data?.name} ${data?.sys?.country}`}</Text>
            <Text style={styles.date}>{new Date().toLocaleString()}</Text>
            <Text style={styles.temperature}> {`${Math.round(data?.main?.temp,)}C`} </Text>
            <Text style={styles.minMax}> {` Min ${Math.round(data?.main?.temp_min,)} C / Max ${Math.round(data?.main?.temp_max,)} C`} </Text>
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
    alignSelf: 'stretch',
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 80,
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    opacity: 0.5,
  },
  city:{
    color:'#fff',
    fontSize:40,
    textAlign: 'center',
    marginTop: 50,
    fontWeight: 'bold',
  },
  date:{
    color:'#fff',
    fontSize:16,
    textAlign: 'center',
    marginTop: 10,
  },
  temperature:{
    color: '#fff',
    fontSize: 60,
    textAlign: 'center',
    marginTop: 30,
    fontWeight: 'bold',
  },
  minMax:{
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
  },
});


export default App;