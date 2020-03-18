var rules = document.querySelectorAll(".rules")
var user=document.getElementById("#user")
var tel=document.getElementById("#tel")
var pwd=document.getElementById("#pwd")
var chec=document.getElementById("#chec")
var btn=document.getElementById("#btn")
var sub=document.getElementById("#sub")
var stamp0 = false, stamp1 = false, stamp2 = false;

//用户名验证
user.onfocus=function(){
    rules[0].innerHTML = "设置后不可更改，中英文均可，最长14个英文或7个汉字";
}
user.onblur=function(){
    var uname = this.value.trim();
    //是否输入该项
    if(user.value==""){
        rules[0].innerHTML = "请输入用户名";
        rules[0].style.color = "red";
        return; 

    }
    //是否含有非法字符
    var re=new RegExp("[^a-zA-Z0-9\_\u4e00-\u9fa5]","i");
    if(re.test(user.value)){
        rules[0].innerHTML = "用户名仅支持中英文、数字和下划线,且不能为纯数字";
        rules[0].style.color = "red";
        return; 

    }else{
        //是否是纯数字
        var regu= /[^0-9]/;
        var reg=new RegExp(regu);
        if(!reg.test(user.value)){ 
            rules[0].innerHTML = "用户名仅支持中英文、数字和下划线,且不能为纯数字";
            rules[0].style.color = "red"; 
            return; 
        }
        //中英文长度
        var len = 0;    
        for (var i = 0; i < uname.length; i++ ) {
        // 如果是中文，就+2；否则+1
            if (/[^\x00-\xff]/.test(uname[i])) {
                len += 2;
            } else {
                len += 1;
            }                
            if (len > 14) {
                break;
            }
        }                   
        // 判断是否满足条件
        if(len > 14){
            rules[0].innerHTML = "用户名不能超过7个汉字或14个字符";
            rules[0].style.color = "red";
            return;
        }else{
            rules[0].innerHTML= "";
            stamp0=true;
            return;
        }
    }
}
//手机号码正则验证
tel.onblur=function(){
    var regu=/^1\d{10}$/;
    var re=new RegExp(regu);
    if(!re.test(tel.value)){ 
        if(tel.value==''){
            rules[1].innerHTML = "请输入手机号码";
            rules[1].style.color = "red";
            return;
        }else{
            rules[1].innerHTML = "手机号码格式不正确";
            rules[1].style.color = "red";
            return;

        }           
    }else{
        rules[1].innerHTML = "";  
        stamp1=true;      
    }
};
//密码验证
pwd.onfocus=function(){
    rules[2].innerHTML = "长度为8~14个字符,字母/数字以及标点符号至少包含2种,不允许有空格、中文";
};
pwd.onblur=function(){
    var regu = /(?!.*\s)(?!^[\u4e00-\u9fa5]+$)(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,14}$/;
    var re=new RegExp(regu);    
    if(!re.test(pwd.value)){
        if(pwd.value=''){
            rules[2].innerHTML = "密码不能为空";
            rules[2].style.color = "red";
            return;
        }else{
            rules[2].innerHTML = "密码设置不符合要求";
            rules[2].style.color = "red";
            return;
        }
        
    }
    else{
        rules[2].innerHTML = "";
        stamp2=true;

    }
}

//获取验证码倒计时
function showtime(t){
	document.myform.phone.disabled=true;
	for(i=1;i<=t;i++) {
		window.setTimeout("update_p(" + i + ","+t+")", i * 1000);
	}

}
function update_p(num,t) {
	if(num == t) {
        rules[3].innerHTML = "请求超时，请稍后再试";
        rules[3].style.color = "red";
		document.myform.phone.value =" 重新发送 ";
		document.myform.phone.disabled=false;
	}
	else {
		printnr = t-num;
		document.myform.phone.value = " (" + printnr +")秒后重新发送";
	}
}

//表单验证
sub.onclick = function (){
    if (btn.checked == true && stamp0 ==true &&stamp1 == true && stamp2 == true ){
        alert("注册成功");
    }
}