import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
    ImageBackground
} from 'react-native';
import { connect } from 'react-redux';
import Config from '../../config';
import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FloatLabelTextInput from 'react-native-floating-label-text-input';
import PreferenceStore from '../utils/PreferenceStore';
import {
    doLogin,
    setAuthTrue
} from '../actions/UserActions';
import {
    updatePageState
} from '../actions/PageStateActions';

var { height, width } = Dimensions.get('window');

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            isModalVisible:false
        }
    }

    render() {
        return (
            <View style={[styles.container,{backgroundColor:'#eee',flexDirection:'column',justifyContent:'center',alignItems:'center'}]}>
                <ImageBackground source={require('../../img/bg.jpg')} style={{height:'100%',width:'100%'}}>

                <View style={{backgroundColor:'transparent',flex:2,justifyContent:'center',alignItems:'center',}}>
                    <Text style={{fontSize:30,color:'#fff'}}>室内Beacon定位系统</Text>
                    </View>

                    <View style={{paddingVertical:3,backgroundColor:'transparent',flex:4,alignItems:'center',justifyContent:'center'}} >

                        {/*输入用户名*/}
                        <View style={{flexDirection:'row',height:45,width:300,marginBottom:10,backgroundColor:'rgba(255,255,255,0.2)',margin:10,padding:3,borderRadius:5}}>

                            <View style={{flex:6}}>
                                <View style={{flex:1,flexDirection:'row'}}>

                                    <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center',padding:4
                                        ,marginLeft:0,paddingHorizontal:2}}>
                                        <Icon size={18} name="user-o" color="#fff"></Icon>
                                    </View>


                                    <View style={{flex:6,flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                                        <FloatLabelTextInput
                                            style={{backgroundColor:'transparent'}}
                                            placeholder={"请输入用户名"}
                                            value={this.state.username}
                                            selectionColor="#ff5a5d"
                                            onChangeTextValue={(val) => {
                                    this.setState({ username: val })
                                }}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/*输入密码*/}
                        <View style={{flexDirection:'row',height:45,width:300,marginTop:10,backgroundColor:'rgba(255,255,255,0.2)',margin:10,padding:3,borderRadius:5}}>

                            <View style={{flex:6}}>
                                <View style={{flex:1,flexDirection:'row'}}>

                                    <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center',padding:4,
                                        paddingHorizontal:2,marginLeft:0}}>
                                        <Icon size={20} name="lock" color="#fff"></Icon>
                                    </View>

                                    <View style={{flex:6,flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                                        <FloatLabelTextInput
                                            style={{backgroundColor:'transparent'}}
                                            placeholder={"请输入密码"}
                                            value={this.state.password}
                                            selectionColor="#ff5a5d"
                                            secureTextEntry={true}
                                            onChangeTextValue={(val) => {
                                    this.setState({ password: val })
                                }}/>
                                    </View>

                                </View>
                            </View>
                        </View>

                        {/*登录按钮*/}
                        <TouchableOpacity style={{flexDirection:'row',height:45,width:300,marginBottom:10,backgroundColor:'#eee',margin:10,marginTop:25,padding:10,borderRadius:5}}
                                          onPress={()=>{
                                              // if (this.state.username != '' && this.state.password != '') {
                                              //     this.setState({ isModalVisible: true })
                                              //     this.props.dispatch(doLogin(this.state.username, this.state.password)).then((json) => {
                                              //         if (json.re == 1)
                                              //           this.props.dispatch(setAuthTrue())
                                              //     })
                                              // }
                                              this.props.dispatch(setAuthTrue())
                                          }}>
                                <View style={{flex:1,flexDirection:'column',alignItems:'center',justifyContent:'flex-start'}}>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{color:'#1f7c9d',fontSize:18,fontWeight:'bold'}}>登录</Text>
                                    </View>
                                </View>
                        </TouchableOpacity>

                    </View>


                    <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                        <Text style={{color:'#fff'}}>
                            山东大学软件学院
                        </Text>
                    </View>

                {/*loading模态框*/}
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.isModalVisible}>

                    <TouchableOpacity style={[styles.modalContainer,styles.modalBackgroundStyle,{alignItems:'center'}]}
                                      onPress={()=>{
                                            //TODO:cancel this behaviour

                                          }}>

                        <View style={{width:width*2/3,height:80,backgroundColor:'rgba(60,60,60,0.9)',position:'relative',
                                        justifyContent:'center',alignItems:'center',borderRadius:6}}>
                            <ActivityIndicator
                                animating={true}
                                style={[styles.loader, {height: 40,position:'absolute',justifyContent:'center',alignItems:'center',transform: [{scale: 1.6}]}]}
                                size="large"
                                color="#00BFFF"
                            />
                            <View style={{flexDirection:'row',justifyContent:'center',marginTop:45}}>
                                <Text style={{color:'#fff',fontSize:13,fontWeight:'bold'}}>
                                    登录中...
                                </Text>

                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>
                </ImageBackground>
            </View>

        )
    }

    componentDidMount() {
        var username = null;
        var password = null;
        PreferenceStore.get('username').then((val) => {
            username = val
            return PreferenceStore.get('password');
        }).then((val) => {
            password = val
            if (username !== undefined && username !== null && username != ''
                && password !== undefined && password !== null && password != '') {

                this.setState({
                    username: username,
                    password: password
                })

            }
        })
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        padding: 0
    },
    labelInput: {
        color: '#ff5a5d',
    },
    input: {
        borderWidth: 0
    },
    formInput: {
        borderBottomWidth: 1.5,
        borderColor: '#555',
        marginLeft: 20,
        width: width * 4 / 5,
        padding: 12
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    modalContainer:{
        flex:1,
        justifyContent: 'center',
    },
    modalBackgroundStyle:{
        backgroundColor:'rgba(0,0,0,0.3)'
    },
    logo: {
        width: 80,
        height:80,
        resizeMode:'cover',
        backgroundColor:'transparent',
    },
    loader: {
        marginTop: 10
    },
    row:{
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#222'
    },
});



export default connect()(Login);
