# 1D-1JS
# 1Day 1JS challenge(with Wes Bos)

기간 (8월21일~ , 주말은 제외~!)
Vanilla JS 연습
(site에서 제공하는 HTML 템플릿에 css 개별 적용)

## Day1: Drum-kit (20/08/21)
  ### function
  - 키보드를 누르면 드럼 사운드 on

  ### wesbos의 솔루션
  1. keydown 이벤트로 눌러진 keycode와 동일한 key값을 가진 audio 실행
    (add classList로 스타일도 변경)
  2. forEach 문으로 transition이 끝나는 key에서 removeTransition 

  ### 개선방향
  1. transitionend 이벤트에 forEach 대신 event delegation 사용 (성능 개선)
  2. playSound()로 묶여진 함수를 playSound & addTransition로 분리 (더 명확하게 인지)

## Day2: Clock (20/08/24)
  ### function
  - 아날로그 시계로 현재 시각 보여주기 

  ### wesbos의 솔루션
  1. setInterval을 사용하여 초침,분침,시침(position-absolute)을 1초마다 rotate
     - new Date().get api를 이용하여 각도 계산 

  ### 개선방향
  1. 배경화면 랜덤 변경 함수 추가 (DOMContentLoaded, Math) 

## Day3: CSS Variables (20/08/25)
  ### function
  - input(type ="range") 슬라이드 조절시 css styling 요소가 사이트에 바로바로 변경 적용
  - 사이트 내 이미지의 blur, padding, base color(border) 변경

  ### wesbos의 솔루션
  1. HTML input 안의 name과 CSS 내 :root요소 이름 동일하게 설정 
     -> document.documentElement로 css 파일내 :root 요소 변경 
     - HTML: input에 data-sizing 추가해서 range의 value 값에 unit 적용 
  2. input 요소들에 forEach 문으로 change, mousemove 이벤트 핸들

  ### 개선방향
  1. text가 있는 사이트의 전체적인 변화를 볼 수 있도록 input 조절 요소 변경 
  - 제목과 본문 각각의 font-size, 본문 뒤 배경색의 opacity, base color, highlight color 변경 

## Day4: Array Cardio-1 (20/08/26)
  ### function
  - array의 api 사용 능력 향상을 위한 훈련! 
  - filter(), map(), sort(), reduce()

## Day5: Flex panel gallery (20/08/27)
   ### function
   - panel 클릭할 때마다 classList.toggle 되어 펼쳐졌다가 접었다 하기 

   ### wesbos의 솔루션
   1. forEach 문으로 click,transitionend 이벤트 추가 
      1) panel click -> panel open
      2) panel open -> flex 관련 스타일 변경(transitionend) -> sub-text 보이는 애니메이션 효과 

   ### 개선방향
   1. 다른 panel 클릭 -> 기존에 open 되어있던 panel은 닫히도록 변경 
      => filter로 열려있는 panel list 반환 
          -> open 돼있던 panel은 closing(classList.remove) 
       
## Day6: Type ahead (20/09/03)
   ### function
   ### wesbos의 솔루션
   ### 개선방향

## Day7: Array Cardio-2 (20/08/31)
  ### function
  - array의 api 사용 능력 향상을 위한 훈련! 
  - some(), every(), find(), findIndex()

## Day8: Fun with HTML Canvas (20/09/01)
   ### function
   ### wesbos의 솔루션
   ### 개선방향

## Day9: Dev tool (20/09/02)
  ### function
  - 개발자 도구 console 창 배우기
  - log, 문자열 치환, warn, error, info, assert(testing), 
    clear, dir(Viewing DOM Elements -> properties)
    grouping(groupCollapsed & groupEnd), count

## Day10: Hold shift & Checkbox (20/09/04)
  ### function
  - shift key를 누르고 체크박스 다중 선택시, 사이에 있는 체크박스들도 함께 체크

  ### wesbos의 솔루션
  1. checkbox 누르면, lastChecked에 어떤 checkbox인지 저장
  2. check && shiftKey를 누른 상태이면, forEach 루프로 inBetween(boolean)값 변경
  3. inBetween(true)인 체크 박스 모두 체크 상태로 변경

  ### 개선방향 
  1. forEach 대신 event delegation 사용 (=> 결과 : 성능이 저하됨ㅠ)
  2. 맨 처음에 shiftkey 누르고 클릭하면, 클릭한 박스 밑으로 모두 체크됨 
      => shift && checked 된 체크박스 index 받기 
         index 값이 모두 양수인 경우(두 개 이상이 선택된 경우)만
          -> 중간 체크박스가 checked 상태로 변경하도록 수정 

## Day11:Custom Video Player (20/09/08 - 20/09/09)
  ### function
  - 비디오 플레이어 조작 기능 커스텀 
  
  ### wesbos의 솔루션 
  1. 비디오 재생 조작 : play-btn 클릭,비디오 재생 등의 event 실행시 togglePlay,updateButton 함수 작동 
  2. 비디오 재생 시간 표시 : 비디오 timeupdate event 실행시 handleProgress 함수(비디오 기본 속성 - video.currentTime,video.duration 이용) 작동
  3. 비디오 재생 시간 조작 : slider 조작시 scrub(속성 - e.offsetX,progress.offsetWidth,video.duration 이용), skip(video.currentTime 이용) 작동
 
  ### 개선방향 
  1. volume 버튼 클릭시 mute 기능 추가 (mutedControl,updateVolBtn)
  2. playbackRate 조작시 현재 몇 배속으로 재생 중인지 display
  3. 영상 description 추가하여 재생되는 동영상 시간 display (displayPlayTime)

