<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Shop_model extends CI_Model {

    function get_all_shop_list($start, $length, $search_district = '', $search_entity_establishment_type = '', $search_logged_user_detail = '', $search_applicant_detail = '', $search_app_timing = '', $search_status = '', $search_query_status = '') {
        $this->db->select("s.*,u.applicant_name,u.mobile_number AS applicant_mobile,date_format(s.created_time, '%d-%m-%Y %H:%i:%s') AS display_datetime,sau.name AS logged_user_name");
        if ($search_district != '') {
            $this->db->where('s.district', $search_district);
        }
        if ($search_entity_establishment_type != '') {
            $this->db->where('s.entity_establishment_type', $search_entity_establishment_type);
        }
        if ($search_logged_user_detail != '') {
            $where = "(u.applicant_name LIKE '%$search_logged_user_detail%' OR "
                    . "u.mobile_number  LIKE '%$search_logged_user_detail%')";
            $this->db->where($where);
        }
        if ($search_applicant_detail != '') {
            $where = "(s.s_name  LIKE '%$search_applicant_detail%' OR "
                    . "s.regi_category  LIKE '%$search_applicant_detail%')";
            $this->db->where($where);
        }
        if ($search_app_timing != '') {
            $query_module_array = $this->config->item('query_module_array');
            $qm_data = isset($query_module_array[VALUE_THIRTYTHREE]) ? $query_module_array[VALUE_THIRTYTHREE] : array();
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
        if ($search_query_status != '') {
            $this->db->where('s.query_status', $search_query_status);
        }
        $this->db->limit($length, $start);
        $this->db->where('s.is_delete !=' . IS_DELETE);
        $this->db->where('s.status != ' . VALUE_ZERO);
        $this->db->where('s.status != ' . VALUE_ONE);
        $this->db->from('shop AS s');
        $this->db->join('users as u', 'u.user_id = s.user_id');
        $this->db->join('sa_users as sau', 'sau.sa_user_id = s.updated_by', 'left');
        $this->db->order_by('s.s_id', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_total_count_of_records($search_district) {
        $this->db->select('COUNT(s_id) AS total_records');
        if (!is_admin() && !is_view_all_district_user()) {
            if ($search_district != '') {
                $this->db->where('district', $search_district);
            }
        }
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->where('status != ' . VALUE_ZERO);
        $this->db->where('status != ' . VALUE_ONE);
        $this->db->from('shop');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_filter_count_of_records($search_district = '', $search_entity_establishment_type = '', $search_logged_user_detail = '', $search_applicant_detail = '', $search_app_timing = '', $search_status = '', $search_query_status = '') {
        $this->db->select('COUNT(s.s_id) AS total_records');
        if ($search_district != '') {
            $this->db->where('s.district', $search_district);
        }
        if ($search_entity_establishment_type != '') {
            $this->db->where('s.entity_establishment_type', $search_entity_establishment_type);
        }
        if ($search_logged_user_detail != '') {
            $where = "(u.applicant_name LIKE '%$search_logged_user_detail%' OR "
                    . "u.mobile_number  LIKE '%$search_logged_user_detail%')";
            $this->db->where($where);
        }
        if ($search_applicant_detail != '') {
            $where = "(s.s_name  LIKE '%$search_applicant_detail%' OR "
                    . "s.regi_category  LIKE '%$search_applicant_detail%')";
            $this->db->where($where);
        }
        if ($search_app_timing != '') {
            $query_module_array = $this->config->item('query_module_array');
            $qm_data = isset($query_module_array[VALUE_THIRTYTHREE]) ? $query_module_array[VALUE_THIRTYTHREE] : array();
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
        if ($search_query_status != '') {
            $this->db->where('s.query_status', $search_query_status);
        }
        $this->db->where('s.is_delete !=' . IS_DELETE);
        $this->db->where('s.status != ' . VALUE_ZERO);
        $this->db->where('s.status != ' . VALUE_ONE);
        $this->db->from('shop AS s');
        $this->db->join('users as u', 'u.user_id = s.user_id');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_records_for_excel($search_district) {
        $this->db->select('s.s_id, s.district, s.entity_establishment_type, u.applicant_name, u.mobile_number, s.s_name, '
                . 's.regi_category, s.submitted_datetime, s.status, s.query_status, sau.name, s.status_datetime, s.s_remark');
        if ($search_district != VALUE_ZERO) {
            $this->db->where('s.district', $search_district);
        }
        $this->db->where('s.is_delete !=' . IS_DELETE);
        $this->db->where('s.status != ' . VALUE_ZERO);
        $this->db->where('s.status != ' . VALUE_ONE);
        $this->db->from('shop AS s');
        $this->db->join('users as u', 'u.user_id = s.user_id');
        $this->db->join('sa_users as sau', 'sau.sa_user_id = s.updated_by', 'left');
        $this->db->order_by('s.s_id', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }

}

/*
* EOF: ./application/models/Shop_model.php
*/