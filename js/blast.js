//爆炸效果   个人简历羊
function blast(){
	var oBox = document.querySelector('#baozha');
		//行  列
		var L = 10;
		var H = 10;
		//循环行列
		for(var i=0;i<L;i++){
			for(var j=0;j<H;j++){
				//创建Span标签
				 var oS = document.createElement('span');
				 //宽=oBox的宽除有几列 
				 oS.style.width = oBox.offsetWidth/L+'px';
				 oS.style.height = oBox.offsetHeight/H+'px';
				 //把创建的span添加到oBox里面(不先添加，left，top不行)
				 oBox.appendChild(oS); 
				 oS.style.left = i*oS.offsetWidth+'px';
				 oS.style.top = j*oS.offsetHeight+'px';
				 //图片定位
				 oS.style.backgroundPosition = '-'+i*oS.offsetWidth+'px -'+j*oS.offsetHeight+'px';
			}
		}
		//获取span标签
		var aS = oBox.children;
		//给img的
		var iNow = 0;
		var bOk = false;
		oBox.onclick = function(){
			if(bOk)return;
			bOk=true;
			iNow++;
			for(var i=0;i<aS.length;i++){
				//点击循环，加运动
				aS[i].style.WebkitTransition = 	'.5s all ease';
				//x=每个span到定位父级的left+span的宽/2 - oBox的宽/2   偏移的距离 左边负数 右边正数
				//y同上
				var x = aS[i].offsetLeft+aS[i].offsetWidth/2-oBox.offsetWidth/2;
				var y = aS[i].offsetTop+aS[i].offsetHeight/2-oBox.offsetHeight/2;
				//设置平移位置  旋转X Y 的度数是随机的
				aS[i].style.WebkitTransform = 'translate('+x+'px,'+y+'px) rotateY('+rnd(-360,360)+'deg) rotateX('+rnd(-360,360)+'deg)';
				//平移旋转之后，改变透明度，视觉上变没
				aS[i].style.opacity = 0;	
			}
			//添加绑定之后，马上解绑,让所有span回到原位,让阴影层变成1,
			function tranEnd(){
				aS[aS.length-1].removeEventListener('transitionend',tranEnd,false);	
				for(var i=0;i<aS.length;i++){
					aS[i].style.WebkitTransition = 	'none';
					//点击之后改图片
					aS[i].style.backgroundImage = 'url(img3/'+(iNow%3+1)+'.png)';
					oBox.style.backgroundImage = 'url(img3/'+((iNow+1)%3+1)+'.png)';
					aS[i].style.WebkitTransform = 'perspective(800px) translate(0,0) rotateY(0) rotateX(0)';
					
					aS[i].style.opacity = 1;
				};
				bOk = false;
			};
			//给最后一个块添加事件绑定
			aS[aS.length-1].addEventListener('transitionend',tranEnd,false);
		};	
};
//随机函数,用作旋转的X   Y  值
	function rnd(n,m){
		return Math.floor(Math.random()*(m-n)+n);	
	};