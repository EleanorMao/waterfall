+(function($){
	var defOption={
		width:350,
		maR:10,
		maB:10,
		padding:10,
		$this:null,
		$eleNum:null,
		$child:null
	}
	var recalc=function(option){
		var $this=option.$this,$eleNum=option.$eleNum,$child=option.$child
		var $width=$this.parent().width()-(option.padding*2)
		var cols=parseInt($width/(option.width+option.maR/2))
		var top=option.padding,
			left=option.padding,
			$eleHeight,
			wrapHeight,
			list=[],
			$ele,
			eleHeight=option.padding,
			listHeight=[]
		for(var i=0;i<cols;i++){
				list.push([])
				for(var j=0;j<$eleNum;j++){
					var index=i+j*cols
					if($child[index]){
						list[i].push($child[index])
					}
				}
			}
		
		for(var j=0;j<list.length;j++){
			for(var l=0;l<list[j].length;l++){
				$ele=list[j][l]
				$($ele).animate({
					top:top+'px',
					left:left+'px'
				})
				$eleHeight=$($ele).height()
				eleHeight+=$eleHeight+option.maB
				top=top+option.maB+$eleHeight
			}
			listHeight.push(eleHeight)
			eleHeight=option.padding
			top=option.padding
			left=left+option.width+option.maR
		}

		$wrapHeight=Math.max.apply(Math, listHeight);
		$this.css({height:$wrapHeight-option.maB+(option.padding*2)+'px'})
	}
	
	$.fn.pbl=function(options){
		var option=$.extend(defOption,options)
		return this.each(function(){
			var $this=option.$this=$(this)
			var $child=option.$child=$this.find("li")
			var $eleNum=option.$eleNum=option.$child.length
			$this.css({position:'relative'})
			$child.css({width:option.width+'px',position:'absolute'})
			$(window).on('resize load',function(){
				recalc(option)
			})
		})
	}
})(jQuery)
