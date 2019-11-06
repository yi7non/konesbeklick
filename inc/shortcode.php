<?php 

function shimi_loop($atts) { 

    $a = shortcode_atts( array(
		'showall' => 'no'
	), $atts );
    
    $html = '<ul class="products products__grid">';
    
        $loop = new WP_Query(array(
            'post_type' => 'product',
			'posts_per_page' => -1
        ));

            while($loop->have_posts()) {
            $loop->the_post(); 

            $id = $loop->post->ID;  
            
            $end_time = get_post_meta($id ,'woo_ua_auction_end_date', true);
            $end_second = round((strtotime($end_time) - strtotime("now")) / 60 / 60 / 24);
            

            $href = $loop->posts[$loop->current_post]->guid; 
            $image = wp_get_attachment_image_src( get_post_thumbnail_id( $loop->post->ID ), 'shop_catalog' );
            $carName = $loop->posts[$loop->current_post]->post_title; 
            
            global $wpdb;
            $table_name = $wpdb->prefix . 'woo_ua_auction_log';
            $results = $wpdb->get_var($wpdb->prepare(
                "SELECT MAX(bid) FROM {$table_name} WHERE auction_id = %d", $id
            ));

    $topbid = substr($results, 0, strpos($results, '.'));

            if($a['showall'] === 'no') {
                if($end_second < 1) {
                    continue;
                }
            }
    ?>
    <?php ob_start(); ?>
    <li class='shadow' data-id='<?php echo $id ?>'>
        <a href='<?php echo $href ?>' style='display:block;'>
            <div class='products__image' style='background-image: url(<?php echo $image[0] ?>);' data-id='<?php echo $id ?>'>
                <h4 class='products__offer'><?php printf('ההצעה המובילה: %s %s', '<span class="numToFormat">' . $topbid . '</span>', '₪') ?></h4>
            </div>
            <div class='products__info'>
                <h3><?php echo $carName ?></h3>
                <h4><?php printf('שנתון: %s', get_field('year', $id)) ?></h4>
                <h4><?php printf('מחיר מחירון: %s', '<span class="numToFormat">' . get_field('price', $id) . '</span>') ?></h4>
                <?php $flash = $end_second > 0 ? 'flash' : ''; ?>
                <h4 class='<?php echo $flash ?>'>
    <?php $html .= ob_get_clean();
    
    if ($end_second > 0) {
        $html .= sprintf('נותרו %s ימים לסיום המכרז', $end_second);
    } else { $html .= 'המכרז נסגר'; } ?>
    <?php ob_start(); ?>

                </h4>
            </div>
        </a>
        <a class='products__inter' href='<?php echo get_permalink($id) ?>'>כניסה למכרז &rsaquo;&rsaquo;</a>
    </li>
    <?php $html .= ob_get_clean(); ?>
    <?php }

    $html .= "</ul>";

    wp_reset_postdata();
    
        return $html;
}


   

  