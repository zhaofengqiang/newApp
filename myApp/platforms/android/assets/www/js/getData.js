var app = angular.module("app", ["ionic"]);
//定义路由,路由
app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
	$stateProvider.state("index", {
		url: "/index",
		templateUrl: "html/index.html",
		controller: "indexCtrl"
	}).state("detail", {
		//这里的是变量对应的
		url: "/detail/:type/:id",
		templateUrl: "html/detail.html",
		controller: "detailCtrl"
	}).state("index.a", {
		url: "/a",
		templateUrl: "html/indexA.html",
		controller: "indexActrl"
	}).state("index.b", {
		url: "/b",
		templateUrl: "html/indexB.html",
		controller: "indexBctrl"
	}).state("index.c", {
		url: "/c",
		templateUrl: "html/indexC.html",
		controller: "indexCctrl"
	}).state("index.d", {
		url: "/d",
		templateUrl: "html/indexD.html",
		controller: "indexDctrl"
	}).state("index.e", {
		url: "/e",
		templateUrl: "html/indexE.html",
		controller: "indexEctrl"
	}).state("index.f", {
		url: "/f",
		templateUrl: "html/indexF.html",
		controller: "indexFctrl"
	}).state("index.seach", {
		//加入设置页面路由
		url: "/seach",
		templateUrl: "html/seach.html",
		controller: "indexSeach"
	}).state("index.collect", {
		//加入设置页面路由
		url: "/collect",
		templateUrl: "html/collect.html",
		controller: "indexCollect"
	})
	$urlRouterProvider.when("", "/index/a");
}]);
app.controller("indexSeach", ["$scope", function($scope) {
	$scope.name = "设置页面路由"
}]);
app.controller("indexCollect", ["$scope", function($scope) {
	$scope.name = "conllect"
}])

app.controller("indexCtrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {

	$scope.on = true;
	console.log("执行了controller index的内容");

	$scope.doRefresh = function() {
		console.log("执行了刷新 了")
		$scope.arrs = [];
		$http.get('http://route.showapi.com/109-35', {
				params: {
					'showapi_appid': 25350,
					'showapi_sign': '5572a108b3cdc86cf39001cd',
					'page': $rootScope.pageNum,
					'needContent': 1, //是否需要返回正文，1为需要，其他为不需要
					'maxResult': 20 //每
				}
			}).success(function(data) {
				console.log(data);
				//      		console.log(data.showapi_res_body.pagebean.contentlist[$state.params.id])
				//$scope.new = data.showapi_res_body.pagebean.contentlist[$state.params.id];
				$scope.arrs = $scope.arrs.concat(data.showapi_res_body.pagebean.contentlist);
				$scope.news = $scope.arrs;
			})
			.finally(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});
	};

}]);
//详情页代码
app.controller("detailCtrl", ["$scope", "$http", "$state", "$rootScope", function($scope, $http, $state, $rootScope) {
	console.log("详情页")
	$scope.channelId = "";
	console.log($state.params);
	switch($state.params.type)

	{

		case "a":
			$scope.channelId = "5572a108b3cdc86cf39001cd";
			console.log("a");
			break;
		case "b":
			$scope.channelId = "5572a108b3cdc86cf39001cf";
			console.log("b");
			break;
		case "c":
			$scope.channelId = "5572a109b3cdc86cf39001db";
			console.log("c");
			break;
		case "d":
			$scope.channelId = "5572a108b3cdc86cf39001d3";
			console.log("d");
			break;
		case "e":
			$scope.channelId = "5572a10bb3cdc86cf39001f6";
			console.log("e");
			break;
		case "f":
			$scope.channelId = "5572a10bb3cdc86cf39001f7";
			console.log("f");
			break;

	}
	//获取到当前的点击的是多少详情页面,并赋值给全局的
	$rootScope.id = $state.params.id;
	$http.get("http://route.showapi.com/109-35", {
		params: {
			'showapi_appid': 25350,
			'showapi_sign': '5572a108b3cdc86cf39001cd',
			"channelId": $scope.channelId,
			'needContent': 1, //是否需要返回正文，1为需要，其他为不需要
			'maxResult': 20 //每
		}
	}).success(function(data) {
		//				$scope.new = data.showapi_res_body.pagebean;
		console.log($state.params.id)
		console.log(data.showapi_res_body.pagebean.contentlist)
		$scope.detail = data.showapi_res_body.pagebean.contentlist[$state.params.id];

	})

}])

