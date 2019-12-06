<?php 

function flexACF() { ?>
    <!-- ACF -->
     <!-- here i'm bind data for "סכום הצעה" input element that used in js -->
     <?php 
        $stepPrice = get_post_meta($auction_id, 'woo_ua_bid_increment', TRUE);
        $topbid = get_post_meta($auction_id, 'topbid', TRUE);
     ?>
    <div class="flex-acf" data-bidvalue="<?php echo $topbid; ?>" data-step-price="<?php echo $stepPrice; ?>">

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

    <?php } ?>