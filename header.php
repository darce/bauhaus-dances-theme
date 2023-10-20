<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package bauhaus-dances
 */

?>
<!doctype html>
<html <?php language_attributes(); ?> prefix="og: http://ogp.me/ns#">
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.bauhausdances.org">
    <meta property="og:title" content="Bauhaus Dances">
    <meta property="og:image" content="<?php echo get_template_directory_uri(); ?>/images/bauhaus-dances-black-square-512.png">
    <link rel="apple-touch-icon" sizes="512x512" href="<?php echo get_template_directory_uri(); ?>/images/bauhaus-dances-black-square-512.png">
    <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/images/bauhaus-dances-white.ico" type="image/x-icon">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
    <a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'bauhaus-dances' ); ?></a>

    <header id="masthead" class="site-header">
        <div class="site-branding">
            <?php
            the_custom_logo();
            if ( is_front_page() && is_home() ) :
                ?>
                <h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
                <?php
            else :
                ?>
                <p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
                <?php
            endif;
            $bauhaus_dances_description = get_bloginfo( 'description', 'display' );
            if ( $bauhaus_dances_description || is_customize_preview() ) :
                ?>
                <p class="site-description">
                <?php 
                /** Wrap words in css classes */
                $words = explode(' ', $bauhaus_dances_description);
                if (count($words) > 0) {
                echo '<span class="title-vertical">' . $words[0] . '</span>';
                    unset($words[0]); // remove the first word
                if (count($words) > 0) {
                foreach ($words as $word) {
                echo ' <span class="title-horizontal">' . $word . '</span>';
        }
    }
} // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></p>
            <?php endif; ?>
        </div><!-- .site-branding -->

        <nav id="site-navigation" class="main-navigation">
            <button class="menu-toggle material-symbols-outlined" aria-controls="primary-menu" aria-expanded="false"><?php esc_html_e( 'menu', 'bauhaus-dances' ); ?></button>
            <?php
            wp_nav_menu(
                array(
                    'theme_location' => 'menu-1',
                    'menu_id'        => 'primary-menu',
                )
            );
            ?>
        </nav><!-- #site-navigation -->
        <div class="hero-decoration-container">
                <div class="hero-decoration-circle hero-decoration-outer-circle"></div>
                <div class="hero-decoration-circle hero-decoration-circle-a"></div>
                <div class="hero-decoration-circle hero-decoration-circle-b"></div>
                <div class="hero-decoration-circle hero-decoration-circle-c"></div>
        </div>
    </header><!-- #masthead -->
