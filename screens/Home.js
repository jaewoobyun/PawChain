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
// const mockData = [
// 	{
// 		number       : 1,
// 		shelterName  : '행복보호소',
// 		shelterImage :
// 			'https://images.mypetlife.co.kr/wp-content/uploads/2018/06/06200333/pexels-photo-1108099-1024x768.jpeg',
// 		email        : 'happyshelter@happy.com',
// 		donation     : 111111,
// 		name         : '누렁이',
// 		age          : '3',
// 		abandonDate  : '2019.01.01',
// 		likes        : '100',
// 		interests    : '101',
// 		comments     : '102',
// 		backing      : '103',
// 		image        :
// 			'https://images.mypetlife.co.kr/wp-content/uploads/2018/06/06200333/pexels-photo-1108099-1024x768.jpeg'
// 	},
// 	{
// 		number       : 2,
// 		shelterName  : 'shelterName2',
// 		shelterImage :
// 			'https://images.mypetlife.co.kr/wp-content/uploads/2018/06/06200333/pexels-photo-1108099-1024x768.jpeg',
// 		email        : 'happyshelter@happy.com',
// 		donation     : 222222,
// 		name         : '튼튼이',
// 		age          : '3',
// 		abandonDate  : '2019.02.02',
// 		likes        : '200',
// 		interests    : '201',
// 		comments     : '202',
// 		backing      : '203',
// 		image        :
// 			'https://images.mypetlife.co.kr/wp-content/uploads/2018/06/06200333/pexels-photo-1108099-1024x768.jpeg'
// 	},
// 	{
// 		number       : 3,
// 		shelterName  : '센터3',
// 		shelterImage :
// 			'https://images.mypetlife.co.kr/wp-content/uploads/2018/06/06200333/pexels-photo-1108099-1024x768.jpeg',
// 		email        : 'happyshelter@happy.com',
// 		donation     : 333333,
// 		name         : '강아지',
// 		age          : '3',
// 		abandonDate  : '2019.03.03',
// 		likes        : '300',
// 		interests    : '301',
// 		comments     : '302',
// 		backing      : '303',
// 		image        :
// 			'https://images.mypetlife.co.kr/wp-content/uploads/2018/06/06200333/pexels-photo-1108099-1024x768.jpeg'
// 	}
// ];

