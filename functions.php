<?php
/**
 * bauhaus-dances functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package bauhaus-dances
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function bauhaus_dances_setup() {
	/*
		* Make theme available for translation.
		* Translations can be filed in the /languages/ directory.
		* If you're building a theme based on bauhaus-dances, use a find and replace
		* to change 'bauhaus-dances' to the name of your theme in all the template files.
		*/
	load_theme_textdomain( 'bauhaus-dances', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
		* Let WordPress manage the document title.
		* By adding theme support, we declare that this theme does not use a
		* hard-coded <title> tag in the document head, and expect WordPress to
		* provide it for us.
		*/
	add_theme_support( 'title-tag' );

	/*
		* Enable support for Post Thumbnails on posts and pages.
		*
		* @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		*/
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus(
		array(
			'menu-1' => esc_html__( 'Primary', 'bauhaus-dances' ),
		)
	);

	/*
		* Switch default core markup for search form, comment form, and comments
		* to output valid HTML5.
		*/
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	// Set up the WordPress core custom background feature.
	add_theme_support(
		'custom-background',
		apply_filters(
			'bauhaus_dances_custom_background_args',
			array(
				'default-color' => 'ffffff',
				'default-image' => '',
			)
		)
	);

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

	/**
	 * Add support for core custom logo.
	 *
	 * @link https://codex.wordpress.org/Theme_Logo
	 */
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		)
	);
}
add_action( 'after_setup_theme', 'bauhaus_dances_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function bauhaus_dances_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'bauhaus_dances_content_width', 640 );
}
add_action( 'after_setup_theme', 'bauhaus_dances_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function bauhaus_dances_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'bauhaus-dances' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'bauhaus-dances' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'bauhaus_dances_widgets_init' );


/** Remove dim cover css class */
function custom_remove_background_dim($block_content, $block) {
    if ($block['blockName'] === 'core/cover') {
        $block_content = str_replace('has-background-dim', '', $block_content);
    }
    return $block_content;
}
add_filter('render_block', 'custom_remove_background_dim', 10, 2);

/**
 * Enqueue scripts and styles.
 */
function bauhaus_dances_scripts() {
	wp_enqueue_style( 'bauhaus-dances-style', get_stylesheet_uri(), array(), _S_VERSION );
	wp_style_add_data( 'bauhaus-dances-style', 'rtl', 'replace' );

	wp_enqueue_script( 'bauhaus-dances-navigation', get_template_directory_uri() . '/js/navigation.js', array(), time(), true );
	wp_enqueue_script( 'bauhaus-dances-video-homepage', get_template_directory_uri() . '/js/video-homepage.js', array(), _S_VERSION, true );

	wp_enqueue_style( 'custom', get_template_directory_uri() . '/css/custom.css', array(), time());

    wp_enqueue_script('rellax', get_template_directory_uri() . '/js/rellax.min.js', array(), '1.0', true);
	wp_add_inline_script('rellax', 'document.addEventListener("DOMContentLoaded", 
	function() { 
		var rellax = new Rellax(".wp-block-cover__image-background", 
			{speed: -3, 
			center: true, 
			vertical: true, 
			horizontal:false
		});
	});');


	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'bauhaus_dances_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}
