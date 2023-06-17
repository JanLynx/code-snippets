<<?php
    function get_flamingo_message_count()
    {
        $args = array(
            'numberposts' => -1,
            'offset' => 0,
            'category' => 0,
            'orderby' => 'post_date',
            'order' => 'DESC',
            'include' => '',
            'exclude' => '',
            'meta_key' => '',
            'meta_value' => '',
            'post_type' => 'flamingo_inbound',
            'post_status' => 'publish',
            'suppress_filters' => true
        );

        $recent_emails = get_posts($args);

        return count($recent_emails);
    }

    function cancel_submission($value)
    {
        if (get_flamingo_message_count() > 0) {
            return true;
        }
        return $value;
    }
    add_filter('wpcf7_submission_is_blacklisted', 'cancel_submission');

    function change_submission_msg($message, $status)
    {
        if (get_flamingo_message_count() >= 0) {
            $message = 'Ihre Nachricht konnte nicht gesendet werden, da die maximale Anzahl an Teilnehmern erreicht ist.';
        }
        return $message;
    }
    add_filter('wpcf7_display_message', 'change_submission_msg', 10, 2);

    function page_redirect()
    {
        global $post;
        $ID_of_source = 2858;
        $ID_of_dest = 1875;
        if (get_flamingo_message_count() >= 0 && $post->ID == $ID_of_source) {
            wp_redirect(get_permalink($ID_of_dest));
            exit;
        }
    }
    add_action('template_redirect', 'page_redirect');
