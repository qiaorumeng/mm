$(function(){
	/*引入公共头部*/
	$(".header").load("base.html .login-header");
	/*引入公共底部*/
	$("#bottom").load("base.html #bottom");
	/*验证码*/
	yzm();
	//点击变换验证码
	$("#chyzm").click(function(){
		yzm();
	})
	$(".enter").click(code);
	function code(){
		var yzmValue =  $("#VerifyCode").val();
	    var yzmValue1 = $(".yzm").text();
	    yzm();
	    if(yzmValue==""||yzmValue.toLowerCase()!=yzmValue1.toLowerCase()){
	    $("#error-msg").show();
	    $("#error-msg").children().addClass("msg-error");
	    $("#error-msg").children().text("请输入正确的验证码");
	    return;
       }
	    if(yzmValue==yzmValue1){
	    	if(!$(".input-phone").val()){
	    	$("#error-msg").show();
	    	$("#error-msg").children().addClass("msg-error");
	    	$("#error-msg").children().text("登录名不能为空");
	    	return;
	    	}
	    	if(!$("#input-key").val()){
	    	$("#error-msg").show();
	    	$("#error-msg").children().addClass("msg-error");
	    	$("#error-msg").children().text("密码不能为空");
	    	return;
	    	}
	    }
	    var valu = $(".input-phone").val();
	    var tmpval = $.cookie(valu);
	    if(tmpval){
	    	var tmpJSON = JSON.parse(tmpval);
	    }
		if(!tmpval||(tmpJSON.pwd !=$("#input-key").val())){
			$("#error-msg").show();
	    	$("#error-msg").children().addClass("msg-error");
	    	$("#error-msg").children().text("密码不正确");
	    	$("#input-key").val("");
		}else{
			$("#error-msg").hide();
			if($(".input-choose:checked")){
				$.cookie("login",$(".input-phone").val(),{expires:7,path:'/'})
			}else{
				$.cookie("login",$(".input-phone").val(),{path:'/'})
			}
			location.href="http://127.0.0.1:8020/ygw/index.html";
				
		}
	
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})
