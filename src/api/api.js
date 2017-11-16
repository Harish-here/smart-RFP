let forProd = true;

function decide(prod,local){
    return (forProd) ? prod : local;
}
const prodPath = 'http://www.hobse.com/demo/index.php/customer/rfp';
const prodPathH = 'http://www.hobse.com/demo/index.php/admin/rfp';
export default {
    getQues : decide(prodPath+'/getQues','https://api.myjson.com/bins/l9br3'),
    sendQues : decide(prodPath+'/sendQues','http://localhost/'),
    forProd : forProd,
    rfpDecline : decide(prodPathH+'/decline','http://localhost/'),
    getProposal: decide(prodPathH+'/getProposal','https://api.myjson.com/bins/1cvxjf'),
    getHotelPre : decide(prodPathH+'/getHotelPre','https://api.myjson.com/bins/kkg5f'),
    getEngaged: decide(prodPathH+'/getEngaged','https://api.myjson.com/bins/7iipn'),
    getBasic : decide(prodPath +'/getBasic','https://api.myjson.com/bins/wiulf'),
    acceptRfp: decide(prodPath +'/acceptRfp','http://localhost/'),
    shortlistQuote: decide(prodPath +'/shortlistQuote','http://localhost/'),
    UnshortlistQuote: decide(prodPath +'/UnshortlistQuote','http://localhost/'),
    declineQuote: decide(prodPath +'/declineQuote','http://localhost/'),
    trashRFP: decide(prodPath +'/trashRFP','http://localhost/'),
    sendBasic: decide(prodPath +'/sendBasic','http://localhost/'),
    listCity: decide('http://www.hobse.com/demo/index.php/customer/policy/listCities','https://api.myjson.com/bins/i46iz'),
    saveDraft: decide('','http://localhost/'),
    saveRfp: decide(prodPath +'/saveRfp','http://localhost/'),
    getPreview: decide(prodPath +'/getPreview','https://api.myjson.com/bins/kkg5f'),
    sendRfp: decide(prodPath +'/sendRfp','http://localhost/'),
    getPublished: decide(prodPath +'/getPublished',"https://api.myjson.com/bins/q2duf"),
    getQuotes: decide(prodPath +'/getQuotes',"https://api.myjson.com/bins/qmzfn"),
    getQuotesReview : decide('',"https://api.myjson.com/bins/15nxw7"),//this is not done in backend
    setSlab: decide(prodPathH +'/setSlab','http://localhost/'),
    getSlab: decide(prodPathH +'/getSlab','https://api.myjson.com/bins/19tm0f'),
    getHotel: decide(prodPath +'/getHotel','http://localhost/'),
    getDraftList: decide(prodPath +'/getDraftList','https://api.myjson.com/bins/r5ptf'),
    getConnected: decide(prodPath +'/getConnected','https://api.myjson.com/bins/nam3n')
}