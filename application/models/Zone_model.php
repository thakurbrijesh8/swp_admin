<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Zone_model extends CI_Model {

    function get_all_zone_list($start, $length, $search_district = '', $search_applicant_name = '', $search_applicant_mobile = '', $search_app_timing = '', $search_status = '', $search_name_of_applicant = '', $search_mobile_no = '') {
        $this->db->select("z.*,u.applicant_name,u.mobile_number AS applicant_mobile,date_format(z.created_time, '%d-%m-%Y %H:%i:%s') AS display_datetime");
        if ($search_district != '') {
            $this->db->where('z.district', $search_district);
        }
        if ($search_applicant_name != '') {
            $this->db->like('u.applicant_name', $search_applicant_name);
        }
        if ($search_name_of_applicant != '') {
            $this->db->like('z.name_of_applicant', $search_name_of_applicant);
        }
        if ($search_applicant_mobile != '') {
            $this->db->like('u.mobile_number', $search_applicant_mobile);
        }
        if ($search_mobile_no != '') {
            $this->db->like('z.mobile_no', $search_mobile_no);
        }
        if ($search_app_timing != '') {
            $query_module_array = $this->config->item('query_module_array');
            $qm_data = isset($query_module_array[VALUE_THIRTY]) ? $query_module_array[VALUE_THIRTY] : array();
            if (isset($qm_data['day'])) {
                if ($search_app_timing == VALUE_ONE) {
                    $this->db->where('z.processing_days <= ' . $qm_data['day']);
                } else if ($search_app_timing == VALUE_TWO) {
                    $this->db->where('z.processing_days > ' . $qm_data['day']);
                }
            }
        }
        if ($search_status != '') {
            if ($search_status == VALUE_TEN) {
                $this->db->where("(z.query_status='" . VALUE_ONE . "' OR z.query_status='" . VALUE_TWO . "')");
                $this->db->where("z.status !=" . VALUE_FIVE);
                $this->db->where("z.status !=" . VALUE_SIX);
            } else {
                if ($search_status != VALUE_FIVE && $search_status != VALUE_SIX) {
                    $this->db->where("(z.query_status='" . VALUE_ZERO . "' OR z.query_status='" . VALUE_THREE . "')");
                }
                $this->db->where('z.status', $search_status);
            }
        }

        $this->db->limit($length, $start);
        $this->db->where('z.is_delete !=' . IS_DELETE);
        $this->db->where('z.status != ' . VALUE_ZERO);
        $this->db->where('z.status != ' . VALUE_ONE);
        $this->db->from('zone_information AS z');
        $this->db->join('users as u', 'u.user_id = z.user_id');
        $this->db->order_by('z.zone_id', 'DESC');
        $resc = $this->db->get();
        //print_r($this->db->last_query());   
        return $resc->result_array();
    }

    function get_zone_by_id($zone_id) {
        $this->db->where('is_delete !=', IS_DELETE);
        $this->db->where('zone_id', $zone_id);
        $this->db->from('zone_information');
        $resc = $this->db->get();
        return $resc->row_array();
    }

    function get_total_count_of_records($search_district) {
        $this->db->select('COUNT(zone_id) AS total_records');
        if (!is_admin() && !is_view_all_district_user()) {
            if ($search_district != '') {
                $this->db->where('district', $search_district);
            }
        }
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->where('status != ' . VALUE_ZERO);
        $this->db->where('status != ' . VALUE_ONE);
        $this->db->from('zone_information');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_filter_count_of_records($search_district = '', $search_applicant_name = '', $search_applicant_mobile = '', $search_app_timing = '', $search_status = '', $search_name_of_applicant = '', $search_mobile_no = '') {
        $this->db->select('COUNT(z.zone_id) AS total_records');
        if ($search_district != '') {
            $this->db->where('z.district', $search_district);
        }
        if ($search_applicant_name != '') {
            $this->db->like('u.applicant_name', $search_applicant_name);
        }
        if ($search_applicant_mobile != '') {
            $this->db->like('u.mobile_number', $search_applicant_mobile);
        }
        if ($search_name_of_applicant != '') {
            $this->db->like('z.name_of_applicant', $search_name_of_applicant);
        }
        if ($search_mobile_no != '') {
            $this->db->like('z.mobile_no', $search_mobile_no);
        }
        if ($search_app_timing != '') {
            $query_module_array = $this->config->item('query_module_array');
            $qm_data = isset($query_module_array[VALUE_THIRTY]) ? $query_module_array[VALUE_THIRTY] : array();
            if (isset($qm_data['day'])) {
                if ($search_app_timing == VALUE_ONE) {
                    $this->db->where('z.processing_days <= ' . $qm_data['day']);
                } else if ($search_app_timing == VALUE_TWO) {
                    $this->db->where('z.processing_days > ' . $qm_data['day']);
                }
            }
        }
        if ($search_status != '') {
            if ($search_status == VALUE_TEN) {
                $this->db->where("(z.query_status='" . VALUE_ONE . "' OR z.query_status='" . VALUE_TWO . "')");
                $this->db->where("z.status !=" . VALUE_FIVE);
                $this->db->where("z.status !=" . VALUE_SIX);
            } else {
                if ($search_status != VALUE_FIVE && $search_status != VALUE_SIX) {
                    $this->db->where("(z.query_status='" . VALUE_ZERO . "' OR z.query_status='" . VALUE_THREE . "')");
                }
                $this->db->where('z.status', $search_status);
            }
        }
        $this->db->where('z.is_delete !=' . IS_DELETE);
        $this->db->where('z.status != ' . VALUE_ZERO);
        $this->db->where('z.status != ' . VALUE_ONE);
        $this->db->from('zone_information AS z');
        $this->db->join('users as u', 'u.user_id = z.user_id');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_records_for_excel($search_district) {
        $this->db->select('f.zone_id, f.district, u.applicant_name, u.mobile_number, f.name_of_applicant, '
                . 'f.mobile_no, f.submitted_datetime, f.status, f.query_status, sau.name, f.status_datetime, f.remarks');
        if ($search_district != VALUE_ZERO) {
            $this->db->where('f.district', $search_district);
        }
        $this->db->where('f.is_delete !=' . IS_DELETE);
        $this->db->where('f.status != ' . VALUE_ZERO);
        $this->db->where('f.status != ' . VALUE_ONE);
        $this->db->from('zone_information AS f');
        $this->db->join('users as u', 'u.user_id = f.user_id');
        $this->db->join('sa_users as sau', 'sau.sa_user_id = f.updated_by', 'left');
        $this->db->order_by('f.zone_id', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }

}

/*
 * EOF: ./application/models/BOCW_model.php
 */