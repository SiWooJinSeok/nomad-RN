# RN 배우기! 과정기

## 1일 차

### 설치하기

1. 프로젝트 설치

```
npx create-expo-app@latest . --template
```

2. 옵션 Blank 선택

3. 추가 라이브러리 설치 (웹으로도 실행 가능)

```
npx expo install react-native-web react-dom @expo/metro-runtime
```

### 시작하기

1. Expo 회원가입

2. Expo 로그인

```
npx expo login
```

3. 실행

```
npm run start
```

4. App.js 수정

### Expo go 어플에서 연결 시 무한 로딩

- 구글을 통해 원인 분석

1. 핸드폰 껐다가 키기

2. 노트북, 핸드폰 와이파이 같게 하기

3. 와이파이 속성에서 개인으로 수정

4. 앱 설정에 가서 expo go 앱 권한 다 없애기

5. 다른 앱 위에 표시 키기(이미 켜져 있으면 끄고 다시 키기)

### expo go something went wrong 표시

- 경로에 한글이 섞여 있었음

- 영어로 수정하여 해결.

## 2일 차

### 시작하기

1. 웹사이트가 아니기에 div를 사용할 수 없기에 View를 사용해야 한다.

- View는 container이다.

- 항상 임포트 해야 한다.

2. 모든 text는 Text 태그를 사용해야 한다.

3. 스타일은 아래처럼 적용 할 수 있다.

```
const styles = StyleSheet.create({
 container : {
 // css
 }
})
```

- StyleSheet.create 를 사용하는 이유는 자동 완성을 지원하기 때문이다.

4. StatusBar는 third-party components다.

- 시간, 배터리, 와이파이 즉 모바일 상단을 의미한다.

5. native(expo)에서는 css 실수하면 에러와 같이 해결방법이 나온다.

6. RN은 기존에 있던 AsyncStorage는 사라져서 커뮤니티에 의존해야 한다.

