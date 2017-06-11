//jquery 1.9.1模块不符合 AMD 格式所以需要自定义
require.config({
	shim:{
		'jquery.min':{
			exports: '$'
		},

		'bootstrap.min':{
			deps:['jquery.min']
		},

		'fileinput':{
			deps: ['jquery.min','bootstrap.min']

		},

		'fileinput_locale_es':{
			deps: ['jquery.min','bootstrap.min','fileinput']
		},

		'fileinput_locale_zh':{
			deps: ['jquery.min','bootstrap.min','fileinput','fileinput_locale_es']
		}

	}

})

//departmentpage 脚本main函数
require(["jquery.min","overborwserEvent","bootstrap.min","fileinput","fileinput_locale_es","fileinput_locale_zh"],function main($,EventUntil){

	//封装选择器函数
	function s(name){
		if (name.substring(0, 1) == "#") {
			return document.querySelector(name);
		}else if (name.substring(0, 1) == ".") {
			return document.querySelectorAll(name);
		}else{
			return document.querySelectorAll(name);
		}
	}

	//封装选择多个dom元素 选择器
	function ss(name){
		return document.querySelectorAll(name);
	}

	//自定义创建元素方法
	function createElem(elemName){
		return document.createElement(elemName);
	}

	//获取浏览器最终样式的函数
	function getCurStyle(elem,pusedo,targetProperty){
		if (elem.currentStyle != undefined) {
			return elem.currentStyle[targetProperty];
			
		}else{
			return window.getComputedStyle(elem,pusedo)[targetProperty];
			
		}
	}

	function formateDate(dateStr){
		var date = new Date(dateStr);

		var year = date.getFullYear(),
			month = date.getMonth(),
			day = date.getDate(),
			h = date.getHours(),
			m = date.getMinutes(),
			sec = date.getSeconds();

			month<9?"0"+ m+1 : m+1;
			h<10?"0" + h : h;
			m<10?"0" + m : m;
			sec<10?"0" + sec : sec;

			return year + "-" + month + "-" + day + "    " + h + ":" + m + ":" + sec;
	}


	//溢出导航包裹层里面的li 子元素点击事件
	function overflowNavItemClick(){
		//获取溢出导航包裹层
		var overflowNavWrap = s("#overflow-item-wrap");
		//获取所有溢出导航层的li 子元素
		var overflowNavItemList = ss("#overflow-item-wrap li");
		//为每一个溢出导航绑定点击事件
		for (var i = 0; i < overflowNavItemList.length; i++) {
			EventUntil.addHandler(overflowNavItemList[i],"click",function(){
				//点击时重新获取
				overflowNavItemList = ss("#overflow-item-wrap li");
				//获取当前元素的索引
				var index = Array.prototype.indexOf.call(overflowNavItemList,this);
				//遍历删除
				if (index != -1) {
					//遍历删除这个元素后面的元素
					for (var j = index + 1; j < overflowNavItemList.length; j++) {
						overflowNavWrap.removeChild(overflowNavItemList[j]);
					}

					//...发送ajax 请求
				}
			})
		}
	}


	//面包屑导航栏每个导航标签点击事件
	function breadCrumbItemClick(){
		//获取面包屑导航的外包裹层
		var breadCrumbWrap = s("#breadcurmb-nav-wrap");
		//获取所有面包屑导航的li
		var breadCrumbList = ss("#breadcurmb-nav-wrap li");
		//为每一个导航绑定点击事件
		for (var i = 0; i < breadCrumbList.length; i++) {
			EventUntil.addHandler(breadCrumbList[i],"click",function(event){
				var event = EventUntil.getEvent(event);
				//如果点击的目标元素是 a标签
				if (event.target.tagName.toLowerCase() == "a") {
					//阻止其默认事件
					EventUntil.preventDefault(event);
				}

				//每次点击li 都要重新获取一次当前的li 个数
				breadCrumbList = ss("#breadcurmb-nav-wrap li");
				//然后再获取当前元素在元素集里面的位置
				var index = Array.prototype.indexOf.call(breadCrumbList,this);
				//如果点击当前的元素不为最后一个
				if (index != breadCrumbList - 1) {
					//遍历删除这个元素后面的元素
					for (var i = index + 1; i < breadCrumbList.length; i++) {
						breadCrumbWrap.removeChild(breadCrumbList[i]);
					}
					//清空移除导航包裹层的所有子元素
					s("#overflow-item-wrap").innerHTML = "";
					//隐藏显示溢出导航按钮
					s("#show-hidden-menu").style.display = 'none';
					s("#overflow-item-wrap").style.display = 'none';

					//...发送ajax 请求刷新下面的文件导航
					//调用 createFileList(path,depId) 函数刷新下面的文件夹内容
					//path 为这个面包屑导航的 data-path 属性
					//depId 为页面的系别的id 
				}

				
			})
			
		}
	}
	


	function controlNavNums(navWrap,childnode,moreNavContain,icon){
		//获取父元素的宽度
		var parentWidth = parseInt(getCurStyle(navWrap,null,"width"));

		//获取全部子元素的宽度
		var childWidthTotal = 0;
		for (var i = 0; i < childnode.length; i++) {
			//获取每一个子元素的实际宽度
			var curChildWidth = parseInt(getCurStyle(childnode[i],null,"width")) + 10;
			childWidthTotal += curChildWidth;
			//获取父元素与此时子元素总宽度的差值
			var diffWidth = parentWidth - childWidthTotal;
			
			//如果此时的差值不能容纳下子元素
			if (diffWidth < curChildWidth) {
				//复制这个节点
				var temp = childnode[i].cloneNode(true);
				//为每个复制的节点绑定事件函数  overflowNavItemClick
				EventUntil.addHandler(temp,"click",overflowNavItemClick);
				//将此时的子元素添加到溢出导航包裹层里面
				moreNavContain.appendChild(temp);
				//面包屑导航栏移除子元素
				navWrap.removeChild(childnode[i]);
				
			}
			
		}

		if (moreNavContain.childNodes.length != 0) {
			icon.style.display = "inline-block";

		}else{
			icon.style.display = "none";
		}
	}
	
	//调试
	controlNavNums(s("#breadcurmb-nav-wrap"),ss("#breadcurmb-nav-wrap li"),
			s("#overflow-item-wrap"),s("#show-hidden-menu"));

	


	//创建面包屑导航栏子元素 li的方法
	function createBradCurmbItem(event,target){
		//获取面包屑导航栏外包裹层
		var curmbNav = s("#breadcurmb-nav-wrap");

		//阻止默认事件发生
		event = EventUntil.getEvent(event);
		EventUntil.preventDefault(event);


		//创建元素碎片器 创建元素并添加到包裹层中
		var frag = document.createDocumentFragment();
		var li = createElem("li"),
			a = target.cloneNode(true);

		a.title = target.innerText;
		li.appendChild(a);

		frag.appendChild(li);

		curmbNav.appendChild(frag);

		//更新每一个面包屑导航里面的li 元素 并绑定点击事件函数 breadCrumbItemClick
		breadCrumbItemClick();
		//每一次添加都进行一次导航数量的控制
		controlNavNums(s("#breadcurmb-nav-wrap"),ss("#breadcurmb-nav-wrap li"),
			s("#overflow-item-wrap"),s("#show-hidden-menu"));

	}

	//文件夹点击回掉函数
	function floderNameClick(event){
		event = EventUntil.getEvent(event);
		EventUntil.preventDefault(event);

		//获取点击这个元素的 href 属性 这个属性就是后台要获取的文件夹路径id
		var path = this.getAttribute("data-path");
		//获取当前页面的系别id 实际情况由后台初始化页面时输出这个id
		//这里先写死
		var depId = "dbd02728-ba0f-4bc6-8561-e05fa0370e58";
		console.log(path);

		//点击下面的文件夹名
		//刷新下面的文件列表
		createFileList(path,depId);
		//创建面包屑导航
		createBradCurmbItem(event,this);
	}

	//文件点击事件回调函数
	function fileNameClick(event){}

	//遍历输出文件夹数据函数
	function ergFloderList(list){
		var checkBox = createElem("input"),
			tr = createElem("tr"),
			td = createElem("td"),
			a = createElem("a"),
			frag = document.createDocumentFragment();

		checkBox.type = "checkbox";
		checkBox.className = "disabled";

		for (var i = 0; i < list.length; i++) {
			row = tr.cloneNode(true);
			checkboxCol = td.cloneNode(true);
			checkboxCol.className = "item-selectbox";
			floderNameCol = td.cloneNode(true);
			floderNameCol.className = "file-name floder";
			authorCol = td.cloneNode(true);
			authorCol.className = "item-author";
			timeCol = td.cloneNode(true);
			timeCol.className = "ite-publish-time";
			operateCol = td.cloneNode(true);
			operateCol.className = "operate-btn";

			checkbox = checkBox.cloneNode(true);
			floderName = a.cloneNode(true);
			floderName.innerText = list[i].nav;
			floderName.href = "#";
			floderName.setAttribute("data-path", list[i].uid);
			//为a 元素绑定事件
			EventUntil.addHandler(floderName,"click",floderNameClick);

			checkboxCol.appendChild(checkbox);
			floderNameCol.appendChild(floderName);
			authorCol.innerText = "管理员";
			timeCol.innerText = "-";
			operateCol.innerText = "无";

			row.appendChild(checkboxCol);
			row.appendChild(floderNameCol);
			row.appendChild(authorCol);
			row.appendChild(timeCol);
			row.appendChild(operateCol);

			frag.appendChild(row);
		}
		//返回文本碎片
		return frag;
	}

	//遍历文件函数
	function ergFileList(list){
		var checkBox = createElem("input"),
			button = createElem("button"),
			tr = createElem("tr"),
			td = createElem("td"),
			a = createElem("a"),
			span = createElem("span"),
			frag = document.createDocumentFragment();
		
		span.className = "glyphicon glyphicon-edit";
		checkBox.type = "checkbox";
		button.className = "btn btn-default btn-sm";
		button.appendChild(span);
		button.innerHTML += "修改文件";
		

		for (var i = 0; i < list.length; i++) {
			row = tr.cloneNode(true);
			checkboxCol = td.cloneNode(true);
			checkboxCol.className = "item-selectbox";
			floderNameCol = td.cloneNode(true);
			floderNameCol.className = "file-name file";
			authorCol = td.cloneNode(true);
			authorCol.className = "item-author";
			timeCol = td.cloneNode(true);
			timeCol.className = "ite-publish-time";
			operateCol = td.cloneNode(true);
			operateCol.className = "operate-btn";

			//实际输出时应该获得登陆的用户名做匹配
			//判断是否给checkbox 加上 disabled 类名
			checkbox = checkBox.cloneNode(true);
			floderName = a.cloneNode(true);
			floderName.href = "#";
			floderName.setAttribute("data-path", list[i].uid)
			floderName.innerText = list[i].title;
			operateBtn = button.cloneNode(true);



			checkboxCol.appendChild(checkbox);
			floderNameCol.appendChild(floderName);
			authorCol.innerText = list[i][" author"];
			timeCol.innerText = formateDate(list[i].upTime);
			operateCol.appendChild(operateBtn);

			row.appendChild(checkboxCol);
			row.appendChild(floderNameCol);
			row.appendChild(authorCol);
			row.appendChild(timeCol);
			row.appendChild(operateCol);

			frag.appendChild(row);
		}
		//返回文本碎片
		return frag;
	}

	//通过ajax获取导航栏 输出导航栏信息
	function createFileList(path,depId){
		//参数：path 导航栏的请求id 初始化页面的时候为0
		//之后的点击在导航栏名字的 data-path 里面获取
		//depId 当前页面的系别id
		//此方法 将会在表格里面的文件夹名点击，面包屑导航，溢出导航点击时调用

		//发送ajax 请求
		$.ajax({
			url: 'http://localhost:8080/Management/content/ajaxFindNavAndFile.action',
			type: 'GET',
			dataType: 'json',
			data: "parent=" + path + "&depuid=" + depId,
			success:function(data){
				//第一步 清空文件列表
				s("#main-content-list").innerHTML = "";
				//第二步 获取文件夹和文件数据
				var floderList = data.extend.navs;
				var fileList = data.extend.files;
				//第三步 判断文件夹列表是否为空
				if (floderList.length != 0) {
					s("#main-content-list").appendChild(ergFloderList(floderList));
				}

				if (fileList.length != 0) {
					s("#main-content-list").appendChild(ergFileList(fileList));
				}
			}
		})
		
	}

	//调试 输出导航栏数据函数
	createFileList(0,"dbd02728-ba0f-4bc6-8561-e05fa0370e58");
		


	//------------- 调用层 ----------------

	//用户名栏鼠标移入事件
	EventUntil.addHandler(s("#user-name"),"mouseover",function(event){
		event = EventUntil.getEvent(event);
		var target = EventUntil.getTarget(event);
		var floor = document.querySelector("#user-operate");
		var top = getComputedStyle(s(".header")[0], null)["height"];
		floor.style.left = (target.offsetLeft - 50) + "px";
		floor.style.top = top;
		floor.style.visibility = "visible";
		
	});


	//用户操作下拉框鼠标移入事件
	EventUntil.addHandler(s("#user-operate"),"mouseover",function(){
		this.style.visibility = "visible";
	});

	//用户名栏鼠标移出事件
	EventUntil.addHandler(s("#user-name"),"mouseout",function(){
		s("#user-operate").style.visibility = "hidden";
	});

	//用户操作下拉框栏鼠标移出事件
	EventUntil.addHandler(s("#user-operate"),"mouseout",function(){
		this.style.visibility = "hidden";
	});



	//隐藏导航点击按钮事件
	EventUntil.addHandler(s("#show-hidden-menu"),"click",function(){
		
		//获取按钮的宽度
		var curWidth = parseInt(getCurStyle(this,null,"width"));
		
		//获取按钮高度
		var curHeight = parseInt(getCurStyle(this,null,"height"));

		if (s("#overflow-item-wrap").style.display == "" || s("#overflow-item-wrap").style.display == "none") {

			s("#overflow-item-wrap").style.right = (curWidth / 2) + "px";
			
			s("#overflow-item-wrap").style.top = (curHeight + 15) + "px";

			s("#overflow-item-wrap").style.display = "block";

		}else{

			s("#overflow-item-wrap").style.display = "none";
		}

	});

	//工具栏上传文件按钮点击事件
	EventUntil.addHandler(s("#upload-file-btn"),"click",function(){
		s("#upload-file-floor").style.display = 'block';
	})

	//关闭上传文件弹出层按钮点击事件
	EventUntil.addHandler(s("#uploadfile-close-btn"),"click",function(){
		s("#upload-file-floor").style.display = 'none';
	})



	//初始化拖拽上传插件
	$("#fileupload").fileinput({
        language: 'zh', //设置语言
    	uploadUrl: "/umlProject/php/receiveHeaderImg.php", //上传的地址
	    allowedFileExtensions : ['jpg','png'],//接收的文件后缀,
	    maxFileCount: 1,
	   	dropZoneEnabled: true,
	    enctype: 'multipart/form-data',
	    showUpload: true, //是否显示上传按钮
	    showCaption: false,//是否显示标题
	    browseClass: "btn btn-primary", //按钮样式             
	    previewFileIcon: "<i class='glyphicon glyphicon-king'></i>", 
	    msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！"

    }).on("fileuploaded", function(event, data) {

       userHeadImgSrc = data.response.message;
       console.log(data);

    });

	
})