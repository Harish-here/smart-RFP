let forProd = false;

function decide(prod,local){
    return (forProd) ? prod : local;
}
const prodPath = 'http://www.hobse.com/demo/index.php/customer/rfp';
export default {
    getQues : decide(prodPath+'/getQues','https://api.myjson.com/bins/l9br3'),
    sendQues : decide(prodPath+'/sendQues','http://localhost/'),
    forProd : forProd,
    getBasic : decide('','https://api.myjson.com/bins/wiulf'),
    sendBasic: decide('','http://localhost/'),
    listCity: decide('http://www.hobse.com/demo/index.php/customer/policy/listCities','https://api.myjson.com/bins/i46iz'),
    saveDraft: decide('','http://localhost/')
}