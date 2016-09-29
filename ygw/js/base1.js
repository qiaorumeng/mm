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
})
