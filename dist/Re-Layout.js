/*! Re-Layout - v0.1.0 - 2013-01-11
* https://github.com/seltar/Re-Layout
* Copyright (c) 2013 Yonas Sandbæk - yonas.sandbaek@creuna.no - creuna.no
* Licensed MIT
 */

;(function ( $, window, document, undefined ) {
    
    // Create the defaults once
    var pluginName = 'relayout', 
        defaults = {
          breakpoints: {
            mobile: 320,
            tablet: 720,
            desktop: 960
          },
          width: 0
      };

    // The plugin constructor
    function Relayout( element, options ) {
        // set default values
        this._name = pluginName;
        this._defaults = $[pluginName].defaults;

        // set the element and options
        this.element = element;
        this.$el = $(this.element);
        this.options = $.extend( {}, this._defaults, options) ;
        
        // initialize plugin
        this.init();
        // order elements
        this.order(this.options.width || $(window).width());
        var self = this;
        $(window).resize(function(e){self.order($(window).width());});
    }

    Relayout.prototype.init = function () {
      var self = this, 
          i = 0,
          j = 0,
          l = 0,
          els = this.$el.children(),
          ordered = $.extend({},self.options.breakpoints),
          tmpArr = $.extend({},self.options.breakpoints);

      // initialize the array
      for(i in ordered){
        ordered[i] = [];
        tmpArr[i] = [];
        for(j = 0, l = els.length; j < l; j++){
          ordered[i][j] = null;
        }
      }

      // loop through elements and order them by their index
      els.each(function(){
        // place in the correct breakpoint
        for(var oi in ordered){
          var index = $(this).data("index-"+oi);
          // fallback on the default html index
          if(index === undefined){
            tmpArr[oi].push(this);
            continue;
          }

          if(!ordered[i][oi]){
            ordered[oi][index] = this;
          }

        }
      });

      // adding non-data-indexed elements
      for(var k in ordered){
        var c = 0; // internal counter
        for(j = 0, l = ordered[i].length; j < l; j++){
          if(ordered[k][j] === null){
            ordered[k][j] = tmpArr[k][c++];
          }
        }
      }

      self.ordered = ordered;
    };

    Relayout.prototype.order = function(width){
      var currentBreakpoint = null; 
      for(var i in this.options.breakpoints){
        // default to the first breakpoint
        if(currentBreakpoint === null){ 
          currentBreakpoint = i;
        }

        // set the breakpoint, if the width is less than the current breakpoint
        if(width >= this.options.breakpoints[i]){
          currentBreakpoint = i;
        }else{
          break;
        }
      }
      
      // apply the correct element order
      for(var j = 0, l = this.ordered[currentBreakpoint].length; j < l; j++){
        this.$el.append(this.ordered[currentBreakpoint][j]);
      }

    };

    // Custom selector.
    $.fn.filterAttribute = function( string ) {
        var attr, i, j, arr = [],
            reg = new RegExp('^'+string, 'i');
        $(this).each(function(){
            var attr = this.attributes;
            attrLoop: for (j = 0; j < attr.length; j++) {     //loop through all attributes
                if (reg.test(attr[j].name)) {              //if an attribute starts with mce_
                    arr.push(this);                        //push to collection
                    break attrLoop;                           //break this loop
                }
            }
        });
        return $(arr);
    };


    // Singleton wrapper with command options
    $.fn[pluginName] = function ( options, args ) {
      if(typeof options === "string")
      {
        return this.each(function () {
          // get the plugin, if it exists
          var plugin = $.data(this, 'plugin_' + pluginName);
          if (plugin && typeof plugin[options] === "function"){
            if(typeof args === "array"){
              plugin[options].apply(plugin, args);
            }else{
              plugin[options].call(plugin, args);
            }
          }
        });
      }else{
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                new Relayout( this, options ));
            }
        });
      }
    };

    // globalize the defaults
    $[pluginName] = { defaults: defaults };

})( jQuery, window, document );