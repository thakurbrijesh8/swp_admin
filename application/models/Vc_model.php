<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Vc_model extends CI_Model {


    function get_all_vc_list($start, $length, $search_district = '', $search_entity_establishment_type = '', $search_logged_user_detail = '', $search_applicant_detail = '',$search_app_timing = '', $search_status = '', $search_query_status = '') {
        $this->db->select("w.*,u.applicant_name,u.mobile_number AS applicant_mobile,date_format(w.created_time, '%d-%m-%Y %H:%i:%s') AS display_datetime,sau.name AS logged_user_name");

        if ($search_district != '') {
            $this->db->where('w.district', $search_district);
        }
        if ($search_entity_establishment_type != '') {
            $this->db->where('w.entity_establishment_type', $search_entity_establishment_type);
        }
        if ($search_logged_user_detail != '') {
            $where = "(u.applicant_name LIKE '%$search_logged_user_detail%' OR "
                    . "u.mobile_number  LIKE '%$search_logged_user_detail%')";
            $this->db->where($where);
        }
        if ($search_applicant_detail != '') {
            $where = "(w.name_of_applicant  LIKE '%$search_applicant_detail%' OR "
                    . "w.address  LIKE '%$search_applicant_detail%')";
            $this->db->where($where);
        }
        if ($search_app_timing != '') {
            $query_module_array = $this->config->item('query_module_array');
            $qm_data = isset($query_module_array[VALUE_ONE]) ? $query_module_array[VALUE_ONE] : array();
            if (isset($qm_data['day'])) {
                if ($search_app_timing == VALUE_ONE) {
                    $this->db->where('w.processing_days <= ' . $qm_data['day']);
                } else if ($search_app_timing == VALUE_TWO) {
                    $this->db->where('w.processing_days > ' . $qm_data['day']);
                }
            }
        }
        if ($search_status != '') {
            if ($search_status == VALUE_TEN) {
                $this->db->where("(w.query_status='" . VALUE_ONE . "' OR w.query_status='" . VALUE_TWO . "')");
                $this->db->where("w.status !=" . VALUE_FIVE);
                $this->db->where("w.status !=" . VALUE_SIX);
            } else {
                if ($search_status != VALUE_FIVE && $search_status != VALUE_SIX) {
                    $this->db->where("(w.query_status='" . VALUE_ZERO . "' OR w.query_status='" . VALUE_THREE . "')");
                }
                $this->db->where('w.status', $search_status);
            }
        }
        if ($search_query_status != '') {
            $this->db->where('w.query_status', $search_query_status);
        }
        $this->db->limit($length, $start);
        $this->db->where('w.is_delete !=' . IS_DELETE);
        $this->db->where('w.status != ' . VALUE_ZERO);
        $this->db->where('w.status != ' . VALUE_ONE);
        $this->db->from('vc AS w');
        $this->db->join('users as u', 'u.user_id = w.user_id');
        $this->db->join('sa_users as sau', 'sau.sa_user_id = w.updated_by', 'left');
        $this->db->order_by('w.vc_id', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_vc_by_id($vc_id) {
        $this->db->where('is_delete !=', IS_DELETE);
        $this->db->where('vc_id', $vc_id);
        $this->db->from('vc');
        $resc = $this->db->get();
        return $resc->row_array();
    }

    function get_total_count_of_records($search_district) {
        $this->db->select('COUNT(vc_id) AS total_records');
        if (!is_admin() && !is_view_all_district_user()) {
            if ($search_district != '') {
                $this->db->where('district', $search_district);
            }
        }
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->where('status != ' . VALUE_ZERO);
        $this->db->where('status != ' . VALUE_ONE);
        $this->db->from('vc');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_filter_count_of_records($search_district = '', $search_entity_establishment_type = '', $search_applicant_name = '', $search_mob = '', $search_name = '', $search_vcc = '', $search_ho = '', $search_app_timing = '', $search_status = '', $search_query_status = '') {
        $this->db->select('COUNT(w.vc_id) AS total_records');
        if ($search_district != '') {
            $this->db->where('w.district', $search_district);
        }
        if ($search_entity_establishment_type != '') {
            $this->db->where('w.entity_establishment_type', $search_entity_establishment_type);
        }
        if ($search_applicant_name != '') {
            $this->db->like('u.applicant_name', $search_applicant_name);
        }
        if ($search_mob != '') {
            $this->db->like('u.mobile_number', $search_mob);
        }
        if ($search_name != '') {
            $this->db->like('w.name_of_applicant', $search_name);
        }
        if ($search_vcc != '') {
            $this->db->where('w.model_no', $search_vcc);
        }
        if ($search_ho != '') {
            $this->db->where('w.serial_no', $search_ho);
        }
        if ($search_app_timing != '') {
            $query_module_array = $this->config->item('query_module_array');
            $qm_data = isset($query_module_array[VALUE_ONE]) ? $query_module_array[VALUE_ONE] : array();
            if (isset($qm_data['day'])) {
                if ($search_app_timing == VALUE_ONE) {
                    $this->db->where('w.processing_days <= ' . $qm_data['day']);
                } else if ($search_app_timing == VALUE_TWO) {
                    $this->db->where('w.processing_days > ' . $qm_data['day']);
                }
            }
        }
        if ($search_status != '') {
            if ($search_status == VALUE_TEN) {
                $this->db->where("(w.query_status='" . VALUE_ONE . "' OR w.query_status='" . VALUE_TWO . "')");
                $this->db->where("w.status !=" . VALUE_FIVE);
                $this->db->where("w.status !=" . VALUE_SIX);
            } else {
                if ($search_status != VALUE_FIVE && $search_status != VALUE_SIX) {
                    $this->db->where("(w.query_status='" . VALUE_ZERO . "' OR w.query_status='" . VALUE_THREE . "')");
                }
                $this->db->where('w.status', $search_status);
            }
        }
        if ($search_query_status != '') {
            $this->db->where('w.query_status', $search_query_status);
        }
        $this->db->where('w.is_delete !=' . IS_DELETE);
        $this->db->where('w.status != ' . VALUE_ZERO);
        $this->db->where('w.status != ' . VALUE_ONE);
        $this->db->from('vc AS w');
        $this->db->join('users as u', 'u.user_id = w.user_id');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_records_for_excel($search_district) {
        $this->db->select('w.vc_id, w.district, w.entity_establishment_type, u.applicant_name, u.mobile_number, w.name_of_applicant, '
                . 'w.address, w.submitted_datetime, w.status, w.query_status, sau.name, w.status_datetime, w.remarks');
        if ($search_district != VALUE_ZERO) {
            $this->db->where('w.district', $search_district);
        }
        $this->db->where('w.is_delete !=' . IS_DELETE);
        $this->db->where('w.status != ' . VALUE_ZERO);
        $this->db->where('w.status != ' . VALUE_ONE);
        $this->db->from('vc AS w');
        $this->db->join('users as u', 'u.user_id = w.user_id');
        $this->db->join('sa_users as sau', 'sau.sa_user_id = w.updated_by', 'left');
        $this->db->order_by('w.vc_id', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }

}

/*
 * EOF: ./application/models/BOCW_model.php
 */