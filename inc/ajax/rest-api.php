<?php 

function shimiTimer() {
    register_rest_route('shimi/v1', 'timer', array(
            'methods' => WP_REST_Server::READABLE,
            'callback' => 'shimiApTime'
        ));

      register_rest_route('shimi/v1', 'grid-home-update', array(
      'methods' => WP_REST_Server::READABLE,
      'callback' => 'gridHomeUPDATE'
      ));

   }

     function shimiApTime($data) {
        $end_time = get_post_meta($data['postid'] ,'woo_ua_auction_end_date', true);
        $end_second = round((strtotime($end_time) - strtotime("now")));
        $end_minute = floor($end_second / 60);
        $left_second = fmod($end_second, 60);
        $end_hours = floor($end_minute / 60);
        $left_minute = fmod($end_minute, 60);

        global $wpdb;
        $table_name = $wpdb->prefix . 'woo_ua_auction_log';
        $results = $wpdb->get_var($wpdb->prepare(
           "SELECT MAX(bid) FROM {$table_name} WHERE auction_id = %d", $data['postid']
        ));

        $row = $wpdb->get_row($wpdb->prepare(
         "SELECT * FROM {$table_name} WHERE auction_id = %d ORDER BY date DESC" , $data['postid']
      ));

        $topbid = substr($results, 0, strpos($results, '.'));
        $times = array(
           'end_hours'   => $end_hours,
           'left_minute' => $left_minute,
           'left_second' => $left_second
        );

      //   the minimum bid incrament:
        $bid_incrament = get_post_meta($data['postid'], 'woo_ua_bid_increment', true);
        $user_id = get_current_user_id();

        return array(
           $times,
           $data['postid'],
           $topbid,
           $row,
           $bid_incrament,
         );
     }

     function gridHomeUPDATE($param) {

      $topBID = array();

      $IDs = explode(",", $param['id']);

      foreach($IDs as $id) {
         $topBID[] = get_post_meta($id, 'topbid', true);
      }

      return $topBID;
      
     }

     

?>