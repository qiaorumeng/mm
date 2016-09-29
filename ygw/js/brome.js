$(function(){
		/*引入公共底部*/
	    $("#bottom").load("base.html #footer");			
		/*商品列表*/
		$(".catalogs-title").siblings().css("display","none");	
	$.get("json/list-con.json",function(res){
		for(var i=0;i<res.length;i++){
		var $li =$("<li><a href='#'><i></i>"+res[i].name+"<s>"+">"+"</s></a><div></div></li>");
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
		$h = "<h4><a href='#'>"+res[i].name+"</a></h4>";
		$(this).children("div").append($h);
		for(var j=0;j<res[i].con.length;j++){
			$a = $("<a href=''>"+res[i].con[j]+"</a>");
			$(this).children("div").append($a);
		}
		$img = "<img src='"+res[i].bgUrl+"'/>"
		$(this).children("div").append($img);
		},
		function(){
			$(this).children("div").hide();
			$(this).removeClass("current")
		})
	})
	$(".catalogs-title").hover(function(){
		$(".catalogs-title").siblings().css("display","block");	
	},
	function(){
		$(".catalogs-title").siblings().css("display","none");	
	})
})
