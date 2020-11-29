# > 규약
- styled-components의 명명은 앞에 Styled를 붙힌다.
```js
// ex) 
const StyledButton = styled.button``;
```
- 함수의 네이밍은 대상 + 의미 + 역할을 포함한다.


# > 브랜치
- master: 배포
- dev: 배포 전 개발 코드 병합
- chihun: 개인 branch
- tedhoon: 개인 branch


# > 폴더구조
### > 페이지에 사용되는 컴포넌트들
- `Components`
    - MusicFit: 음악 만들기
    - NutrientFit: 영양제 만들기
    - Useful: 단독으로 사용되는 유용한 컴포넌트들
        - 404: 404페이지
        - IdCard: 등록된 강아지 정보를 띄워주는 ID CARD
        - Loading: 로딩 페이지
        - ImageField (미사용): 이미지 필드
        - AddBasket (미사용): iframe과 쌍방향 통신하는 코드들 테스트
        - ImageField (미사용)
        - Novi (미사용) 

### > 커스텀 훅 
- `Hooks`
    - useFetchAge (미사용)
    - useFetchData: backend에서 데이터를 얻어서 Promise를 반환 할 수 있는 Hook
    - useFetchHealth: 정보 -> 주의 건강도
    - useFetchMyPet: 주인이 나로 등록된 Pet데이터들을 backend에서 불러올 때 사용
    - useFetchMusic: 음악
    - useFetchMyPet: 등록된 반려동물 정보들

### > 이미지
- `Images`
    - Basic: 기본 이미지들
    - Crude: 원료 이미지들
    - Disease: 질병 이미지들

### > 리덕스 관련
- `Redux`
    - Actions: action들
    - Reducers: reducer들
    - Store: redux store
    - Types: type들

### > 페이지 컴포넌트
- `Service`    
    - Common: 공통으로 사용되는 페이지(강아지 등록, 선택, 메뉴 등)
        - AddMyPetPage: 회원 및 강아지 정보 등록, 저장
        - ModifyMyPetPage: 정보 수정
        - DoctorFitMenuPage: 닥터핏 메뉴들 모아둔 페이지
        - SelectMyPetPage: 등록된 강아지 선택
        - HealthGraph: 반려동물 정보 기반 위험 건강도 그래프

    - NutrientFit: 맞춤 영양제 관련 페이지들
        - GoodnessOfFit
        - MaterialDetailPage
        - PaymentPage
        - RecommendSurvey
        - SelectNutrientWayPage: 영양제 만들기 메인페이지
        - SelfMake
        - SelfMakeList
        - SelfMakeResult

    - MusicFit: 맞춤 음악 관련 페이지
        - MusicMainPage


### 스타일
- `Styles`
    - Fonts (미사용)

    
