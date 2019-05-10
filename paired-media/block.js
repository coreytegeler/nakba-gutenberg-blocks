( function( blocks, editor, i18n, element, components, _ ) {
	var el = element.createElement;
	var RichText = editor.RichText;
	var MediaUpload = editor.MediaUpload;
	var InspectorControls = wp.blocks.InspectorControls;

	i18n.setLocaleData( window.paired_media.localeData, 'nakba-blocks' );

	blocks.registerBlockType( 'nakba-blocks/paired-media', {
		title: i18n.__( 'Paired Media', 'nakba-blocks' ),
		icon: 'image-flip-horizontal',
		category: 'common',
		attributes: {
			bodyLeft: {
				type: 'array',
				source: 'children',
				selector: '.body-left',
			},
			bodyRight: {
				type: 'array',
				source: 'children',
				selector: '.body-right',
			},
			mediaLeft: {
				type: 'array',
			},
			mediaRight: {
				type: 'array',
			},
		},
		edit: function( props ) {
			var attributes = props.attributes;
			var onSelectMediaLeft = function( media ) {
				var mediaArray = [];
				for(var i = 0; i < media.length; i++) {
					mediaArray.push({
						url: media[i].url,
						id: media[i].id,
						alt: media[i].alt,
						type: ( media[i].type == 'image' ? 'img' : media[i].type ),
					});
					if(media[i].type == 'video') {
						mediaArray[i].poster = media[i].image.src;
					}
				}
				return props.setAttributes( { mediaLeft: mediaArray } );
			};
			var onSelectMediaRight = function( media ) {
				var mediaArray = [];
				for(var i = 0; i < media.length; i++) {
					mediaArray.push({
						url: media[i].url,
						id: media[i].id,
						alt: media[i].alt,
						type: ( media[i].type == 'image' ? 'img' : media[i].type ),
					});
					if(media[i].type == 'video') {
						mediaArray[i].poster = media[i].image.src;
					}
				}
				return props.setAttributes( { mediaRight: mediaArray } );
			};
			return (
				el( 'div', { className: 'block media-block paired-media-block' },
					el( 'div', { className: 'row' },
						el( 'div', { className: 'left col-12 col-sm-6' },
							el( 'div', { className: 'block-media' },
								el( MediaUpload, {
									onSelect: onSelectMediaLeft,
									multiple: true,
									value: attributes.mediaLeft ? attributes.mediaLeft.map(obj => obj.id) : null,
									render: function( obj ) {
										return el( components.Button, {
												className: attributes.mediaLeft ? 'media-button' : 'button button-large',
												onClick: obj.open
											},
											!attributes.mediaLeft ? i18n.__( 'Upload Media', 'nakba-blocks' ) : loopMedia( attributes.mediaLeft )
										);
									}
								} )
							),
							el( 'div', { className: 'block-text' },
								el( RichText, {
									tagName: 'div',
									className: 'block-body body-left',
									inline: false,
									placeholder: i18n.__( 'Body', 'nakba-blocks' ),
									formattingControls: ['bold', 'italic', 'link'],
									value: attributes.bodyLeft,
									onChange: function( value ) {
										props.setAttributes( { bodyLeft: value } );
									}
								} )
							)
						),
						el( 'div', { className: 'right col-12 col-sm-6' },
							el( 'div', { className: 'block-media' },
								el( MediaUpload, {
									onSelect: onSelectMediaRight,
									multiple: true,
									value: attributes.mediaRight ? attributes.mediaRight.map(obj => obj.id) : null,
									render: function( obj ) {
										return el( components.Button, {
												className: attributes.mediaRight ? 'media-button' : 'button button-large',
												onClick: obj.open
											},
											!attributes.mediaRight ? i18n.__( 'Upload Media', 'nakba-blocks' ) : loopMedia( attributes.mediaRight )
										);
									}
								} )
							),
							el( 'div', { className: 'block-text' },
								el( RichText, {
									tagName: 'div',
									className: 'block-body body-right',
									inline: false,
									placeholder: i18n.__( 'Body', 'nakba-blocks' ),
									formattingControls: ['bold', 'italic', 'link'],
									value: attributes.bodyRight,
									onChange: function( value ) {
										props.setAttributes( { bodyRight: value } );
									}
								} )
							)
						)
					)
				)
			)
		},
		save: function( props ) {
			var attributes = props.attributes;
			return (
				el( 'div', { className: 'block media-block paired-media-block' },
					el( 'div', { className: 'row' },
						attributes.mediaLeft && el( 'div', { className: 'left col-12 col-sm-6' },
							el( 'div', { className: 'block-media'+( attributes.mediaLeft.length > 1 ? ' slideshow' : '' ) },
								loopMedia( attributes.mediaLeft )
							),
							el( 'div', { className: 'block-text' },
								el( RichText.Content, {
									tagName: 'div', className: 'block-body body-left', value: attributes.bodyLeft
								} )
							)
						),
						attributes.mediaRight && el( 'div', { className: 'right col-12 col-sm-6' },
							el( 'div', { className: 'block-media'+( attributes.mediaRight.length > 1 ? ' slideshow' : '' ) },
								loopMedia( attributes.mediaRight )
							),
							el( 'div', { className: 'block-text' },
								el( RichText.Content, {
									tagName: 'div', className: 'block-body body-right', value: attributes.bodyRight
								} )
							)
						),
					)
				)
			);
		}
	} );

	var loopMedia = function( media ) {
		var mediaEls = [];
		for(var i = 0; i < media.length; i++) {
			var mediaClass = 'media';
			var mediaAttr = {
				src: media[i].url,
				alt: media[i].alt
			};
			if(media[i].type == 'video') {
				mediaClass += ' muted mutable';
				mediaAttr.autoplay = false;
				mediaAttr.muted = true;
				mediaAttr.volume = 0;
				mediaAttr.loop = true;
				mediaAttr.preload = 'auto';
				if(media[i].poster) {
					mediaAttr.poster = media[i].poster;
				}
			}
			mediaEls.push(
				el( 'div', { className: mediaClass },
					el( media[i].type, mediaAttr )
				)
			);
		}
		return mediaEls;
	};

} )(
	window.wp.blocks,
	window.wp.editor,
	window.wp.i18n,
	window.wp.element,
	window.wp.components,
	window._,
);