7. [React Native Directory](https://reactnative.directory/?search=storage) 이 사이트에서 찾을 수 있다.

- [sunnylqm/react-native-storage: local storage wrapper for both react-native and browser. Support size controlling, auto expiring, remote data auto syncing and getting batch data in one query. (github.com)](https://github.com/sunnylqm/react-native-storage) 이 사이트를 추천해줌.

8. 하지만 expo에서 SDK를 만들어 줌 많은 컴포넌트들을 지원해준다.

- expo 사이트에서 찾아서 설치만 하면 된다.
- expo에서는 RN에서 제공하지 않는 것들을 추가적으로 제공해준다.

### 2.4강

1. display의 flex만 사용 가능

- 이미 View가 flex-container이기에 바로 flexDirection 사용 가능.
- 부모의 flex 값을 기준으로 자식의 flex 값을 계산함.
- 부모의 flex 값이 없으면 화면에 렌더링 되지 않음.

### 2.6강

1. 기본 스크롤을 사용할 수 없기 때문에 native에는 ScrollView가 있음.

- `pagingEnabled` : 페이지 처럼 보여주기.
- `horizontal` : 가로로 스크롤하기.
- `showsHorizontalScrollIndicator={false}` : 가로 스크롤바 안 보이게 하기.
- `contentContainerStyle` : content 스타일링.
- `indicatorStyle="white"` : ios만 스크롤바 색상 변경.
- `persistentScrollbar={true}` : 안드로이드만 스크롤바가 투명해지지 않게 함.

2. Dimensions으로 핸드폰의 크기를 알 수 있음.

```
import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
```

## 3일 차

### 2.7강

1. expo-location 설치하기

```
npm i expo-location
```

2. 임포트하기

```
import * as Location from "expo-location";
```

3. Location.requestForegroundPermissionsAsync() 사용해보기

```
const premission = await Location.requestForegroundPermissionsAsync();
console.log(premission);

// 출력 {"android": {"accuracy": "fine", "scope": "fine"}, "canAskAgain": true, "expires": "never", "granted": true, "status": "granted"}
```

- android-accuracy: fine은 고정밀 위치 데이터를 사용함을 의미
- android-scope: fine은 위치 접근 범위가 고정밀임을 의미

- canAskAgain: true은 사용자가 위치 권한을 거부했더라도 다시 요청할 수 있음를 의미
- expires: never는 권한이 만료되지 않음을 의미
- granted: true는 위치 권한이 부여되었음을 의미
- status: granted는 권한이 승인되었음을 의미

4. Location.getCurrentPositionAsync() 사용해보기

```
const locations = await Location.getCurrentPositionAsync({ city: 5 });
console.log(locations);

// 출력 {"coords": {"accuracy": 100, "altitude": 27, "altitudeAccuracy": 85.87849426269531, "heading": 0, "latitude": 37.4826964, "longitude": 126.6341595, "speed": 0}, "mocked": false, "timestamp": 1717650969032}
```

- coords : 위치 정보와 관련된 좌표 값을 포함하는 객체

  - accuracy: 위치 정확도를 미터 단위로 나타냄.
    - 이 경우 위치 정확도는 100미터
  - altitude: 고도 값을 미터 단위로 나타냄
  - altitudeAccuracy: 고도 정확도를 미터 단위로 나타냄
  - heading: 사용자의 방향(북쪽을 기준으로 시계방향 각도)을 나타냅니다. 0은 북쪽을 의미
  - latitude : 위도 값을 나타냄

- mocked: false는 이 위치 정보가 실제 위치 데이터를 기반으로 하고 있음을 의미.

  - 만약 true였다면, 위치 정보가 시뮬레이션된 값임을 의미

- timestamp: 위치 정보가 수집된 시간의 타임스탬프
  - 이 값은 Unix 타임스탬프로 밀리초 단위로 표현 됨.

5. Location.reverseGeocodeAsync() 사용해보기

```
const locations = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
console.log(locations)

// 출력 [{"city": null, "country": "대한민국", "district": "동구", "formattedAddress": "대한민국 인천광역시
동구 송현동 66-774", "isoCountryCode": "KR", "name": "66-774", "postalCode": null, "region": "인천광역시",
"street": "송현동", "streetNumber": "66-774", "subregion": null, "timezone": null}]
```

- city: 도시 이름
- country: 국가 이름
- district: 구/군 이름
- formattedAddress: 전체 주소를 포맷된 문자열
- isoCountryCode: ISO 국가 코드
- name: 위치의 이름
- postalCode: 우편번호
- region: 지역(광역시/도)
- street: 거리 이름
- streetNumber: 거리 번호
- subregion: 하위 지역 정보
- timezone: 시간대

#### 문제 발생!! city 값이 null임!

- street으로 수정해서 해결

```
setStreet(locations[0].street);
```

### 2.8강

1. open Weather API 이용하기

- https://home.openweathermap.org/

2. 회원가입 하기 / 로그인하기

3. api key 받아오기

- https://home.openweathermap.org/api_keys

4. 3-hour Forecast 5 days 사용하기 (One Call API 3.0는 구독해야 함.)

- https://openweathermap.org/forecast5

- 사용법

```
const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );

const data = await res.json();
```

5. ActivityIndicator 사용하기

- RN에서 제공해주는 로딩바임.

#### daily가 없음.

- list로 해결
  - [0] 번째를 출력

```
    {
  "clouds": {
    "all": 29
  },
  "dt": 1717664400,
  "dt_txt": "2024-06-06 09:00:00",
  "main": {
    "feels_like": 300.31,
    "grnd_level": 1014,
    "humidity": 47,
    "pressure": 1014,
    "sea_level": 1014,
    "temp": 300.06,
    "temp_kf": 6.29,
    "temp_max": 300.06,
    "temp_min": 293.77
  },
  "pop": 0,
  "sys": {
    "pod": "d"
  },
  "visibility": 10000,
  "weather": [
    {
      "description": "scattered clouds",
      "icon": "03d",
      "id": 802,
      "main": "Clouds"
    }
  ],
  "wind": {
    "deg": 260,
    "gust": 5.65,
    "speed": 4.28
  }
}
```

- day.temp.day가 아니라 day.main.temp로 해결!
