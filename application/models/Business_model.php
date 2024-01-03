<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Business_model extends CI_Model {

    function get_all_business_list($start, $length, $search_logged_user_detail = '', $search_ucn = '', $search_ud = '') {
        $this->db->select("b.*,u.applicant_name,u.mobile_number AS applicant_mobile");
        if ($search_logged_user_detail != '') {
            $where = "(u.applicant_name LIKE '%$search_logged_user_detail%' OR "
                    . "u.mobile_number  LIKE '%$search_logged_user_detail%')";
            $this->db->where($where);
        }
        if ($search_ucn != '') {
            $where = "(b.udyam_number LIKE '%$search_ucn%' OR "
                    . "b.certificate_number  LIKE '%$search_ucn%')";
            $this->db->where($where);
        }
        if ($search_ud != '') {
            $where = "(b.unit_name  LIKE '%$search_ud%' OR "
                    . "b.unit_address  LIKE '%$search_ud%' OR "
                    . "b.unit_pin  LIKE '%$search_ud%' OR "
                    . "b.state_name  LIKE '%$search_ud%' OR "
                    . "b.district_name  LIKE '%$search_ud%')";
            $this->db->where($where);
        }
        $this->db->limit($length, $start);
        $this->db->where('b.is_delete !=' . IS_DELETE);
        $this->db->from('business AS b');
        $this->db->join('users as u', 'u.user_id = b.user_id');
        $this->db->order_by('b.business_id', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_total_count_of_records() {
        $this->db->select('COUNT(business_id) AS total_records');
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->from('business');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_filter_count_of_records($search_logged_user_detail = '', $search_ucn = '', $search_ud = '') {
        $this->db->select('COUNT(b.business_id) AS total_records');
        if ($search_logged_user_detail != '') {
            $where = "(u.applicant_name LIKE '%$search_logged_user_detail%' OR "
                    . "u.mobile_number  LIKE '%$search_logged_user_detail%')";
            $this->db->where($where);
        }
        if ($search_ucn != '') {
            $where = "(b.udyam_number LIKE '%$search_ucn%' OR "
                    . "b.certificate_number  LIKE '%$search_ucn%')";
            $this->db->where($where);
        }
        if ($search_ud != '') {
            $where = "(b.unit_name  LIKE '%$search_ud%' OR "
                    . "b.unit_address  LIKE '%$search_ud%' OR "
                    . "b.unit_pin  LIKE '%$search_ud%' OR "
                    . "b.state_name  LIKE '%$search_ud%' OR "
                    . "b.district_name  LIKE '%$search_ud%')";
            $this->db->where($where);
        }
        $this->db->where('b.is_delete !=' . IS_DELETE);
        $this->db->from('business AS b');
        $this->db->join('users as u', 'u.user_id = b.user_id');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

}

/*
 * EOF: ./application/models/Business_model.php
 */