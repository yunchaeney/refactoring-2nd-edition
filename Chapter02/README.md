# Chapter 02

## 2.1 리팩터링 정의

> 리팩터링 : [명사] 소프트웨어의 겉보기 동작은 그대로 유지한 채, 코드를 이해하고 수정하기 쉽도록 내부 구조를 변경하는 기법.
> 리팩터링(하다) : [동사] 소프트웨어의 겉보기 동작은 그대로 유지한 채, 여러 가지 리팩터링 기법을 적용해서 소프트웨어를 재구성하다.

> 누군가 "리팩터링하다가 코드가 깨져서 며칠이나 고생했다" 라고 한다면, 십중팔구 리팩터링한 것이 아니다.

리팩터링은 전과 후의 코드가 똑같이 동작해야 한다. (성능이 아니라, 사용자의 기능)
리팩터링하는 동안에는 코드가 항상 정상 작동하기 때문에, 전체 작업이 끝나지 않았더라도 언제든 멈출 수 있다.
리팩터링 과정에서 발견된 버그는 리팩터링 후에도 그대로 남아 있어야 한다.
리팩터링의 목적은 코드를 이해하고 수정하기 쉽게 만드는 것이다. 성능이 좋아질 수도, 나빠질 수도 있다.

## 2.2 두 개의 모자
소프트웨어 개발 시 목적이 기능 추가인지, 리팩터링인지를 명확히 구분해 작업하기.
기능 추가 모자를 썼을 때는 기존 코드는 건드리지 않고 새 기능을 추가하기만 한다.
리펙터링 모자를 썼을 때는 오로지 코드 재구성에만 전념한다.

--> 저자는 리팩터링의 원칙, 즉 기능이 변하지 않고 코드 개선, 재구성 하기를 명확하게 구분하는 것 같다. 리팩터링 시에 기능이 변경되거나 추가되어서 코드가 엉키는 걸 경계하기.

## 2.3 리팩터링 하는 이유

#### 리팩터링하면 소프트웨어 설계가 좋아진다.
#### 리팩터링하면 소프트웨어를 이해하기 쉬워진다.
#### 리팩터링하면 버그를 쉽게 찾을 수 있다.
#### 리팩터링하면 프로그래밍 속도를 높일 수 있다.
-> 내부 설계가 잘 되어 있을 수록 새로 기능을 추가할 지점과 어떻게 고칠지를 쉽게 찾을 수 있다. 모듈화가 잘 되어 있으면 전체 코드베이스 중 일부만 이해하면 된다. 즉 작업 속도가 빨라진다.


## 2.4 언제 리팩터링 해야 할까?

> **3의 법칙**
> 1. 처음에는 그냥 한다
> 2. 비슷한 일을 두 번째로 하게 되면, 일단 계속 진행한다.
> 3. 비슷한 일을 세 번째 하게 되면 리팩터링한다.

#### 준비를 위한 리팩터링: 기능을 쉽게 추가하게 만들기
기존의 기능 중 중복되는 기능을 찾는다. 함수를 복제해도 되지만, 중복 코드가 생긴다.
나중에 변경 시에는 두 개 다 수정해야 하니까. 그럴 때 **함수 매개변수화하기** 를 사용한다.

#### 이해를 위한 리팩터링: 코드를 이해하기 쉽게 만들기
변수를 적절한 이름으로 바꾸고, 긴 함수를 쪼개든가. 코드를 정리해서 설계가 눈에 들어오도록 하기.

#### 쓰레기 줍기 리팩터링
코드를 파악하던 중에 일을 비효율적으로 처리하는 모습을 발견할 때가 있다. 로직이 쓸데없이 복잡하거나, 매개변수화한 함수 하나면 될 일을 거의 똑같은 함수 여러 개로 작성해놨을 수 있다.
원래 하려던 작업과 관련 없는 일에 너무 많은 시간을 빼앗기기 싫지만, 쓰레기가 나뒹굴게 방치해서 나중에 일을 방해하도록 내버려두는 것도 좋지 않다.
이때 간단히 수정할 수 있는 것은 즉시 고치고, 시간이 좀 걸리는 일은 짧은 메모만 남긴 다음, 하던 일을 끝내고 나서 처리한다.

#### 계획된 리팩터링과 수시로 하는 리팩터링

> 보기 싫은 코드를 발견하면 리팩터링하자. 그런데 잘 작성된 코드 약시 수많은 리팩터링을 거챠애 한다.
> 무언가 수정하려 할 때는 먼저 수정하기 쉽게 정돈하고, 그런 다음 쉽게 수정하자.


#### 오래 걸리는 리팩터링
리팩터링이 코드를 깨트리지 않는다는 장점을 활용한다. 일부를 변경해도 모든 기능이 항상 올바르게 동작한다.
예컨대 라이브러리를 교체할 때는 기존 것과 새 것 모두를 포용하는 추상 인터페이스부터 마련한다.
기존 코드가 이 추상 인터페이스를 호출하도록 만들고 나면 라이브러리를 훨씬 쉽게 교체할 수 있다. -> **추상화로 갈아타기**

