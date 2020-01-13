<?php 

function admin_jump_price() {
    if(isset($_POST['price'])) {

        $price = $_POST['price'];
        $id = $_POST['id'];
        $userid = $_POST['userid'];

        $price = $price . get_post_meta($id, 'topbid', true);

    global $wpdb;
    $table_name = $wpdb->prefix . 'woo_ua_auction_log';

    $wpdb->query( $wpdb->prepare( 
        "
            INSERT INTO {$table_name}
            ( userid, auction_id, bid, proxy)
            VALUES ( %d, %d, %d, %d )
        ", 
        $userid, 
        $id, 
        $price,
        0 
    ) );

    wp_send_json([$price, $id, $userid], 200);    

    }

    wp_send_json(["לא הזנת מחיר"], 200);
}


?>