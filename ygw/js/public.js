$(function(){
	/*搜索框*/
			$(".search-input").keydown(function(){
				$(".keyword").css("display","block");
				$(".keyword").html("");
				var keyword = $(this).val();
				 $.getJSON(
                    "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+keyword+"&cb=?",
                    function(data) {
                    for(var i= 0;i<data.s.length;i++){
                    $p = $("<p>"+data.s[i]+"</p>");
                    $(".keyword").append($p);
                    }
			})
	})
			/*搜索*/
			$(".search-btn").click(function(){
				$(".keyword").css("display","none");
			})
			/*登录显示用户*/
			if($.cookie("login")){
				$("#_logout").show();
				$("#_loginname").show();
				$("#_login").hide();
				$("#_register").hide();
				$("#_loginname a").text($.cookie("login"));
			}else{
				$("#_logout").hide();
				$("#_loginname").hide();
				$("#_login").show();
				$("#_register").show();
			}
		$("#_logout .logout").click(function(){
			$.cookie("login",null,{expires:-1,path:'/'});
			$("#_login").show();
			$("#_register").show();
			$("#_logout").hide();
			$("#_loginname").hide();
			
		})
	
})
