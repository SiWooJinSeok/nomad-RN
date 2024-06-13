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

### 2.10강

1. Fontisto 사용하기

- 많은 아이콘을 밑에서 홈페이지에서 찾아서 사용할 수 있다. (엄청 많다.)
  - https://icons.expo.fyi

2. 임포트 하기

```
import { Fontisto } from "@expo/vector-icons";
```

3. 사용하기

```
<Fontisto
    style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}
    name={icons[day.weather[0].main]}
    size={70}
    color="white"
/>
```

## 4일 차

### 3.1강

1. TouchableOpacity 사용해보기

- 클릭시 Opacity 활성화해서 애니메이션처럼 투명해지게 만듦

- 사용하기

```
import { TouchableOpacity } from "react-native";

// ...

<TouchableOpacity>
// ...
</TouchableOpacity>

```

- activeOpacity 투명도를 정할 수 있는 옵션

2. TouchableHighlight 사용해보기

- 옵션 없이 사용 시 아무동작도 하지 않음

- 사용하기

```
import { TouchableHighlight } from "react-native";

// ...

<TouchableHighlight>
// ...
</TouchableHighlight>
```

- onPress 옵션

  - 눌렀을 때 동작하게 하는 함수
  - 사용하지 않으면 눌러도 반응이 없음!

- underlayColor 옵션

  - 눌렸을 때 버튼의 배경색을 바꿔주는 옵션

- 그렇게 많이 사용하진 않는다고 함

3. TouchableWithoutFeedback 사용해보기

- 위 2개 컴포넌트와 달리 UI로 표현은 되지 않고 onPress를 이용해서 이벤트를 관리 할 수 있음
- 유저에게 보여주지 않을 때 사용

- 사용하기

```
import { TouchableWithoutFeedback } from "react-native";

// ...

<TouchableWithoutFeedback>
// ...
</TouchableWithoutFeedback>
```

4. Pressable 사용해보기

- 더 많은 속성들을 제공해주는 컴포넌트로 섬세하게 작업할 수 있다.

- 사용하기

```
import { Pressable } from "react-native";

// ...

<Pressable>
// ...
</Pressable>

```

- delayLongPress : 얼마나 길게 누르면 반응할지
- disable : 위 컴포넌트엔 없음
- gitSlope : 바깥 어디까지 탭 누르는 것을 감지할지

5. 여기서는 TouchableOpacity를 사용할 예정이다.

### 3.2강

1. TextInput 사용하기

- 사용하기

```
import { TextInput } from "react-native";

// ...

<TextInput />

```

- onChangeText : 입력받은 Text를 받을 수 있음
- keyboardType : 키보드 타입(핸드폰 키보드 타입)
- returnKeyType : 완료 버튼의 타입을 정할 수 있음(정해짐)
- returnKeyLabel : 완료 버튼의 이름을 정할 수 있음(only android 만 가능)
  - 내폰에선 안됨.
- secureTextEntry : 비밀번호처럼 가려줌
- multiline : 한 줄 이상 작성 가능
- placeholderTextColor : placeholder의 색상 변경
- autoCorrect : 자동완성 기능
- autoCapitalize : 자동 대문자 기능
- onSubmitEditing : submit 이벤트
- 등등 다양한 옵션이 있음.

### 3.3강

1. Object.assign 사용하기

```
const newTodo = Object.assign({}, toDos, {
      [Date.now()]: { text, work: working },
    });

```

- 첫번 째 {} : 기존 객체를 변경하지 않게 함.
- 두번 째 toDos : 기존 객체
- 마지막 `{[Date.now()]: { text, work: working },}` : 추가 할 내용

### 3.4강

1. 3.3강 내용 수정하기

```
const newTodo = { ...toDos, [Date.now()]: { text, work: working } };

```

2. 페인팅하기

```
<ScrollView>
  {Object.keys(toDos).map((key) => (
    <View style={styles.toDo} key={key}>
      <Text style={styles.toDoText}>{toDos[key].text}</Text>
    </View>
  ))}
</ScrollView>

```

- Object.keys로 키값으로 배열만들기
- map으로 페인팅하기

## 5일 차

### 3.5강

1. AsyncStorage 설치하기

```
npx expo install @react-native-async-storage/async-storage
```

2. 임포트 하기

```
import AsyncStorage from "@react-native-async-storage/async-storage";
```

3. 저장하기

```
AsyncStorage.setItem(STORGE_KEY, JSON.stringify(todos));
```

- STORGE_KEY : 저장할 키 값 ,string 값
- JSON.stringify(todos) : 오브젝트를 string으로 수정해서 저장

4. 불러오기

```
const s = await AsyncStorage.getItem(STORGE_KEY);

if (s) {
      setTodos(JSON.parse(s));
    }
```

### 3.6강

1. 삭제 기능 만들기

```
const deleteToDo = async (key) => {
    const newTodo = { ...toDos };
    delete newTodo[key];
    setTodos(newTodo);
    await saveTodos(newTodo);
  };
```

- 새로운 객체를 만들어서 키값에 해당하는 todo만 제거
- 그 후 저장

2. Alert.alert 사용하기

