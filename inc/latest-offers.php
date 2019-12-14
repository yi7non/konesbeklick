<?php 

function latestOffers() { ?>

    <div class="latest-offers" data-user="<?php echo is_user_logged_in(); ?>">
        <div class="latest-offers__row">
            <h2 class="latest-offers__title">הצעות אחרונות:</h2>
        </div>
        <audio id="audio" src="<?php echo get_theme_file_uri('/assets/eventually.mp3'); ?>"></audio>

    <?php 
        global $post;
        $auction_id = $post->ID;
        global $wpdb;
        $table_name = $wpdb->prefix . 'woo_ua_auction_log';

        $offers = $wpdb->get_results(
        $wpdb->prepare("SELECT * FROM {$table_name} WHERE auction_id = %d ORDER BY date DESC", $auction_id)
        , ARRAY_A);

        $userid = get_current_user_id();
        $isUserAllowed = FALSE;
        if(current_user_can('edit_theme_options')) {
            $isUserAllowed = TRUE;
        }

        foreach($offers as $offer) { 
            
            $is_user = false;
            $competing_offer = "הצעה מתחרה: ";
            $user_info = get_userdata($offer['userid']);
            $username =  "{$user_info->first_name} " . $user_info->last_name;
            if($userid == $offer['userid']) {
                $username = "אני";
                $competing_offer = "ההצעה שלי:";
                $is_user = true;
            }

            $date = new DateTime($offer['date']);
            $date = $date->format('d.m.Y | H:i:s');
            
            
        ?>

        <div data-bidder-id="<?php echo $offer['userid'] ?>" class="latest-offers__row <?php echo $is_user ? 'latest-offers__row--user' : '' ?>">
            
            <div class="latest-offers__column">
                <span><?php echo $competing_offer; ?></span>
                <span class="numToFormat"><?php echo $offer['bid']; ?></span>
                <span>₪</span>
            </div>
            <div class="latest-offers__column">
                <span data-userid="<?php echo $userid; ?>" class="date-to-compare"><?php echo $date; ?></span>
            </div>
            <?php
                 if($isUserAllowed) { ?>
                    <div class="latest-offers__phone-bidder">
                        <p><?php echo $username; ?></p>
                        <p><span>טלפון: </span>
                        <?php echo get_user_meta($offer['userid'], 'billing_phone', TRUE); ?>
                        </p>
                    </div>
            <?php } ?>
        </div>

        <?php } ?>

    </div>

<?php } ?>