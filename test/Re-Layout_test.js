/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

  /*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
  */

  module('Re-Layout Core', {
    setup: function() {
      this.elems = $('#test1');
    }
  });

  test('is chainable', 1, function() {
    // Not a bad test to run on collection methods.
    strictEqual(this.elems.relayout(), this.elems, 'should be chainable');
  });

  module('Re-Layout Test #1', {
    setup: function() {
      this.elems = $('#test1');
      $.relayout.defaults.width = 320;
    }
  });

  test('does reorder', 9, function() {
    this.elems.relayout();
    
    equal($(".a",this.elems).index(),2, "a ok");
    equal($(".b",this.elems).index(),0, "b ok");
    equal($(".c",this.elems).index(),1, "c ok");

    this.elems.relayout("order", 720);
    
    equal($(".a",this.elems).index(),0, "a ok");
    equal($(".b",this.elems).index(),2, "b ok");
    equal($(".c",this.elems).index(),1, "c ok");

    this.elems.relayout("order", 960);
    
    equal($(".a",this.elems).index(),0, "a ok");
    equal($(".b",this.elems).index(),1, "b ok");
    equal($(".c",this.elems).index(),2, "c ok");
  });

  module('Re-Layout Test #2', {
    setup: function() {
      this.elems = $('#test2');
      $.relayout.defaults.width = 320;
    }
  });

  test('does advanced reorder', 9, function() {
    this.elems.relayout();
    
    equal($(".a",this.elems).index(),0, "a ok");
    equal($(".b",this.elems).index(),2, "b ok");
    equal($(".c",this.elems).index(),1, "c ok");

    this.elems.relayout("order", 720);

    equal($(".a",this.elems).index(),1, "a ok");
    equal($(".b",this.elems).index(),2, "b ok");
    equal($(".c",this.elems).index(),0, "c ok");

    this.elems.relayout("order", 960);

    equal($(".a",this.elems).index(),0, "a ok");
    equal($(".b",this.elems).index(),1, "b ok");
    equal($(".c",this.elems).index(),2, "c ok");
    
  });



  module('Re-Layout Test #3', {
    setup: function() {
      this.elems = $('#test3, #test3 > div');
      $.relayout.defaults.width = 320;
    }
  });

  test('does advanced nested reorder', 12, function() {
    console.log("________________________________________________");
    this.elems.relayout();
    
    equal($(".a",this.elems).index(),3, "a bcda ok");
    equal($(".b",this.elems).index(),0, "b bcda ok");
    equal($(".c",this.elems).index(),1, "c bcda ok");
    equal($(".d",this.elems).index(),2, "d bcda ok");
    
    this.elems.relayout("order", 720);
    equal($(".a",this.elems).index(),1, "a dabc ok");
    equal($(".b",this.elems).index(),2, "b dabc ok");
    equal($(".c",this.elems).index(),3, "c dabc ok");
    equal($(".d",this.elems).index(),0, "d dabc ok");

    this.elems.relayout("order", 960);

    equal($(".a",this.elems).index(),0, "a abcd ok");
    equal($(".b",this.elems).index(),1, "b abcd ok");
    equal($(".c",this.elems).index(),2, "c abcd ok");
    equal($(".d",this.elems).index(),3, "d abcd ok");
    
  });


  /*
  module('jQuery.filterAttribute', {
    setup: function() {
      this.elems = $('#test2').children();
    }
  });

  test('is chainable', 1, function() {
    // Not a bad test to run on collection methods.
    strictEqual(this.elems.filterAttribute("data-index"), this.elems.filter("[data-index-mobile]"), 'should be chainable');
  });
  */

}(jQuery));