```
Alert.alert("title" , [ { text:"Cancel" } , { text: "OK" , onPress : () => {} }]);

/**static alert (
  title: string,
  message?: string,
  buttons?: AlertButton[],
  options?: AlertOptions,
*/
);
```

- ios에서만 사용 가능한 AlertButtonStyle이 있음.

3. Alert.prompt 사용하기 (ios에서만 동작)

```
Alert.prompt("title");

/** static prompt: (
  title: string,
  message?: string,
  callbackOrButtons?: ((text: string) => void) | AlertButton[],
  type?: AlertType,
  defaultValue?: string,
  keyboardType?: string,
);*/

```

4. 삭제 기능 수정하기

```
 const deleteToDo = (key) => {
    Alert.alert("삭제하기", "정말 삭제 하시겠습니까?", [
      { text: "취소" },
      {
        text: "삭제",
        onPress: () => {
          const newTodo = { ...toDos };
          delete newTodo[key];
          setTodos(newTodo);
          saveTodos(newTodo);
        },
      },
    ]);
  };
```

### 3.8강 Code Challenge

1. 앱 재실행시, 마지막 상태의 Work 또는 Travel 기억하기

```
const toggleWorking = () => {
    const worked = !working;
    setWorking(!working);
    AsyncStorage.setItem(WORKING, JSON.stringify(worked));
  };

const loadTodos = async () => {
  const work = await AsyncStorage.getItem(WORKING);

  if (work) {
    setWorking(JSON.parse(work));
  }

  const s = await AsyncStorage.getItem(STORGE_KEY);

  if (s) {
    setTodos(JSON.parse(s));
  }
};
```

2. Todo에 완료 기능 추가하기

```
const confirmToDo = (key) => {
    const newTodo = { ...toDos };
    newTodo[key].confirm = !newTodo[key].confirm;
    setTodos(newTodo);
    saveTodos(newTodo);
  };

// ...

<TouchableOpacity key={key} onPress={() => confirmToDo(key)}>
  <View style={styles.toDo}>
    <Text
      style={{
        ...styles.toDoText,
        textDecorationLine: toDos[key].confirm
        ? "line-through"
        : "none",
    }}>
      {toDos[key].text}
    </Text>

// ...

</TouchableOpacity>

```

3. Todo에 수정 기능 추가하기

```
const [editKey, setEditKey] = useState(null);
const [editText, setEditText] = useState("");

const onChangeEditText = (payload) => setEditText(payload);

//...

const changeEditKey = (key) => {
  setEditKey(key);
  setEditText(toDos[key].text);
};

const EditToDo = () => {
  const newTodo = { ...toDos };
  newTodo[editKey].text = editText;
  setTodos(newTodo);
  saveTodos(newTodo);
  setEditKey(null);
};

// ...

{editKey !== key ? (
  <Text
  style={{
    ...styles.toDoText,
    textDecorationLine: toDos[key].confirm
    ? "line-through"
    : "none",
    }}
  >
    {toDos[key].text}
  </Text>
  ) : (
  <TextInput
  onSubmitEditing={EditToDo}
  returnKeyType="done"
  value={editText}
  onChangeText={onChangeEditText}
  placeholder={working ? "add Todo" : "add Travel"}
  style={styles.editInput}
  />
)}

```

## 6일 차

### 4.0강

1. eas-cli 설치

- 더이상 publish를 사용할 수 없음.

```
npm install -g eas-cli
```

2. 빌드 해주기

```
eas build
```

3. 본인 expo dev 가서 빌드 상황 확인하기

- https://expo.dev/

- 8분 25초 정도 걸림

4. eas update 하기(publish)

```
eas update
```

- branch 설정
- 업데이트 메세지 설정

5. expo dev에서 updates 메뉴 클릭

- 프로젝트 확인 가능

6. 업데이트 프로젝트 클릭 후 우측 상단에 Preview 클릭

- 밑에 Advanced 있음.

7. expo go로 QR 실행 성공

#### 빌드 중 경고문 발생

<img src='./img/ddf.PNG' alt='오류 이미지'>

1. 실행

```
npx expo-doctor@latest
```

2. 아래 처럼 출력됨

```
Need to install the following packages:
expo-doctor@1.6.1
Ok to proceed? (y) y
WARNING: We recommend using PowerShell or Bash via WSL 2 for development with Expo CLI on Windows. You may encounter issues using cmd.exe.

✔ Check Expo config for common issues
✔ Check package.json for common issues
✔ Check native tooling versions
✔ Check dependencies for packages that should not be installed directly
✔ Check for common project setup issues
✔ Check npm/ yarn versions
✔ Check for issues with metro config
✔ Check Expo config (app.json/ app.config.js) schema
✔ Check for legacy global CLI installed locally
✔ Check that native modules do not use incompatible support packages
✖ Check that packages match versions required by installed Expo SDK
✔ Check that native modules use compatible support package versions for installed Expo SDK

Detailed check results:

The following packages should be updated for best compatibility with the installed expo version:
  react-native@0.74.1 - expected version: 0.74.2
Your project may not work correctly until you install the expected versions of the packages.
Found outdated dependencies
Advice: Use 'npx expo install --check' to review and upgrade your dependencies.

One or more checks failed, indicating possible issues with the project.
```

3. 조언대로 --check 설치

```
npx expo install --check
```
