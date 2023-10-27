<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package bauhaus-dances
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function bauhaus_dances_body_classes( $classes ) {
	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}

	// Adds a class of no-sidebar when there is no sidebar present.
	if ( ! is_active_sidebar( 'sidebar-1' ) ) {
		$classes[] = 'no-sidebar';
	}

	return $classes;
}
add_filter( 'body_class', 'bauhaus_dances_body_classes' );

/**
 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
 */
function bauhaus_dances_pingback_header() {
	if ( is_singular() && pings_open() ) {
		printf( '<link rel="pingback" href="%s">', esc_url( get_bloginfo( 'pingback_url' ) ) );
	}
}
add_action( 'wp_head', 'bauhaus_dances_pingback_header' );

function get_attachment_id_by_filename ($filename) {
	// Extract relative path from the URL
	$upload_dir = wp_upload_dir();
	$relative_path = str_replace($upload_dir['baseurl'] . '/' , '', $filename);

	$filetype = wp_check_filetype($relative_path);
	if (!$filetype['type']) {
		return false; // Not a valid file type
	}

	// Query attachments for the specified filename
	$args = array(
		'post_type' => 'attachment',
		'post_status' =>  'inherit',
		'posts_per_page' => 1,
		'meta_query' => array(
			array(
				'key' => '_wp_attached_file',
				'value' => $relative_path,
				'compare' => 'LIKE',
			)
		)
	);

	$query = new WP_Query( $args );

	if($query->have_posts() ) {
		while ($query-> have_posts()) {
			$query->the_post();
			return get_the_ID();
		}
		wp_reset_postdata();
	}
	return false;
}