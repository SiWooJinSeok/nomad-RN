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

4. Expo 회원가입

5. Expo 로그인

```
npx expo login
```

6. 실행

```
npm run start
```

7. App.js 수정

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
