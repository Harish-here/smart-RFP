let forProd = false;

function decide(prod,local){
    return (forProd) ? prod : local;
}

export default {
    getQues : decide('http://www.hobse.com/demo/index.php/customer/rfp/getQues','https://api.myjson.com/bins/l9br3'),
    sendQues : decide('http://www.hobse.com/demo/index.php/customer/rfp/sendQues','http://localhost/'),
    forProd : forProd,
    getBasic : decide('','https://api.myjson.com/bins/wiulf'),
    sendBasic: decide('','http://localhost/')
}