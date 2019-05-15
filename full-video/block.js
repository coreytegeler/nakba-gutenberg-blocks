( function( blocks, editor, i18n, element, components, _ ) {
	var el = element.createElement;
	var RichText = editor.RichText;
	var MediaUpload = editor.MediaUpload;
	var InspectorControls = wp.blocks.InspectorControls;

	i18n.setLocaleData( window.full_media.localeData, 'nakba-blocks' );

	blocks.registerBlockType( 'nakba-blocks/full-video', {
		title: i18n.__( 'Full Video', 'nakba-blocks' ),
		icon: 'editor-expand',
		category: 'common',
		attributes: {
			id: {
				type: 'number',
			},
			url: {
				type: 'string',
			},
			alt: {
				type: 'string',
			},
			poster: {
				type: 'string',
			},
			body: {
				type: 'array',
				source: 'children',
				selector: '.block-body',
			},
		},
		edit: function( props ) {
			var attr = props.attributes;
			var onSelectImage = function( media ) {
				return props.setAttributes( {
					id: media.id,
					url: media.url,
					alt: media.alt,
					poster: media.image.src || null
				} );
			};
			return (
				el( 'div', { className: 'block media-block full-video-block' },
					el( 'div', { className: 'block-media' },
						el( MediaUpload, {
							onSelect: onSelectImage,
							value: attr.id,
							render: function( obj ) {
								return el( components.Button, {
										className: !attr.id ? 'button button-large' : 'media-button',
										onClick: obj.open
									},
									!attr.id ? i18n.__( 'Upload Media', 'nakba-blocks' ) : el( 'video', {
										src: attr.url
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
										value: attr.body,
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
			var attr = props.attributes;
			var customClass = attr.className ? attr.className : '';
			return (
				el( 'div', { className: 'div' },
					el( 'div', { className: 'desktop' },
						el( 'div', {
							className: 'block media-block full-media-block full-video-block media muted mutable '+customClass,
							style: ( attr.poster ? 'background-image:url('+attr.poster+')' : '' )
						},
							el( 'video', {
								src: attr.url,
								autoplay: false,
								muted: 'muted',
								volume: 0,
								loop: 'loop',
								preload : 'auto',
								alt: attr.alt,
								poster: attr.poster
							} ),
						),
						el( 'div', { className: 'row align-items-center flex-column' },
							el( 'div', { className: 'col-12 col-sm-8' },
								el( 'div', { className: 'block-text' },
									el( RichText.Content, {
										tagName: 'div',
										className: 'block-body',
										value: attr.body
									} )
								)
							)
						),
					),
					el( 'div', { className: 'mobile' },
						el( 'div', { className: 'block media-block center-media-block' },
							el( 'div', { className: 'row align-items-center flex-column' },
								el( 'div', { className: 'col-12 col-sm-8' },
									el( 'div', { className: 'block-media' },
										el( 'div', { className: 'media muted mutable', style: ( attr.poster ? 'background-image:url('+attr.poster+')' : '' ) },
											attr.url && el( 'video', {
												src: attr.url,
												autoplay: false,
												muted: true,
												volume: 0,
												loop: true,
												preload : 'auto',
												alt: attr.alt,
												poster: attr.poster
											} )
										)
									),
									el( 'div', { className: 'block-text' },
										el( RichText.Content, {
											tagName: 'div', className: 'block-body', value: attr.body
										} )
									)
								)
							)
						)
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
