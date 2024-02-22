import React, {useState, useEffect} from 'react';
import {Text, TextInput, TouchableOpacity, View, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
/* @ts-ignore */
import Logo from 'src/assets/logo.svg';
import ButtonYellow from 'src/modules/common/components/ButtonYellow';
import ButtonGmail from 'src/modules/common/components/ButtonGmail';
import ButtonFacebook from 'src/modules/common/components/ButtonFacebook';
import ButtonInstagram from 'src/modules/common/components/ButtonInstagram';
import Screen from 'src/modules/common/components/Screen';
import {ViewY} from 'src/modules/common/components/utils/ViewUtils';
import {tw} from 'src/root/tw';
import {authActions, ERROR} from '../handlers/redux';

const Register = ({navigation}) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const error = useSelector(state => state.auth.error || false);

  useEffect(() => {
    if(error == ERROR['REGISTER']) {
      Alert.alert(
        "",
        "Register Error",
      );

      dispatch(authActions.setError({error: false}));
    }
  }, [error]);

  const handlePlus = () => {
    navigation.navigate('Login');
  };

  const onRegisterPress = () => {
    if (!name || !email || !password) return;

    dispatch(authActions.register({name, email, password}));
  };

  const cbGGLogin = (data) => {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    // dispatch(authActions.login({email:user.email, password:user.id}));
  };

  const cbFBLogin = (user) => {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    dispatch(authActions.register({name: user.name, email:user.email, password:user.id}));
  };

  const cbIGLogin = (data) => {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    dispatch(authActions.register({name:data.user_id, email:data.user_id, password:data.user_id}));
  };

  return (
    <Screen footer={false} style={tw`items-center flex-1`} scrollEnabled={true}>
      <ViewY spacing={8} style={tw`items-stretch flex-1 pt-16`}>
        <ViewY style={tw`items-center`}>
          <Logo />
        </ViewY>
        <ViewY spacing={4} style={tw`px-2`}>
          <Text style={tw`text-white font-bold text-2xl text-center`}>
            Registrate
          </Text>
          <Text style={tw`text-white text-lg text-center`}>
            ¡Crea una cuenta para continuar!
          </Text>
        </ViewY>
        <ViewY spacing={16}>
          <ViewY spacing={4} style={tw`items-stretch px-4`}>
          <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              placeholderTextColor={`#888`}
              placeholder="Nombre de usuario"
              onChangeText={text => setName(text)}
              value={name}
              style={tw` border-b text-xl text-white py-2 border-white`}></TextInput>
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              placeholderTextColor={`#888`}
              placeholder="Email"
              onChangeText={text => setEmail(text)}
              value={email}
              style={tw` border-b text-xl text-white py-2 border-white`}></TextInput>
            <TextInput
              placeholderTextColor={`#888`}
              placeholder="password"
              onChangeText={text => setPassword(text)}
              value={password}
              style={tw`border-b text-xl text-white py-2 border-white`}
              secureTextEntry={true}></TextInput>
          </ViewY>
          <ButtonYellow onPress={onRegisterPress}>Registrar</ButtonYellow>
        </ViewY>
        <ViewY spacing={4}>
          <Text style={tw`text-white text-md text-center`}>
                o a través de tus redes sociales
          </Text>
          <ButtonGmail cbPress={(data) =>cbGGLogin(data)}>Continuar con google</ButtonGmail>
          <ButtonFacebook cbPress={(user) => cbFBLogin(user)}>Continuar con facebook</ButtonFacebook>
          <ButtonInstagram cbPress={(data) => cbIGLogin(data)}>Continuar con instagram</ButtonInstagram>

          <View style={tw`items-center flex-row justify-center`}>
            <Text style={tw`text-white text-lg text-center`}>
              Ya tienes una cuenta? 
            </Text>
            <TouchableOpacity
              onPress={handlePlus}>
              <Text style={tw`text-orange-500 text-lg  py-1 px-2`}>inicia sesión</Text>
            </TouchableOpacity>
          </View>
        </ViewY>
      </ViewY>
    </Screen>
  );
};

export default Register;