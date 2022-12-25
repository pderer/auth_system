# 스마일게이트 윈터데브캠프 1인 프로젝트 인증 시스템 (YamYam 박동진)
## 개요
### 기능
#### 1. 로그인 페이지, 사용자 API
루트 페이지(/)에서 일반 유저 로그인을 할 수 있습니다. react server에서 auth server로 request를 보내면, response로 JWT token을 받고 이를 cookie에 저장합니다.
auth server에서는 유저가 DB에 등록이 되어있다면, JWT token을 redis에 저장하여 유저가 api를 사용하기 위해서 token 검사를 할 때, MySQL 대신 redis를 확인하도록 구현하였습니다.
저장된 JWT로 사용자 페이지(/user)로 가면, 사용자의 api를 사용할 수 있습니다. 사용자의 cookie가 가진 JWT token을 header에 넣고 token server에 request를 보내어 구현하였습니다.
token server는 JWT가 redis에 있는지 확인하고 그에 따른 response를 사용자에게 보냅니다.
사용자의 API 기능에 특별한 기능을 구현하지는 못했습니다.

#### 2. 사용자 가입 페이지
사용자 회원가입 페이지(/user/register)로 가면, 사용자 회원가입을 할 수 있습니다. id, password, email을 auth server로 post하면,
auth server에서는 password를 SHA256 방식으로 암호화하여 사용자 정보를 DB(MySQL)에 저장합니다.

#### 3. 관리자 로그인 페이지, 관리자(유저 관리) API
관리자 로그인 페이지(/admin/login)에서 관리자 로그인을 할 수 있습니다. 일반 유저(User)와 관리자(Admin) table을 따로 두어 관리하였습니다.
react server에서 auth server로 request를 보내면, response로 JWT token을 받고 이를 cookie에 저장합니다.
저장된 JWT로 관리자 페이지(/admin)로 가면, 사용자의 api를 사용할 수 있습니다. 사용자의 cookie가 가진 JWT token을 header에 넣고 token server에 request를 보내어 구현하였습니다.
token server는 JWT가 redis에 있는지 확인하고 그에 따른 response를 사용자에게 보냅니다.
관리자의 JWT가 Redis에 존재한다면, api server에 사용자 리스트를 요청할 수 있습니다. JSON 형태로 온 response를 표 형태로 관리할 수 있습니다.
delete 버튼을 누르면, api server에 요청하여 DB에서 유저를 삭제할 수 있도록 하였습니다.

#### 4. 관리자 가입 페이지
사용자 회원가입 페이지(/admin/register)로 가면, 사용자 회원가입을 할 수 있습니다. id, password, email을 auth server로 post하면,
auth server에서는 password를 SHA256 방식으로 암호화하여 사용자 정보를 DB(MySQL)에 저장합니다.

- Architecture
![아키텍쳐](https://user-images.githubusercontent.com/59244452/209473008-3116c9be-0871-439b-a814-579ba401cd89.png)

### 기술 스택
#### 웹 프론트엔드 : React.js
#### 웹 백엔드 : django
#### DB : MySQL, Redis

### 코드 중 확인받고 싶은 부분
1. auth/common/view.py의 line 50 : 일반 유저와 관리자의 비밀번호가 같을 때, JWT도 같을 수 있다는 가능성을 배제하기 위해, admin : True를 payload에 추가하였는데, 괜찮은 방법이 맞나요?
2. front/src/pages/User.js의 onClickAPI 함수 : 로그인한 유저 정보를 불러오는 API를 구현하고 싶었지만, 유저 정보를 알 수 있는 방법이 없어 고민하였습니다.
같은 페이지 내에서는 React의 useState를 사용하면 되는데, 페이지가 바뀌면 어떻게 유저 정보를 알 수 있는지 궁금합니다. 상태 관리 라이브러리인 Redux를 사용해야 하나요?
제가 생각한 방법은 cookie에 본인의 정보(PK)를 저장하는 방법입니다. Redux를 사용하는 방법말고 좀 더 쉬운 방법이 있을까요?
3. front/src/pages/Admin.js의 line 58 : 유저를 Delete한 후에, 그 유저의 JWT 토큰을 redis에서 삭제해아 할까요? 아니면 그 유저가 가지고 있는 cookie를 초기화 해야 할까요? 아니면 둘 다 해야할까요?

### 개발관련 과정에서 궁금했던 부분
1. User, Admin을 다른 테이블로 관리하였는데 이로 인해 코드가 중복이 많아진 것 같습니다. 현업에서는 User와 Admin을 같은 table에서 관리하나요?
2. redis에 JWT를 저장할 때, key-value를 어떻게 설계해야 할까요? key값을 JWT로 두면, key값의 존재유무만 알면 되기 때문에 value는 의미가 없는 건가요?