## Day12: Key Sequence Detect (20/09/07)
  ### function
  - 설정해놓은 secret code와 사용자가 누른 연속된 키보드 키가 동일한 경우,
    로그 창: 성공 메세지 + 스크린: 
  ### wesbos의 솔루션 
  1. pressed keyboard를 array(pressed)로 받기 
  2. splice로 secret code의 길이를 넘지 않게 array(pressed) 길이 조절
  3. join으로 text화하여 code와 pressed 문구 비교 후
     정답일 경우 - console 창으로 정답 축하 문자
                - add cornify ~ !
  ### 개선방향 
  1. 처음 페이지에 들어가면 빈 화면이라서 사용자가 뭘 해야하는지 알 수 없음 
      => 힌트 제공! (1. code : rainbow -> color 힌트!
                    2. code : month 뒤집기(ex- yaM, tsuguA) -> 뒤집힌 text 힌트!)
  2. 대문자, 소문자 구분 없이 정답이 될 수 있게 REGEXP 이용                  
  3. 답을 맞추면 나오는 로그 문자 ding dong 이 눈에 잘 띄지 않음 
      => 로그 창에 스타일 입히기 


## Day13: Slide in OnScroll (20/09/15)
  ### function
  - 스크롤을 내리거나 올릴 때, 이미지가 fade-in 되는 효과
  - scroll 이벤트가 될 때마다 컴퓨터가 작업 처리할 경우 발생하는 낭비 처리

  ### wesbos의 솔루션
  1. function checkSlide: window에 scroll 이벤트를 등록하여, 일정 위치만큼 스크롤되면 이미지가 보이도록 처리
     1) 일정 위치 계산 : img의 offsetTop,height 등 / window의 scrollY,innerHeight
     2) 값 비교 : img와 window의 속성 비교(조건문)에 따라 classList 추가 or 삭제
  2. function debounce: scroll 이벤트가 일어나도 일정 시간 간격으로만 func 작동
     - setTimeout, apply() 등 

## Day14: JS refence vs copy (20/09/10)
  ### summary
  - reference 타입과 primitive 타입 비교
  - index 파일내 정리 
    
## Day15

## Day16: Mousemove shadow (20/09/11)
  ### function
  - 마우스가 움직이는 정도에 따라 그림자 4개가 각각 다른 방향으로 움직이기

  ### wesbos의 솔루션 
  1. text가 담긴 컨테이너의 offsetWidth,offsetHeight를 받기 
  2. 마우스가 움직이는 offsetX,offsetY 값 측정 
     - container 내의 text에 마우스가 올라간 경우, offset의 기준이 text가 됨 
        -> e.target.offsetLeft,offsetTop을 이용하여 offset의 기준을 container로 조정
  3. 그림자 4개가 동일한 규칙 내에서 서로 다른 방향으로 움직일 수 있도록 px값 설정
     - 위에서 구한 측정값들로 그림자가 이동할 위치 지정 
 
  ### 향후 사용 방법
  1. 홈페이지 title에 효과를 주고 싶을 떄
     (그림자 위치가 마우스 방향에 맞춰 살짝 바뀌는 정도로 응용 가능할 듯) 

## Day17: Sort without Articles (20/09/15)
  ### function
  - html 파일에 적지 않고, JS로 영화 목록을 알파벳 순서로 나열 후 display

  ### wesbos의 솔루션 
  1. 영화 목록 array 형태로 저장
  2. replace().trim(): 정규표현식으로 제목 맨 앞 단어가 'a, an, the'인 경우 삭제
  3. 알파벳 순으로 sort()한 뒤, map()이용하여 각각의 제목을 li 태그로 변경 -> join()으로 텍스트화
  4. innerHTML을 이용하여 ul 태그에 li태그 삽입 

  ### 향후 사용 방법
  - 동적인 리스트 생성시 사용 (데이터를 JS 파일에 분리하여 관리)

## Day18: Adding up times with reduce (20/09/16)
   ### function
   - 목록에 포함된 비디오의 재생시간의 총합 구하기
   
   ### wesbos의 솔루션
   1. video list -> map(): dataset.time에 저장된 데이터 배열 반환
                 -> map()(split & map(parseFloat)): 'mins:secs' (string) 데이터를 secs(float) 데이터로 변환하여 새 배열 반환
   2. total time: reduce() -> 총 재생시간(secs) 반환
   3. Math.floor와 %,/ 연산자를 이용하여 총 재생시간을 h,m,s로 변환

   ### 개선방향 
   1. video list에서 video를 삭제 혹은 삭제 취소가 가능하도록 
      => classList.toggle('remove__list') -> filter(): classList에 remove__list가 포함된 경우 계산에서 제외 
   2. calculate 버튼 추가하여, 리스트 변경되어도 재계산이 가능하도록
      => addEventListener('click') 등록 
   3. 화면에 각각의 비디오 재생시간과 총 합계가 표시되지 않음 
      => textContent 속성 이용하여 display 되도록  
   
## Day19

## Day20

## Day21

## Day22

## Day23

## Day24

## Day25

## Day26

## Day27

## Day28

## Day29

## Day30
