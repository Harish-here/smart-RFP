let forProd = false;

function decide(prod,local){
    return (forProd) ? prod : local;
}

export default {
    getQues : decide('http://www.hobse.com/demo/index.php/customer/rfp/getQues','https://api.myjson.com/bins/l9br3'),
    sendQues : decide('http://www.hobse.com/demo/index.php/customer/rfp/sendQues','https://localhost/'),
    forProd : forProd
}