$(function(e){

	var categoryFilter = $('.catefory_filterby');

	function filterCategories(esto) {
		var catCode = $(esto).attr('data-cat');

		if($(esto).is(':checked')) {
			$('.row.sticky-header[data-codecat="'+catCode+'"]').show();
			$('.icon-grid-icon[data-codecat="'+catCode+'"]').show();
		} else {
			$('.row.sticky-header[data-codecat="'+catCode+'"]').hide();
			$('.icon-grid-icon[data-codecat="'+catCode+'"]').hide();
		}
	}

	$(categoryFilter).on('change', function(e){ filterCategories(this); });

});