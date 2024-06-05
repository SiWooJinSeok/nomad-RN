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

- 이미 View가 flex-container이기에 바로 flexDirection 사용 가능
- 부모의 flex 값을 기준으로 자식의 flex 값을 계산함.
- 부모의 flex 값이 없으면 화면에 렌더링 되지 않음.
