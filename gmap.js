// Map plugin
// jquery plugin
;(function ( $, window, document, undefined ) {
    //  Usage :
    //      $('#map').googleMap({
    //        'address' : 'south padre island, tx',
    //        'zoom' : 15 
    //      });
    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "googleMap",
        defaults = {
            address     : 'south padre island, tx',
            id          : '#gmap',
            coordinates : '36.1539816,-95.992775',
            zoom        : 10,
            infodata    : 'Default',
            phone       : 'Phone Number Not Available',
            place       : '',
            infobox     : false,

    },
        mapOptions = {
            zoom: defaults.zoom,
            center: '',
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            zoomControl: true,
            disableDefaultUI: true,
            panControl: false,
            draggable: true
    };

    // The actual plugin constructor
    function Plugin ( element, options ) {
        this.element = element;
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend( {}, defaults, options );
        this.mapOptions = mapOptions;
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function () {
            var el = $(this.element);
            var el_id = el.attr('id');
            // console.log( this.mapOptions )
            // console.log( this.settings )
            var mapOptions = this.mapOptions;
            mapOptions.zoom = this.settings.zoom;
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': this.settings.address }, function(results, status) {

                if (status == google.maps.GeocoderStatus.OK) {

                    var lat = results[0].geometry.location.lat();
                    var lng = results[0].geometry.location.lng();
                    var coordinates = lng + ', ' + lat;
                    var latlng = new google.maps.LatLng( lat, lng );
                    mapOptions.center = latlng;
                    console.log( mapOptions )
                    var map = new google.maps.Map( document.getElementById( el_id ), mapOptions);
                    
                    // var center = el.getCenter( coordinates );
                    // map.setCenter(center)

               
                    var marker = new google.maps.Marker({
                        map: map,
                        position: latlng
                    });




                    var infowindow = new google.maps.InfoWindow();
                    google.maps.event.addListener( map, 'click', function(event) {

                    infowindow.setContent('<span id="infobox"><a target="_blank" href="http://maps.google.com/maps?saddr=&daddr=' 
                    + settings['place'] + '">Directions to<br/>' 
                    +  settings['place'] + '</span></a><br/>' );
                    infowindow.open( this, marker);

                    });




                    
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                    return false;
                }
            });
            // var coordinates = this['coordinates']
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.settings
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.settings).
            // console.log(this.settings.id);
            // console.log( el )
        },
        someFunction: function(address){


        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function ( options ) {
        this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });

        // chain jQuery functions
        return this;
    };


})( jQuery, window, document );