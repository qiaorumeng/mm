$(function(){
	//存放所有的商品
	var productData = [];
	//每页的显示的行数
	var pageRows = 10;
	
	var $proList =$(".goods_deco ul");
	$.get("json/goods1.json",function(res){
		productData = res;
		//计算总页数
		var pageCount = Math.ceil(productData.length / pageRows);
		addData(1);  //显示第一页的数据   ：10条	
		$('.pages').createPage({
			pageCount:pageCount,
			current:1,
			backFn:function(page){
				addData(page);
			}
		})
	})
	function addData(page){
		var iNum = (page - 1) * pageRows;
		$(".goods_deco ul").html("");
		for(var i=0;i<pageRows;i++){
			if(!productData[iNum + i]){
				break;
			}
			$li = $("<li class='product_item'>"+
			"<div class='p_img'><a href='shopping.html'><img src='"+productData[iNum + i].imgUrl+"'/></a></div>"+
			"<div class='p_info'><div class='p_name'><a href='shopping.html'>"+productData[iNum + i].con+"</a></div><div class='p_price'>"+productData[iNum + i].price+"</div></div>"+
			"<div class='p-buy'><span>"+productData[iNum + i].more+"</span><a class='btn-buy' href='#'>"+productData[iNum + i].addcart+"</a></div></li>")
		$(".goods_deco ul").append($li);
		}
	}
})
