( function( blocks, editor, i18n, element, components, _ ) {
	var el = element.createElement;
	var RichText = editor.RichText;
	var MediaUpload = editor.MediaUpload;
	var InspectorControls = wp.blocks.InspectorControls;

	i18n.setLocaleData( window.section_title.localeData, 'nakba-blocks' );

	blocks.registerBlockType( 'nakba-blocks/section-title', {
		title: i18n.__( 'Section Title', 'nakba-blocks' ),
		icon: 'admin-links',
		category: 'common',
		attributes: {
			sectionTitle: {
				type: 'array',
				source: 'children',
				selector: '.section-title-text',
			},
		},
		edit: function( props ) {
			var attributes = props.attributes;
			return (
				el( 'div', { className: 'block section-title' },
					el( RichText, {
						tagName: 'h2',
						className: 'section-title-text',
						inline: true,
						placeholder: i18n.__( 'Section Title', 'nakba-blocks' ),
						value: attributes.sectionTitle,
						onChange: function( value ) {
							props.setAttributes( { sectionTitle: value } );
						}
					} )
				)
			)
		},
		save: function( props ) {
			var attributes = props.attributes;
			return (
				el( 'div', { className: 'block section-title' },
					el( RichText.Content, {
						tagName: 'div',
						className: 'section-title-text',
						value: attributes.sectionTitle
					} )
				)
			);
		},
	} );

} )(
	window.wp.blocks,
	window.wp.editor,
	window.wp.i18n,
	window.wp.element,
	window.wp.components,
	window._,
);
