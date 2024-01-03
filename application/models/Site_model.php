<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Site_model extends CI_Model {

    function get_all_site_list($start, $length, $search_district = '', $search_applicant_name = '', $search_applicant_mobile = '', $search_app_timing = '', $search_status = '', $search_name_of_applicant = '', $search_mobile_no = '') {
        $this->db->select("s.*,u.applicant_name,u.mobile_number AS applicant_mobile,date_format(s.created_time, '%d-%m-%Y %H:%i:%s') AS display_datetime");
        if ($search_district != '') {
            $this->db->where('s.district', $search_district);
        }
        if ($search_applicant_name != '') {
            $this->db->like('u.applicant_name', $search_applicant_name);
        }
        if ($search_applicant_mobile != '') {
            $this->db->like('u.mobile_number', $search_applicant_mobile);
        }
        if ($search_name_of_applicant != '') {
            $this->db->like('s.name_of_applicant', $search_name_of_applicant);
        }
        if ($search_mobile_no != '') {
            $this->db->like('s.mobile_no', $search_mobile_no);
        }
        if ($search_app_timing != '') {
            $query_module_array = $this->config->item('query_module_array');
            $qm_data = isset($query_module_array[VALUE_TWENTYNINE]) ? $query_module_array[VALUE_TWENTYNINE] : array();
            if (isset($qm_data['day'])) {
                if ($search_app_timing == VALUE_ONE) {
                    $this->db->where('s.processing_days <= ' . $qm_data['day']);
                } else if ($search_app_timing == VALUE_TWO) {
                    $this->db->where('s.processing_days > ' . $qm_data['day']);
                }
            }
        }
        if ($search_status != '') {
            if ($search_status == VALUE_TEN) {
                $this->db->where("(s.query_status='" . VALUE_ONE . "' OR s.query_status='" . VALUE_TWO . "')");
                $this->db->where("s.status !=" . VALUE_FIVE);
                $this->db->where("s.status !=" . VALUE_SIX);
            } else {
                if ($search_status != VALUE_FIVE && $search_status != VALUE_SIX) {
                    $this->db->where("(s.query_status='" . VALUE_ZERO . "' OR s.query_status='" . VALUE_THREE . "')");
                }
                $this->db->where('s.status', $search_status);
            }
        }

        $this->db->limit($length, $start);
        $this->db->where('s.is_delete !=' . IS_DELETE);
        $this->db->where('s.status != ' . VALUE_ZERO);
        $this->db->where('s.status != ' . VALUE_ONE);
        $this->db->from('site_elevation AS s');
        $this->db->join('users as u', 'u.user_id = s.user_id');
        $this->db->order_by('s.site_id', 'DESC');
        $resc = $this->db->get();
        //print_r($this->db->last_query());   
        return $resc->result_array();
    }

    function get_site_by_id($site_id) {
        $this->db->where('is_delete !=', IS_DELETE);
        $this->db->where('site_id', $site_id);
        $this->db->from('site_elevation');
        $resc = $this->db->get();
        return $resc->row_array();
    }

    function get_total_count_of_records($search_district) {
        $this->db->select('COUNT(site_id) AS total_records');
        if (!is_admin() && !is_view_all_district_user()) {
            if ($search_district != '') {
                $this->db->where('district', $search_district);
            }
        }
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->where('status != ' . VALUE_ZERO);
        $this->db->where('status != ' . VALUE_ONE);
        $this->db->from('site_elevation');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_filter_count_of_records($search_district, $search_applicant_name = '', $search_applicant_mobile = '', $search_app_timing = '', $search_status = '', $search_name_of_applicant = '', $search_mobile_no = '') {
        $this->db->select('COUNT(s.site_id) AS total_records');
        if ($search_district != '') {
            $this->db->where('s.district', $search_district);
        }
        if ($search_applicant_name != '') {
            $this->db->like('u.applicant_name', $search_applicant_name);
        }
        if ($search_applicant_mobile != '') {
            $this->db->like('u.mobile_number', $search_applicant_mobile);
        }
        if ($search_name_of_applicant != '') {
            $this->db->like('s.name_of_applicant', $search_name_of_applicant);
        }
        if ($search_mobile_no != '') {
            $this->db->like('s.mobile_no', $search_mobile_no);
        }
        if ($search_app_timing != '') {
            $query_module_array = $this->config->item('query_module_array');
            $qm_data = isset($query_module_array[VALUE_TWENTYNINE]) ? $query_module_array[VALUE_TWENTYNINE] : array();
            if (isset($qm_data['day'])) {
                if ($search_app_timing == VALUE_ONE) {
                    $this->db->where('s.processing_days <= ' . $qm_data['day']);
                } else if ($search_app_timing == VALUE_TWO) {
                    $this->db->where('s.processing_days > ' . $qm_data['day']);
                }
            }
        }
        if ($search_status != '') {
            if ($search_status == VALUE_TEN) {
                $this->db->where("(s.query_status='" . VALUE_ONE . "' OR s.query_status='" . VALUE_TWO . "')");
                $this->db->where("s.status !=" . VALUE_FIVE);
                $this->db->where("s.status !=" . VALUE_SIX);
            } else {
                if ($search_status != VALUE_FIVE && $search_status != VALUE_SIX) {
                    $this->db->where("(s.query_status='" . VALUE_ZERO . "' OR s.query_status='" . VALUE_THREE . "')");
                }
                $this->db->where('s.status', $search_status);
            }
        }

        $this->db->where('s.is_delete !=' . IS_DELETE);
        $this->db->where('s.status != ' . VALUE_ZERO);
        $this->db->where('s.status != ' . VALUE_ONE);
        $this->db->from('site_elevation AS s');
        $this->db->join('users as u', 'u.user_id = s.user_id');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_records_for_excel($search_district) {
        $this->db->select('f.site_id, f.district, u.applicant_name, u.mobile_number, f.name_of_applicant, '
                . 'f.mobile_no, f.submitted_datetime, f.status, f.query_status, sau.name, f.status_datetime, f.remarks');
        if ($search_district != VALUE_ZERO) {
            $this->db->where('f.district', $search_district);
        }
        $this->db->where('f.is_delete !=' . IS_DELETE);
        $this->db->where('f.status != ' . VALUE_ZERO);
        $this->db->where('f.status != ' . VALUE_ONE);
        $this->db->from('site_elevation AS f');
        $this->db->join('users as u', 'u.user_id = f.user_id');
        $this->db->join('sa_users as sau', 'sau.sa_user_id = f.updated_by', 'left');
        $this->db->order_by('f.site_id', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }

}

/*
 * EOF: ./application/models/BOCW_model.php
 */