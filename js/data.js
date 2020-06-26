window.onload=function(){
	var date = new Date();
	getDate(date);
}
function getDate(date){
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	var dates = ""+year+"年0"+month+"月"+day+"日";
	var iterDate = new Date(year,month,0);//用于遍历当前时间的天数
	var days = iterDate.getDate();//获取当前时间的总天数
	var iptDate = document.querySelector("#date");	//获取显示当前时间的输入框
	iptDate.value = dates	//将当前时间赋值给输入框
	var tbody = document.getElementsByTagName("tbody")[0];//获取tbody
	
	var index = 1;//天数的下标

	var trNum = days/7==0?~~(days/7):~~(days/7+1);//计算有多少行

	var flag = false;
	var flag1 = false;
	var flag2 = false;
	for(var i = 1;i<=~~trNum;i++){//循环行
		var tr = document.createElement("tr");//创建行
		if(i==trNum){//如果i等于行数时判断天数的下标是否小于等于最大天数
			if(index<=days){//如果天数下标小于总天数时则在添加行
				trNum=trNum+1;
			}else{
				return;
			}
		}
		var temp = 1;

		for(var col=1;col<8;col++){//循环列

			if(index>days){//判断index是否大于总天数
				//tbody.appendChild(tr);
				var nextDate = new Date(year,month+1);//下月时间
				//填充剩余列
				for(var k=1;k<=7-(temp-1);k++){
					nextDate.setDate(k);
					tianchongcol(tr,nextDate)
				}
				tbody.appendChild(tr);
				return;
			}else{
				iterDate.setDate(index);//通过下标设置天数
				if(iterDate.getDate()==1 && iterDate.getDay()==0){//判断某月的第一天是否是星期日
						
					//iterDate.setDate(index);
					judyIsCurrentMonth(tr,day,iterDate,temp);
					//temp++;
					flag = true;
				}else{
					if(flag){//如果flag为true说明当前月第一天是周日
						judyIsCurrentMonth(tr,day,iterDate,temp);
						temp++;
					}else{
						var preDate = new Date(year,iterDate.getMonth(),0)
						var preDateMaxDay = preDate.getDate();
						
						
						if(!flag1){
							//如果当前月的第一天不是周日，获取到星期对应数值进行填充列
							var num = iterDate.getDay();//获取星期对应数值返回0-6
							var num1 = num;
							for(var w=0;w<num;w++){//填充列
								preDate.setDate(preDateMaxDay-(--num1));
								tianchongcol(tr,preDate)
								col=w;
								temp++;
							}
							flag1 = true;
						}else{
							if(!flag2){//重新设置index
								index=1;
								iterDate.setDate(index);	
								flag2 = true;	
							}
							
							if(temp>7){
								break;
							}
							judyIsCurrentMonth(tr,day,iterDate);
							temp++;
						}
					}
				}				
			}
			index++;
		}
		tbody.appendChild(tr);
	}
}
var tr = document.getElementsByTagName("tr")[0];
var preMonth = tr.children[1];
preMonth.onclick = function(){//上月
	changDate(0,2);
}
var nextMonth = tr.children[3];//下月
nextMonth.onclick = function(){
	changDate(0,0);	
}
//将输入框中的日期解析
function format(dataValue){
	var yearIndex = dataValue.indexOf("年")
	var monthIndex = dataValue.indexOf("月")
	var dayndex = dataValue.indexOf("日")
	var year = dataValue.substring(0,yearIndex);
	var month = dataValue.substring(yearIndex+1,monthIndex);
	var day = dataValue.substring(monthIndex+1,dayndex);
	return new Date(year,month,day);
}

var preYear = tr.children[0];//上一年
var nextYear = tr.children[4];//下一年
preYear.onclick = function(){
	changDate(1,1)
}
nextYear.onclick = function(){	
	//第一个参数是年份的递增数，因为这个方法里对年份执行的是减
	//运算，因此参数是-1
	//第二个参数是月份的被减数，因为得到的始终是当前月，因此传1
	//减的时候month就成了5，getDate中还对month执行了+1操作因此始终
	//是6
	changDate(-1,1)
}

//年月切换
function changDate(year,month){
	var addtime = document.getElementById("date").value;
	var tbody = document.getElementsByTagName("tbody")[0];
	tbody.innerHTML="";
	var date = format(addtime);
	console.log(date.getMonth()-month)
	var preDate = new Date((date.getFullYear()-(year)),date.getMonth()-month,date.getDate());
	getDate(preDate);	
	return preDate;
}
function judyIsCurrentMonth(tr,day,iterDate){
	var td = document.createElement("td");
		if(iterDate.getDate()==day){//判断天数是否是当前天数，如果是改变字体颜色
			td.style.color="#0edecb";
		}else{			
			td.style.color="#06587d";
		}
	td.innerText = iterDate.getDate();
	tr.appendChild(td);
}
function tianchongcol(tr,preDate){
	var td = document.createElement("td");
	td.style.color = "darkgray";	
	td.innerText = preDate.getDate();
	tr.appendChild(td);
}
