<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Textile_model extends CI_Model {

    function get_all_textile_list($start, $length, $search_district = '', $search_applicant_name = '', $search_applicant_mobile = '', $search_enterprise = '', $search_status = '') {
        $this->db->select("r.*,u.applicant_name,u.mobile_number AS applicant_mobile,date_format(r.created_time, '%d-%m-%Y %H:%i:%s') AS display_datetime");
        if ($search_district != '') {
            $this->db->where('r.district', $search_district);
        }
        if ($search_applicant_name != '') {
            $this->db->like('u.applicant_name', $search_applicant_name);
        }
        if ($search_applicant_mobile != '') {
            $this->db->like('u.mobile_number', $search_applicant_mobile);
        }
        if ($search_enterprise != '') {
            $this->db->like('r.enterprise_name', $search_enterprise);
        }
        if ($search_status != '') {
            $this->db->where('r.status', $search_status);
        }
        $this->db->limit($length, $start);
        $this->db->where('r.is_delete !=' . IS_DELETE);
        $this->db->where('r.status != ' . VALUE_ZERO);
        $this->db->where('r.status != ' . VALUE_ONE);
        $this->db->from('incentive_generalform_textile AS r');
        $this->db->join('users as u', 'u.user_id = r.user_id');
        $this->db->order_by('r.incentive_id', 'DESC');
        $resc = $this->db->get();
        // print_r($this->db->last_query());   
        return $resc->result_array();
    }

    function get_textile_by_id($incentive_id) {
        $this->db->where('is_delete !=', IS_DELETE);
        $this->db->where('incentive_id', $incentive_id);
        $this->db->from('incentive_generalform_textile');
        $resc = $this->db->get();
        return $resc->row_array();
    }

    function get_total_count_of_records($search_district) {
        $this->db->select('COUNT(incentive_id) AS total_records');
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->where('status != ' . VALUE_ZERO);
        $this->db->where('status != ' . VALUE_ONE);
        $this->db->from('incentive_generalform_textile');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_filter_count_of_records($search_district = '', $search_applicant_name = '', $search_applicant_mobile = '', $search_enterprise = '', $search_status = '') {
        $this->db->select('COUNT(r.incentive_id) AS total_records');
        if ($search_district != '') {
            $this->db->where('r.district', $search_district);
        }
        if ($search_applicant_name != '') {
            $this->db->like('u.applicant_name', $search_applicant_name);
        }
        if ($search_applicant_mobile != '') {
            $this->db->like('u.mobile_number', $search_applicant_mobile);
        }
        if ($search_enterprise != '') {
            $this->db->like('r.enterprise_name', $search_enterprise);
        }
        if ($search_status != '') {
            $this->db->where('r.status', $search_status);
        }
        $this->db->where('r.is_delete !=' . IS_DELETE);
        $this->db->where('r.status != ' . VALUE_ZERO);
        $this->db->where('r.status != ' . VALUE_ONE);
        $this->db->from('incentive_generalform_textile AS r');
        $this->db->join('users as u', 'u.user_id = r.user_id');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_records_for_excel($search_district) {
        $this->db->select('r.incentive_id, r.district, u.applicant_name, u.mobile_number, r.enterprise_name, '
                . 'r.office_address, r.submitted_datetime, r.status, r.query_status');
        if ($search_district != '') {
            $this->db->where('r.district', $search_district);
        }
        $this->db->where('r.is_delete !=' . IS_DELETE);
        $this->db->where('r.status != ' . VALUE_ZERO);
        $this->db->where('r.status != ' . VALUE_ONE);
        $this->db->from('incentive_generalform_textile AS r');
        $this->db->join('users as u', 'u.user_id = r.user_id');
        $this->db->order_by('r.incentive_id', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }

}

/*
 * EOF: ./application/models/BOCW_model.php
 */