const mockData = [
	{
		number       : 1,
		shelterName  : '행복보호소',
		shelterImage :
			'https://images.mypetlife.co.kr/wp-content/uploads/2018/06/06200333/pexels-photo-1108099-1024x768.jpeg',
		email        : 'happyshelter@happy.com',
		donation     : 111111,
		name         : '튼튼이',
		age          : '3',
		abandonDate  : '2019.10.01',
		likes        : '100',
		interests    : '101',
		comments     : '102',
		backing      : '103',
		image        : 'https://pbs.twimg.com/media/CfV6pVnUAAA-x-o.jpg'
	},
	{
		number       : 2,
		shelterName  : '스탠드보호소',
		shelterImage :
			'https://thehappypuppysite.com/wp-content/uploads/2018/07/doggy-daycare-long-1024x555.jpg',
		email        : 'himyname@stand.com',
		donation     : 222222,
		name         : '멍멍이',
		age          : '3',
		abandonDate  : '2019.09.26',
		likes        : '200',
		interests    : '201',
		comments     : '202',
		backing      : '203',
		image        :
			'https://mblogthumb-phinf.pstatic.net/MjAxODAyMjhfMTc3/MDAxNTE5NzkxOTU4MjI1.A4yQeHFyEX58mDDm4MQHg78tO-o7tgK-zujTG1-iIYgg.Y6zsd7MGKxED3g9VPCPRNaouXHOC67D4sbvq8Rr-sEEg.JPEG.seokm1016/image_3006258451519791446676.jpg?type=w800'
	},
	{
		number       : 3,
		shelterName  : '사랑 유기견 보호센터',
		shelterImage :
			'https://www.ccreadingfarm.com/wp-content/uploads/doggy-day.jpg',
		email        : 'happy@sarang.com',
		donation     : 333333,
		name         : '똘이',
		age          : '2',
		abandonDate  : '2019.09.24',
		likes        : '300',
		interests    : '301',
		comments     : '302',
		backing      : '303',
		image        :
			'http://www.9dog.co.kr/wp-content/uploads/2013/07/ep16.jpg'
	},
	{
		number       : 4,
		shelterName  : '호박 보호소',
		shelterImage :
			'https://www.newpawsibilities.com/wp-content/uploads/2018/10/kitana387.jpg',
		email        : 'happyshelter@happy.com',
		donation     : 333333,
		name         : '행복이',
		age          : '3',
		abandonDate  : '2019.09.23',
		likes        : '280',
		interests    : '254',
		comments     : '99',
		backing      : '297',
		image        :
			'https://image-notepet.akamaized.net/resize/620x-/seimage/20190802%2F0031e1e9d657a2603b9e19991b64fc0b.jpg'
	},
	{
		number       : 5,
		shelterName  : '희망 보호소',
		shelterImage :
			'http://www.tumblepups.co.uk/wp-content/uploads/2017/10/TumblePups-Doggy-Day-Care-Centre-12.jpg',
		email        : 'happyshelter@happy.com',
		donation     : 333333,
		name         : '대왕이',
		age          : '7',
		abandonDate  : '2019.09.23',
		likes        : '197',
		interests    : '209',
		comments     : '143',
		backing      : '200',
		image        :
			'http://www.jindodogshop.co.kr/data/file/freeboard/13c5f12b_DSC02743.JPG'
	},
	{
		number       : 6,
		shelterName  : '나비 유기동물 보호소',
		shelterImage :
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEzFWG2Oxx-qztdMQhceBrIsJ4rlukJy0qLQRZEHq-I4BHBEGg',
		email        : 'happyshelter@happy.com',
		donation     : 333333,
		name         : '유자',
		age          : '1',
		abandonDate  : '2019.09.21',
		likes        : '299',
		interests    : '280',
		comments     : '211',
		backing      : '300',
		image        :
			'https://post-phinf.pstatic.net/MjAxNzA2MjlfMjk4/MDAxNDk4Njk4OTYzMTIz.RC7_Z7bSDD0noFihxaBGb5axQwFltnhYJnfXhCOlDu4g.ksRlpD9YhJQAwRFH0iw5qQvuZYkuAFDO5uoDZrHsfhcg.PNG/20170517_130400.png?type=w1200'
	},
	{
		number       : 7,
		shelterName  : '럭키세븐 보호소',
		shelterImage :
			'https://www.mannersnmore.com.au/wp-content/uploads/2017/09/inner-banner-1.jpg',
		email        : 'happyshelter@happy.com',
		donation     : 333333,
		name         : '밍밍이',
		age          : '6',
		abandonDate  : '2019.08.31',
		likes        : '270',
		interests    : '222',
		comments     : '178',
		backing      : '197',
		image        : 'https://img.theqoo.net/img/QMLpw.jpg'
	},
	{
		number       : 8,
		shelterName  : '예솔 동물병원',
		shelterImage :
			'https://woodbine.com/mohawk/wp-content/uploads/sites/3/2019/06/Tootsie-Doggy-Derby-BD-2019-v2.jpg',
		email        : 'happyshelter@happy.com',
		donation     : 333333,
		name         : '초코',
		age          : '10',
		abandonDate  : '2019.08.27',
		likes        : '300',
		interests    : '301',
		comments     : '302',
		backing      : '303',
		image        :
			'http://images.christiantoday.co.kr/data/images/full/298055/image.png?w=654'
	},
	{
		number       : 9,
		shelterName  : '하하호호 보호소',
		shelterImage :
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVKpYO4gFnPmz7u0CCpvAclpY4ZIv4llApT6kvsFSZjA8-3mcP',
		email        : 'happyshelter@happy.com',
		donation     : 333333,
		name         : '댕댕이',
		age          : '3',
		abandonDate  : '2019.08.20',
		likes        : '188',
		interests    : '132',
		comments     : '172',
		backing      : '149',
		image        :
			'http://cdnweb01.wikitree.co.kr/webdata/editor/201607/08/img_20160708155119_135426f6.jpg'
	}
];

// let baseUrl =
// 	'http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc';
// let url =
// 	baseUrl +
// 	'?serviceKey=' +
// 	serviceKey +
// 	'&bgnde=' +
// 	bgnde +
// 	'&endde=' +
// 	endde +
// 	'&upkind=' +
// 	upkind +
// 	'&state=' +
// 	state +
// 	'&pageNo=' +
// 	pageNo +
// 	'&numOfRows=' +
// 	numOfRows +
// 	'&neuter_yn=' +
// 	neuter_yn;

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			refreshing : false,
			dogs       : [ mockData ]
		};
	}

	componentDidMount() {
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
					data={mockData}
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
