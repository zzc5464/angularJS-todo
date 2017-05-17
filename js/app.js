(function (angular) {
	'use strict';
/*
	自执行函数只依赖传进来的参会,并不依赖全局的某个变量
	所以这边我们不用传window,传angular就行了
*/

// 创建模块
/**
* myToDo Module
*
* Description
*/
var myApp = angular.module('myToDo', []);
// 创建主要的控制器
myApp.controller('mainController', ['$scope', function($scope){
	//文本数据
	$scope.text = '';
	//任务列表
	$scope.toDos = [
	/*这边写的就是你要用到的一些数据结构
	id,做程序最好都要写id,不管有没有用
	text就比如我们要写进去的任务项
	completed记录有没有被完成*/
		{id:1,text:'读书',completed:false},
		{id:2,text:'数据',completed:false},
		{id:3,text:'滴滴滴',completed:true},
	];
	// 写add方法
	$scope.add = function(){
		if(!$scope.text) {
			return;
		}
	/*给todos这个数组添加一个对象
	id是原数组的长度+1
	text就是之前绑定的$scope.text
	completed直接写死,因为任务不可能直接完成*/
		$scope.toDos.push({
			id:Math.random(),
			text:$scope.text,
			completed:false
		})
		$scope.text = '';
		//添加完成后再清空一下文本框
	}
	//删除
	$scope.remove = function( id ){
		for (var i = 0; i < $scope.toDos.length; i++) {
			if( $scope.toDos[i].id === id) {
				$scope.toDos.splice(i,1);
				break;
			}
		}
	}
	//清除完成项目
	/*这里无法通过直接删除的方法,因为当你删掉一个之后,数组的长度发生变化了
	就无法通过.length来继续遍历了
	最好的方式是,
	新建一个数组
	判断有completed的就给他加到数组里面
	然后$scope.toDos = 这个新的数组*/
	$scope.clear = function(){
		var r = [];
		for (var i = 0; i < $scope.toDos.length; i++) {
			if( !$scope.toDos[i].completed) {
				r.push($scope.toDos[i])
			}
		}
		$scope.toDos = r;
	}
	//判断有完成项目时,才会出现清空完成项目的按钮
	/* 遍历所有项目,有完成项目的时候返回true,
	便利完没有就返回false*/
	$scope.completeds = function(){
		for (var i = 0; i < $scope.toDos.length; i++) {
			if( $scope.toDos[i].completed) {
				return true;
			}
		}
		return false;
	}
	/*编辑框效果*/
	$scope.currentEditingId = -1;
	$scope.editing = function( id ){
		$scope.currentEditingId = id;
	}
	/*敲回车保存效果*/
	$scope.save = function(){
		$scope.currentEditingId = -1;
	}

	/*全选反选切换*/
	var now = true;
    $scope.toggleAll = function() {
      for (var i = 0; i < $scope.toDos.length; i++) {
        $scope.toDos[i].completed = now;
      }
      now = !now;
    }

}])

})(angular);
