<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Seller_model extends CI_Model {

    function get_all_seller_list($start, $length, $search_district = '', $search_entity_establishment_type = '', $search_logged_user_detail = '', $search_applicant_detail = '', $search_survey_number = '', $search_ltn = '', $search_app_timing = '', $search_status = '', $search_query_status = '') {
        $this->db->select("r.*,u.applicant_name,u.mobile_number AS applicant_mobile,date_format(r.created_time, '%d-%m-%Y %H:%i:%s') AS display_datetime");
        if ($search_district != '') {
            $this->db->where('r.district', $search_district);
        }
        if ($search_entity_establishment_type != '') {
            $this->db->where('r.entity_establishment_type', $search_entity_establishment_type);
        }
        if ($search_logged_user_detail != '') {
            $where = "(u.applicant_name LIKE '%$search_logged_user_detail%' OR "
                    . "u.mobile_number  LIKE '%$search_logged_user_detail%')";
            $this->db->where($where);
        }
        if ($search_applicant_detail != '') {
            $where = "(r.name_of_applicant  LIKE '%$search_applicant_detail%')";
            $this->db->where($where);
        }
        if ($search_survey_number != '') {
            $where = "(r.survey_no  LIKE '%$search_survey_number%')";
            $this->db->where($where);
        }
        if ($search_ltn != '') {
            $where = "(r.transferer_name  LIKE '%$search_ltn%')";
            $this->db->where($where);
        }
        if ($search_app_timing != '') {
            $query_module_array = $this->config->item('query_module_array');
            $qm_data = isset($query_module_array[VALUE_EIGHTEEN]) ? $query_module_array[VALUE_EIGHTEEN] : array();
            if (isset($qm_data['day'])) {
                if ($search_app_timing == VALUE_ONE) {
                    $this->db->where('r.processing_days <= ' . $qm_data['day']);
                } else if ($search_app_timing == VALUE_TWO) {
                    $this->db->where('r.processing_days > ' . $qm_data['day']);
                }
            }
        }
        if ($search_status != '') {
            if ($search_status == VALUE_TEN) {
                $this->db->where("(r.query_status='" . VALUE_ONE . "' OR r.query_status='" . VALUE_TWO . "')");
                $this->db->where("r.status !=" . VALUE_FIVE);
                $this->db->where("r.status !=" . VALUE_SIX);
            } else {
                if ($search_status != VALUE_FIVE && $search_status != VALUE_SIX) {
                    $this->db->where("(r.query_status='" . VALUE_ZERO . "' OR r.query_status='" . VALUE_THREE . "')");
                }
                $this->db->where('r.status', $search_status);
            }
        }
        if ($search_query_status != '') {
            $this->db->where('r.query_status', $search_query_status);
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

    function get_total_count_of_records($search_district) {
        $this->db->select('COUNT(seller_id) AS total_records');
        if (!is_admin() && !is_view_all_district_user()) {
            if ($search_district != '') {
                $this->db->where('district', $search_district);
            }
        }
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->where('status != ' . VALUE_ZERO);
        $this->db->where('status != ' . VALUE_ONE);
        $this->db->from('lease_seller');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_filter_count_of_records($search_district = '', $search_entity_establishment_type = '', $search_logged_user_detail = '', $search_applicant_detail = '', $search_survey_number = '', $search_ltn = '', $search_app_timing = '', $search_status = '', $search_query_status = '') {
        $this->db->select('COUNT(r.seller_id) AS total_records');
        if ($search_district != '') {
            $this->db->where('r.district', $search_district);
        }
        if ($search_entity_establishment_type != '') {
            $this->db->where('r.entity_establishment_type', $search_entity_establishment_type);
        }
        if ($search_logged_user_detail != '') {
            $where = "(u.applicant_name LIKE '%$search_logged_user_detail%' OR "
                    . "u.mobile_number  LIKE '%$search_logged_user_detail%')";
            $this->db->where($where);
        }
        if ($search_applicant_detail != '') {
            $where = "(r.name_of_applicant  LIKE '%$search_applicant_detail%')";
            $this->db->where($where);
        }
        if ($search_survey_number != '') {
            $where = "(r.survey_no  LIKE '%$search_survey_number%')";
            $this->db->where($where);
        }
        if ($search_ltn != '') {
            $where = "(r.transferer_name  LIKE '%$search_ltn%')";
            $this->db->where($where);
        }
        if ($search_app_timing != '') {
            $query_module_array = $this->config->item('query_module_array');
            $qm_data = isset($query_module_array[VALUE_EIGHTEEN]) ? $query_module_array[VALUE_EIGHTEEN] : array();
            if (isset($qm_data['day'])) {
                if ($search_app_timing == VALUE_ONE) {
                    $this->db->where('r.processing_days <= ' . $qm_data['day']);
                } else if ($search_app_timing == VALUE_TWO) {
                    $this->db->where('r.processing_days > ' . $qm_data['day']);
                }
            }
        }
        if ($search_status != '') {
            if ($search_status == VALUE_TEN) {
                $this->db->where("(r.query_status='" . VALUE_ONE . "' OR r.query_status='" . VALUE_TWO . "')");
                $this->db->where("r.status !=" . VALUE_FIVE);
                $this->db->where("r.status !=" . VALUE_SIX);
            } else {
                if ($search_status != VALUE_FIVE && $search_status != VALUE_SIX) {
                    $this->db->where("(r.query_status='" . VALUE_ZERO . "' OR r.query_status='" . VALUE_THREE . "')");
                }
                $this->db->where('r.status', $search_status);
            }
        }
        if ($search_query_status != '') {
            $this->db->where('r.query_status', $search_query_status);
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

    function get_records_for_excel($search_district) {
        $this->db->select('s.seller_id, s.district, s.entity_establishment_type, u.applicant_name, u.mobile_number, s.name_of_applicant, '
                . 's.survey_no, s.transferer_name, s.submitted_datetime, s.status, s.query_status, sau.name, s.status_datetime, s.remarks');
        if ($search_district != VALUE_ZERO) {
            $this->db->where('s.district', $search_district);
        }
        $this->db->where('s.is_delete !=' . IS_DELETE);
        $this->db->where('s.status != ' . VALUE_ZERO);
        $this->db->where('s.status != ' . VALUE_ONE);
        $this->db->from('lease_seller AS s');
        $this->db->join('users as u', 'u.user_id = s.user_id');
        $this->db->join('sa_users as sau', 'sau.sa_user_id = s.updated_by', 'left');
        $this->db->order_by('s.seller_id', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }
}

/*
 * EOF: ./application/models/Seller_model.php
 */