<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Seller_model extends CI_Model {

    function get_all_seller_list($start, $length, $session_district, $search_applicant_name = '', $search_status = '') {
        $this->db->select("r.*,u.applicant_name,u.mobile_number AS applicant_mobile,date_format(r.created_time, '%d-%m-%Y %H:%i:%s') AS display_datetime");
        if ($search_applicant_name != '') {
            $this->db->like('u.applicant_name', $search_applicant_name);
        }
        if ($search_status != '') {
            $this->db->where('r.status', $search_status);
        }
        if ($session_district != '') {
            $this->db->where('r.district', $session_district);
        }
        $this->db->limit($length, $start);
        $this->db->where('r.is_delete !=' . IS_DELETE);
        $this->db->where('r.status != ' . VALUE_ZERO);
        $this->db->where('r.status != ' . VALUE_ONE);
        $this->db->from('lease_seller AS r');
        $this->db->join('users as u', 'u.user_id = r.user_id');
        $this->db->order_by('r.seller_id', 'DESC');
        $resc = $this->db->get();
        //print_r($this->db->last_query());   
        return $resc->result_array();
    }

    function get_seller_by_id($seller_id) {
        $this->db->where('is_delete !=', IS_DELETE);
        $this->db->where('seller_id', $seller_id);
        $this->db->from('lease_seller');
        $resc = $this->db->get();
        return $resc->row_array();
    }

    function get_total_count_of_records() {
        $this->db->select('COUNT(seller_id) AS total_records');
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->where('status != ' . VALUE_ZERO);
        $this->db->where('status != ' . VALUE_ONE);
        $this->db->from('lease_seller');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_filter_count_of_records($session_district,$search_applicant_name = '', $search_status = '') {
        $this->db->select('COUNT(r.seller_id) AS total_records');
        if ($search_applicant_name != '') {
            $this->db->like('u.applicant_name', $search_applicant_name);
        }
        if ($search_status != '') {
            $this->db->where('r.status', $search_status);
        }
        if ($session_district != '') {
            $this->db->where('r.district', $session_district);
        }
        $this->db->where('r.is_delete !=' . IS_DELETE);
        $this->db->where('r.status != ' . VALUE_ZERO);
        $this->db->where('r.status != ' . VALUE_ONE);
        $this->db->from('lease_seller AS r');
        $this->db->join('users as u', 'u.user_id = r.user_id');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

}

/*
 * EOF: ./application/models/Seller_model.php
 */