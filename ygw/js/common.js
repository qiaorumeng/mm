/*验证码---字母数字集合*/
 function random (num){
        var arr=[];
        for(var i = 0;i<62;i++){
        	if(i < 10){
				 arr.push(i);       		
        	}else if(i<36){
        		arr.push(String.fromCharCode(i+55));
        	}else{
        		arr.push(String.fromCharCode(i+61));
        	} 
        }
        var str="";
        for(var j=0;j<num;j++){
        	if(num==6){
        		if(j==0){
        		str+=arr[Math.floor(Math.random()*9)+1];		
        		}else{
        		str+=arr[Math.floor(Math.random()*10)];		
        		}
        	}else{
        	str+=arr[Math.floor(Math.random()*arr.length)];	
        	}
        }
        return str;
    }
 function yzm(){
		$(".yzm").css("color",getColor());
	    $(".yzm").text(random(4));
	}
 /*随机颜色*/
 function getColor(){
    var R = Math.floor(Math.random()*255).toString(16);
    var G = Math.floor(Math.random()*255).toString(16);
    var B = Math.floor(Math.random()*255).toString(16);
    var r = R.length < 2 ? "0" + R : R;
    var g = G.length < 2 ? "0" + G : G;
    var b = B.length < 2 ? "0" + B : B;
    var RGB = "#" + r + g + b;
    return RGB;
}
 //n天后的时间    月-日
function  preTime(n) {
    var today = new Date();
    var begindate = today.getTime();
    var enddate = begindate + (n * 24 * 60 * 60 * 1000);
    var predate = today.setTime(enddate);
    var predate = new Date(predate);
    var mon = predate.getMonth() + 1;
    var dd = predate.getDate();
    return  "(" +mon + "月" + dd + "日 )";
}