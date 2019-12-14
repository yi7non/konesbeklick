<?php 

function adminDash() {
    
    if(current_user_can('edit_theme_options')) {
        global $post;
        $auction_id = $post->ID;
    
        global $wpdb;
        $table_name = $wpdb->prefix . 'woo_ua_auction_log';

        $offers = $wpdb->get_results(
            $wpdb->prepare("SELECT * FROM {$table_name} WHERE auction_id = %d ORDER BY date DESC", $auction_id)
            , ARRAY_A); ?>
            <div class="adminers-forms">
                <div class="jump">
                    <form class="jump__time">
                        <label for="jumpTime">הקפץ זמן</label>
                        <div class="jump__field">
                            <input type="number" id="jumpTime" data-postid="<?php echo $auction_id; ?>">
                            <button>הקפץ זמן</button>
                        </div>
                    </form>
                </div>   

                <div class="jump">
                    <form class="jump__price">
                        <label for="jumpPrice">הקפץ מחיר</label>
                        <?php 
                        $stepPrice = get_post_meta($auction_id, 'woo_ua_bid_increment', TRUE);
                        $minPrice = get_post_meta($auction_id, 'woo_ua_lowest_price', TRUE);
                        $currentBid = get_post_meta($auction_id, 'topbid', TRUE);
                        ?>
                        <div class="jump__field">
                            <input value="<?php echo ($currentBid > $minPrice) ? ($currentBid + $stepPrice) : $minPrice ?>" type="number" id="jumpPrice" data-userid="<?php echo get_current_user_id(); ?>" data-postid="<?php echo $auction_id; ?>" step="<?php echo $stepPrice; ?>" min="<?php echo $minPrice; ?>">
                            <button>הקפץ מחיר</button>
                        </div>
                    </form>
                </div>   

                <div class="close-auction">
                    <a class="close-auction__btn" href="javascript:void(0)">סיום מכרז</a>
                </div>         
            </div>
    <?php  }
}

?>