#### 코드 리뷰에 리팩터링 활용하기
풀 리퀘스트 모델에서는 효과적이지 않다.
효과적인 방식은 나란히 앉으 코드를 훑어가면서 하는 리팩터링 : **페어 프로그래밍**

#### 관리자에게는 뭐라고 말할까?
#### 리팩터링하지 말아야 할 때
**내부 동작을 이해해야 할 시점에**
**리팩터링하는 것보다 처음부터 새로 작성하는 게 쉬울 때**


## 2.5 리팩터링 시 고려할 문제
#### 새 기능 개발 속도 저하
> 리팩터링의 궁극적인 목적은 개발 속도를 높여서, 더 적은 노력으로 더 많은 가치를 창출하는 것이다.

상황에 맞게 조율한다.
준비를 위한 리팩터링을 하면 변경을 훨씬 쉽게 할 수 있다. 
사람들이 빠지기 쉬운 가장 위험한 오류는 리팩터링을 '클린코드'나 '바람직한 엔지니어링 습관' 처럼 도덕적인 이유로 정당화하는 것이다.
리팩터링의 본질은 코드베이스를 예쁘게 꾸미는 것이 아니며, 오로지 경제적인 이유, 개발 기간을 단축하고자 하는 것이다.
기능 추가 시간을 줄이고 버그 수정 시간을 줄여준다.

#### 코드 소유권
함수 이름 바꾸기로 선언부와 호출부에서 수정하고 싶은데, 호출부의 코드 소유자가 내가 아닌 타인이거나 고객이라면?

#### 브랜치
브랜치 전략 (각 기능 단위 브랜치에서 독립적으로 개발하다가 마스터 브랜치에 합치는 것) 에 따라, 리팩터링 한 것이 안 먹힐 수도 있다.
기능별 브랜치 통합 주기를 2~3일 단위, 혹은 더 짧게 관리해야 한다. (저자는 하루 최소 한번을 주장한다) 지속적 통합(CI) 는 리팩터링과 궁합이 좋다.
**CI와 리팩터링을 합쳐 익스트림 프로그래밍(XP)** 켄트백이 만들었다.

#### 테스팅
리팩터링의 특성은 겉보기 동작이 똑같이 유지된다는 것이다. 절차를 지켜 제대로 리팩터링하면 동작이 깨지지 않아야 한다.
하지만 실수를 할 수도 있는데, 핵심은 오류를 재빨리 잡는 데 있다.
즉 수시로 테스트를 해야 한다. 리팩터링 시에는 자가 테스트 코드를 마련해야 한다.

#### 레거시 코드
대규모 레거시 시스템을 테스트 코드 없이 명료하게 리팩터링하기는 어렵다.
프로그램에서 테스트를 추가할 틈새를 찾아서 시스템을 테스트 해야 한다 (에이콘, 2018 - 레거시 코드 활용 전략)

#### 데이터베이스
---

## 2.6 리팩터링, 아키텍처, 애그니(YAGNI)
---

## 2.7 리팩터링과 소프트웨어 개발 프로세스
테스트 주도 개발 (TDD) :   자가 테스트 코드와 리팩터링을 묶어서,

리퍅터랑의 첫 번째 토대는 자가 테스트 코드다. 즉 프로그래밍 도중 발생한 오류를 확실히 걸러내는 테스트를 자동으로 수행할 수 있어야 한다.
지속적 통합을 적용하면 팀원 각자가 수행한 리팩터링 결과를 빠르게 동료와 공유할 수 있다.
즉 자가 테스트 코드, 지속적 통합, 리팩터링이라는 세 기법은 서로 강력한 상승효과를 발휘한다.

## 2.8 리팩터링과 성능
"직관적인 설계 vs 성능"은 중요한 주제다.
리팩터링하면 소프트웨어가 느려질 수도 있는 건 사실이다. 하지만 그와 동시에 성능을 튜닝하기는 더 쉬워진다.
리팩터링이 잘 되어 있다면 기능 추가가 빨리 끝나서 성능에 집중할 시간을 더 벌 수 있다. 또 리팩터링이 잘 되어 있는 프로그램은 성능을 더 세밀하게 분석할 수 있다.
코드가 깔끔하면 개선안들이 잘 떠오를 것이고, 그중 어떤 튜닝이 효과가 좋을지 파악하기 쉽다.
리팩터링은 성능 좋은 소프트웨어를 만드는 게 기여한다. 단기적으로 보면 리팩터링 단계에서는 성능이 느려질 수도 잇다.
하지만 최적화 단계에서 코드를 튜닝하기 훨씬 쉬워지기 때문에 결국 더 빠른 소프트웨어를 얻게 된다.

## 2.9 리팩터링의 유래
---

## 2.10 리팩터링 자동화
인텔리제이나 이클립스에서 자바로 프로그래밍할 때는 메서드 이름을 바꾸는 작업을 메뉴에서 원하는 항목을 클릭하는 것만으로 처리할 수 있다.
실제 리팩터링은 나 대신 개발 도구가 처리해 준다.
자동 리팩터링 기능은 존 브랜트와 돈 로버츠가 개발한 스몰토크용 <리팩터링 브라우저>에서 최초로 등장했다.
현재는 에디터나 도구에서 리팩터링 기능을 제공할 정도로 자동 리팩터링이 흔해졌다.
