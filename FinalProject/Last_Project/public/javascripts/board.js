//로그아웃
$('#btn_logout').on('click',function(){

    window.location.replace("/login/logout");
});
//새글작성시작버튼
$('#btn_board_new').on('click', function() {
    window.location.replace("/board/register");
});
//새글작성하고 등록(DB에 저장하는)하는 작업
$('#btn_board_register').on('click', function() {
    // window.location.replace("/board/register");
    //board.ejs에서 src로 등록했으니 boardList.ejs의 태그들을 불러와서 사용할 수 있음.  
    //ajax는 웹 브라우저 내 백그라운드로 돌아감 
    $.ajax({
        //routes/board.js 의 /register/process로 들어간다. 
        //글이 등록이 되는 일련의 작업들은 다 routes/board.js의 /register/process에서 시행이되니까
        //쿼리도 다 거기서 처리하는거임. 
        url:'/board/register/process',
        method: 'POST',
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify({
                        'board_title':$('#board_content').val(),
                        'board_content':$('#board_content').val()}),
            success:function(data){
                if(data.status=='OK'){
                    alert('새로운 글 등록 완료!');
                    window.location.replace('/board/list');
                }else{
                    alert('저장에 실패, 다시시도1');
                }
            },
            error:function(err){
                alert('저장에 실패, 다시 시도2');
            }
    });
});

$('#btn_board_list').on('click', function() {
    window.location.replace("/board/list");
});

// //수정확인버튼
// $('#btn_board_update').on('click', function() { 
//     $.ajax({
//         url:'/board/update/process',
//         method: 'POST',
//         dataType:'json',
//         contentType:'application/json',
//         data:JSON.stringify({
//                         'board_title':$('#board_content').val(),
//                         'board_content':$('#board_content').val()}),
//             success:function(data){
//                 if(data.status=='OK'){
//                     alert('새로운 글 등록 완료!');
//                     window.location.replace('/board/list');
//                 }else{
//                     alert('저장에 실패, 다시시도1');
//                 }
//             },
//             error:function(err){
//                 alert('저장에 실패, 다시 시도2');
//             }
//     });


//     window.location.replace("/board/list");
// });

$('#btn_board_delete').on('click', function() {
    window.location.replace("/board/list");
});//search도 구현하기 