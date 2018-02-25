/* 
 * This method initializes Facebook SDK with appId.
 * Connects to facebook to use it's APIs.
 */

window.fbAsyncInit = function () {
    FB.init({
        appId: '218171648744820',
        status: true,
        cookie: true,
        xfbml: true
    });
};

(function (doc) {
    var js;
    var id = 'facebook-jssdk';
    var ref = doc.getElementsByTagName('script')[0];
    if (doc.getElementById(id)) {
        return;
    }
    js = doc.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "https://connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));

/* 
 * Event listener for the 'Get Data' button.
 */
document.addEventListener('DOMContentLoaded', function () {
    var link = document.getElementById('getData');
    // onClick's logic below:
    link.addEventListener('click', function () {
        Login();
    });
});

/* 
 * Uses FB Graph API to fetch data.
 */
function Login() {
    var accessToken = 'EAACEdEose0cBAO7fjT8FARMuQZCuRGU5nbbRUPXUUy14QOWtZCCZAgGZBA0fQyv3orc7211CbU8V2E8Xqb6EFmVO13OO0F6gpHdV9IEUrAZAy9ZCRK8OLL64eiilZADC5U8kxwNMlrfcZCDBVqD3YwCyB6xJ4bufw04ZCriV7V2AgIVUT5rcLdcwB38J0oeEZAky5ANkjk5j0x6gZDZD';
    FB.Event.subscribe('auth.authResponseChange', function (response) {
        if (response.status === 'connected') {
            alert("Successfully connected to Facebook!");
        } else if (response.status === 'not_authorized') {
            alert("Login failed!");
        } else {
            alert("Unknown error!");
        }
    });

    FB.api('/me/?fields=first_name,last_name,picture,email,education,work,birthday&access_token='+accessToken, function (response) {
        // Toggle table's visibility
        var dataTable = document.getElementById("dataTable");
        if (dataTable.style.display === "none") {
            dataTable.style.display = "block";
        } else {
            dataTable.style.display = "none";
        }
        
        //Assign fetched data to table cells.
        document.getElementById("firstName").innerHTML = response.first_name;
        document.getElementById("lastName").innerHTML = response.last_name;
        document.getElementById("userEmail").innerHTML = response.email;
        document.getElementById("birthDay").innerHTML = response.birthday;
        document.getElementById("profileImage").setAttribute("src", response.picture.data.url);
        
        //Access education through loop as it may contain may objects.
        var i;
        var edu = "";
        var work = "";
        for(i=0; i<response.education.length; i++) {
            console.log(response.education[i].school.name);
            edu += response.education[i].school.name + ", ";
            
        }
        document.getElementById("education").innerHTML = edu;
        
        //Access work through loop as it may contain may objects.
        for(i=0; i<response.work.length; i++) {
            console.log(response.work[i].employer.name);
            work += response.work[i].employer.name + ", ";
            
        }
        document.getElementById("work").innerHTML = work;
    });
}
