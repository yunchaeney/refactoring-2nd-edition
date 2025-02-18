# Chapter 06 : 기본적인 리팩터링

## 6.1 함수 추출하기 (Extract Function)
- 반대 리팩터링 : 함수 인라인하기

기준 ? 길이가 길거나, 두 번 이상 사용되거나(재사용성)
-> '목적과 구현을 분리' : 함수를 추출한 뒤 '어떤 일을 하는지' 잘 표현하는 이름을 짓는다.


1. 함수를 새로 만들고 목적을 잘 드러내는 이름을 붙인다 (어떻게 가 아닌 무엇을 하는지가 드러나야 한다)
    
   - 대상 코드가 간단하더라도, 함수로 뽑아서 목적이 잘 드러나는 이름을 붙일 수 있다면 추출하기 
     - 이름이 떠오르지 않으면, 함수로 추출하면 안된다는 신호 
     - 다만 추출하는 과정에서 좋은 이름이 떠오를 수 있기에, 처음부터 최선의 이름을 짓고 시작할 필요는 없음
   - 함수 추출이 효과적이지 않으면, 다시 인라인으로 되돌리기
   - 중첩 함수를 지원하는 언어의 경우 추출한 함수를 원래 함수로 중첩시키기 
     - 유효범위를 벗어난 변수를 처리하는 작업을 줄일 수 있음 
     - 함수 위치를 변경해야할 때는 함수 옮기기8.1절를 적용

2. 추출할 코드를 원본 함수에서 복사하여 새 함수에 붙여넣기

3. 추출한 코드 중 원본 함수의 지역 변수를 참조하거나 추출한 함수의 유효범위를 벗어나는 변수는 없는지 검사, 있다면 매개변수로 전달하기

    - 원본 함수의 중첩 함수로 추출할 때는 이런 문제가 생기지 않음 
    - 사용하지만 값이 바뀌지 변수는 매개변수로 전달받기 
    - 추출한 코드에서만 사용하는 변수는 함수 안에서 선언하도록 수정 
    - 값이 변경되는 변수 중에서 값으로 전달되는 것들은 주의해서 처리 
      - 변수가 하나일 경우에는 질의 함수로 추출해서 변수에 대입하기 
    - 값을 수정하는 지역 변수가 너무 많을 경우 
      - 함수 추출을 멈추고, 변수 쪼개기9.1절나 질의 함수로 바꾸기7.4절 적용해보기

4. 변수를 다 처리한 이후에 컴파일 
   - 컴파일을 통해, 리팩토링 이후에 오류가 있는지 확인

5. 원본 함수에서 추출한 코드 부분을 새로 만든 함수를 호출하는 문장으로 변경 (추출한 함수로 위임)

6. 테스트

7. 다른 코드에 방금 추출한 것과 똑같거나 비슷한 코드가 없는지 찾기, 있을 경우 추출한 새 함수를 호출하도록 변경할 지 검토 (인라인 코드를 함수 호출로 바꾸기)
   - IDE에서 중복 또는 비슷한 코드를 찾아주는 리팩터링 기능이 있는지 확인
   - 기능이 없을 경우 검색 기능을 활용할 것




## 6.2 함수 인라인하기 (Inline Function)

## 6.3 변수 추출하기 (Extract Variable)

## 6.4 변수 인라인하기 (Inline Variable)

## 6.5 함수 선언 바꾸기 (Change Function Declaration)

## 6.6 변수 캡슐화하기 (Encapsulate Variable)

```ts
let defaultOwner = { firstName: '마틴', lastName: '파울러' };

// 어떤 참조 데이터
let spaceship: any = {};
spaceship.owner = defaultOwner;

// 갱신
defaultOwner = { firstName: '레베카', lastName: '파슨스' };
```

이를 캡슐화 하기 위해 아래와 같은 절차를 따른다.

1. 데이터를 읽고 쓰는 함수부터 정의한다.
    ```ts
    function getDefaultOwner() {
      return defaultOwner;
    }
    function setDefaultOwner(arg: any) {
      defaultOwner = arg;
    }
    ```

2. defaultOwner를 참조, 대입하는 코드를 찾아 바꾼다.
    ```ts
    spaceship.owner = getDefaultOwner();
    setDefaultOwner({ firstName: '레베카', lastName: '파슨스' });
    ```

3. 변수의 가시 범위를 제한한다. (파일로 분리 등)


위와 같은 절차는 데이터 항목을 참조하는 부분만 캡슐화한다.
- 구조로의 접근이나 구조 자체를 다시 대입하는 행위는 제어할 수 있지만, 필드 값을 변경하는 일은 제어할 수 없다.

1. 게터가 데이터의 복제본을 반환하도록 수정한다.
    ```ts
    function getDefaultOwner() {
      return Object.assign({}, defaultOwner);
    }
    ```

   2. 레코드 캡슐화하기
       ```ts
       let defaultOwnerData = { firstName: '마틴', lastName: '파울러' };

       function getDefaultOwner() {
         return new Person(defaultOwnerData);
       }
    
       function setDefaultOwner(arg: any) {
         defaultOwnerData = arg;
       }
       ```



    


## 6.7 변수 이름 바꾸기 (Rename Variable)

## 6.8 매개변수 객체 만들기 (Introduce Parameter Object)

## 6.9 여러 함수를 클래스로 묶기 (Combine Functions into Class)

## 6.10 여러 함수를 변환 함수로 묶기 (Combine Functions into Transform)

## 6.11 단계 쪼개기 (Split Phase)




- 2 함수 인라인하기, 3 변수 추출하기, 4 변수 인라인하, 5 함수 선언 바꾸기 
- 7 변수 이름 바꾸기
- 는 예시가 아주 간단해서 따로 적지 않음