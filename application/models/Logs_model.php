<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Logs_model extends CI_Model {

    function insert_log($table_name, $logs_data) {
        $this->db->insert($table_name, $logs_data);
        return $this->db->insert_id();
    }

    function update_log($table_name, $log_id_name, $log_id, $logs_data) {
        $this->db->where($log_id_name, $log_id);
        $this->db->update($table_name, $logs_data);
    }

    function get_admin_login_logs() {
        $this->db->select("lld.*,IF(lld.login_timestamp<=0, '', from_unixtime(lld.login_timestamp, '%d-%m-%Y %h:%i:%s')) AS login_time, IF(lld.logout_timestamp<=0, '', from_unixtime(lld.logout_timestamp, '%d-%m-%Y %h:%i:%s')) AS logout_time, u.name, u.username");
        $this->db->from('sa_logs_login_details AS lld');
        $this->db->join('sa_users AS u', 'u.sa_user_id = lld.sa_user_id');
        $this->db->order_by('lld.sa_logs_login_details_id', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }

}

/*
 * EOF: ./application/models/Logs_model.php
 */
