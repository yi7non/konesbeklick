<?php 

function shimi_enqueue_styles() {
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'parent-style-min', get_template_directory_uri() . '/style.min.css' );
    wp_enqueue_style( 'parent-theme', get_template_directory_uri() . '/theme.css' );
    wp_enqueue_style( 'parent-theme-min', get_template_directory_uri() . '/theme.min.css' );
    wp_enqueue_style( 'parent-editor', get_template_directory_uri() . '/editor-style.css' );
    wp_enqueue_style( 'parent-editor-min', get_template_directory_uri() . '/editor-style.min.css' );
    
    wp_enqueue_style( 'child-style', get_stylesheet_directory_uri() . '/style.css', array( 'parent-style', 'parent-style-min', 'parent-theme', 'parent-theme-min', 'parent-editor', 'parent-editor-min'), wp_get_theme()->get('Version'));

    wp_enqueue_script('app', get_stylesheet_directory_uri() . '/app.js', array('jquery'), wp_get_theme()->get('Version'), true);
}

add_action( 'wp_enqueue_scripts', 'shimi_enqueue_styles' );

function shimi_add_woocommerce_support() {
    add_theme_support( 'woocommerce' );
}

add_action( 'after_setup_theme', 'shimi_add_woocommerce_support' );


require_once(get_theme_file_path( '/inc/top-bid.php' ));
require_once(get_theme_file_path( '/inc/countdown-title.php' ));
require_once(get_theme_file_path( '/inc/shortcode.php' ));

add_action('ultimate_woocommerce_auction_before_bid_form', 'yoyo_topbid', 10); 
add_action('woocommerce_single_product_summary', 'yoyo_countdownTitle', 10);
add_shortcode('carsloop', 'shimi_loop');


// Remove Actions

remove_action('woocommerce_after_single_product_summary', 'woocommerce_output_product_data_tabs', 10);
remove_action('woocommerce_after_single_product_summary', 'woocommerce_upsell_display', 15);
remove_action('woocommerce_after_single_product_summary', 'woocommerce_output_related_products', 20);

remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_title', 5);
remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_rating', 10);
remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_price', 10);
remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_excerpt', 20);
remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40);


?>