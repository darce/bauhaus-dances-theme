<?php
/**
 * Front-page template */
get_header(); 

/** Fetch videos */
function get_video_files_from_uploads() {
    $args = array(
        'post_type'      => 'attachment',
        'post_mime_type' => array('video/mp4', 'video/webm'),
        'post_status'    => 'inherit',
        'posts_per_page' => -1,
    );
    $videos = new WP_Query($args);
    return $videos;
}
?>

<main id="main" class="site-main">
    <section class="intro-section">
<?php 
$videos_query = get_video_files_from_uploads();
echo '<div class="video-homepage-collection">'; // Start Flex container
if ($videos_query->have_posts()) :
    $video_item_index = 0; // Initialize the counter

    while ($videos_query->have_posts()) : $videos_query->the_post();
        $video_url = wp_get_attachment_url(get_the_ID());
        $poster_url = str_replace('.mp4', '-300x228.png', $video_url);
        // Retrieve the values from standard fields
        $video_caption = get_the_excerpt();
        $video_description = get_the_content();

        echo '<div class="video-homepage-item" data-video-index="' . $video_item_index . '" id="video_item_index-' . $video_item_index. '">'; // Start Flex item
                echo '<video class="video-homepage-media" preload="auto" playsinline poster="' . $poster_url . '" src="'.$video_url.'">';
                echo '<source src="' . $video_url . '" type="video/mp4" />';
                echo '</video>';

            echo '<div class="video-homepage-metadata">';
                echo '<div class="video-homepage-caption"><h3>' . esc_html($video_caption) . '</h3></div>';
                echo '<div class="video_homepage-description">' . esc_html($video_description) . '</div>';
            echo '</div>';
        echo '</div>'; // End Flex item
        $video_item_index++; // Increment the counter

    endwhile;
    echo '</div>'; // End Flex container
    wp_reset_postdata();
endif;
?>
    </section>
    <?php
    // Start the Loop.
    while ( have_posts() ) : the_post();

        // Include the post content template.
        // get_template_part( 'template-parts/content', 'front' );

    // End the Loop.
    endwhile;
    ?>

</main><!-- .site-main -->

<?php get_sidebar(); ?>
<?php get_footer(); ?>