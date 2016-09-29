$(function(){
	/*引入尾部*/
	$("#foot").load("base.html #bottom");
	/*超值换购*/
	$.get("json/goods1.json",function(res){
		for(var i=0;i<7;i++){
			$li = $("<li class='product'>"+
			"<div class='p-img'><a href='#'><img src='"+res[i].imgUrl+"'/></a></div>"+
			"<div class='p-info'><a href='#'>"+res[i].con+"</a></div>"+
			"<div class='p-price'><strong>"+res[i].price+"</strong><span>"+res[i].del+"</span></div>"+
			"<div class='p-hg'><a href=''>"+res[i].hg+"</a></div></li>")
			$(".change ul").append($li);
		}
	})
	
	$(".cartlist .city-tit").hover(function(){
		$(this).children(".city-con").css("display","block");
		},
		function(){
			$(this).children(".city-con").css("display","none");
	});
	/*送货城市列表*/
	$.get("json/city-con.json",function(res){
			var arr=["A","B","C","D","F","G","H","J","K","L","M","N","Q","R","S","T","W","X","Y","Z"];
			$(".cartlist .citytab span").mouseenter(function(){
				$(".cartlist .citylist").html("");	
			$(this).addClass("active").siblings().removeClass("active");
			var index=$(this).index();
			for(var i= index*4;i<(index+1)*4;i++){
				$dl=$("<dl><dt>"+arr[i]+"<dt><dd></dd></dl>");
			for(var j = 0;j<res[index][arr[i]].length;j++ ){
				$a = $("<a href='javascript:void(0);'>"+res[index][arr[i]][j]+"</a>");
				var arr1 = ["上海","北京","天津","南京市","苏州市","无锡市","杭州市","宁波市"];
				for(var k=0;k<arr1.length;k++){
					if(arr[k]==res[index][arr[i]][j]){
					$a.css({color :"#008842",
					fontWeight	: "bolder"
					});
				}
				}
				
				$dl.find("dd").append($a);
			}
			$(".cartlist .citylist").append($dl);
			}
			})
		})
	/*我的购物车*/
	$(window).on("load", function () {
		cookieShow();
	})
	
	function cookieShow(){
		var arr=[];
		$(".totalnum span").html(0);
		$(".cart-con").html("");
		console.log($.cookie());
		
		var isShow = true;
		
		for(var i in $.cookie()){
			addc(i);	
			isShow = false;
		}
		
		if(isShow) {// 没有商品
			$('.cartlist .listshow').css("display","none");
			$(".change").css("display","none");
			$('.cartlist .cart-none').css("display","block");	
		}
	}
	
	function addc(val){
		var tmpVal = $.cookie(val);
		var tmpJSON = JSON.parse(tmpVal);
		var valu2 = parseInt($(".totalnum span").html())+parseInt(tmpJSON.price)*parseInt(tmpJSON.num);
		$(".totalnum span").html(valu2);
		$ul = $("<ul>"+
		"<li class='cart-t-check'><label><input type='checkbox' checked='checked' ></label></li>"+
		"<li class='cart-t-img'><a href='shopping.html'><img src='"+tmpJSON.img+"'/></a></li>"+
		"<li class='cart-t-info'><a href='shopping.html'>"+tmpJSON.name+"</a></li>"+
		"<li class='cart-t-ub' style='width:75px;'></li>"+
		"<li class='cart-t-price'>"+"￥"+tmpJSON.price+"</li>"+
		"<li class='cart-t-num'><button class='decrease'>"+"-"+"</button><input type='text' value=''/><button class='increase'>"+"+"+"</button></li>"+
		"<li class='cart-t-total'>"+"￥"+tmpJSON.price*tmpJSON.num+"</li>"+
		"<li class='cart-t-spec'>"+tmpJSON.spec+"</li>"+
		"<li class='cart-t-opera'><a href=''>"+"移入收藏"+"</a><a href='' class='del'>"+"删除"+"</a></li></ul>");
		$ul.find(".cart-t-num input").val(tmpJSON.num);
		$(".cart-con").append($ul);
	
	}
	
	/*数量加减*/
	$(".cart-con").on("click",".cart-t-num .decrease",function(){
		var i = $(this).next().val();
		if(i>1){
			i--;
			$(this).css("disabled","");
			$(this).next().val(i);
			var cookieVal = $(this).parent().siblings(".cart-t-info").eq(0).text();
			var tmpstr = $.cookie(cookieVal);
			var tmpJSON = JSON.parse(tmpstr);
			tmpJSON.num = parseInt(tmpJSON.num)-1;
			tmpStr = JSON.stringify(tmpJSON);
			$.cookie(cookieVal,tmpStr,{expires:30,path:'/'});
			cookieShow();
		}else{
			$(this).css("disabled","disabled");
		}
	});
	
	$(".cart-con").on("click",".cart-t-num .increase",function(){
		var i = $(this).prev().val();
		i++;
		$(this).prev().val(i);
		var cookieVal = $(this).parent().siblings(".cart-t-info").eq(0).text();
		var tmpstr = $.cookie(cookieVal);
		var tmpJSON = JSON.parse(tmpstr);
		tmpJSON.num = parseInt(tmpJSON.num)+1;
		tmpStr = JSON.stringify(tmpJSON);
		$.cookie(cookieVal,tmpStr,{expires:30,path:'/'});
		cookieShow();
	});
	
	/*商品单个删除*/
	$(".cart-con").on("click",".cart-t-opera .del",function(){
		var cookieVal = $(this).parent().siblings(".cart-t-info").eq(0).text();
		$.cookie(cookieVal,null,{expires:-1,path:'/'});
		cookieShow();
	});
	
	/*删除选中商品*/
	$(".cart-footer .delgoods").click(function(){
		var dels = $(".cart-con .cart-t-check input:checked");
		for(var i= 0;i<dels.length;i++){
			dels =$(".cart-con .cart-t-check input:checked").eq(i).parent().parent().siblings(".cart-t-info").eq(0).text();
			$.cookie(dels,null,{expires:-1,path:'/'});
		}
		cookieShow();
	});
	
	/*清空购物车*/
	$(".cart-footer .empty").click(function(){
		
		var cookieVal = $(".cart-con").find(".cart-t-info");
		for(var i= 0;i<cookieVal.length;i++){
			cookieVal = $(".cart-con").find(".cart-t-info").eq(i).text();
			$.cookie(cookieVal,null,{expires:-1,path:'/'});
		}
		
		$('.cartlist .listshow').css("display","none");
		$(".change").css("display","none");
		$('.cartlist .cart-none').css("display","block");
		
	})
})
