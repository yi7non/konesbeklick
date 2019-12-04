<?php 

function adminDash() {
    if(current_user_can('manage_options')) {
        global $post;
        $auction_id = $post->ID;
    
        global $wpdb;
        $table_name = $wpdb->prefix . 'woo_ua_auction_log';

        $offers = $wpdb->get_results(
            $wpdb->prepare("SELECT * FROM {$table_name} WHERE auction_id = %d ORDER BY date DESC", $auction_id)
            , ARRAY_A);
    
            foreach($offers as $offer) { 
                
                $is_user = false;
                $competing_offer = "הצעה מתחרה: ";
                $user_info = get_userdata($offer['userid']);
                $username =  "{$user_info->first_name} " . $user_info->last_name;
                if(get_current_user_id() == $offer['userid']) {
                    $username = "אני";
                    $competing_offer = "ההצעה שלי:";
                    $is_user = true;
                }
    
                $date = new DateTime($offer['date']);
                $date = $date->format('d.m.Y | H:i:s');
                
                
            ?>
    
            <div class="latest-offers__row <?php echo $is_user ? 'latest-offers__row--user' : '' ?>">
                <div class="latest-offers__column">
                    <span><?php echo $username; ?></span>
                </div>
                <div class="latest-offers__column">
                    <span>050805999</span>
                </div>
                <div class="latest-offers__column">
                    <span><?php echo $competing_offer; ?></span>
                    <span class="numToFormat"><?php echo $offer['bid']; ?></span>
                    <span>₪</span>
                </div>
                <div class="latest-offers__column">
                    <span><?php echo $date; ?></span>
                </div>
            </div>
    
            <?php } ?>
            
            <div class="jump">
                <form class="jump__time">
                    <label for="jumpTime">הקפץ זמן</label>
                    <input type="number" id="jumpTime" data-postid="<?php echo $auction_id; ?>">
                    <button>הקפץ זמן</button>
                </form>
            </div>   

            <div class="jump">
                <form class="jump__price">
                    <label for="jumpPrice">הקפץ מחיר</label>
                    <?php 
                    $stepPrice = get_post_meta($auction_id, 'woo_ua_bid_increment', TRUE);
                    $minPrice = get_post_meta($auction_id, 'woo_ua_lowest_price', TRUE);
                    ?>
                    <input type="number" id="jumpPrice" data-userid="<?php echo get_current_user_id(); ?>" data-postid="<?php echo $auction_id; ?>" step="<?php echo $stepPrice; ?>" min="<?php echo $minPrice; ?>">
                    <button>הקפץ מחיר</button>
                </form>
            </div>   

            <div class="close-auction">
                <a class="close-auction__btn" href="javascript:void(0)">סיום מכרז</a>
            </div>         
            
    <?php  }
}

?>