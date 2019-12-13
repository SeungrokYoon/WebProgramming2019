var isCheckedId=false;
var isChecekdPwd=false;
var isConfirmedPwd=false;
function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( $email );
  }
//   if( !validateEmail(emailaddress)) { /* do stuff here */ }
// $('#login_id').change(function(){
//     console.log($('#login_id').value());
// });>>실시간이 안됨 
// $('#login_id').keypress(function(){
//     console.log($('#login_id').value());
// });//뒤에꺼 하나씩 빼먹음 마지막 이벤트를 뺴먹음 
//숙제:
//1)패스워드 일치 문제 해결하기. login_pwd, confirm_pwd 실시간으로 체크
//2)email 형식 맞는지 체크하기 

$('#login_id').keyup(function(){//키 눌린게 떼지면
    console.log("keyup RESET");
    if(isCheckedId){
        isCheckedId =false;
    }
});

//백그라운드에서 페이지 변환없이 서버와 통신 
$('#btn_check_id').on('click', function() { 
    if ($('#login_id').val().length <5){
        console.log('5자 이상쓰기');//브라우저에 찍히는 로그 
        alert('5자 이상 쓰세요')
    }else{
        $.ajax({
            url:'/login/checkid?login_id='+$('#login_id').val(),
            method:'GET',
            //여기서는 get방식으로 보내서 따론 json 파싱 안했음
            success:function(data){
                console.log("ajax success");
                if(data=='OK'){
                    isCheckedId=true;
                    $('#message').text('id사용가능');
                }else if(data =='Duplicated'){
                    isCheckedId=false;
                    $('#message').text('id 중복, 사용불가');
                }else {
                    isCheckedId=false;
                    $('#message').text('error발생, 재시도...');
                }
            },
            error:function(err){
                isCheckedId=false;
                $('#message').text('Error...');
            }
        });
    }
});

//1)패스워드 일치 문제 해결하기. login_pwd, confirm_pwd 실시간으로 체크 아직 해결안됨
$('#login_pwd').keyup(function(){//키 눌린게 떼지면 값이 없으면 값넣으라고 메시지
    console.log("login_pwd_keyup RESET");
    if( $('#login_pwd').val().length==0 ){
        alert("Password 입력하세욧!")
        isCheckedPwd=false;
    }else{
        isChecekdPwd =true;
        }
});

$('#confirm_pwd').keyup(function(){//키 눌린게 떼지면 위에 비밀번호와 일치여부확인 
    console.log("confirm_pwd_keyup RESET");
    var confirm_pwd = $('#confirm_pwd').val();
    if(isChecekdPwd){
        isCheckedId =false;
        isConfirmedPwd=false;
    }
    console.log('여기는signup.js & keyup'+ confirm_pwd);
});


$('#btn_signup').on('click', function() {
    //2부 수업 시작 부분
    if (!isCheckedId){
        alert('ID체크해!~');
        return;
    }
    if($('#user_name').val().length < 3){
        alert('이름이 짧아~');
        return 
    }
    if($('#login_pwd').val()!=$('#confirm_pwd').val()){
        alert('비밀번호 달라~');
        return;
    }
    //이메일도 체크하고 뭣도하고뭣도하구 입력한 값 다 체크하기~~~~!!! 
    //비밀번호도 포함되어있어서 get방식으로 보내면 안돼~ 
    //그래서 post 로 보내야됨 . ㅇㅈ?ㅇㅇㅈ
    $.ajax({
        url:'/login/create',
        method:'POST',
        dataType:'json',
        contentType:'application/json',
        data: JSON.stringify({
            'user_name':$('#user_name').val(),
            'login_id':$('#login_id').val(),
            'login_pwd':$('#login_pwd').val(),
            'email':$('#email').val()
            //이런식으로 JSON형태로 호스트에게 전송한다. 이게 전송이 되면 route 의 login.js의 /create가 실행이 되면서 db에 쿼리를 전송하게 됨
        }),
        success: function(data){
            if(data.status =='OK'){
                console.log("가입성공");
                window.location.replace('/board/list');//javascript에서 화면 바꿔줄때는 windsow.location.replace를 쓴다. 
            }else{//data.status =="ERROR" 인 경우 
                $('#message').text('error발생1, 재시도..'); // 이 에러는 HTTP 프로토콜 실패~네트워크 상황(서버든 클라이언트든) 이기때문에, 재시도를 해보는 것으로 메시지를 전달한다. 이제 서버쪽에 login.js 로 넘어가자. 
            }
            //성공을 하면 다른 페이지로 넘어가야 하니까 우리 입장에서는 게시판의 메인 목록 페이지로 넘겨주는 게 좋겠다. 지금 우리는 클라이언트사이드에서 진행중임. 
        },
        error: function(err){
            $('#message').text('error발생2, 재시도..'); // 이 에러는 HTTP 프로토콜 실패~네트워크 상황(서버든 클라이언트든) 이기때문에, 재시도를 해보는 것으로 메시지를 전달한다. 이제 서버쪽에 login.js 로 넘어가자. 
        }
    });
});