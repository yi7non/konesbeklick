<?php 

function yoyo_topbid() {
    
    global $post;
    $auction_id = $post->ID;

    global $wpdb;
    $table_name = $wpdb->prefix . 'woo_ua_auction_log';
    $results = $wpdb->get_var($wpdb->prepare(
        "SELECT MAX(bid) FROM {$table_name} WHERE auction_id = %d", $auction_id
    ));

    $topbid = substr($results, 0, strpos($results, '.'));
    update_post_meta($auction_id, 'topbid', $topbid);
    
    ?>

    <h2 class="top-bid"><span class="top-bid__bg"><?php printf("ההצעה המובילה: %s %s", "<span class='numToFormat'>$topbid</span>", '₪'); ?></span></h2>

<?php } ?>