//获取第一页的页面内容
app.controller("indexActrl", ["$scope", "$http", "$rootScope", "$state", function($scope, $http, $rootScope, $state) {
	$scope.pageNum = 1;
	$scope.loading = true;
	$scope.arrs = [];
	$scope.type = $state.current.url;
	//$rootScope.channelId="";
	console.log($scope.type);
	//console.log($rootScope.channelId);
	console.log("执行了indexA页面");

	//定义一个全局函数
	var getNews = function(channelId) {
		$http.get("http://route.showapi.com/109-35", {
			params: {
				'showapi_appid': 25350,
				'showapi_sign': "5572a108b3cdc86cf39001cd",
				'page': $scope.pageNum,
				"channelId": channelId,
				'needContent': 1, //是否需要返回正文，1为需要，其他为不需要
				'maxResult': 20 //每
			}
		}).success(function(data) {
			$scope.loading = false;
			//将获取的页面的详情页， 保存对应的唯一ID；
			$rootScope.channelId = data.showapi_res_body.pagebean.contentlist[0].channelId;
			//这里是获取的数据
			console.log($rootScope.channelId);
			//这里是获取的下标
			//数据已经获取到了
			$scope.arrs = $scope.arrs.concat(data.showapi_res_body.pagebean.contentlist);
			console.log($scope.arrs);
			$scope.news = $scope.arrs;

		})
	};
	$scope.loadMore = function() {
			console.log("click");
			$scope.loading = true;
			$scope.pageNum++;
			getNews("5572a108b3cdc86cf39001cd");
		}
		//调用函数
	getNews("5572a108b3cdc86cf39001cd");

}]);

//第二页
app.controller("indexBctrl", ["$scope", "$http", "$rootScope", "$state", function($scope, $http, $rootScope, $state) {
	$scope.pageNum = 1;
	$scope.loading = true;
	$scope.arrs = [];
	$scope.type = $state.current.url;
	//$rootScope.channelId="";
	console.log($scope.type);
	//console.log($rootScope.channelId);
	console.log("执行了indexB页面");

	//定义一个全局函数
	var getNews = function(channelId) {
		$http.get("http://route.showapi.com/109-35", {
			params: {
				'showapi_appid': 25350,
				'showapi_sign': "5572a108b3cdc86cf39001cd",
				'page': $scope.pageNum,
				"channelId": channelId,
				'needContent': 1, //是否需要返回正文，1为需要，其他为不需要
				'maxResult': 20 //每
			}
		}).success(function(data) {
			$scope.loading = false;

			//将获取的页面的详情页， 保存对应的唯一ID；
			$rootScope.channelId = data.showapi_res_body.pagebean.contentlist[0].channelId;
			//这里是获取的数据
			console.log($rootScope.channelId);
			//这里是获取的下标
			//数据已经获取到了
			$scope.arrs = $scope.arrs.concat(data.showapi_res_body.pagebean.contentlist);
			console.log($scope.arrs);
			$scope.news = $scope.arrs;

		})
	};
	$scope.loadMore = function() {
			console.log("click");
			$scope.loading = true;
			$scope.pageNum++;
			getNews("5572a108b3cdc86cf39001cf");
		}
		//调用函数
	getNews("5572a108b3cdc86cf39001cf");

}]);
//				"channelId": "5572a109b3cdc86cf39001db",
//				"name": "国内最新"
app.controller("indexCctrl", ["$scope", "$http", "$rootScope", "$state", function($scope, $http, $rootScope, $state) {
	$scope.pageNum = 1;
	$scope.loading = true;
	$scope.arrs = [];
	$scope.type = $state.current.url;
	//$rootScope.channelId="";
	console.log($scope.type);
	//console.log($rootScope.channelId);
	console.log("执行了indexA页面");

	//定义一个全局函数
	$rootScope.getNews = function(channelId) {
		$http.get("http://route.showapi.com/109-35", {
			params: {
				'showapi_appid': 25350,
				'showapi_sign': '5572a108b3cdc86cf39001cd',
				'page': $scope.pageNum,
				"channelId": channelId,
				'needContent': 1, //是否需要返回正文，1为需要，其他为不需要
				'maxResult': 20 //每
			}
		}).success(function(data) {
			$scope.loading = false;
			//将获取的页面的详情页， 保存对应的唯一ID；
			$rootScope.channelId = data.showapi_res_body.pagebean.contentlist[0].channelId;
			//这里是获取的数据
			console.log($rootScope.channelId);
			//这里是获取的下标
			//数据已经获取到了
			$scope.arrs = $scope.arrs.concat(data.showapi_res_body.pagebean.contentlist);
			console.log($scope.arrs);
			$scope.news = $scope.arrs;

		})
	};
	$rootScope.loadMore = function() {
			console.log("click");
			$scope.loading = true;
			$scope.pageNum++;
			$rootScope.getNews("5572a109b3cdc86cf39001db");
		}
		//调用函数
	$rootScope.getNews("5572a109b3cdc86cf39001db");

}]);
//写第4个外面没有嵌套的页面，"channelId": "5572a108b3cdc86cf39001d3",
//"name": "汽车焦点"

