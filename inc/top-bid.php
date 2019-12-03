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

    ?>
    <h2 class="top-bid"><span class="top-bid__bg"><?php printf("ההצעה המובילה: %s %s", "<span class='numToFormat'>$topbid</span>", '₪'); ?></span></h2>

     <!-- ACF -->
    <div class="flex-acf">

        <div class="flex__side-columns flex__side-columns--right">
            <div class="flex-acf__row">
                <div class="flex-acf__columns"><h3>יצרן:</h3></div>
                <div class="flex-acf__columns"><h3><?php the_field('יצרן', $post->ID); ?></h3></div>
            </div>

            <div class="flex-acf__row">
                <div class="flex-acf__columns"><h3>דגם:</h3></div>
                <div class="flex-acf__columns"><h3><?php the_field('דגם', $post->ID); ?></h3></div>
            </div>

            <div class="flex-acf__row">
                <div class="flex-acf__columns"><h3>תת דגם:</h3></div>
                <div class="flex-acf__columns"><h3><?php the_field('תת_דגם', $post->ID); ?></h3></div>
            </div>

            <div class="flex-acf__row">
                <div class="flex-acf__columns"><h3>קילומטר:</h3></div>
                <div class="flex-acf__columns"><h3><?php the_field('קילומטר', $post->ID); ?></h3></div>
            </div>
        </div>

        <div class="flex__side-columns flex__side-columns--left">
        <div class="flex-acf__row">
            <div class="flex-acf__columns"><h3>שנה:</h3></div>
            <div class="flex-acf__columns"><h3><?php the_field('year', $post->ID); ?></h3></div>
        </div>

        <div class="flex-acf__row">
            <div class="flex-acf__columns"><h3>יד:</h3></div>
            <div class="flex-acf__columns"><h3><?php the_field('יד', $post->ID); ?></h3></div>
        </div>

        <div class="flex-acf__row">
            <div class="flex-acf__columns"><h3>מצב רכב:</h3></div>
            <div class="flex-acf__columns"><h3><?php the_field('מצב_רכב', $post->ID); ?></h3></div>
        </div>

        <div class="flex-acf__row">
            <div class="flex-acf__columns"><h3>בעלות:</h3></div>
            <div class="flex-acf__columns"><h3><?php the_field('בעלות', $post->ID); ?></h3></div>
        </div>
        </div>

    </div>

    <div class="latest-offers">
        <div class="latest-offers__row">
            <h2 class="latest-offers__title">הצעות אחרונות:</h2>
        </div>

    <?php 
        $offers = $wpdb->get_results(
        $wpdb->prepare("SELECT * FROM {$table_name} WHERE auction_id = %d", $auction_id)
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
            $date = $date->format('d.m.Y');
            
            
        ?>

        <div class="latest-offers__row <?php echo $is_user ? 'latest-offers__row--user' : '' ?>">
            
            <div class="latest-offers__column">
                <span><?php echo $competing_offer; ?></span>
                <span class="numToFormat"><?php echo $offer['bid']; ?></span>
                <span>₪</span>
            </div>
            <div class="latest-offers__column">
                <span><?php echo $date; ?></span>
            </div>
        </div>

        <?php }
    ?>

    </div>
    <?php
}

?>