<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Active_users_model extends CI_Model {

    function get_all_active_users_list($start, $length, $search_applicant_name = '', $search_applicant_mobile = '', $search_applicant_email = '') {
        $this->db->select('user_id, applicant_name, applicant_address, mobile_number, email,verify_mobile_datetime, is_active');
        if ($search_applicant_name != '') {
            $this->db->like('applicant_name', $search_applicant_name);
        }
        if ($search_applicant_mobile != '') {
            $this->db->like('mobile_number', $search_applicant_mobile);
        }
        if ($search_applicant_email != '') {
            $this->db->like('email', $search_applicant_email);
        }
        $this->db->limit($length, $start);
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->where('is_active', VALUE_ONE);
        $this->db->from('users');
        $this->db->order_by('verify_mobile_datetime', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_total_count_of_records() {
        $this->db->select('COUNT(user_id) AS total_records');
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->where('is_active', VALUE_ONE);
        $this->db->from('users');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_filter_count_of_records($search_applicant_name = '', $search_applicant_mobile = '', $search_applicant_email = '') {
        $this->db->select('COUNT(user_id) AS total_records');
        if ($search_applicant_name != '') {
            $this->db->like('applicant_name', $search_applicant_name);
        }
        if ($search_applicant_mobile != '') {
            $this->db->like('mobile_number', $search_applicant_mobile);
        }
        if ($search_applicant_email != '') {
            $this->db->like('email', $search_applicant_email);
        }
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->where('is_active', VALUE_ONE);
        $this->db->from('users');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

}

/*
 * EOF: ./application/models/Active_users_model.php
 */