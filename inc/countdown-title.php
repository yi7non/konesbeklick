<?php 
function yoyo_countdownTitle() {
    // echo "<h2 class='yoyo-countdownTitle'>מכירת הפריט תיסגר בעוד:</h2>";
    global $post;
    $id = $post->ID;
    $end_time = get_post_meta($id ,'woo_ua_auction_end_date', true);
    $end_second = round((strtotime($end_time) - strtotime("now")));
    $end_minute = floor($end_second / 60);
    $left_second = fmod($end_second, 60);
    $end_hours = floor($end_minute / 60) - 2;
    $left_minute = fmod($end_minute, 60);

 
    ?>
    <div id="codpen" data-id="<?php echo $id; ?>" class="wrap">  

        <div class="countdown">
            <div class="bloc-time hours" data-init-value="<?php echo $end_hours; ?>">
            <span class="count-title">Hours</span>

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
            </div>

            <div class="bloc-time min" data-init-value="<?php echo $left_minute; ?>">
            <span class="count-title">Minutes</span>

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
            </div>

            <div class="bloc-time sec" data-init-value="<?php echo $left_second; ?>">
            <span class="count-title">Seconds</span>

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
            </div>
        </div>
    </div>

    <?php } ?>