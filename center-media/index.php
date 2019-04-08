<?php

defined( 'ABSPATH' ) || exit;

/**
 * Load all translations for our plugin from the MO file.
*/
// add_action( 'init', 'center_media_load_textdomain' );

// function center_media_load_textdomain() {
// 	load_plugin_textdomain( 'seventy-blocks', false, basename( __DIR__ ) . '/languages' );
// }

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * Passes translations to JavaScript.
 */
function center_media_register_block() {

	if ( ! function_exists( 'register_block_type' ) ) {
		// Gutenberg is not active.
		return;
	}
	
	wp_register_script(
		'center-media',
		plugins_url( 'block.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'underscore' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'block.js' )
	);

	// wp_register_style(
	// 	'center-media',
	// 	plugins_url( 'style.css', __FILE__ ),
	// 	array( ),
	// 	filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
	// );

	register_block_type( 'seventy-blocks/center-media', array(
		// 'style' => 'center-media',
		'script' => 'center-media',
	) );

	/*
	 * Pass already loaded translations to our JavaScript.
	 *
	 * This happens _before_ our JavaScript runs, afterwards it's too late.
	 */
	wp_add_inline_script(
		'center-media',
		sprintf( 
			'var center_media = { localeData: %s };', 
			json_encode( 'seventy-blocks' )
		),
		'before'
	);

} 
add_action( 'init', 'center_media_register_block' );