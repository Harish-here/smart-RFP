let forProd = true;

function decide(prod,local){
    return (forProd) ? prod : local;
}
const prodPath = 'http://www.hobse.com/demo/index.php/customer/rfp';
export default {
    getQues : decide(prodPath+'/getQues','https://api.myjson.com/bins/l9br3'),
    sendQues : decide(prodPath+'/sendQues','http://localhost/'),
    forProd : forProd,
    getBasic : decide(prodPath +'/getBasic','https://api.myjson.com/bins/wiulf'),
    sendBasic: decide(prodPath +'/sendBasic','http://localhost/'),
    listCity: decide('http://www.hobse.com/demo/index.php/customer/policy/listCities','https://api.myjson.com/bins/i46iz'),
    saveDraft: decide('','http://localhost/'),
    saveRfp: decide(prodPath +'/saveRfp','http://localhost/'),
    getPreview: decide('','https://api.myjson.com/bins/qxqpb'),
    sendRfp: decide(prodPath +'/sendRfp','http://localhost/'),
    getPublished: decide(prodPath +'/getPublished',"https://api.myjson.com/bins/q2duf"),
    getQuotes: decide(prodPath +'/getQuotes',"https://api.myjson.com/bins/15nxw7"),
    getQuotesReview : decide('',"https://api.myjson.com/bins/15nxw7"),//this is not done in backend
    setSlab: decide(prodPath +'/setSlab','http://localhost/'),
    getSlab: decide(prodPath +'/getSlab','https://api.myjson.com/bins/19tm0f'),
    getHotel: decide(prodPath +'/getHotel','http://localhost/')
}