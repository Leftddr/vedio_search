document.addEventListener('DOMContentLoaded', function() {

    const url = "https://dapi.kakao.com/v2/search/vclip?query=";
    const key = "af35956434233a16d98f0c2170840ca3";

    function search(){
        chrome.tabs.executeScript({
            code : 'document.querySelector("#userWord").value'
        }, function() {
            var searchWord = document.querySelector("#userWord").value;
            if(searchWord == undefined || searchWord == "") {document.querySelector("#processing").innerHTML = ""; return;}

            fetch(url + searchWord, {
                method : 'GET',
                headers:{
                    'Authorization':'KakaoAK ' + key,
                },
            }).then(res => res.json()).then(data => {
                if(data.documents.length == 0) {document.querySelector("#tmp").innerHTML = "There is no matching video"}
                else{
                    var result = "";
                    for(var i = 0 ; i < data.documents.length ; i++){
                        result += '<div style = "height:auto; width:100%; border:1px solid gold;">'
                        result += '<div style="font-size:15px">' + data.documents[i].title + '</div>';
                        result += '<img src = "' + data.documents[i].thumbnail + '" style = "height : auto ; width : 100%"></br>';
                        result += '<a href = "' + data.documents[i].url + '" target = "_blank" >' + '<font size="2em">' + data.documents[i].url + '</a></font></br>';
                        result += '</div>'
                        document.querySelector("#tmp").innerHTML = result;
                    }
                    document.querySelector("#tmp").innerHTML = result;
                }
            }).catch(error => {console.log(error)});
            //document.querySelector("#processing").innerHTML = "";
        });
    }

    document.querySelector("#btn").addEventListener('click', function(){
        search();
    });
});
