<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="renderer" content="webkit">
	<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
	<title>个人信息</title>
	<link rel="shortcut icon" href="${pageContext.request.contextPath}/resources/images/websiteicon.ico" type="image/vnd.microsoft.icon">
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/jsdist/require.min.js" defer async="true" data-main="${pageContext.request.contextPath}/resources/jsdist/personalpageMain-min.js"></script>
</head>
<body>
	<div id="warning">
		<p>促进互联网水平发展，你我共同有责 :)</p>
		<p>导致这样的问题：<br>1、你使用的浏览器是兼容ie模式 请切换其兼容；<br>2、你的浏览器版本太旧，请点击下面两个图标下载新版本浏览器<br>感谢你的合作</p>
		<p>请使用ie10以上 或 谷歌，360或火狐浏览器登陆此网页</p>
		<p>
			<a href="http://rj.baidu.com/soft/detail/14744.html?ald" class="link-chrome" title="下载谷歌浏览器" target="_blank">
				<img src="${pageContext.request.contextPath}/resources/images/chrome.png" alt="">
			</a>
			<a href="http://rj.baidu.com/soft/detail/11843.html?ald" class="link-firefox" title="下载火狐浏览器" target="_blank">
				<img src="${pageContext.request.contextPath}/resources/images/firefox.png" alt="">
			</a>
		</p>
	</div>
	<div id="modify-personal-email-floor">
		<div class="modify-personal-email-wrap">
			<div class="close-btn clearfix">
				<button type="button" class="close" aria-label="Close" id="modifyemail-close-btn">×</button>
			</div>
			<h3>修改邮箱</h3>
			<div class="input-wrap">
				<label>新邮箱</label>
				<input type="text" name="email" id="newEmail">
				<p id="modify-new-email-hint"></p>
			</div>
			<div class="input-wrap">
				<button class="btn btn-primary" disabled="true" id="confirm-modifyemail">修改</button>
			</div>
		</div>
	</div>
	<div id="modify-personal-name-floor">
		<div class="modify-personal-name-wrap">
			<div class="close-btn clearfix">
				<button type="button" class="close" aria-label="Close" id="modifyname-close-btn">×</button>
			</div>
			<h3>修改用户名</h3>
			<div class="input-wrap">
				<label>用户名</label>
				<input type="text" id="newUsername">
				<p id="modify-new-name-hint"></p>
			</div>
			<div class="input-wrap">
				<button class="btn btn-primary" disabled="true" id="confirm-modify">修改</button>
			</div>
		</div>
	</div>
	<div class="wrapper">
		<div class="main-content">
			<h3>个人信息列表</h3>
			<p class="personal-info-wrap">
				<span>姓名</span>
				<span id="personal-name">${AccountInfo.name}<shiro:principal property="name"/></span>
				<a href="#" id="modify-btn">修改</a>
			</p>
			<p class="personal-info-wrap">
				<span>账号</span>
				<span id="personal-account">${AccountInfo.username}<shiro:principal property="username"/></span>
			</p>
			<p class="personal-info-wrap">
				<span>系别</span>
				<span id="personal-department">${AccountInfo.depContent}<shiro:principal property="depContent"/></span>
			</p>
			<p class="personal-info-wrap">
				<span>专业</span>
				<span id="personal-specified">${AccountInfo.content}<shiro:principal property="content"/></span>
			</p>
			<p class="personal-info-wrap">
				<span>邮箱</span>
				<span id="personal-email">${AccountInfo.mail}<shiro:principal property="mail"/></span>
				<a href="#" id="modify-email">修改</a>
			</p>
			<p class="personal-info-wrap">
				<a href="${pageContext.request.contextPath}/" class="return-homepage">返回主页</a>
			</p>
		</div>
	</div>
	
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/cssdist/personalpage-min.css">
	<script type="text/javascript">
		
		(function checkBrownser(){
			var agent=navigator.appName //获取浏览器名字
			var version=navigator.appVersion.split(";"); //获取浏览器详细信息
			var trim_Version=version[1].replace(/[ ]/g,"");//获取浏览器版本号
			var model = document.documentMode;
			var floor = document.getElementById("warning");
			var loadingFloor = document.getElementById("loading-file-floor");

			if(agent=="Microsoft Internet Explorer" && (trim_Version=="MSIE7.0" || trim_Version=="MSIE8.0" || trim_Version=="MSIE9.0") || model < 10) { 
				floor.style.display = "block";
			}else{
				floor.style.display = "none";
			}
		}());
		
	</script>
</body>
</html>