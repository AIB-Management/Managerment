require.config({
	shim:{
		'jquery.min':{
			exports: '$'
		}

	}

})

//管理页主函数
require(["jquery.min","checkInput","overborwserEvent"],function main($,checkBy,EventUntil){
	//--------- 全局变量 --------

	//未审核用户模块当前页码
	var curUnexamieModulePage = 0;
	//已审核用户模块当前页码
	var curExamieModulePage = 0;
	var curDepartmentId = "";

	//---------------------------

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

	//定义移除类名方法
	function removeClass(elem,classname){
		var allClass = elem.className.split(" ");
		var targetIndex = allClass.indexOf(classname);
		allClass.splice(targetIndex,1);
		elem.className = allClass.join(" ");
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

	//定义获取导航栏表格行内信息方法
	function getDetailInfo(elem){
		//获取按钮所在行
		var infoArr = [];
		var tr = elem.parentNode.parentNode;
		var td = tr.querySelectorAll("td");

		for (var i = 0; i < td.length - 1; i++) {
			infoArr.push(td[i].innerText);
		}

		return infoArr;
		
	}

	//定义一个计算选中状态的多选框数量的函数
	function countCheckedBoxChecked(elem){
		var count = 0;
		for (var i = 0; i < elem.length; i++) {
			if (elem[i].checked == true) {
				count++;
			}
		}

		return count;
	}

	//定义表格多选框点击事件通用执行函数
	function selectAllCheckboxEvent(checkboxList,sellectAllCheckbox){
		//获取所有多选框元素
		var checkBoxs = checkboxList;
		//countCheckedBoxChecked 这个函数会返回当前监测的多选框选中被选中的个数
		var checkedNum = countCheckedBoxChecked(checkBoxs);


		//当全部多选框被选中的时候
		if (checkedNum == checkBoxs.length) {
			sellectAllCheckbox.checked = true;
		}else{
			sellectAllCheckbox.checked = false;
		}
	}

	//未审核用户表 "选择全部" 多选框点击事件执行函数
	function selectAllBtnHandler(checkboxList){
		//获取未审核用户当前页的所有多选框
		var checkBoxs = checkboxList;
		//如果未审核用户列表 "选择全部" 多选框点击时为选中状态
		if (this.checked == true) {
			for (var i = 0; i < checkBoxs.length; i++) {
				checkBoxs[i].checked = true;
			}
		}else{
			for (var i = 0; i < checkBoxs.length; i++) {
				checkBoxs[i].checked = false;
			}
		}
		
	}




	//页面加载完成时 显示新增未注册用户数量
	function showUnexamieUserNums(){
		$.ajax({
			url: 'http://localhost:8080/Management/admin/ajaxGetCountIsNotPass.action',
			type: 'GET',
			dataType: 'json',
			success: function(data){
				s("#number-hints").innerText = data.extend.num;
				s("#number-hints").style.display = 'inline-block';
			}
		})
		
		
	}

	// ---------------- 文件夹管理(导航栏管理)模块开始

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
	function createBradCurmbItem(event){
		//获取面包屑导航栏外包裹层
		var curmbNav = s("#breadcurmb-nav-wrap");

		//阻止默认事件发生
		event = EventUntil.getEvent(event);
		EventUntil.preventDefault(event);

		//创建元素碎片器 创建元素并添加到包裹层中
		var frag = document.createDocumentFragment();
		var li = createElem("li"),
			a = this.cloneNode(true);

		a.title = this.innerText;
		li.appendChild(a);

		frag.appendChild(li);

		curmbNav.appendChild(frag);

		//更新每一个面包屑导航里面的li 元素 并绑定点击事件函数 breadCrumbItemClick
		breadCrumbItemClick();
		//每一次添加都进行一次导航数量的控制
		controlNavNums(s("#breadcurmb-nav-wrap"),ss("#breadcurmb-nav-wrap li"),
			s("#overflow-item-wrap"),s("#show-hidden-menu"));

	}




	//文件夹列表文件名点击事件
	function fileListclick(){
		var name = ss(".floder-name a");

		for (var i = 0; i < name.length; i++) {
			//为每一个a 标签绑定点击事件函数 createBradCurmbItem
			EventUntil.addHandler(name[i],"click",createBradCurmbItem);
		}
	}


	//修改文件夹名字按钮点击事件执行函数
	function modifyFloderName(){
		//获取button 的父元素
		var parent = this.parentNode.parentNode,
			//获取文件的名字
			floderName = parent.querySelectorAll("a")[0].innerText;
		//为修改名字弹出层的input输入框插入内容	
		s("#new-file-name").value = floderName;
		//显示修改文件夹名弹出层
		s("#modify-file-name-wrap").style.display = 'block';
	}


	//侧边栏系别点击事件执行函数
	function selectDepClick(event){
		var depList = ss("#manage-side-item li");
		event = EventUntil.getEvent(event);
		if ((event.target.tagName.toLowerCase()) == "a") {
			//如果点击对象a 元素
			//阻止其默认事件
			EventUntil.preventDefault(event);
		}
		//清空li 的活动样式
		for (var i = 0; i < depList.length; i++) {
			if (depList[i].className.indexOf("filedep-item-active") != -1) {
				removeClass(depList[i],"filedep-item-active");
			}
		}

		this.className += "filedep-item-active";

		//调整完样式后发送ajax 到后台请求
		//取出数据
	}



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

	//新建文件夹弹出层关闭按钮点击事件
	EventUntil.addHandler(s("#new-floder-close-btn"),"click",function(){
		s("#new-file-wrap").style.display = 'none';
	})

	//新建文件夹按钮点击事件
	EventUntil.addHandler(s("#newfloder-btn"),"click",function(){
		s("#new-file-wrap").style.display = "block";
	})

	//新建文件夹弹出层提交按钮点击事件
	EventUntil.addHandler(s("#newfloder-submit"),"click",function(){
		//判断路径 "breadcurmb-nav-wrap" 上面是否有元素
		//来判断是否是在根目录上面创建
		//为真 发送文件夹级层为0 部门id 为当前选中的部门id 新建文件夹名字 发送给后台
		//最后从后台中刷新数据
		//为假 判断溢出导航栏包裹层是否有元素 
		//如果有 获取溢出导航包裹层最后一个元素的
	})

	//修改文件夹名弹出层关闭按钮点击事件
	EventUntil.addHandler(s("#modify-flodername-close-btn"),"click",function(){
		s("#modify-file-name-wrap").style.display = 'none';
	})


	//修改文件夹名弹出层提交按钮点击事件
	EventUntil.addHandler(s("#rename-submit"),"click",function(){
		//发送ajax 给后台
		//先检测是否为空 不为空发送给后台
		//如果有同名 后台发送回数据提示错误
		//如果没有 后台发送会数据提示修改成功
		//前端获取修改名字的文件夹对象
		//将对象的名字在前端修改
		//最后修改名字的弹出层关闭
	})


	//调试
	//实际情况由ajax 获取数据输出完毕后调用此函数
	fileListclick();

	//调试修改文件夹名字按钮点击事件
	//实际由遍历ajax 数据中为其绑定
	for (var i = 0; i < ss("#file-list-content button").length; i++) {
		EventUntil.addHandler(ss("#file-list-content button")[i],"click",modifyFloderName);
	}

	for (var i = 0; i < ss("#manage-side-item li").length; i++) {
		EventUntil.addHandler(ss("#manage-side-item li")[i],"click",selectDepClick);
	}


	// ---------------- 文件夹管理模块结束


	//--------------  未审核模块的操作事件 ------------

	//待审核用户列表 "通过" 按钮点击事件执行的方法
	//直接将用户的id 传给后台做处理
	function unexamieModulePass(){
		//获取注册用户姓名的单元格
		//用作向后台传值及向弹出层传值
		var parent = this.parentNode.parentNode;
		var nameTd = parent.querySelectorAll("td")[1];
		var uid = nameTd.title;
		//发送一个ajax 给后台
		//然后刷新更新后的表格
		//...ajaxCode
		$.ajax({
			url: 'http://localhost:8080/Management/admin/ajaxPassAccount.action',
			type: 'POST',
			dataType: 'json',
			data: "uid=" + uid,
			success: function(data){
				alert("操作成功");
				//返回数据的时候回到操作前停留的页码处
				toUnexamiePage(curUnexamieModulePage);
			}
		});
	}


	//待审核用户列表 "拒绝" 按钮点击事件执行的方法
	//直接将值（用户名，id）传去弹出层
	function unexamieModuleRefuse(){
		//获取注册用户姓名的单元格
		//用作向后台传值及向弹出层传值
		var parent = this.parentNode.parentNode;
		var nameTd = parent.querySelectorAll("td")[1];

		//获取弹出层
		var floor = s("#floor");
		//隐藏修改导航模块弹出层
		s("#modify-nav-info").style.display = 'none';
		//隐藏撤回用户模块弹出层
		s("#recall-user").style.display = 'none';
		//隐藏删除导航弹出层
		s("#delete-nav").style.display = 'none';
		//显示填写拒绝信息模块弹出层
		s("#refuse-info").style.display = 'block';
		//为提示文字中的姓名字段添加内容
		s("#refuse-username").innerText = nameTd.innerText;
		//为提示文字中的名字字段属性 title添加内容
		s("#refuse-username").title = nameTd.title;
		//显示弹出层
		floor.style.display = "block";
	}


	//创建未审核用户表
	//将后台 json 字符串转换为 dom 元素
	function createUnexamieTable(data){
		s("#unexamie-main-content").innerHTML = "";
		//创建元素碎片收集器
		var frag = document.createDocumentFragment();

		var dataList = data.extend.page.list;

		var checkBox = createElem("input");
		checkBox.type = "checkbox";
		checkBox.className = "unexamie-select";


		var passBtn = createElem("button");
		var passBtnIcon = createElem("span");
		passBtnIcon.innerText = " ";
		passBtnIcon.className = "glyphicon glyphicon-ok";
		passBtnIcon.setAttribute("aria-hidden", "true");
		//为按钮添加图标
		passBtn.appendChild(passBtnIcon);
		

		var refuseBtn = createElem("button");
		var refuseBtnIcon = createElem("span");
		refuseBtnIcon.innerText = " ";
		refuseBtnIcon.className = "glyphicon glyphicon-minus-sign";
		refuseBtnIcon.setAttribute("aria-hidden", "true");
		//为按钮添加图标
		refuseBtn.appendChild(refuseBtnIcon);
		

		//为按钮添加class
		passBtn.className = "pass btn btn-success btn-sm";
		refuseBtn.className = "refuse btn btn-danger btn-sm";

		//为按钮添加文字
		passBtn.innerHTML += " 通过";
		refuseBtn.innerHTML += " 拒绝申请";


		

		for (var i = 0; i < dataList.length; i++) {
			//每次遍历创建一个 tr
			var tr = createElem("tr");
			//创建一个多选框包裹元素 td
			var checkBoxTd = createElem("td");
			var btnClone = checkBox.cloneNode(true);
			checkBoxTd.appendChild(btnClone);

			//为每一个多选框绑定点击事件
			EventUntil.addHandler(btnClone,"click",function(){
				selectAllCheckboxEvent(ss(".unexamie-select"),s("#unexamie-select-all"));
			});

			//tr 添加checkBoxTd
			tr.appendChild(checkBoxTd);

			//创建一个教师姓名包裹 td
			var userTd = createElem("td");
			userTd.innerText = dataList[i].name;
			userTd.title = dataList[i].uid;
			tr.appendChild(userTd);

			//创建一个系别包裹 td
			var departmentTd = createElem("td");
			departmentTd.innerText = dataList[i].depContent;
			tr.appendChild(departmentTd);

			//创建一个专业包裹 td
			var professionTd = createElem("td");
			professionTd.innerText = dataList[i].content;
			tr.appendChild(professionTd);

			//创建一个按钮包裹 td
			var btnTd = createElem("td");
			var passBtnClone = passBtn.cloneNode(true);
			var refuseBtnClone = refuseBtn.cloneNode(true);

			btnTd.appendChild(passBtnClone);
			btnTd.appendChild(refuseBtnClone);
			//为按钮绑定事件
			EventUntil.addHandler(passBtnClone,"click",unexamieModulePass);
			EventUntil.addHandler(refuseBtnClone,"click",unexamieModuleRefuse);

			tr.appendChild(btnTd);



			frag.appendChild(tr);
		}

		//表格元素添加数据
		s("#unexamie-main-content").appendChild(frag);
	}

	// 创建分页导航方法
	// 传入原始数据，分页导航的载体
	function createUnexamiePageNav(data){
		s("#unexamie-pagination-content").innerHTML = "";
		//获取分页导航输出分页数的数据
		var pageList = data.extend.page.navigatepageNums;
		//创建元素碎片收集器
		var frag = document.createDocumentFragment();

		//先创建首页，向前翻页，向后翻页，到末页按钮
		//1、创建回首页按钮
		var homePageBtn = createElem("li");
		var homePageBtnContent = createElem("a");
		homePageBtnContent.href = "#";
		homePageBtnContent.setAttribute("aria-label", "homepage");
		homePageBtnContent.innerText = "首页";
		homePageBtn.appendChild(homePageBtnContent);

		//2、创建向前翻页按钮
		var prevPageBtn = createElem("li");
		var prevPageBtnContent = createElem("a");
		

		prevPageBtnContent.href = "#";
		prevPageBtnContent.setAttribute("aria-label", "homepage");
		prevPageBtnContent.innerHTML = "&laquo;";

		prevPageBtn.appendChild(prevPageBtnContent);

		//如果当前后台返回的信息表示没有首页
		//则禁用首页按钮和向前翻页按钮 并且不为他们绑定点击事件
		if (data.extend.page.hasPreviousPage == false) {
			homePageBtn.className = "disabled";
			prevPageBtn.className = "disabled";
		}else{

			//如果有前一页
			//点击上一页按钮的时候调用 toUnexamiePage 就是当前页 -1
			//data.extend.page.pageNum 表示当前页
			EventUntil.addHandler(prevPageBtn,"click",function(){
				toUnexamiePage(data.extend.page.pageNum - 1);
			});

			//点击返回首页的时候调用 toUnexamiePage 就是跳到总页数的第一页
			//即传 1进去就可以了
			EventUntil.addHandler(homePageBtn,"click",function(){
				toUnexamiePage(1);
			});
		}

		frag.appendChild(homePageBtn);
		frag.appendChild(prevPageBtn);



		//3、创建向后翻页按钮
		var nextPageBtn = createElem("li");
		var nextPageBtnContent = createElem("a");

		nextPageBtnContent.href = "#";
		nextPageBtnContent.setAttribute("aria-label", "homepage");
		nextPageBtnContent.innerHTML = "&raquo;";

		nextPageBtn.appendChild(nextPageBtnContent);


		//4、创建回到末页按钮
		var lastPageBtn = createElem("li");
		var lastPageBtnContent = createElem("a");

		lastPageBtnContent.href = "#";
		lastPageBtnContent.setAttribute("aria-label", "homepage");
		lastPageBtnContent.innerText = "末页";

		lastPageBtn.appendChild(lastPageBtnContent);

		//如果当前后台返回的信息表示没有末页
		//则禁用末页按钮和向后翻页按钮 并且不为他们绑定点击事件
		if (data.extend.page.hasNextPage == false) {
			nextPageBtn.className = "disabled";
			lastPageBtn.className = "disabled";
		}else{
			//否则给他们都绑定点击事件
			//下一页按钮就是当前页+1
			//调用 toUnexamiePage 传入data.extend.page.pageNum + 1
			//data.extend.page.pageNum 表示当前页
			EventUntil.addHandler(nextPageBtn,"click",function(){
				toUnexamiePage(data.extend.page.pageNum + 1);
			})

			//末页按钮就直接跳到页数的总数位置
			//调用 toUnexamiePage 传入 data.extend.page.pages
			//data.extend.page.pageNum 表示当前页
			//data.extend.page.pages 表示页的总数 即最后一页
			EventUntil.addHandler(lastPageBtn,"click",function(){
				toUnexamiePage(data.extend.page.pages);
			})
		}


		//5、遍历创建数字分页按钮
		for (var i = 0; i < pageList.length; i++) {
			var numLi = createElem("li");
			var numLiIcon = createElem("a");
			numLiIcon.href = "#";
			numLiIcon.innerText = pageList[i];
			numLi.appendChild(numLiIcon);

			if (pageList[i] == data.extend.page.pageNum) {

				numLi.className = "active";
			}
			//为每个分页数字按钮添加事件
			//调用 toUnexamiePage 传入当前分页按钮数字 ‘num’ 作为跳转页面的参数
			(function(num){
				EventUntil.addHandler(numLi,"click",function(){
					toUnexamiePage(num);
				})
			})(pageList[i]);

			frag.appendChild(numLi);
		}

		frag.appendChild(nextPageBtn);
		frag.appendChild(lastPageBtn);
		
		//分页导航添加全部分页按钮元素
		s("#unexamie-pagination-content").appendChild(frag);
	}


	//分页按钮点击调用方法
	function toUnexamiePage(pn){
		$.ajax({
			url: 'http://localhost:8080/Management/admin/ajaxGetAccountInfoIsNotPass.action',
			type: 'GET',
			dataType: 'json',
			data: "pn=" + pn,

			success: function(data){
				if (data.code == 100) {

					createUnexamieTable(data);
					createUnexamiePageNav(data);
					curUnexamieModulePage = data.extend.page.pageNum;


				}else{
					alert(data.msg);
				}
			}
		})
		
		
	}


	//未审核列表批量通过按钮点击事件调用函数
	function unexamiePassAll(){
		//点击批量通过按钮时 首先要判断当前有没有多选框选中
		//获取所有多选框元素
		var checkboxs = ss(".unexamie-select");
		//定义计算变量
		var checkedCount = countCheckedBoxChecked(checkboxs);
		
		if (checkedCount != 0) {
			//如果当前有选中多选框
			//创建保存多个id 值得数组
			var idList = [];
			//遍历所有复选框
			for (var i = 0; i < checkboxs.length; i++) {
				//把多选框对应的用户名列的 title值（即id 值）推进数组
				if (checkboxs[i].checked == true) {
					var idVal = checkboxs[i].parentNode.parentNode.querySelectorAll("td")[1].title;
					idList.push(idVal);
				}
			}
			//将保存多个id 的数组转换为字符串
			var list = idList.join(",");

			//发送ajax
			$.ajax({
				url: 'http://localhost:8080/Management/admin/ajaxPassAccount.action',
				type: 'POST',
				dataType: 'json',
				data: "uid=" + list,
				success: function(data){
					if (data.code == 100) {
						toUnexamiePage(curUnexamieModulePage);
						//如果当前操作是拒绝此页的全部用户申请
						//点击完弹出层拒绝按钮之后 全选多选框还是会 checked
						//所以每次点击完之后都要把多选框的 checked 取消掉
						s("#unexamie-select-all").checked = false;
						alert("操作成功！");
					}else{
						alert("操作失败！");
					}
				},

				error: function(){
					alert("操作失败！");
				}
			});
			
			
		}else{
			alert("没有选中的用户");
		}
		
	}


	//未审核用户列表批量拒绝点击事件调用函数
	function unexamieRefuseAll(){
		var checkedNum = countCheckedBoxChecked(ss(".unexamie-select"));
		if (checkedNum != 0) {
			//创建保存多个 id 的数组
			var idList = [];
			//创建保存多个用户名的数组
			var usernameList = [];
			//获取所有多选框元素
			var checkboxs = ss(".unexamie-select");
			//遍历这一页每一个多选框
			for (var i = 0; i < checkboxs.length; i++) {
				if (checkboxs[i].checked == true) {
						//如果有选中的
						//获取选中多选框所在行的第二列的 title 值
						var idVal = checkboxs[i].parentNode.parentNode.querySelectorAll("td")[1].title;
						//获取选中多选框所在行的第二列的 文本 值
						var usernameVal = checkboxs[i].parentNode.parentNode.querySelectorAll("td")[1].innerText;
						//保存id 值数组推入对应的id
						idList.push(idVal);
						//保存用户名数组推入对应的用户名
						usernameList.push(usernameVal);
					}
				}

					//将保存到的id 和 用户名 传递给提示弹出层拒绝用户申请模块那里
					s("#refuse-username").innerText = usernameList.join(",");
					s("#refuse-username").title = idList.join(",");

					//获取提示弹出层
					var floor = s("#floor");
					//隐藏修改导航模块弹出层
					s("#modify-nav-info").style.display = 'none';
					//隐藏撤回用户模块弹出层
					s("#recall-user").style.display = 'none';
					//显示填写拒绝信息模块弹出层
					s("#refuse-info").style.display = 'block';
					//显示弹出层
					floor.style.display = "block";
		}else{
			alert("没有选中的用户");
		}
		
		
	}

	//ss(".unexamie-select")
	//未审核用户 "选择全部多选框" 点击事件
	EventUntil.addHandler(s("#unexamie-select-all"),"click", function(){
		selectAllBtnHandler.call(this,ss(".unexamie-select"));
	});

	//未审核用户 "批量通过按钮" 点击事件
	EventUntil.addHandler(s("#unexamie-pass-all"),"click",unexamiePassAll);

	//未审核用户 "批量拒绝按钮" 点击事件
	EventUntil.addHandler(s("#unexamie-refuse-all"),"click",unexamieRefuseAll);

	//------------- 未审核模块操作事件结束 -------------------------


	//----------------- 已审核模块操作事件开始 -----------------------
	//为筛选系别下拉框填充内容
	function initDepFilter(){
		var select = s("#examie-filter");
		var frag = document.createDocumentFragment();
		$.ajax({
			url: 'http://localhost:8080/Management/admin/ajaxGetAllDepartment.action',
			type: 'GET',
			dataType: 'json',
			success: function(data){
 				//请求成功后
 				//遍历返回结果 填充下拉选择框
 				//填充完毕之后把下拉框第一个值附给全局变量 "curDepartmentId"
 				var result = data.extend.Department;
 				for (var i = 0; i < result.length; i++) {
 					var option = createElem("option");
 					option.value = result[i].department.uid;
 					option.innerText = result[i].department.content;
 					frag.appendChild(option);
 				}

 				select.appendChild(frag);
 				//为全局变量 curDepartmentId 赋值
 				curDepartmentId = select.value;
			}
		});
		
		
	}

	//当下拉框发生改变的时候执行函数
	function filterOnChange(){
		//获取下拉框改变后的value
		var curVal = this.value;
		//为全局变量 curDepartmentId 赋值
		curDepartmentId = curVal;
		//根据部门id 输出该部门注册用户列表的第一页
		toexamiedPage(1,curDepartmentId);
	}

	function examiedModuleRecall(){
		//获取注册用户姓名的单元格
		var parent = this.parentNode.parentNode;
		var nameTd = parent.querySelectorAll("td")[1];

		//获取弹出层
		var floor = s("#floor");
		//隐藏修改导航模块弹出层
		s("#modify-nav-info").style.display = 'none';
		//显示填写拒绝信息模块弹出层
		s("#refuse-info").style.display = 'none';
		//显示撤回用户模块弹出层
		s("#recall-user").style.display = 'block';
		//为提示文字中的姓名字段添加内容
		s("#recall-username").innerText = nameTd.innerText;
		s("#recall-username").title = nameTd.title;
		//显示弹出层
		floor.style.display = "block";
	}


	//创建已审核用户表
	//将后台 json 字符串转换为 dom 元素
	function createExamiedTable(data){
		s("#examied-main-content").innerHTML = "";
		//创建元素碎片收集器
		var frag = document.createDocumentFragment();

		var dataList = data.extend.page.list;

		//创建多选框
		var checkBox = createElem("input");
		checkBox.type = "checkbox";
		checkBox.className = "examied-select";
		
		//创建撤回按钮
		var recallBtn = createElem("button");
		var recallBtnIcon = createElem("span");
		recallBtnIcon.innerText = " ";
		recallBtnIcon.className = "glyphicon glyphicon-erase";
		recallBtnIcon.setAttribute("aria-hidden", "true");
		//为撤回按钮添加图标
		recallBtn.appendChild(recallBtnIcon);
		

		recallBtn.className = "refuse btn btn-danger btn-sm";

		recallBtn.innerHTML += " 撤回";


		

		for (var i = 0; i < dataList.length; i++) {
			//每次遍历创建一个 tr
			var tr = createElem("tr");
			//创建一个多选框包裹元素 td
			var checkBoxTd = createElem("td");
			var btnClone = checkBox.cloneNode(true);
			checkBoxTd.appendChild(btnClone);

			//为每一个多选框绑定点击事件
			EventUntil.addHandler(btnClone,"click",function(){
				selectAllCheckboxEvent(ss(".examied-select"),s("#examied-select-all"));
			});
			//tr 添加checkBoxTd
			tr.appendChild(checkBoxTd);

			//创建一个教师姓名包裹 td
			var userTd = createElem("td");
			userTd.innerText = dataList[i].name;
			userTd.title = dataList[i].uid;
			tr.appendChild(userTd);

			//创建一个系别包裹 td
			var departmentTd = createElem("td");
			departmentTd.innerText = dataList[i].depContent;
			tr.appendChild(departmentTd);

			//创建一个专业包裹 td
			var professionTd = createElem("td");
			professionTd.innerText = dataList[i].content;
			tr.appendChild(professionTd);

			//创建一个按钮包裹 td
			var btnTd = createElem("td");
			var recallBtnClone = recallBtn.cloneNode(true);

			btnTd.appendChild(recallBtnClone);
			//为按钮绑定事件
			EventUntil.addHandler(recallBtnClone,"click",examiedModuleRecall);

			tr.appendChild(btnTd);



			frag.appendChild(tr);
		}

		//表格元素添加数据
		s("#examied-main-content").appendChild(frag);
	}


	// 创建分页导航方法
	// 传入原始数据，分页导航的载体
	function createExamiePageNav(data){
		//每次执行都清空一次分页导航
		s("#examied-pagination-content").innerHTML = "";
		//获取分页导航输出分页数的数据
		var pageList = data.extend.page.navigatepageNums;
		//创建元素碎片收集器
		var frag = document.createDocumentFragment();

		//先创建首页，向前翻页，向后翻页，到末页按钮
		//1、创建回首页按钮
		var homePageBtn = createElem("li");
		var homePageBtnContent = createElem("a");
		homePageBtnContent.href = "#";
		homePageBtnContent.setAttribute("aria-label", "homepage");
		homePageBtnContent.innerText = "首页";
		homePageBtn.appendChild(homePageBtnContent);

		//2、创建向前翻页按钮
		var prevPageBtn = createElem("li");
		var prevPageBtnContent = createElem("a");
		

		prevPageBtnContent.href = "#";
		prevPageBtnContent.setAttribute("aria-label", "homepage");
		prevPageBtnContent.innerHTML = "&laquo;";

		prevPageBtn.appendChild(prevPageBtnContent);

		//如果当前后台返回的信息表示没有首页
		//则禁用首页按钮和向前翻页按钮 并且不为他们绑定点击事件
		if (data.extend.page.hasPreviousPage == false) {
			homePageBtn.className = "disabled";
			prevPageBtn.className = "disabled";
		}else{

			//如果有前一页
			//点击上一页按钮的时候调用 toUnexamiePage 就是当前页 -1
			//data.extend.page.pageNum 表示当前页
			//页面跳转时还需要传入当前下拉框的值 以便知道目前是查看那个系的审核用户
			EventUntil.addHandler(prevPageBtn,"click",function(){
				toexamiedPage(data.extend.page.pageNum - 1,curDepartmentId);
			});

			//点击返回首页的时候调用 toUnexamiePage 就是跳到总页数的第一页
			//即传 1进去就可以了
			//页面跳转时还需要传入当前下拉框的值 以便知道目前是查看那个系的审核用户
			EventUntil.addHandler(homePageBtn,"click",function(){
				toexamiedPage(1,curDepartmentId);
			});
		}

		frag.appendChild(homePageBtn);
		frag.appendChild(prevPageBtn);



		//3、创建向后翻页按钮
		var nextPageBtn = createElem("li");
		var nextPageBtnContent = createElem("a");

		nextPageBtnContent.href = "#";
		nextPageBtnContent.setAttribute("aria-label", "homepage");
		nextPageBtnContent.innerHTML = "&raquo;";

		nextPageBtn.appendChild(nextPageBtnContent);


		//4、创建回到末页按钮
		var lastPageBtn = createElem("li");
		var lastPageBtnContent = createElem("a");

		lastPageBtnContent.href = "#";
		lastPageBtnContent.setAttribute("aria-label", "homepage");
		lastPageBtnContent.innerText = "末页";

		lastPageBtn.appendChild(lastPageBtnContent);

		//如果当前后台返回的信息表示没有末页
		//则禁用末页按钮和向后翻页按钮 并且不为他们绑定点击事件
		if (data.extend.page.hasNextPage == false) {
			nextPageBtn.className = "disabled";
			lastPageBtn.className = "disabled";
		}else{
			//否则给他们都绑定点击事件
			//下一页按钮就是当前页+1
			//调用 toUnexamiePage 传入data.extend.page.pageNum + 1
			//data.extend.page.pageNum 表示当前页
			//页面跳转时还需要传入当前下拉框的值 以便知道目前是查看那个系的审核用户
			EventUntil.addHandler(nextPageBtn,"click",function(){
				toexamiedPage(data.extend.page.pageNum + 1,curDepartmentId);
			})

			//末页按钮就直接跳到页数的总数位置
			//调用 toUnexamiePage 传入 data.extend.page.pages
			//data.extend.page.pageNum 表示当前页
			//data.extend.page.pages 表示页的总数 即最后一页
			//页面跳转时还需要传入当前下拉框的值 以便知道目前是查看那个系的审核用户
			EventUntil.addHandler(lastPageBtn,"click",function(){
				toexamiedPage(data.extend.page.pages,curDepartmentId);
			})
		}


		//5、遍历创建数字分页按钮
		for (var i = 0; i < pageList.length; i++) {
			var numLi = createElem("li");
			var numLiIcon = createElem("a");
			numLiIcon.href = "#";
			numLiIcon.innerText = pageList[i];
			numLi.appendChild(numLiIcon);

			if (pageList[i] == data.extend.page.pageNum) {

				numLi.className = "active";
			}
			//为每个分页数字按钮添加事件
			//调用 toexamiedPage 传入当前分页按钮数字 ‘num’ 
			//以及传入当前的筛选下拉框的值
			//页面跳转时还需要传入当前下拉框的值 以便知道目前是查看那个系的审核用户
			(function(num){
				EventUntil.addHandler(numLi,"click",function(){
					toexamiedPage(num,curDepartmentId);
				})
			})(pageList[i]);

			frag.appendChild(numLi);
		}

		frag.appendChild(nextPageBtn);
		frag.appendChild(lastPageBtn);
		
		//分页导航添加全部分页按钮元素
		s("#examied-pagination-content").appendChild(frag);
	}

	//已审核用户列表页面跳转方法
	function toexamiedPage(pn,id){
		var result = "";
		//整理参数
		if (id != "") {
			result = "pn=" + pn + "&parent=" + id;
		}else{
			result = "pn=" + pn;
		}
		//页面跳转时发送ajax 请求获取后台的数据
		$.ajax({
			url: 'http://localhost:8080/Management/admin/ajaxGetAccountInfoIsPass.action',
			type: 'GET',
			dataType: 'json',
			data: result,

			success: function(data){
				if (data.code == 100) {
					//输出已审核用户内容
					createExamiedTable(data);
					//输出分页导航栏
					createExamiePageNav(data);
					//为全局变量 curExamieModulePage （保存当前分页页码）
					curExamieModulePage = data.extend.page.pageNum;


				}else{
					alert(data.msg);
				}
			}
		})
	}

	function examiedModuleRecallAll(){
		var checkboxList = ss(".examied-select");
		//获取当前选中的多选框数量
		var checkedNums = countCheckedBoxChecked(checkboxList);
		//如果有选中
		if(checkedNums != 0){
			//创建一个保存id 和 一个保存用户名的数组
			var idValList = [],usernameList = [];
			
			//遍历所有多选框 如果选中将用户名信息和id 值推入数组
			for (var i = 0; i < checkboxList.length; i++) {
				if (checkboxList[i].checked == true) {
					//找到对应的内容
					var username = checkboxList[i].parentNode.parentNode.querySelectorAll("td")[1].innerText;
					var userId = checkboxList[i].parentNode.parentNode.querySelectorAll("td")[1].title;

					//保存用户id 和 用户名
					idValList.push(userId);
					usernameList.push(username);
				}
			}

			//获取弹出层
			var floor = s("#floor");
			//隐藏修改导航模块弹出层
			s("#modify-nav-info").style.display = 'none';
			//显示填写拒绝信息模块弹出层
			s("#refuse-info").style.display = 'none';
			//显示撤回用户模块弹出层
			s("#recall-user").style.display = 'block';
			//为提示文字中的姓名字段添加内容
			s("#recall-username").innerText = usernameList.join(",");
			s("#recall-username").title = idValList.join(",");
			//显示弹出层
			floor.style.display = "block";

		}else{
			alert("当前没有选中项！");
		}
		
	}

	//已审核列表 "选择全部" 多选框点击事件
	EventUntil.addHandler(s("#examied-select-all"),"click",function(){
		selectAllBtnHandler.call(this,ss(".examied-select"));

	});

	//批量撤回按钮点击事件
	EventUntil.addHandler(s("#examie-recall-all"),"click",examiedModuleRecallAll);

	//下拉选择框改变事件
	EventUntil.addHandler(s("#examie-filter"),"change",filterOnChange);

	//---------------- 已审核模块操作事件结束 ----------------------



	//侧边栏除管理文件夹标签意外的元素点击事件
	function tagsClick(){
		var tags = ss(".child-tag");
		var contents = ss(".content-wrap");

		for (var i = 0; i < tags.length; i++) {
			tags[i].index = i;

			EventUntil.addHandler(tags[i],"click",function(){
				var index = this.index;

				//调整左侧tag 激活样式
				for (var i = 0; i < tags.length; i++) {
					if (tags[i].className.indexOf("sidebar-tag-active") != -1) {
						//调用自定义 removeClass 方法
						removeClass(tags[i],"sidebar-tag-active");
					}
					contents[i].style.display = "none";
				}

				contents[index].style.display = 'block';

				//为当前点击的 tag增加激活状态样式
				this.className += " sidebar-tag-active";
				
				//如果当前点击的tag 为未审核列表
				//读取未审核用户数据的第一页内容
				if (this.id == "unexamie-tag") {
					s("#number-hints").style.display = 'none';
					
					toUnexamiePage(1);
		
				}else if(this.id == "examied-tag"){
					//如果当前点击的tag 为未审核列表
					//读取已审核用户数据的第一页，且部门筛选为 "全部" 的内容
					toexamiedPage(1,curDepartmentId);

				}
			});
		}
	};


	function manageFileTagClick(){
		EventUntil.addHandler(s("#manage-floder"),"click",function(){
			s("#manage-file-floor").style.display = 'block';
		})
	}
 
	

	//页面加载完成时要做的预处理
	function init(){
		//管理文件夹标签点击事件
		manageFileTagClick();
		//为侧边栏的除管理文件夹标签意外的元素绑定点击事件
		tagsClick();
		//显示未审核用户数量
		showUnexamieUserNums();
		//赋值下拉框
		initDepFilter();
	}

	//--------------定义层结束-------------



	//初始化页面
	init();

	//-----------文件夹管理(导航栏管理)模块功能开始------------

	//管理文件弹出层关闭按钮点击事件
	EventUntil.addHandler(s("#filemanage-close-btn"),"click",function(){
		s("#manage-file-floor").style.display = 'none';
	});
	

	
	//-----------------文件夹管理(导航栏管理)模块功能结束 -----------


	//----------------- 拒绝用户弹出层功能开始 -------------------
	//拒绝用户弹出层功能
	//1、拒绝用户注册模块关闭按钮点击事件
	EventUntil.addHandler(s("#refuse-close-btn"),"click",function(){
		
		s("#floor").style.display = "none";
	})

	//2、拒绝理由信息输入框输入事件
	EventUntil.addHandler(s("#refuse-content"),"keyup",function(){

		var sendBtn = s("#send-refuse-info");

		if (this.value.length == 0) {
			sendBtn.disabled = "disabled";
			sendBtn.style.backgroundColor = "#999999"
		}else{
			sendBtn.removeAttribute("disabled");
			sendBtn.style.backgroundColor = "#05a828";
		}
	})

	//3、拒绝用户注册模块 "提交拒绝信息" 按钮点击事件
	EventUntil.addHandler(s("#send-refuse-info"),"click",function(){
		//ajax 提交用户的id （即title属性）,拒绝理由 给后台处理
		//当处理完毕后再将弹出层包裹层隐藏

		//获取当前拒绝用户的后台 id 值
		var idVal = s("#refuse-username").title;
		//拒绝的理由
		var refuseVal = s("#refuse-content").value;
		//获取加载图片元素
		var icon = s("#refuse-user-loading-icon");

		$.ajax({
			url: 'http://localhost:8080/Management/admin/ajaxRejectAccount.action',
			type: 'POST',
			dataType: 'json',
			data: "uid=" + idVal + "&content=" + refuseVal,
			beforeSend: function(){
				icon.style.visibility = 'visible';
			},

			success: function(data){
				//输出操作前停留页码处的未审核用户数据
				toUnexamiePage(curUnexamieModulePage);
				//隐藏加载图标
				icon.style.visibility = 'hidden';
				//如果当前操作是拒绝此页的全部用户申请
				//点击完弹出层拒绝按钮之后 全选多选框还是会 checked
				//所以每次点击完之后都要把多选框的 checked 取消掉
				s("#unexamie-select-all").checked = false;
				//隐藏弹出层
				s("#floor").style.display = "none";
			}
		});
		
		
	})

	//3、拒绝用户注册模块 "不填写拒绝信息" 按钮点击事件
	EventUntil.addHandler(s("#no-refuse-reason"),"click",function(){
		//ajax 提交用户的id 给后台，不提交拒绝理由
		//数据提交完成后将包裹层隐藏

		//获取当前拒绝用户的后台 id 值
		var idVal = s("#refuse-username").title;
		//获取加载图片元素
		var icon = s("#refuse-user-loading-icon");

		$.ajax({
			url: 'http://localhost:8080/Management/admin/ajaxRejectAccount.action',
			type: 'POST',
			dataType: 'json',
			data: "uid=" + idVal,
			beforeSend: function(){
				icon.style.visibility = 'visible';
			},

			success: function(data){

				toUnexamiePage(curUnexamieModulePage);
				//隐藏加载图标
				icon.style.visibility = 'hidden';
				//如果当前操作是拒绝此页的全部用户申请
				//点击完弹出层拒绝按钮之后 全选多选框还是会 checked
				//所以每次点击完之后都要把多选框的 checked 取消掉
				s("#unexamie-select-all").checked = false;
				//隐藏弹出层
				s("#floor").style.display = "none";
			}
		});
		
		
	})
	//----------------- 拒绝用户弹出层功能结束 -------------------


	//----------------- 撤回用户弹出层功能开始 -------------------
	//撤回用户弹出层功能
	//1、取消撤回按钮点击事件
	EventUntil.addHandler(s("#cancel-recall-user"),"click",function(){
		s("#floor").style.display = "none";
	})

	//2、撤回理由输入框键盘输入事件
	EventUntil.addHandler(s("#recall-content"),"keyup",function(){
		//获取提交按钮
		var sendBtn = s("#confirm-recall-user");

		if (this.value.length != 0) {
			sendBtn.removeAttribute("disabled");
			sendBtn.style.backgroundColor = "#E61A1A";
		}else{
			sendBtn.disabled = "disabled";
			sendBtn.style.backgroundColor = "#999999";
		}
	})

	//3、确认撤回按钮点击事件但 "不发送信息" 点击事件
	EventUntil.addHandler(s("#confirm-recall-user"),"click",function(){
		//点击时 和上面一样 获取提示元素的 title值
		//将title值 传给后台
		var idVal = s("#recall-username").title;

		//获取撤回理由内容
		var reason = s("#recall-content").value;

		//获取撤回用户模块加载图标
		var icon = s("#recall-user-loading-icon");

		$.ajax({
			url: 'http://localhost:8080/Management/admin/ajaxWithdrawAccount.action',
			type: 'GET',
			dataType: 'json',
			data: "uid=" + idVal + "&content=" + reason,
			beforeSend: function(){
				icon.style.visibility = 'visible';
			},

			success: function(data){
				//数据返回成功后
				//根据当前筛选下拉框的部门id 输出操作前页码处的内容
				toexamiedPage(curUnexamieModulePage,curDepartmentId);
				//loading 图标隐藏
				icon.style.visibility = 'hidden';
				//弹出层隐藏
				s("#floor").style.display = 'none';
				//清空撤回理由输入框内容
				s("#recall-content").value = "";
			}
		});
		
	})

	//----------------- 撤回用户弹出层功能结束 -------------------
})