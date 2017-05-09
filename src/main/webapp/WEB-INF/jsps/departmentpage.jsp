<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv = "X-UA-Compatible" content ="IE=Edge"/> 
	<title>主页</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/require.min.js" defer async="true" data-main="${pageContext.request.contextPath}/resources/js/departmentpageMain"></script>
</head>
<body>
	<div id="release-msg-content">
		<form action=" " method="post" enctype="multipart/form-data">
			<div id="close-btn">×</div>

			<h3>上传文件</h3>
			<p class="release-msg-wrap">
				<span>文件标题</span>
				<input type="text" id="release-msg-title" name="file-title">
			</p>
			<p class="release-msg-wrap">
				<span>选择文件所属的导航栏</span>
				<select name="first-nav" id="first-nav-select">
					<option value="">请选择一级导航栏</option>
					<option value="1">一级导航栏</option>
					<option value="1">一级导航栏</option>
					<option value="1">一级导航栏</option>
					<option value="1">一级导航栏</option>
					<option value="1">一级导航栏</option>
				</select>
				<select name="second-nav" id="second-nav-select">
					<option value="">请选择二级导航栏</option>
					<option value="null">无</option>
					<option value="1">二级导航栏</option>
					<option value="1">二级导航栏</option>
					<option value="1">二级导航栏</option>
					<option value="1">二级导航栏</option>
					<option value="1">二级导航栏</option>
				</select>
				
			</p>
			<p class="release-msg-wrap">
				<input type="file" name="release-file" id="select-file">
			</p>
			<p class="release-msg-wrap">
				<input type="submit" value="提交" id="upload-file">
			</p>
		</form>
	</div>
	<div class="wrapper">
		<div class="header">
			<div class="title-wrap">
				<h3>计算机系主页</h3>
			</div>
			<div class="header-tag">
				<a href="#" id="manage-msg">管理信息</a>
			</div>
			<div class="header-tag" id="add-file">
				<span id="release-msg">发布信息</span>
			</div>
			<div class="header-tag overide">
				<span>|</span>
			</div>
			<div class="header-tag" id="user-name-wrap">
				<span id="user-name">xx老师</span>
			</div>
			<div id="user-operate">
				<ul>
					<li><a href="${pageContext.request.contextPath}/content/personalpage.action">个人信息</a></li>
					<li><a href="modifypwd.jsp">修改密码</a></li>
					<li id="logout-btn">退出</li>
				</ul>
			</div>
		</div>
		<div class="head-nav">
			<ul id="head-nav-content">
				<li class="first-nav">一级导航栏</li>
				<li class="first-nav">一级导航栏多了1个字</li>
				<li class="first-nav">一级导航栏多了1 2个字</li>
				<li class="first-nav">一级导航栏多了1 2 3个字</li>
				<li class="first-nav">一级导航栏多了1 2 3 4个字</li>
				<li class="first-nav">一级导航栏多了1 2 3 4 5个字</li>
				<li class="first-nav">一级导航栏多了1 2 3 4 5 6个字</li>
				<li class="first-nav">一级导航栏多了1 2 3 4 5 6 7个字</li>
				<li class="first-nav">一级导航栏多了1 2 3 4 5 6 7 8个字</li>
				<li class="first-nav">一级导航栏多了1 2 3 4 5 6 7 8 9个字</li>
				<li id="show-more-btn" title="更多导航栏">>></li>
			</ul>
			<ul id="nav-overflow-contain"></ul>
		</div>
		<div class="mainbody">
			<div class="side-bar">
				<h6 class="tag-title">二级导航栏</h6>
				<ul id="tag-content">
					<li class="second-nav">这四个字的导航1</li>
					<li class="second-nav">这四个字的导航2</li>
					<li class="second-nav">这四个字的导航3</li>
					<li class="second-nav">这四个字的导航4</li>
					<li class="second-nav">这四个字的导航5</li>
					<li class="second-nav">这四个字的导航6</li>
					<li class="second-nav">这四个字的导航7</li>
					<li class="second-nav">这四个字的导航8</li>
				</ul>
			</div>
			<div class="content">
				<div id="bread-crumb">
					<span class="crumb-hint">当前路径：</span>
					<span id="bread-crumb-nav" class="crumb-wrap"></span>
				</div>
				<div class="main-content-wrap">
					<p class="main-content-header">
						<span class="title header-style">标题</span>
						<span class="author header-style">作者</span>
						<span class="public-time header-style">发布日期</span>
					</p>
					<ul id="main-content-list">
						<li>
							<a href="#" class="title">很长很长很长很长很长很长很长的标题</a>
							<span class="author">xx老师</span>
							<span class="public-time">2017-04-13</span>
						</li>
						<li>
							<a href="#" class="title">很长很长很长很长很长很长很长的标题</a>
							<span class="author">xx老师</span>
							<span class="public-time">2017-04-13</span>
						</li>
						<li>
							<a href="#" class="title">很长很长很长很长很长很长很长的标题</a>
							<span class="author">xx老师</span>
							<span class="public-time">2017-04-13</span>
						</li>
						<li>
							<a href="#" class="title">很长很长很长很长很长很长很长的标题</a>
							<span class="author">xx老师</span>
							<span class="public-time">2017-04-13</span>
						</li>
						<li>
							<a href="#" class="title">很长很长很长很长很长很长很长的标题</a>
							<span class="author">xx老师</span>
							<span class="public-time">2017-04-13</span>
						</li>
						<li>
							<a href="#" class="title">很长很长很长很长很长很长很长的标题</a>
							<span class="author">xx老师</span>
							<span class="public-time">2017-04-13</span>
						</li>
						<li>
							<a href="#" class="title">很长很长很长很长很长很长很长的标题</a>
							<span class="author">xx老师</span>
							<span class="public-time">2017-04-13</span>
						</li>
						<li>
							<a href="#" class="title">很长很长很长很长很长很长很长的标题</a>
							<span class="author">xx老师</span>
							<span class="public-time">2017-04-13</span>
						</li>
						<li>
							<a href="#" class="title">很长很长很长很长很长很长很长的标题</a>
							<span class="author">xx老师</span>
							<span class="public-time">2017-04-13</span>
						</li>
						<li>
							<a href="#" class="title">很长很长很长很长很长很长很长的标题</a>
							<span class="author">xx老师</span>
							<span class="public-time">2017-04-13</span>
						</li>
						<li>
							<a href="#" class="title">很长很长很长很长很长很长很长的标题</a>
							<span class="author">xx老师</span>
							<span class="public-time">2017-04-13</span>
						</li>
					</ul>	
				</div>
			</div>
		</div>
	</div>

	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/normal.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/departmentpage.css">
</body>
</html>