(function( $ ) {
    $.fn.uniprotStyle = function( action ) {
      console.log('Running uniprotStyle');

      $('.intro-trigger').click(function(e){
        $(e.target).toggleClass('fa-angle-down');
        $(e.target).toggleClass('fa-angle-up');
        $('.intro-content').toggle();
      });

    };
}( jQuery ));
