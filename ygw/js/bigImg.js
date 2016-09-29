$(function(){
	/*放大镜*/
	scale = 5;
	$(".imgShow h2").hover(function(ev){
		$div = $("<div class='block'></div>");
		$div1 = $("<div class='big'>"+$(this).html()+"</div>");
		$(".imgShow h2").append($div);
		$(".imgShow").append($div1);
		},
	function(){
		$("div").remove(".block");
		$("div").remove(".big");
	})
		$(".imgShow h2").on("mousemove",function(ev){
		var left = ev.clientX - $(this).offset().left - parseInt($(".block").width())/2-$("body").scrollTop();
        var top = ev.clientY - $(this).offset().top - parseInt($(".block").height())/2-$("body").scrollTop();
		var left1 = ev.clientX - $(this).offset().left;
        var top1 = ev.clientY - $(this).offset().top;
		/*边缘问题*/
		if(left<= 0){
            left=0;
        }
        if(left >= parseInt($(this).width()) - parseInt($(".block").width())){
        left = parseInt($(this).width()) - parseInt($(".block").width());
   		 }
        if(top<= 0){
            top=0;
        }
        if(top >= parseInt($(this).height()) - parseInt($(".block").height())){
            top = parseInt($(this).height()) - parseInt($(".block").height());
        }
        $(".block").css("left",left+"px");
		$(".block").css("top",top+"px");
		$(".big").css("left",left1+5+"px");
		$(".big").css("top",top1+5+"px");
		$(".big img").css("left",-left*scale+"px");
		$(".big img").css("top",-top*scale+"px");
		console.log( $(".block").width());
		})
	
})