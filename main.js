
var courseApi='http://localhost:3000/post'
function start (){
getBDS(renderTable)
handleCreateForm()
}
start();


function getBDS(callback){
 fetch(courseApi)
 .then(function(response){
   return response.json()
 })
 .then(callback)
}



function renderTable(courses){
  var tableBDS = document.querySelector('#table2')
  var htmls= courses.map(function (course,index) {
   return `<tr>
    <td>${index+1}</td>
    <td><a class="thea" href"${course.link}">${course.link}</a></td>
    <td>${course.quan}-Hồ Chí Minh</td>
    <td>${course.area} m2</td>
    <td id="priceBDS(${index})" >${course.price} Tỷ</td>
    <td>${course.title}</td>
    <td class="giaBDS2"><button class="giaBDS" onclick="passvalue()" ><a href="/form.html"><i class="fas fa-money-bill-wave-alt"></i></a></button></td>
    <td><button onclick="valueLink(${index})" onclick="final()"><a href="${course.link}"><i class="fas fa-shopping-cart"></i></a></button></td>
  </tr>`
  })
  tableBDS.innerHTML=htmls.join('');
}

function valuePrice(index){
  var listCourse = courses .find(function(course,index){
      console.log(index)
      return course.price 
  })
  console.log( listCourse)
}


function getSelectValue(selectValue){
  var selectValue= document.getElementById("list").value;
  
  var options={
    method:'GET',
  }
  fetch(courseApi +"?quan="+selectValue,options)
      .then(function(response){
        return response.json();
      })
      .then(function(post1){
        renderTable(post1)
      })
}

function locPrice(){
  var selectValue= document.getElementById("list1").value;
  var selectValue1= document.getElementById("list2").value;
  console.log(selectValue,selectValue1)
  var options={
    method:'GET',
  }
  fetch(courseApi +"?price_gte="+selectValue+"&"+"price_lte="+selectValue1,options)
      .then(function(response){
        return response.json();
      })
      .then(function(post2){
        renderTable(post2)
      })
}
function locArea(){
  var selectValue= document.getElementById("dt1").value;
  var selectValue1= document.getElementById("dt2").value;
  console.log(selectValue,selectValue1)
  var options={
    method:'GET',
  }
  fetch(courseApi +"?area_gte="+selectValue+"&"+"area_lte="+selectValue1,options)
      .then(function(response){
        return response.json();
      })
      .then(function(post2){
        renderTable(post2)
      })
}


function handleCreateForm(){

    var createBtn= document.querySelector('#index')
    createBtn.onclick=function(name){
      var name= document.querySelector('input[name="name"]').value
      var options={
        method:'GET',
        
      }
      fetch(courseApi +"?q="+name,options)
      .then(function(response){
        return response.json();
      })
      .then(function(post){
        renderTable(post)
      })}
  
}
var table = document.getElementsByTagName("table")[0];
var cells = table.getElementsByTagName("td"); 

function passvalue(){
    var table = document.getElementById("table"); 
    for(var i = 1; i < cells.length; i++){

var cell = cells[i];

cell.onclick =  function(){
var rowIndex = this.parentNode.rowIndex;
localStorage.setItem("textvalue",table.rows[rowIndex].cells[4].innerHTML);        
}}   
return false;
}
function tienVon() {
  alert("Bạn đã nhập tiền vốn và tiền lương thành công")
  var tienVon=document.getElementById("tien_von").value
  localStorage.setItem("tienvon",tienVon)
  var tienLuong=document.getElementById("tien_luong").value
  localStorage.setItem("tienluong",tienLuong)
}


