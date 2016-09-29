	$(function(){	
		$(".footer_service").load("base.html .footer_service");
    	/*引入公共底部*/
	    $("#bottom").load("base.html #footer");
	/*顶部header*/
	console.log($("li:has('s')"));
	$("li:has('s')").hover(function(){
        $(this).addClass("current");
        $(this).children(".con").css("display","block");
        $(this).children(".con").children().css("display","block");
        },
        function(){
         $(this).removeClass("current"); 
         $(this).children(".con").css("display","none");
         $(this).children(".con").children().css("display","none");
        })
	/*返回顶部*/
	           var distance = 0;
	           var _floor = 0;
				$(document).scroll(function(){
				 distance = $(document).scrollTop();
					if(distance>500){
						$(".sidebar .goTop").css("display","block");
					}else{
						$(".sidebar .goTop").css("display","none");
					}
				})
		/*返回顶部*/
		$(".sidebar .goTop").click(show3);
				function show3(){
					$("body").stop().animate({
						scrollTop:  0
				},600)	
			};
		/*送货城市列表*/
		 $.get("json/city-con.json",function(res){
			var arr=["A","B","C","D","F","G","H","J","K","L","M","N","Q","R","S","T","W","X","Y","Z"];
			$(".citytab span").mouseenter(function(){
				$(".citylist").html("");	
			$(this).addClass("active").siblings().removeClass("active");
			var index=$(this).index();
			for(var i= index*4;i<(index+1)*4;i++){
				$dl=$("<dl><dt>"+arr[i]+"<dt><dd></dd></dl>");
			for(var j = 0;j<res[index][arr[i]].length;j++ ){
				$a = $("<a href='javascript:void(0);'>"+res[index][arr[i]][j]+"</a>")
				
				var arr1 = $(".city-hot a");
				for(var k=0;k<arr1.length;k++){
					if($(".city-hot a").eq(k).html()==res[index][arr[i]][j]){
					$a.css({color :"#008842",
					fontWeight	: "bolder"
					});
				}
				}
				
				$dl.find("dd").append($a);
			}
			$(".citylist").append($dl);
			}
			})
		})
		 $.get("json/hotCity-con.json",function(res){
		 	$(".city-hot a").click(function(){
		 		$(".city-hot-tab").css("display","block");
		 		$(".city-hot-tab  a").text("");
		 		var index=$(this).index()-1;
		 		var con = $(".city-hot a").eq(index).text();
		 		for(var i = 0;i<res[index][con].length;i++){
		 			$a = $("<a href='javascript:void(0);'>"+res[index][con][i]+"</a>");
		 			$(".citylist-tab").append($a);
		 		}
		 	})
		})		
				
		/*商品列表*/
	$.get("json/list-con.json",function(res){
	for(var i=0;i<res.length;i++){
		var $li =$("<li><a href='goods1.html'><i></i>"+res[i].name+"<s>"+">"+"</s></a><div></div></li>");
		$li.find("i").css("background-position",-i*24+"px "+"0")
		$(".catalogs-list").append($li);
	}		
	$(".catalogs-list li").hover(function(){
		var i = $(this).index();
		$(this).addClass("current").siblings().removeClass("current");
		$(".catalogs-list li").children("div").html("");
		$(".catalogs-list li").children("div").removeClass("list-con");
		$(this).children("div").show();
		$(this).children("div").addClass("list-con");
		$h = "<h4><a href='goods1.html'>"+res[i].name+"</a></h4>";
		$(this).children("div").append($h);
		for(var j=0;j<res[i].con.length;j++){
			$a = $("<a href='shopping.html'>"+res[i].con[j]+"</a>");
			$(this).children("div").append($a);
		}
		$img = "<img src='"+res[i].bgUrl+"'/>"
		$(this).children("div").append($img);
		},
		function(){
			$(this).children("div").hide();
			$(this).removeClass("current")
		})
	$(".catalogs-title").click(function(){
		$(this).siblings().toggle();
	})
	})						
	/*吸顶*/  /*显示楼层*/  /*返回顶部*/
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
					if(distance>700){
						$(".floor-guide").css("display","block");
					}else{
						$(".floor-guide").css("display","none");
					}
					 _floor =parseInt((distance-600)/500);
					$(".floor-guide li").eq(_floor).addClass("active").siblings().removeClass("active");
					$(".floor-guide li").children("em").css("display","none");
					$(".floor-guide li").children("b").css("display","block");
					$(".floor-guide li").eq(_floor).children("em").css("display","block");
					$(".floor-guide li").eq(_floor).children("b").css("display","none");
				
					if(distance>500){
						$(".sidebar .goTop").css("display","block");
					}else{
						$(".sidebar .goTop").css("display","none");
					}
				})
	/*轮播图*/
				//自动播放
				var timer = null;
				var _index =0;
				function autoGo(){
					timer = setInterval(function(){
						move();
					},3000)
				}
				//运动函数
				function move(direction){
					if(direction == "left"){
						_index--;
						if(_index == -1){
						_index = 4;
					}
					starmove();
					}else{
					_index ++;
					if(_index == 5){
						_index = 0;
					}
					starmove();
					}
		           pageChange();
				 }
				function starmove(){
					$(".content li").eq(_index).css("display","block");	
					$(".content li .img").eq(_index).stop().animate({
						width: "100%",
						left : "0px",
						top:"0px",
						height:"500px"
					},2*1000)
					$(".content li .word").eq(_index).stop().fadeIn(3000).parent().siblings().children(".word").fadeOut(10);
					$(".content li .img").eq(_index).parent().siblings().children(".img").css({
						width:"1389px",
						left : "-63px",
						top : "-25px",
						height:"550px",
						display:"none"
					})
				}
				autoGo();
				//下部页码
				function pageChange(){
					$("#page span").removeClass();
					$("#page span").eq(_index).addClass("active");
				}
				//点击页码
				$("#page span").click(function(){
					_index = $(this).index()-1;
					move();
					$(".con").children().css("display","block");
				})
				$("#page span").mouseenter(function(){
					_index = $(this).index()-1;
					$("#banner .con").children().css("display","block");
					move();
				})
				//移入显示左右图标
				$(".con").hover(function(){
					$(this).children().css("display","none");
					$(this).children().toggle();
					clearInterval(timer);
					$(".l22").click(function(){
						move("left");
					})
					$(".r22").click(function(){
						move();
					})
					},
					function(){
						$(this).children().css("display","none");
						 autoGo();
					}
				)
	/*楼层广告*/
	$.get("json/floor-con.json",function(res){
		/*引入楼层*/
		for(var i=0;i<res.length;i++){
		var $div = $("<div class='floor'><div>");
		var $div1 = $("<div class='floor-title'><h2><a href=''><i>"+"F"+(i+1)+"</i>"+res[i].name+"</a></h2><span></span></div>");
		$div1.find("i").css("background-position",-i*46+"px "+"0");
		$div1.find("a").css("color",res[i].color);
		/*引入关键字*/
		for(var j=0;j<res[i].spanCon.length;j++){
			$a = $("<a href=''>"+res[i].spanCon[j]+"</a>");
			$div1.find("span").append($a);
		}
		$div.append($div1);
		$div21 = $("<div class='floor-left'><a href=''><img src='"+res[i].left+"'/></a></div>")
		/*引入图片*/
		if(i<4){
			var $div2 = $("<div class='floor-layout1'><div>");
			$div22 = $("<div class='floor-right'><ul></ul></div>");
		for(var k=0;k<res[i].right.length;k++){
			if(k==2||k==3){
			$li = $("<li class='wide'><a href='shopping.html'><img src='"+res[i].right[k]+"'/></a></li>");	
			}else{
			$li = $("<li class='narrow'><a href='shopping.html'><img src='"+res[i].right[k]+"'/></a></li>");	
			}
			$div22.find("ul").append($li);
		}
		$div2.append($div21);
		$div2.append($div22);
		$div.append($div2);
		$("#floor").append($div);
		}else{
	    $div2 = $("<div class='floor-layout2'><div>");
		$div22 = $("<div class='floor-right'><div class='col1'></div><div class='col2'><ul></ul></div><div class='col3'></div><div class='logo-list'></div></div>");
		$a1=$("<a href='shopping.html'><img src='"+res[i].right1+"'/></a>");
		$div22.find(".col1").append($a1);
		$a2=$("<a href='shopping.html'><img src='"+res[i].right3+"'/></a>");
		$div22.find(".col3").append($a2);
			for(var j=0;j<res[i].right2.length;j++){
				if(i==6||i==8){
			$li = $("<li class='wide'><a href='shopping.html'><img src='"+res[i].right2[j]+"'/></a></li>");
			$div22.find("ul").append($li);
			}else{
			$li = $("<li class='narrow'><a href='shopping.html'><img src='"+res[i].right2[j]+"'/></a></li>");	
			$div22.find("ul").append($li);
			}
			}
		for(var k=0;k<res[i].right4.length;k++){
			$a3 = $("<a href='shopping.html'><img src='"+res[i].right4[k]+"'/></a>");
			$div22.find(".logo-list").append($a3);
		}
		$div2.append($div21);
		$div2.append($div22);
		$div.append($div2);
		$("#floor").append($div);
		}
		}
		})
	/*楼层引导*/
	$(".floor-guide").on("mouseenter","li",show1)
				function show1(){
					var _index = $(this).index();
					$(this).addClass("active");
					$(this).children("em").css("display","block");
					$(this).children("b").css("display","none");
					
				}
				$(".floor-guide").on("mouseleave","li",show2)
				function show2(){
					$(".floor-guide li").removeClass("active");
					$(".floor-guide li em").css("display","none");
					$(".floor-guide li b").css("display","block");
					$(".floor-guide li").eq(_floor).addClass("active");
					$(".floor-guide li").eq(_floor).children("em").css("display","block");
					$(".floor-guide li").eq(_floor).children("b").css("display","none");
				}
				$(".floor-guide").on("click","li",show3);
				function show3(){
					var _index = $(this).index();
					$("body").stop().animate({
						scrollTop: 600+(_index*500)
				},600)	
			};	
			
})