<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Sublessee_model extends CI_Model {

    function get_all_sublessee_list($start, $length, $search_district = '', $search_entity_establishment_type = '', $search_logged_user_detail = '', $search_applicant_detail = '', $search_plot_no = '', $search_nom = '', $search_app_timing = '', $search_status = '', $search_query_status = '') {
        $this->db->select("s.*,u.applicant_name,u.mobile_number AS applicant_mobile,date_format(s.created_time, '%d-%m-%Y %H:%i:%s') AS display_datetime");
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
            $where = "(s.name_of_applicant  LIKE '%$search_applicant_detail%')";
            $this->db->where($where);
        }
        if ($search_plot_no != '') {
            $where = "(s.plot_no  LIKE '%$search_plot_no%')";
            $this->db->where($where);
        }
        if ($search_nom != '') {
            $where = "(s.name_of_manufacturing  LIKE '%$search_nom%')";
            $this->db->where($where);
        }
        if ($search_app_timing != '') {
            $query_module_array = $this->config->item('query_module_array');
            $qm_data = isset($query_module_array[VALUE_SEVENTEEN]) ? $query_module_array[VALUE_SEVENTEEN] : array();
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
        $this->db->from('sub_lessee AS s');
        $this->db->join('users as u', 'u.user_id = s.user_id');
        $this->db->order_by('s.sublessee_id', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_sublessee_by_id($sublessee_id) {
        $this->db->where('is_delete !=', IS_DELETE);
        $this->db->where('sublessee_id', $sublessee_id);
        $this->db->from('sub_lessee');
        $resc = $this->db->get();
        return $resc->row_array();
    }

    function get_total_count_of_records($search_district) {
        $this->db->select('COUNT(sublessee_id) AS total_records');
        if (!is_admin() && !is_view_all_district_user()) {
            if ($search_district != '') {
                $this->db->where('district', $search_district);
            }
        }
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->where('status != ' . VALUE_ZERO);
        $this->db->where('status != ' . VALUE_ONE);
        $this->db->from('sub_lessee');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_filter_count_of_records($search_district = '', $search_entity_establishment_type = '', $search_logged_user_detail = '', $search_applicant_detail = '', $search_plot_no = '', $search_nom = '', $search_app_timing = '', $search_status = '', $search_query_status = '') {
        $this->db->select('COUNT(s.sublessee_id) AS total_records');
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
            $where = "(s.name_of_applicant  LIKE '%$search_applicant_detail%')";
            $this->db->where($where);
        }
        if ($search_plot_no != '') {
            $where = "(s.plot_no  LIKE '%$search_plot_no%')";
            $this->db->where($where);
        }
        if ($search_nom != '') {
            $where = "(s.name_of_manufacturing  LIKE '%$search_nom%')";
            $this->db->where($where);
        }
        if ($search_app_timing != '') {
            $query_module_array = $this->config->item('query_module_array');
            $qm_data = isset($query_module_array[VALUE_SEVENTEEN]) ? $query_module_array[VALUE_SEVENTEEN] : array();
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
        $this->db->from('sub_lessee AS s');
        $this->db->join('users as u', 'u.user_id = s.user_id');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_records_for_excel($search_district) {
        $this->db->select('s.sublessee_id, s.district, s.entity_establishment_type, u.applicant_name, u.mobile_number, s.name_of_applicant, '
                . 's.plot_no, s.name_of_manufacturing, s.submitted_datetime, s.status, s.query_status, sau.name, s.status_datetime, s.remarks');
        if ($search_district != VALUE_ZERO) {
            $this->db->where('s.district', $search_district);
        }
        $this->db->where('s.is_delete !=' . IS_DELETE);
        $this->db->where('s.status != ' . VALUE_ZERO);
        $this->db->where('s.status != ' . VALUE_ONE);
        $this->db->from('sub_lessee AS s');
        $this->db->join('users as u', 'u.user_id = s.user_id');
        $this->db->join('sa_users as sau', 'sau.sa_user_id = s.updated_by', 'left');
        $this->db->order_by('s.sublessee_id', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }
}

/*
 * EOF: ./application/models/Sublessee_model.php
 */