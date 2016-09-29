$(function(){
	 var distance = 0;
	           var _floor = 0;
				$(document).scroll(function(){
				 distance = $(document).scrollTop();
					if(distance>108){
						$(".list-nav").css("top","30px");
						$(".inTop").addClass("header_fixed");
					}else{
						$(".list-nav").css("top","108px");
						$(".inTop").removeClass("header_fixed");
					}
					if(distance>500){
						$(".sidebar .goTop").css("display","block");
					}else{
						$(".sidebar .goTop").css("display","none");
					}
				})
	/*商品详情*/
	$.get("json/goods1.json",function(res){
		for(var i=0;i<res.length;i++){
			$li = $("<li class='product_item'>"+
			"<div class='p_img'><a href='shopping.html'><img src='"+res[i].imgUrl+"'/></a></div>"+
			"<div class='p_info'><div class='p_name'><a href='shopping.html'>"+res[i].con+"</a></div><div class='p_price'>"+res[i].price+"</div></div>"+
			"<div class='p-buy'><span>"+res[i].more+"</span><a class='btn-buy' href='#'>"+res[i].addcart+"</a></div></li>")
		$(".goods_deco ul").append($li);
		}
		$(".goods_deco ul").on("mouseenter","li",function(){
		$(this).find(".p-buy").css("display","block");
	})
		$(".goods_deco ul").on("mouseleave","li",function(){
		$(this).find(".p-buy").css("display","none");
	})
	})
	/*添加到cookie*/
	$("body").on("click",".btn-buy",addCookie);
	function addCookie(){
		var index = $(this).parent().parent().index();
		$.get("json/add-cart.json",function(res){
			con = res[index];
		if($.cookie(con.con)){
		var tmpVal = $.cookie(con.con);
		var tmpJSON = JSON.parse(tmpVal);
		con.num = parseInt(tmpJSON.num)+1 ;
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
			}else{
				return;
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
	
	
	var timer = null;
	/*移入显示购物车商品*/
	$(".shopping-cart").hover(function(){
		$(this).find(".shopping-list").css("display","block");
		if($(".shopping-btn .totleNum b").html()){
			$(".nogoods").css("display","none");
			$(".goods").css("display","block");
		}else{
			$(".nogoods").css("display","block");
		}
	},
	function(){
		timer = setTimeout(function(){
		$(".shopping-cart").find(".shopping-list").css("display","none");
		},1000)
	})
	$(".shopping-list").hover(function(){
		clearTimeout(timer);
	})
})
