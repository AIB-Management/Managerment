<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv = "X-UA-Compatible" content ="IE=Edge"/> 
	<title>主页</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/require.min.js" defer async="true" data-main="${pageContext.request.contextPath}/resources/js/departmentpageMain.js?20170605-13"></script>
</head>
<body>
	<div id="upload-file-floor">
		<div class="upload-file-wrap">
			<div class="close-btn clearfix">
				<button type="button" class="close" aria-label="Close" id="uploadfile-close-btn"><span aria-hidden="true">&times;</span></button>
			</div>
			<h3 class="upload-file-title">上传文件</h3>
			<div class="upload-file-content">
				<input type="file" name="file" id="fileupload" multiple="true">
			</div>
		</div>
	</div>

	<div class="wrapper">
		<div class="header">
			<div class="title-wrap">
				<h3><shiro:principal property="depContent"/>主页</h3>
			</div>
			<div class="header-tag">
				<a href="${pageContext.request.contextPath}/content/toId.action" id="manage-msg">管理信息</a>
			</div>
			<div class="header-tag overide">
				<span>|</span>
			</div>
			<div class="header-tag" id="user-name-wrap">
				<span id="user-name"><shiro:principal property="name"/></span>
			</div>
			<div id="user-operate">
				<ul>
					<li><a href="${pageContext.request.contextPath}/content/personalpage.action">个人信息</a></li>
					<li><a href="${pageContext.request.contextPath}/public/modifyPassword.action">修改密码</a></li>
					<li id="logout-btn"><a href="${pageContext.request.contextPath}/shiro/logout">退出</a></li>
				</ul>
			</div>
		</div>
		<div id="bread-crumb">
			<b class="crumb-hint">当前路径：</b>
			<ul class="breadcrumb" id="breadcurmb-nav-wrap"></ul>
			<div id="hidden-meun-item-btn">
				<button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="show-hidden-menu">
					<span class="caret"></span>
				</button>
				<ul id="overflow-item-wrap"></ul>
			</div>
		</div>
		

		<div class="mainbody">
			<div class="content">
				<div class="main-tool-bar">
					<button class="btn btn-primary btn-sm" id="upload-file-btn">
						<span class="glyphicon glyphicon-cloud-upload"></span>
						上传文件
					</button>
					<button class="btn btn-default btn-sm" id="delete-file">
						<span class="glyphicon glyphicon-trash"></span>
						删除文件
					</button>
				</div>
				<div class="main-content-title">
					<div class="content-select">选择</div>
					<div class="content-name">名称</div>
					<div class="content-author">上传者</div>
					<div class="content-publish-time">上传时间</div>
					<div class="content-edit-btn">操作</div>
				</div>
				<table class="table table-striped table-hover main-content-wrap">
					<tbody id="main-content-list">
						<tr>
							<td class="item-selectbox">
								<input type="checkbox" class="disabled">
							</td>
							<td class="file-name floder">
								<a href="#">文件夹1</a>
							</td>
							<td class="item-author">xx老师</td>
							<td class="ite-publish-time">2016-06-09-12:58</td>
							<td class="operate-btn">
								<button class="btn btn-default btn-sm">
									<span class="glyphicon glyphicon-edit"></span>修改文件
								</button>
							</td>
						</tr>
						<tr>
							<td class="item-selectbox">
								<input type="checkbox" class="disabled">
							</td>
							<td class="file-name floder">
								<a href="#">文件夹1</a>
							</td>
							<td class="item-author">xx老师</td>
							<td class="ite-publish-time">2016-06-09-12:58</td>
							<td class="operate-btn">
								<button class="btn btn-default btn-sm">
									<span class="glyphicon glyphicon-edit"></span>修改文件
								</button>
							</td>
						</tr>
						<tr>
							<td class="item-selectbox">
								<input type="checkbox" class="disabled">
							</td>
							<td class="file-name floder">
								<a href="#">文件夹1</a>
							</td>
							<td class="item-author">xx老师</td>
							<td class="ite-publish-time">2016-06-09-12:58</td>
							<td class="operate-btn">
								<button class="btn btn-default btn-sm">
									<span class="glyphicon glyphicon-edit"></span>修改文件
								</button>
							</td>
						</tr>
						<tr>
							<td class="item-selectbox">
								<input type="checkbox" class="disabled">
							</td>
							<td class="file-name floder">
								<a href="#">文件夹1</a>
							</td>
							<td class="item-author">xx老师</td>
							<td class="ite-publish-time">2016-06-09-12:58</td>
							<td class="operate-btn">
								<button class="btn btn-default btn-sm">
									<span class="glyphicon glyphicon-edit"></span>修改文件
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/fileinput.min.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/normal.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/departmentpage.css?20170607-10">
</body>
</html>