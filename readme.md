## > 규약
- styled-components의 명명은 앞에 Styled를 붙힌다.
```js
// ex) 
const StyledButton = styled.button``;
```
- 함수의 네이밍은 대상 + 의미 + 역할을 포함한다.


## > 브랜치
- master : 배포
- dev : 배포 전 개발 코드 병합
- chihun : 개인 branch
- tedhoon : 개인 branch



## > 폴더구조

> 페이지에 사용되는 컴포넌트들
- Components
    - AmountCalculator (미사용)
    - DoctorFit (미사용)
    - Nutrient (미사용)
    - Useful : 단독으로 사용되는 유용한 컴포넌트들
        - AddBasket : iframe과 쌍방향 통신하는 코드들 테스트
        - IdCard : 등록된 강아지 정보를 기반으로 띄워주는 ID CARD
        - ImageField (미사용)
        - Novi (미사용) 

> 커스텀 훅 
- Hooks 
    - useFetchData : backend에서 데이터를 얻어서 Promise를 반환 할 수 있는 Hook
    - useFetchAge (미사용)
    - useFetchMyPet (미사용, 추후에 내 Pet데이터를 backend에서 불러올 때 사용할 예정)

> 이미지
- Images
    - Basic : 기본 이미지들
    - Crude : 원료 이미지들
    - Disease : 질병 이미지들

> 리덕스 관련
- Redux
    - Actions : action들
    - Reducers : reducer들
    - Store : redux store
    - Types : type들

> 페이지 컴포넌트
- Service
    - ACpage (미사용)
    - DFpage (미사용)
    - DoctorFitPage : 회원 및 강아지 정보 등록, 저장
    - DoctorFitMenu : 닥터핏 메뉴들 모아둔 페이지

### 스타일
- Styles
    - Fonts (미사용)

    
