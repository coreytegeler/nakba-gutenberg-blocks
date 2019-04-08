<?php

defined( 'ABSPATH' ) || exit;

/**
 * Load all translations for our plugin from the MO file.
*/
// add_action( 'init', 'right_media_load_textdomain' );

// function right_media_load_textdomain() {
// 	load_plugin_textdomain( 'nakba-blocks', false, basename( __DIR__ ) . '/languages' );
// }

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * Passes translations to JavaScript.
 */
function right_media_register_block() {

	if ( ! function_exists( 'register_block_type' ) ) {
		// Gutenberg is not active.
		return;
	}
	
	wp_register_script(
		'right-media',
		plugins_url( 'block.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'underscore' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'block.js' )
	);

	// wp_register_style(
	// 	'right-media',
	// 	plugins_url( 'style.css', __FILE__ ),
	// 	array( ),
	// 	filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
	// );

	register_block_type( 'nakba-blocks/right-media', array(
		// 'style' => 'right-media',
		'script' => 'right-media',
	) );

	/*
	 * Pass already loaded translations to our JavaScript.
	 *
	 * This happens _before_ our JavaScript runs, afterwards it's too late.
	 */
	wp_add_inline_script(
		'right-media',
		sprintf( 
			'var right_media = { localeData: %s };', 
			json_encode( 'nakba-blocks' )
		),
		'before'
	);

} 
add_action( 'init', 'right_media_register_block' );