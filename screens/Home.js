import React, { Component } from 'react';
import {
	Text,
	View,
	Platform,
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	AsyncStorage
} from 'react-native';

import { MonoText } from '../components/StyledText';
import { FlatList } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import HomeCell from '../components/HomeCell';
import { abandonmentPublicSrvc } from '../components/Service';
// firebase add
import firebase from 'firebase';

let serviceKey =
	'DrBCc6VIxYHNvgp3uEwtWG3WiZ3QdLS5khEl6Yltx3Kff0kbfNGPYODcrydKDEgNEMDDCEVyAJBv0hOkam5jMg%3D%3D';
let bgnde = '20190101'; //유기날짜 (검색 시작일) (YYYYMMDD)
let endde = '20190930'; //유기날짜 (검색 종료일) (YYYYMMDD)
let upkind = '41700'; // 축종코드 - 개 : 417000 - 고양이 : 422400 - 기타 : 429900
let kind = null; //품종코드 (품종 조회 OPEN API 참조)
let upr_ce = null; //시도코드 (시도 조회 OPEN API 참조)
let org_cd = null; //시군구코드 (시군구 조회 OPEN API 참조)
let care_reg_no = null; //보호소번호 (보호소 조회 OPEN API 참조)
let state = 'notice'; //상태 - 전체 : null(빈값) - 공고중 : notice - 보호중 : protect
let pageNo = '1'; //페이지 번호
let numOfRows = '10'; //페이지당 보여줄 개수
let neuter_yn = 'Y'; //중성화여부

firebase.initializeApp({
	apiKey            : 'AIzaSyA3ElpJGjxiGGhjho2XIqHhwVmFqHkagqk',
	authDomain        : 'pawchain2.firebaseapp.com',
	databaseURL       : 'https://pawchain2.firebaseio.com',
	projectId         : 'pawchain2',
	storageBucket     : 'pawchain2.appspot.com',
	messagingSenderId : '606131616302',
	appId             : '1:606131616302:web:0966e42a4133b879e23dbf'
});

export default class Home extends Component {
	constructor(props) {
		super(props);
		const ref = firebase.database().ref();
		ref.on('value', (snapshot) => {
			console.log('VaLUEEEEEEE', snapshot.val());
			this.setState({ listData: snapshot.val() });
		});

		this.state = {
			refreshing : false
		};
	}

	componentDidMount() {
		console.log('componentDidMount');
		return abandonmentPublicSrvc(
			serviceKey,
			bgnde,
			endde,
			upkind,
			kind,
			upr_ce,
			org_cd,
			care_reg_no,
			state,
			pageNo,
			numOfRows,
			neuter_yn
		);
	}

	static navigationOptions = ({ navigation }) => {
		const params = navigation.state.params || {};

		return {
			headerLeft  : (
				<TouchableOpacity style={{ padding: 5, paddingLeft: 15 }}>
					<Ionicons name={'ios-menu'} size={35} color={'tomato'} />
				</TouchableOpacity>
			),
			headerRight : (
				<TouchableOpacity style={{ padding: 5, paddingRight: 15 }}>
					<Ionicons name={'ios-search'} size={35} color={'tomato'} />
				</TouchableOpacity>
			),
			title       : 'HOME'
		};
	};

	refreshData = () => {
		//
	};

	//shelterName, name, age, abandonDate, likes, interests, comments, image
	renderItem = ({ item, index }) => {
		return (
			<HomeCell
				{...item}
				// shelterName={this.state.dogs.shelterName}
				// name={this.state.dogs.name}
				// age={this.state.dogs.age}
				// abandonDate={this.state.dogs.abandonDate}
				// likes={this.state.dogs.likes}
				// interests={this.state.dogs.interests}
				// comments={this.state.dogs.comments}
				// // image={this.state.dogs.}
			/>
		);
	};

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					style={styles.flatlist}
					data={
						this.state.listData == null ? (
							[]
						) : (
							this.state.listData.data
						)
					}
					// data={this.state.listData}
					renderItem={this.renderItem}
					onRefresh={this.refreshData}
					refreshing={this.state.refreshing}
					keyExtractor={(item, index) => index.toString()}
					ItemSeparatorComponent={({ highlighted }) => (
						<View style={styles.itemSeparatorComponent} />
					)}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container              : {
		flex            : 1,
		backgroundColor : '#fff'
	},
	flatlist               : {
		flexGrow : 1
	},
	scrollView             : {},
	itemSeparatorComponent : {
		height          : StyleSheet.hairlineWidth,
		marginLeft      : 10,
		marginRight     : -10,
		width           : '100%',
		backgroundColor : 'gray'
	}
});