app.controller("indexDctrl", ["$scope", "$http", "$rootScope", "$state", function($scope, $http, $rootScope, $state) {
	$scope.pageNum = 1;
	$scope.loading = true;
	$scope.arrs = [];
	$scope.type = $state.current.url;
	//$rootScope.channelId="";
	console.log($scope.type);
	//console.log($rootScope.channelId);
	console.log("执行了indexA页面");

	//定义一个全局函数
	$rootScope.getNews = function(channelId) {
		$http.get("http://route.showapi.com/109-35", {
			params: {
				'showapi_appid': 25350,
				'showapi_sign': '5572a108b3cdc86cf39001cd', //这里写数据
				'page': $scope.pageNum,
				"channelId": channelId,
				'needContent': 1, //是否需要返回正文，1为需要，其他为不需要
				'maxResult': 20 //每
			}
		}).success(function(data) {
			$scope.loading = false;
			//将获取的页面的详情页， 保存对应的唯一ID；
			console.log(data)
			$rootScope.channelId = data.showapi_res_body.pagebean.contentlist[0].channelId;
			//这里是获取的数据
			//						console.log($rootScope.channelId);
			//这里是获取的下标
			//数据已经获取到了
			$scope.arrs = $scope.arrs.concat(data.showapi_res_body.pagebean.contentlist);
			console.log($scope.arrs);
			$scope.news = $scope.arrs;

		})
	};
	$rootScope.loadMore = function() {
			console.log("click");
			$scope.loading = true;
			$scope.pageNum++;
			$rootScope.getNews("5572a108b3cdc86cf39001d3");
		}
		//调用函数
	$rootScope.getNews("5572a108b3cdc86cf39001d3");

}]);

//写外面没有嵌套的页面，也就是电脑最新页面"channelId": "5572a10bb3cdc86cf39001f6",

app.controller("indexEctrl", ["$scope", "$http", "$rootScope", "$state", function($scope, $http, $rootScope, $state) {
		$scope.pageNum = 1;
		$scope.loading = true;
		$scope.arrs = [];
		$scope.type = $state.current.url;
		//$rootScope.channelId="";
		console.log($scope.type);
		//console.log($rootScope.channelId);
		console.log("执行了indexA页面");

		//定义一个全局函数
		$rootScope.getNews = function(channelId) {
			$http.get("http://route.showapi.com/109-35", {
				params: {
					'showapi_appid': 25350,
					'showapi_sign': '499321e69f444a25b436cafb9173f6c0',
					'page': $scope.pageNum,
					"channelId": channelId,
					'needContent': 1, //是否需要返回正文，1为需要，其他为不需要
					'maxResult': 20 //每
				}
			}).success(function(data) {
				//将获取的页面的详情页， 保存对应的唯一ID；
				$scope.loading = false;
				$rootScope.channelId = data.showapi_res_body.pagebean.contentlist[0].channelId;
				//这里是获取的数据
				console.log($rootScope.channelId);
				//这里是获取的下标
				//数据已经获取到了
				$scope.arrs = $scope.arrs.concat(data.showapi_res_body.pagebean.contentlist);
				console.log($scope.arrs);
				$scope.news = $scope.arrs;

			})
		};
		$rootScope.loadMore = function() {
				console.log("click");
				$scope.loading = true;
				$scope.pageNum++;
				$rootScope.getNews("5572a10bb3cdc86cf39001f6");
			}
			//调用函数
		$rootScope.getNews("5572a10bb3cdc86cf39001f6");

	}])
	//写外面没有嵌套的页面，科普最新 "channelId": "5572a10bb3cdc86cf39001f7",
app.controller("indexFctrl", ["$scope", "$http", "$rootScope", "$state", function($scope, $http, $rootScope, $state) {
	$scope.pageNum = 1;
	$scope.loading = true;
	$scope.arrs = [];
	$scope.type = $state.current.url;
	//$rootScope.channelId="";
	console.log($scope.type);
	//console.log($rootScope.channelId);
	console.log("执行了indexA页面");

	//定义一个全局函数
	$rootScope.getNews = function(channelId) {
		$http.get("http://route.showapi.com/109-35", {
			params: {
				'showapi_appid': 25350,
				'showapi_sign': '499321e69f444a25b436cafb9173f6c0',
				'page': $scope.pageNum,
				"channelId": channelId,
				'needContent': 1, //是否需要返回正文，1为需要，其他为不需要
				'maxResult': 20 //每
			}
		}).success(function(data) {
			$scope.loading = false;
			//将获取的页面的详情页， 保存对应的唯一ID；
			$rootScope.channelId = data.showapi_res_body.pagebean.contentlist[0].channelId;
			//这里是获取的数据
			console.log($rootScope.channelId);
			//这里是获取的下标
			//数据已经获取到了
			$scope.arrs = $scope.arrs.concat(data.showapi_res_body.pagebean.contentlist);
			console.log($scope.arrs);
			$scope.news = $scope.arrs;

		})
	};
	$rootScope.loadMore = function() {
			console.log("click");
			$scope.loading = true;
			$scope.pageNum++;
			$rootScope.getNews("5572a10bb3cdc86cf39001f7");
		}
		//调用函数
	$rootScope.getNews("5572a10bb3cdc86cf39001f7");

}]);

//头部组件
app.directive("xheader", function() {
		return {
			templateUrl: "html/xheader.html"
		}
	})
	//底部组件
app.directive("xfooter", function() {
	return {
		templateUrl: "html/xfooter.html"
	}
});
app.directive("xcontent", function() {
	return {
		templateUrl: "html/xcontent.html"
	}
})