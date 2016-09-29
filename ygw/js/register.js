$(function(){
	/*引入公共头部*/
	$(".header").load("base.html .register-header");
	/*引入公共底部*/
	$("#bottom").load("base.html #bottom");
	/*点击切换注册方式*/
	$(".tabs li").click(function(){
		$(".tabs li").removeClass("active");
		$(this).addClass("active");
		$("form").children().css("display","none")
		$("form").children().eq($(this).index()).css("display","block");
	})
	/*手机注册验证*/
	//图形验证码验证
	yzm();
	//点击变换验证码
	
	$("#chyzm").click(function(){
		yzm();
	})
	$("#chyzm1").click(function(){
		yzm();
	})
     //手机号验证
     function end(){
     	if($("#phone").css("display")=="block"){
     	if(!$("#phone .input-phone").val()){
    		$("#phone .input-phone").nextAll("span").removeClass();
    		$("#phone .input-phone").nextAll("span").css("class","info");
    		$("#phone .input-phone").nextAll("span").addClass("pass-tip");
			$("#phone .input-phone").nextAll("span").html("<i></i>"+"手机号不能为空");
			return;
    	}else{
    		$("#phone .input-phone").nextAll("span").removeClass();
    		$("#phone .input-phone").nextAll("span").html("");
    	}
    	}else{
    		if(!$(".input-email").val()){
    		$(".input-email").nextAll("span").removeClass();
    		$(".input-email").nextAll("span").css("class","info");
    		$(".input-email").nextAll("span").addClass("pass-tip");
			$(".input-email").nextAll("span").html("<i></i>"+"邮箱不能为空");
			return;
    		}else{
    		$(".input-email").nextAll("span").removeClass();
    		$(".input-email").nextAll("span").html("");
    		}
    	}
     }
    $("#phone .input-phone").blur(phReg);
    function phReg() {
    	console.log($(this));
    end();
    if($(this).nextAll("span").text()){
    	return;
    }
    var phValue = $(this).val();
    var reg = /^[1][13578]\d{9}$/;
    var check = reg.test(phValue);
            if (check == true) {
            	var yzmValue =  $("#verficode").val();
                var yzmValue1 = $("#phone .yzm").text();
            	if(yzmValue==""){
            	$(this).nextAll("span").addClass("pass-error");
				$(this).nextAll("span").html("<i></i>"+"请输入图形验证码");
				return;
            	}
            	if(yzmValue1.toLowerCase() !=yzmValue.toLowerCase()){
            	$(this).nextAll("span").addClass("pass-error");
				$(this).nextAll("span").html("<i></i>"+"图形验证码错误");
				return;
            	}
            	if($(this).val()==$.cookie($(this).val())){
            	$(this).nextAll("span").addClass("pass-error");
				$(this).nextAll("span").html("<i></i>"+"手机号已经存在");
				return;
            	}
            		$(this).nextAll("span").addClass("pass-succ");
            		$(this).nextAll("span").html("<i></i>");
            }else{
            	$(this).nextAll("span").addClass("pass-error");
				$(this).nextAll("span").html("<i></i>"+"手机号格式不正确");
            }
    }
    //获取验证码
    $("#Phone_SendCode").click(getYzm);
    function getYzm(){
    	$(this).prev().val(random(6));
    	$(this).nextAll("span").removeClass();
    	$(this).nextAll("span").css("class","info");
    	$(this).nextAll("span").addClass("pass-succ");
    	$(this).nextAll("span").html("<i></i>");
    }
    $("#Phone_SendCode1").click(getYzm);
    $(".input-yzm").blur(function(){
    	if(!$(this).val()){
    		$(this).nextAll("span").removeClass();
    		$(this).nextAll("span").css("class","info");
    		$(this).nextAll("span").addClass("pass-tip");
			$(this).nextAll("span").html("<i></i>"+"验证码不能为空");
			return;
    	}
    })
    //设置验证密码
    $("#Phone_ConfimPassword").blur(function(){
    	if(!$("#Phone_Password").val()){
    			$(this).nextAll("span").removeClass();
    			$(this).nextAll("span").css("class","info");
    			$(this).nextAll("span").addClass("pass-tip");
				$(this).nextAll("span").html("<i></i>"+"密码不能为空");
				return;
    		}
    	if($(this).val()==$("#Phone_Password").val()){
    			var pwd = $("#Phone_Password").val().split("");
    			if(pwd.length<6){
    			$(this).nextAll("span").removeClass();
    			$(this).nextAll("span").css("class","info");
    			$(this).nextAll("span").addClass("pass-error");
				$(this).nextAll("span").html("<i></i>"+"密码不能小于6位");
    			}else{
    			$(this).nextAll("span").removeClass();
    			$(this).nextAll("span").css("class","info");
    			$(this).nextAll("span").addClass("pass-succ");	
    			$(this).nextAll("span").html("<i></i>");
    			}
    		}else{
    			var pwd = $("#Phone_Password").val().split("");
    			if(pwd.length<6){
    			$(this).nextAll("span").removeClass();
    			$(this).nextAll("span").css("class","info");
    			$(this).nextAll("span").addClass("pass-error");
				$(this).nextAll("span").html("<i></i>"+"密码不能小于6位");
    			}else{
    			$(this).nextAll("span").removeClass();
    			$(this).nextAll("span").css("class","info");
    			$(this).nextAll("span").addClass("pass-error");
				$(this).nextAll("span").html("<i></i>"+"两次密码不一致");
				}
    	}
    })
    /*邮箱登录*/
    //邮箱验证
     $(".input-email").blur(emReg);
     function emReg() {
		    end();
		    if($(this).nextAll("span").text()){
		    	return;
		    }
   		 	var reg = /^\w+@\w+(\.\w+)+$/;
    		var check = reg.test($(this).val());
            if (check == true) {
            	if($(this).val()==$.cookie($(this).val())){
            	$(this).nextAll("span").addClass("pass-error");
				$(this).nextAll("span").html("<i></i>"+"邮箱已经存在");
				return;
            	}
            		$(this).nextAll("span").addClass("pass-succ");
            		$(this).nextAll("span").html("<i></i>");
            		return;
            }else{
            	$(this).nextAll("span").addClass("pass-error");
				$(this).nextAll("span").html("<i></i>"+"邮箱格式不正确");
            }
    }
    
    //邮箱登陆手机验证
     $("#email .input-phone").blur(function () {
    	if(!$(this).val()){
    		$(this).nextAll("span").removeClass();
    		$(this).nextAll("span").css("class","info");
    		$(this).nextAll("span").addClass("pass-tip");
			$(this).nextAll("span").html("<i></i>"+"手机号不能为空");
			return;
    	}
    var phValue = $(this).val();
    var reg = /^[1][13578]\d{9}$/;
    var check = reg.test(phValue);
            if (check == true) {
            	var yzmValue =  $("#email #verficode").val();
                var yzmValue1 = $("#email .yzm").text();
            	if(yzmValue==""){
            	$(this).nextAll("span").addClass("pass-error");
				$(this).nextAll("span").html("<i></i>"+"请输入图形验证码");
				return;
            	}
            	if(yzmValue1.toLowerCase() !=yzmValue.toLowerCase()){
            	$(this).nextAll("span").addClass("pass-error");
				$(this).nextAll("span").html("<i></i>"+"图形验证码错误");
				return;
            	}
            		$(this).nextAll("span").addClass("pass-succ");
            		$(this).nextAll("span").html("<i></i>");
            }else{
            	$(this).nextAll("span").addClass("pass-error");
				$(this).nextAll("span").html("<i></i>"+"手机号格式不正确");
            }
    })

	/*注册*/
	$(".register").click(function(){
		//手机注册状态下
		if($("#phone").css("display")=="block"){
			$.proxy(phReg, $("#phone .input-phone"))();
		}else{
		//邮箱注册状态下
			$.proxy(emReg, $(".input-email"))();
		}
		if($("span").hasClass("pass-error")||$("span").hasClass("pass-tip")){
			return;
		}
		if($("#phone").css("display")=="block"){
			var tmpJSON = {
			name:$('.input-phone').val(),
			pwd:$('.input-key').val()
		};
		    var tmpStr = JSON.stringify(tmpJSON);
			$.cookie($('.input-phone').val(),tmpStr,{expires:30,path:'/'});
		}else{
		//邮箱注册状态下
		var tmpJSON = {
			name:$('.input-email').val(),
			pwd:$('.input-key').val()
		};
			var tmpStr = JSON.stringify(tmpJSON);
			$.cookie($('.input-email').val(),tmpStr,{expires:30,path:'/'});
		}
		location.href = "http://127.0.0.1:8020/ygw/register-succ.html";
	
	})































})