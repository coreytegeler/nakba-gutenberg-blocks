( function( blocks, editor, i18n, element, components, _ ) {
	var el = element.createElement;
	var RichText = editor.RichText;
	var MediaUpload = editor.MediaUpload;
	var InspectorControls = wp.blocks.InspectorControls;

	i18n.setLocaleData( window.left_media.localeData, 'nakba-blocks' );

	blocks.registerBlockType( 'nakba-blocks/left-media', {
		title: i18n.__( 'Left Media', 'nakba-blocks' ),
		icon: 'align-left',
		category: 'common',
		attributes: {
			body: {
				type: 'array',
				source: 'children',
				selector: '.block-body',
			},
			media: {
				type: 'array',
			},
		},
		edit: function( props ) {
			var attributes = props.attributes;
			var onSelectMedia = function( media ) {
				var mediaArray = [];
				for(var i = 0; i < media.length; i++) {
					mediaArray.push({
						url: media[i].url,
						id: media[i].id,
						alt: media[i].alt,
						size: media[i].size,
						type: ( media[i].type == 'image' ? 'img' : media[i].type ),
					});
					if(media[i].type == 'video') {
						mediaArray[i].poster = media[i].image.src;
					}
				}
				return props.setAttributes( { media: mediaArray } );
			};
			return (
				el( 'div', { className: 'block media-block left-media-block' },
					el( 'div', { className: 'row' },
						el( 'div', { className: 'left col-12 col-sm-7 align-items-center' },
							el( 'div', { className: 'block-media' },
								el( MediaUpload, {
									onSelect: onSelectMedia,
									multiple: true,
									value: attributes.media ? attributes.media.map(obj => obj.id) : null,
									render: function( obj ) {
										return el( components.Button, {
												className: attributes.media ? 'media-button' : 'button button-large',
												onClick: obj.open
											},
											!attributes.media ? i18n.__( 'Upload Media', 'nakba-blocks' ) : loopMedia( attributes.media )
										);
									}
								} )
							)
						),
						el( 'div', { className: 'right col-12 col-sm-5 align-items-center' },
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
		},
		save: function( props ) {
			var attributes = props.attributes;
			var customClass = attributes.className ? attributes.className : '';
			return (
				el( 'div', { className: 'block media-block left-media-block '+customClass },
					el( 'div', { className: 'row' },
						attributes.media && el( 'div', { className: 'left col-12 col-sm-7 align-items-center' },
							el( 'div', { className: 'block-media'+( attributes.media.length > 1 ? ' slideshow' : '' ) },
								loopMedia( attributes.media )
							),
						),
						el( 'div', { className: 'right col-12 col-sm-5 align-items-center' },
							el( 'div', { className: 'block-text' },
								el( RichText.Content, {
									tagName: 'div', className: 'block-body', value: attributes.body
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
