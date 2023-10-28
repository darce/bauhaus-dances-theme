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
echo '<div class="video-homepage-collection">'; // Start Grid container
if ($videos_query->have_posts()) :
    $video_item_index = 0; // Initialize the counter
    while ($videos_query->have_posts()) : $videos_query->the_post();
        $video_url = wp_get_attachment_url(get_the_ID());
        // Retrieve the values from standard fields. This must be done before
        // getting the image for the video poster,
        $video_caption = get_the_excerpt();
        $video_description = get_the_content();
        $poster_url = $image_filename = str_replace('.mp4', '.png', $video_url);
        $image_id = get_attachment_id_by_filename($image_filename);

        if ($image_id) {
            $medium_image_array = wp_get_attachment_image_src($image_id, 'medium');
            $poster_url = $medium_image_array[0];
        }

        echo '<figure class="video-homepage-item" data-video-index="' . $video_item_index . '" id="video_item_index-' . $video_item_index. '">';
            echo '<img class="video-homepage-poster" src="'. $poster_url. '" alt="Video poster for '. $video_caption .'">';
            echo '<video class="video-homepage-media" preload="auto" playsinline poster="'. $poster_url. '">';
                echo '<source src="' . $video_url . '" type="video/mp4" />';
            echo '</video>';

            echo '<div class="video-homepage-metadata">';
                echo '<div class="video-homepage-caption"><h3>' . esc_html($video_caption) . '</h3></div>';
                echo '<div class="video-homepage-description">' . esc_html($video_description) . '</div>';
            echo '</div>';
        echo '</figure>';
        $video_item_index++; // Increment the counter

    endwhile;
    echo '</div>'; // End Grid container
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