	$(function(){
		/*顶部header*/
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
	/*吸顶*/ /*返回顶部*/
	           var distance = 0;
	           var _floor = 0;
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
})				
				
				
				
				
				
	