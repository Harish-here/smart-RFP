let forProd = false;

function decide(prod, local) {
    return (forProd) ? prod : local;
}
const prodPath = 'http://www.hobse.com/demo/index.php/customer/rfp';
const prodPathH = 'http://www.hobse.com/demo/index.php/admin/rfp';
export default {
    getQues: decide(prodPath + '/getQues', 'https://api.myjson.com/bins/slf8j'),
    getQuesH: decide(prodPathH + '/getQues', 'https://api.myjson.com/bins/1ey0lb'),
    sendQues: decide(prodPath + '/sendQues', 'http://localhost/'),
    sendQuesH: decide(prodPathH + '/sendQues', 'http://localhost/'),
    forProd: forProd,
    rfpDecline: decide(prodPathH + '/decline', 'http://localhost/'),
    getProposal: decide(prodPathH + '/getProposal', 'https://api.myjson.com/bins/1dzrhx'),
    getHotelPre: decide(prodPathH + '/getHotelPre', 'https://api.myjson.com/bins/kkg5f'),
    getHotelPreCustomer: decide(prodPath + '/getHotelPre', 'https://api.myjson.com/bins/kkg5f'),
    getHotelAns: decide(prodPathH + '/getHotelAns', 'https://api.myjson.com/bins/1easv7'),//???
    getEngaged: decide(prodPathH + '/getEngaged', 'https://api.myjson.com/bins/7iipn'),
    getBasic: decide(prodPath + '/getBasic', 'https://api.myjson.com/bins/wiulf'),
    acceptRfp: decide(prodPath + '/acceptRfp', 'http://localhost/'),
    shortlistQuote: decide(prodPath + '/shortlistQuote', 'http://localhost/'),
    UnshortlistQuote: decide(prodPath + '/UnshortlistQuote', 'http://localhost/'),
    declineQuote: decide(prodPath + '/declineQuote', 'http://localhost/'),
    trashRFP: decide(prodPath + '/trashRFP', 'http://localhost/'),
    getTrash: decide(prodPath + '/getTrash', 'https://api.myjson.com/bins/l919l'),
    sendBasic: decide(prodPath + '/sendBasic', 'http://localhost/'),
    listCity: decide('http://www.hobse.com/demo/index.php/customer/policy/listCities', 'https://api.myjson.com/bins/i46iz'),
    saveDraft: decide('', 'http://localhost/'),
    saveRfp: decide(prodPath + '/saveRfp', 'http://localhost/'),
    getPreview: decide(prodPath + '/getPreview', 'https://api.myjson.com/bins/y9ny1'),
    sendRfp: decide(prodPath + '/sendRfp', 'http://localhost/'),
    getPublished: decide(prodPath + '/getPublished', "https://api.myjson.com/bins/tiykp"),
    getQuotes: decide(prodPath + '/getQuotes', "https://api.myjson.com/bins/64uzl"),
    getQuotesReview: decide(prodPath + '/getQuotesReview', "https://api.myjson.com/bins/lm7pv"),//this is not done in backend
    setSlab: decide(prodPathH + '/setSlab', 'http://localhost/'),
    getSlab: decide(prodPathH + '/getSlab', 'https://api.myjson.com/bins/19tm0f'),
    getHotel: decide(prodPath + '/getHotel', 'http://localhost/'),
    getDraftList: decide(prodPath + '/getDraftList', 'https://api.myjson.com/bins/1c1jhl'),
    getConnected: decide(prodPath + '/getConnected', 'https://api.myjson.com/bins/nam3n'),
    getHotelTrash: decide(prodPathH + '/getHotelTrash', 'https://api.myjson.com/bins/ihe2f'),//not done in backend
    moveTrashToDraft: decide(prodPath + '/moveTrashToDraft', 'http://localhost/'),
    getHotel: decide(prodPath + '/hotelsbyques', 'http://localhost/'),
    hotelBookmark: decide(prodPath + '/hoteBookmark', 'http://localhost/'),
    hotelUnBookmark: decide(prodPath + '/hotelUnBookmark', 'http://localhost/'),
    checkPermission: decide(prodPath + '/checkPermission', 'https://api.myjson.com/bins/1dhtnx')
}