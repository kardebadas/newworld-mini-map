// ==UserScript==
// @name         NewWorld Map Mini Map Addon
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  A widget that accesses newworld-map website and displays your player location in real time so you can use it as a minimap.
// @author       kardebadas
// @match        https://www.newworld-map.com/
// @icon         https://www.google.com/s2/favicons?domain=newworld-map.com
// @connect      albion.hothosting.org
// @grant        GM_xmlhttpRequest
// ==/UserScript==
(function() {
    'use strict';
    //Put an user id HERE, must be a md5 
    // http://www.md5.cz/
    const user = '';

    setTimeout(function(){
        var script = document.createElement("script");
        // Add script content
        script.innerHTML = `
        var map = document.getElementById('map').__vue__.mapObject;
        var marker = window.L.marker({lat: 0, lng: 0});
        marker.addTo(map);
        marker.setLatLng({lat: -10336, lng: 8100});
        map.panTo({lat: -10336, lng: 8100});

`;

        // Append
        document.head.appendChild(script);

    },10000);


    setTimeout(function(){
        getPosition();
    },12000);



    function getPosition(){
        GM_xmlhttpRequest ( {
            method:     "GET",
            url:        "https://albion.hothosting.org/nw/?U="+user,
            headers:    {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            onload:     function (resp) {
                try{
                    let json = JSON.parse(resp.response);
                    updateMapPosition(json);
                }catch(e){
                    console.error(e);
                }
                setTimeout(function(){
                    getPosition();
                },200);
            }
        } );
    }

    function updateMapPosition(pos){
        let obj = {lat: pos.y-14336, lng: pos.x};
        marker.setLatLng(obj);
        map.panTo(obj);
    }

})();
