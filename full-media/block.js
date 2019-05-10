( function( blocks, editor, i18n, element, components, _ ) {
	var el = element.createElement;
	var RichText = editor.RichText;
	var MediaUpload = editor.MediaUpload;
	var InspectorControls = wp.blocks.InspectorControls;

	i18n.setLocaleData( window.full_media.localeData, 'nakba-blocks' );

	blocks.registerBlockType( 'nakba-blocks/full-media', {
		title: i18n.__( 'Full Media', 'nakba-blocks' ),
		icon: 'editor-expand',
		category: 'common',
		attributes: {
			mediaID: {
				type: 'number',
			},
			mediaURL: {
				type: 'string',
			},
			body: {
				type: 'array',
				source: 'children',
				selector: '.block-body',
			},
		},
		edit: function( props ) {
			var attributes = props.attributes;
			var onSelectImage = function( media ) {
				return props.setAttributes( {
					mediaURL: media.url,
					mediaID: media.id,
				} );
			};
			return (
				el( 'div', { className: 'block media-block full-media-block' },
					el( 'div', { className: 'block-media' },
						el( MediaUpload, {
							onSelect: onSelectImage,
							value: attributes.mediaID,
							render: function( obj ) {
								return el( components.Button, {
										className: attributes.mediaID ? 'media-button' : 'button button-large',
										onClick: obj.open
									},
									!attributes.mediaID ? i18n.__( 'Upload Media', 'nakba-blocks' ) : el( 'img', {
										src: attributes.mediaURL
									} )
								);
							}
						} )
					),
					el( 'div', { className: 'full-inner' },
						el( 'div', { className: 'row' },
							el( 'div', { className: 'col col-12 col-sm-6 align-items-center' },
								el( 'div', { className: 'block-text' },
									el( RichText, {
										tagName: 'div',
										className: 'block-body',
										inline: false,
										placeholder: i18n.__( 'Body', 'nakba-blocks' ),
										formattingControls: ['bold', 'italic', 'link'],
										value: attributes.body,
										onChange: function( value ) {
											props.setAttributes( { body: value } );
										}
									} )
								)
							)
						)
					)
				)
			)
		},
		save: function( props ) {
			var attributes = props.attributes;
			return (
				el( 'div', { className: 'div' },
					el( 'div', { className: 'block media-block full-media-block' },
						attributes.mediaURL && el( 'div', { className: 'block-media', style: { backgroundImage: 'url('+attributes.mediaURL+')' } },
							attributes.mediaURL && el( 'img', {
								className: 'stretcher mobile',
								src: attributes.mediaURL
							} ),
						),
						el( 'div', { className: 'full-inner desktop' },
							el( 'div', { className: 'row' },
								el( 'div', { className: 'col col-12 col-sm-6 align-items-center' },
									el( 'div', { className: 'block-text' },
										el( RichText.Content, {
											tagName: 'div',
											className: 'block-body',
											value: attributes.body
										} )
									)
								)
							)
						)
					),
					el( 'div', { className: 'block-text mobile' },
						el( RichText.Content, {
							tagName: 'div', className: 'block-body', value: attributes.body
						} )
					)
				)
			);
		}
	} );
} )(
	window.wp.blocks,
	window.wp.editor,
	window.wp.i18n,
	window.wp.element,
	window.wp.components,
	window._,
);
