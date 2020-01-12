<?php 
function yoyo_countdownTitle() {
    
    global $post;
    $id = $post->ID;
    $end_time = get_post_meta($id ,'woo_ua_auction_end_date', true);
            $raw_time = strtotime($end_time) - strtotime("now");
            $end_days = $raw_time / 60 / 60 / 24;
            $day_in_hours = intval($end_days) * 24;
            $end_hours = ($end_days - intval($end_days)) * 24;
            $end_minutes = ($end_hours - intval($end_hours)) * 60;
            $end_second = ($end_minutes - intval($end_minutes)) * 60;
            $end_hours = $end_hours - 2;
    ?>
    <div class="open-auction-time">
        <div class="open-auction-time__info">
            <h3 class="open-auction-time__title">המכרז יפתח בתאריך</h3>
            <div class="open-auction-time__content">
                <?php
                $start_date = explode(" ", get_post_meta($id, 'woo_ua_auction_start_date', true));
                $text_date = array_reverse(explode("-", $start_date[0]));

                ?>
                <time><?php echo implode('.', $text_date); ?></time>
                <span>בשעה</span>
                <time><?php echo $start_date[1]; ?></time>
            </div>
        </div>

        <div id="codpen" data-id="<?php echo $id; ?>" class="wrap">  

            <div class="countdown">
                <div class="bloc-time hours" data-init-value="<?php echo floor($day_in_hours); ?>">

                <div class="figure hours hours-1">
                    <span class="top">0</span>
                    <span class="top-back">
                    <span>0</span>
                    </span>
                    <span class="bottom">0</span>
                    <span class="bottom-back">
                    <span>0</span>
                    </span>
                </div>

                <div class="figure hours hours-2">
                    <span class="top">0</span>
                    <span class="top-back">
                    <span>0</span>
                    </span>
                    <span class="bottom">0</span>
                    <span class="bottom-back">
                    <span>0</span>
                    </span>
                </div>
                <span class="count-title">שעות</span>
                </div>

                <div class="bloc-time min" data-init-value="<?php echo floor($end_minutes); ?>">

                <div class="figure min min-1">
                    <span class="top">0</span>
                    <span class="top-back">
                    <span>0</span>
                    </span>
                    <span class="bottom">0</span>
                    <span class="bottom-back">
                    <span>0</span>
                    </span>        
                </div>

                <div class="figure min min-2">
                <span class="top">0</span>
                    <span class="top-back">
                    <span>0</span>
                    </span>
                    <span class="bottom">0</span>
                    <span class="bottom-back">
                    <span>0</span>
                    </span>
                </div>
                <span class="count-title">דקות</span>
                </div>

                <div class="bloc-time sec" data-init-value="<?php echo floor($end_second); ?>">
                

                    <div class="figure sec sec-1">
                    <span class="top">0</span>
                    <span class="top-back">
                    <span>0</span>
                    </span>
                    <span class="bottom">0</span>
                    <span class="bottom-back">
                    <span>0</span>
                    </span>          
                </div>

                <div class="figure sec sec-2">
                    <span class="top">0</span>
                    <span class="top-back">
                    <span>0</span>
                    </span>
                    <span class="bottom">0</span>
                    <span class="bottom-back">
                    <span>0</span>
                    </span>
                </div>
                <span class="count-title">שניות</span>
                </div>
            </div>
        </div>
    </div>

    <?php } ?>