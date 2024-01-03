<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Ismw_model extends CI_Model {

    function get_all_ismw_list($start, $length, $search_district = '', $search_applicant_name = '', $search_mob = '', $search_status = '') {
        $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
        $this->db->select("t.*,date_format(t.created_time, '%d-%m-%Y %H:%i:%s') AS display_datetime");
        if ($search_district != '') {
            $this->db->where('t.district', $search_district);
        }
        if ($search_applicant_name != '') {
            $this->db->like('t.name', $search_applicant_name);
        }
        if ($search_mob != '') {
            $this->db->like('t.mobile_no', $search_mob);
        }
        if ($search_status != '') {
            $this->db->where('t.status', $search_status);
        }
        $this->db->limit($length, $start);
        $this->db->where('t.is_delete !=' . IS_DELETE);
//        $this->db->where('t.status != ' . VALUE_ZERO);
//        $this->db->where('t.status != ' . VALUE_ONE);
        //$this->db->where('u.user_id', $session_user_id);
        $this->db->from('ismw AS t');
       // $this->db->join('users as u', 'u.user_id = t.user_id','left');
        $this->db->order_by('t.ismw_id', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_ismw_by_id($ismw_id) {
        $this->db->where('is_delete !=', IS_DELETE);
        $this->db->where('ismw_id', $ismw_id);
        $this->db->from('ismw');
        $resc = $this->db->get();
        return $resc->row_array();
    }

    function get_total_count_of_records($search_district) {
        $this->db->select('COUNT(ismw_id) AS total_records');
        if ($search_district != '') {
            $this->db->where('district', $search_district);
        }
        $this->db->where('is_delete !=' . IS_DELETE);
//        $this->db->where('status != ' . VALUE_ZERO);
//        $this->db->where('status != ' . VALUE_ONE);
        $this->db->from('ismw');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_filter_count_of_records($search_district = '', $search_applicant_name = '', $search_mob = '', $search_status = '') {
        $this->db->select('COUNT(t.ismw_id) AS total_records');
        if ($search_district != '') {
            $this->db->where('t.district', $search_district);
        }
        if ($search_applicant_name != '') {
            $this->db->like('t.name', $search_applicant_name);
        }
        if ($search_mob != '') {
            $this->db->like('t.mobile_no', $search_mob);
        }
        if ($search_status != '') {
            $this->db->where('t.status', $search_status);
        }
        $this->db->where('t.is_delete !=' . IS_DELETE);
//        $this->db->where('t.status != ' . VALUE_ZERO);
//        $this->db->where('t.status != ' . VALUE_ONE);
        $this->db->from('ismw AS t');
        //$this->db->join('users as u', 'u.user_id = t.user_id');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_records_for_excel($search_district) {
        $this->db->select('t.ismw_id, t.district, t.name,t.mobile_no, t.submitted_datetime, t.status');
        if ($search_district != VALUE_ZERO) {
            $this->db->where('t.district', $search_district);
        }
        $this->db->where('t.is_delete !=' . IS_DELETE);
        $this->db->where('t.status != ' . VALUE_ZERO);
        $this->db->where('t.status != ' . VALUE_ONE);
        $this->db->from('ismw AS t');
        //$this->db->join('users as u', 'u.user_id = t.user_id');
        //$this->db->join('sa_users as sau', 'sau.sa_user_id = t.updated_by','left'); 
        $this->db->order_by('t.ismw_id', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }

}

/*
 * EOF: ./application/models/Ismw_model.php
 */