$(function(){
	
	$(".imgShow span").mouseenter(function(){
		$(".imgShow span img").removeClass("active");
		$(this).children().addClass("active");
			$(".imgShow h2").html("");
			var value =  $(this).html();
			$(".imgShow h2").html(value);
			$(".imgShow h2 img").stop().fadeIn(1000);
	})
	/*猜你喜欢*/
	$.get("json/like.json",function(res){
		for(var i=0;i<res.length;i++){
			$div = $("<div class='p'>"+
			"<div class='img'><a href='#'><img src='"+res[i].imgUrl+"'/></a></div>"+
			"<div class='txt'><a href='#'><strong>"+res[i].con+"</strong></a><span>"+res[i].price+"</span></div>"+
			"<a class='add' href='#'>"+res[i].addcart+"</a></div>")
		$(".left-con .likecon").append($div);
		}
		$(".left-con .likecon").on("mouseenter",".p",function(){
		$(this).find(".add").css("display","block");
	})
		$(".left-con .likecon").on("mouseleave",".p",function(){
		$(this).find(".add").css("display","none");
	})
	})
	/*最近浏览*/
	$.get("json/recent.json",function(res){
		for(var i=0;i<res.length;i++){
			$div = $("<div class='p'>"+
			"<div class='img'><a href='#'><img src='"+res[i].imgUrl+"'/></a></div>"+
			"<div class='txt'><a href='#'><strong>"+res[i].con+"</strong></a></div>")
		$(".left-con .recentcon").append($div);
		}
	})
	/*当季热卖*/
	$.get("json/goods1.json",function(res){
		for(var i=0;i<5;i++){
			$li = $("<li>"+
			"<div class='img'><a href='#'><img src='"+res[i].imgUrl+"'/></a></div>"+
			"<div class='txt'><a href='#'>"+res[i].con+"</a></div>"+
			"<div class='price'><strong>"+res[i].price+"</strong><span>"+res[i].del+"</span></div></li>")
		$(".right-top ul").append($li);
		}
	})
	/*吸顶*/
				var distance = 0;
				$(document).scroll(function(){
				 distance = $(document).scrollTop();
					if(distance>1100){
						$(".decTop").addClass("decTop-fixed");
					}else{
						$(".decTop").removeClass("decTop-fixed");
					}
				})
	/*送货时间改变*/
	$(".time").text(preTime(1));
	/*数目加减*/
	$(".operation .decrease").click(function(){
		var i = $(this).next().val();
		if(i>1){
			i--;
			$(this).css("disabled","");
		}else{
			$(this).css("disabled","disabled");
		}
		$(this).next().val(i);
	})
	$(".operation .increase").click(function(){
		var i = $(this).prev().val();
		i++;
		$(this).prev().val(i);
	})
	/*添加到cookie和购物车*/
	$(".btn-gn").click(addCookie);
	function addCookie( ){
		$.get("json/add-cart.json",function(res){
			for(var j= 0;j<res.length;j++){
				if(res[j].con==$(".imgCon h2").text()){
				   var	index = j;
				}
			}
		var con = res[index];
		if($.cookie(con.con)){
		var tmpVal = $.cookie(con.con);
		var tmpJSON = JSON.parse(tmpVal);
		con.num = parseInt(tmpJSON.num)+parseInt($(".number").val()) ;
		}
		var tmpJSON = {
			name : con.con,
			img  : con.imgUrl,
			price : con.price,
			num :  con.num,
			spec : con.spec
		};
		var tmpStr = JSON.stringify(tmpJSON);
		$.cookie(con.con,tmpStr,{expires:30,path:'/'});
		cookieShow();
		})
	}
	/*cookie取值并显示*/
	cookieShow();
	function cookieShow(){
	var arr=[];
	$(".totleNum b").html(0);
	$(".totlePrice").html(0);
	$(".goods ul").html("");
		for(var i in $.cookie()){
			if(i){
				addc(i);
			}
	}
	function addc(val){
		var tmpVal = $.cookie(val);
		var tmpJSON = JSON.parse(tmpVal);
		var valu1 = parseInt($(".totleNum b").html())+parseInt(tmpJSON.num);
		var valu2 = parseInt($(".totlePrice").html())+parseInt(tmpJSON.price)*parseInt(tmpJSON.num);
		$(".totleNum b").html(valu1);
		$(".totlePrice").html(valu2);
		$li = $("<li><div class='l'><a href=''><img src='"+tmpJSON.img+"'/></a></div>"+
		"<div class='c'><a href=''>"+tmpJSON.name+"</a></div>"+
		"<div class='r'><b>"+"￥"+tmpJSON.price+"</b>"+"*"+tmpJSON.num+"<a href=''>"+"删除"+"</a></div></li>");
		$(".goods ul").append($li);
	
	}
	}
})
