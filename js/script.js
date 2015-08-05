
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    
    var $street = $('#street').val();
    var $city = $('#city').val();
    var address = $street + ',' + $city;

    $('body').append('<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '">');
    
    $greeting.text('So, you want to live in ' + $city);
    // YOUR CODE GOES HERE!

    var NYTapiURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?callback=svc_search_v2_articlesearch&q=' + $city + '&sort=newest&hl=true&api-key=6e556a02265fc4d62ec6a31826b9c67d%3A11%3A72625312';
    
    $.getJSON(NYTapiURL, function(data){

        $nytHeaderElem.text("NYT articles about " + $city);

        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' + '<a href="' + article.web_url + '">' + 
            article.headline.main + '</a>' + '<p>' + article.snippet + '</p>' + '</li>');
        }
        // $.each(data, function(key, val) {
        //     console.log(key, val);
        // });
    }).error( function(e) {
        $nytHeaderElem.text('Shit\'s broke, Yo!');
    });

    return false;
};

$('#form-container').submit(loadData);

// loadData();
