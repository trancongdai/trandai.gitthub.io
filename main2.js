
// function TienCanVay(){
   
//     console.log(TienVay)
// }

// function tinh(){
//     var TienDat1=localStorage.getItem("textvalue")
//     var TienDat=parseInt(TienDat1)*1000000000
//     var TienLuong=document.getElementById("luong").value
//     TienCanVay=TienDat-TienLuong
//     document.getElementById("result2").innerHTML = `<span>${TienCanVay}</span>`
// }

var TienLuong=localStorage.getItem("tienluong")
var TienDat1=localStorage.getItem("textvalue")
var TienDat=parseInt(TienDat1)*1000000000
var TienVon=localStorage.getItem("tienvon")
var TienVay=TienDat-TienVon
var ThoiGian=TienVay/TienLuong
var tienVay=document.getElementById('money').value=updateNumber(TienVay);
var time = document.getElementById('time').value=ThoiGian;

var lai = document.getElementById('lai');

var body = document.getElementById('body');

function final() {

    if(ThoiGian>100){
        alert("Bạn nên xem lại tài chính trước khi mua !!!")
    }
    //
    var TienDat1=localStorage.getItem("textvalue")
    var TienDat=parseInt(TienDat1)*1000000000
    var TienVon=localStorage.getItem("tienvon")
    var TienVay=TienDat-TienVon
    //
    var tienGoc1 = TienVay;
    var tienGoc=tienGoc1;
    var thoiGianVay = time;
    var ngayGiaiNgan = new Date();
    var laiSuat = 8;

   
    result(tienGoc, laiSuat, thoiGianVay, ngayGiaiNgan)
}

//Tính tiền gốc hàng tháng
function calculateTienGoc(tienGoc, time) {
    let tienGocHangThang = tienGoc/time;
    return tienGocHangThang;
}

// Tính tiền lãi hàng tháng
function calculateTienLai(gocConLai, lai) {
    let tienLaiHangThang = gocConLai*(lai/100)/12;
    return tienLaiHangThang;
}

// Tính toán
function result(tienGoc, laiSuat, time, ngayGiaiNgan) {
    var tienGocConLai = tienGoc;
    var gocHangThang = calculateTienGoc(tienGoc, time);
    var tongTienPhaiTra = 0;
    var tongTienLai = 0;
    taoBang(ngayGiaiNgan, 0, tienGocConLai)
    for(let i = 1; i <= time; i++){
        var laiHangThang = calculateTienLai(tienGocConLai, laiSuat)
        var tienPhaiTraHangThang = laiHangThang + gocHangThang;
        tienGocConLai = tienGocConLai - gocHangThang;

        
        ngayGiaiNgan.setMonth(ngayGiaiNgan.getMonth() + 1)
        updateDate(ngayGiaiNgan)
        taoBang(ngayGiaiNgan, i, tienGocConLai, gocHangThang, laiHangThang, tienPhaiTraHangThang )
        tongTienPhaiTra += gocHangThang
        tongTienLai += laiHangThang

    }

    taoHangTongKq(tongTienPhaiTra, tongTienLai, tongTienPhaiTra + tongTienLai)
}

// hiển thị kết quả
function taoBang(ngayGiaiNgan, index, gocConLai, gocHangThang, laiHangThang, tienPhaiTraHangThang) {
    var hang = body.insertRow(-1);
    var cot1 = hang.insertCell(0);
    var cot2 = hang.insertCell(1);
    var cot3 = hang.insertCell(2);
    var cot4 = hang.insertCell(3);
    var cot5 = hang.insertCell(4);
    var cot6 = hang.insertCell(5);

    if(index == 0) {
        cot1.innerText = updateDate(ngayGiaiNgan);
        cot2.innerText = index;
        cot3.innerText = updateNumber(gocConLai);
        cot4.innerText = '';
        cot5.innerText = '';
        cot6.innerText = '';
    } else {
        cot1.innerText =ngayGiaiNgan;
        cot2.innerText = index;
        cot3.innerText = updateNumber(gocConLai);
        cot4.innerText = updateNumber(gocHangThang);
        cot5.innerText = updateNumber(laiHangThang);
        cot6.innerText = updateNumber(tienPhaiTraHangThang);
    }
}

// Tạo hàng cuối tính tổng
function taoHangTongKq(tongGoc, tongLai, tongTienPhaiTra) {
    var hang = body.insertRow(-1);
    var cot1 = hang.insertCell(0);
    var cot2 = hang.insertCell(1);
    var cot3 = hang.insertCell(2);
    var cot4 = hang.insertCell(3);
    var cot5 = hang.insertCell(4);
    var cot6 = hang.insertCell(5);

    cot1.innerHTML = `<b> Tổng </b>`;
    cot2.innerHTML = '';
    cot3.innerHTML = '';
    cot4.innerHTML = `<b> ${updateNumber(tongGoc)} </b>`;
    cot5.innerHTML = `<b> ${updateNumber(tongLai)} </b>`;
    cot6.innerHTML = `<b> ${updateNumber(tongTienPhaiTra)} </b>`;
}

// Update lại ngày
function updateDate(date) {
    var date = new Date()
    return date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
}

// Update lại số
function updateNumber(number) {
   return Math.round(number).toLocaleString();
}
//

function FormatCurrency(ctrl) {
    //Check if arrow keys are pressed - we want to allow navigation around textbox using arrow keys
    if (event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40) {
        return;
    }

    var val = ctrl.value;

    val = val.replace(/,/g, "")
    ctrl.value = "";
    val += '';
    x = val.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';

    var rgx = /(\d+)(\d{3})/;

    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }

    ctrl.value = x1 + x2;
}

function CheckNumeric() {
    return event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode == 46;
}
document.getElementById("result").value = localStorage.getItem("textvalue");

window.onload=function() {
    document.getElementById('tinh').click();
}