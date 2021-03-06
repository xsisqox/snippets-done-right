jQuery( function ( $ ) {
	var $document = $( document );
	var boxes = $('.sdr-snippet-container');

	if ( boxes.length === 0 ) {
		return;
	};

	function SDRBox ( element ) {
		this.element = element;
		this.container = element.find( '.sdr-snippet-box' );
	};

	$.extend( SDRBox.prototype, {
		init: function () {
			var language = this.element.data( 'language' );
			var show_lines = this.element.data( 'showLines' );
			var height = this.element.data( 'height' );

			this.ace_editor = ace.edit( this.container.get( 0 ) );

			this.ace_editor.setTheme( 'ace/theme/' + sdr_options.ace_theme );
			this.ace_editor.getSession().setMode( 'ace/mode/' + language );
			this.ace_editor.setHighlightActiveLine( false );
			this.ace_editor.setShowFoldWidgets( false );
			this.ace_editor.setShowPrintMargin( false );
			this.ace_editor.setReadOnly( true );

			height = height < 1 ? Infinity : height;

			this.ace_editor.setOptions({
				showGutter: show_lines,
				useWorker: false,
				maxLines: height
			});
		}
	});

	/* Init all boxes */
	boxes.each( function () {
		var sdr_box = new SDRBox( $(this) );
		sdr_box.init();
	});
});