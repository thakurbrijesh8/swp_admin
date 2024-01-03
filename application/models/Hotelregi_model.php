<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Hotelregi_model extends CI_Model {

    function get_all_hotelregi_list($start, $length, $search_district = '', $search_entity_establishment_type = '', $search_logged_user_detail = '', $search_applicant_detail = '', $search_app_timing = '', $search_status = '', $search_query_status = '') {
        $this->db->select("h.*,u.applicant_name,u.mobile_number AS applicant_mobile,date_format(h.created_time, '%d-%m-%Y %H:%i:%s') AS display_datetime,sau.name AS logged_user_name");
        if ($search_district != '') {
            $this->db->where('h.name_of_tourist_area', $search_district);
        }
        if ($search_logged_user_detail != '') {
            $where = "(u.applicant_name LIKE '%$search_logged_user_detail%' OR "
                    . "u.mobile_number  LIKE '%$search_logged_user_detail%')";
            $this->db->where($where);
        }
        if ($search_entity_establishment_type != '') {
            $this->db->where('h.entity_establishment_type', $search_entity_establishment_type);
        }
        if ($search_applicant_detail != '') {
            $where = "(h.name_of_hotel  LIKE '%$search_applicant_detail%' OR "
                    . "h.category_of_hotel  LIKE '%$search_applicant_detail%')";
            $this->db->where($where);
        }
        if ($search_app_timing != '') {
            $query_module_array = $this->config->item('query_module_array');
            $qm_data = isset($query_module_array[VALUE_SIX]) ? $query_module_array[VALUE_SIX] : array();
            if (isset($qm_data['day'])) {
                if ($search_app_timing == VALUE_ONE) {
                    $this->db->where('h.processing_days <= ' . $qm_data['day']);
                } else if ($search_app_timing == VALUE_TWO) {
                    $this->db->where('h.processing_days > ' . $qm_data['day']);
                }
            }
        }
        if ($search_status != '') {
            if ($search_status == VALUE_TEN) {
                $this->db->where("(h.query_status='" . VALUE_ONE . "' OR h.query_status='" . VALUE_TWO . "')");
                $this->db->where("h.status !=" . VALUE_FIVE);
                $this->db->where("h.status !=" . VALUE_SIX);
            } else {
                if ($search_status != VALUE_FIVE && $search_status != VALUE_SIX) {
                    $this->db->where("(h.query_status='" . VALUE_ZERO . "' OR h.query_status='" . VALUE_THREE . "')");
                }
                $this->db->where('h.status', $search_status);
            }
        }
        if ($search_query_status != '') {
            $this->db->where('h.query_status', $search_query_status);
        }
        $this->db->limit($length, $start);
        $this->db->where('h.is_delete !=' . IS_DELETE);
        $this->db->where('h.status != ' . VALUE_ZERO);
        $this->db->where('h.status != ' . VALUE_ONE);
        $this->db->from('hotel AS h');
        $this->db->join('users as u', 'u.user_id = h.user_id');
        $this->db->join('sa_users as sau', 'sau.sa_user_id = h.updated_by', 'left');
        $this->db->order_by('h.hotelregi_id', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_hotelregi_by_id($hotelregi_id) {
        $this->db->where('is_delete !=', IS_DELETE);
        $this->db->where('hotelregi_id', $hotelregi_id);
        $this->db->from('hotel');
        $resc = $this->db->get();
        return $resc->row_array();
    }

    function get_total_count_of_records($search_district) {
        $this->db->select('COUNT(hotelregi_id) AS total_records');
        if (!is_admin() && !is_view_all_district_user()) {
            if ($search_district != '') {
                $this->db->where('name_of_tourist_area', $search_district);
            }
        }
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->where('status != ' . VALUE_ZERO);
        $this->db->where('status != ' . VALUE_ONE);
        $this->db->from('hotel');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_filter_count_of_records($search_district = '', $search_entity_establishment_type = '', $search_logged_user_detail = '', $search_applicant_detail = '', $search_app_timing = '', $search_status = '', $search_query_status = '') {
        $this->db->select('COUNT(h.hotelregi_id) AS total_records');
        if ($search_district != '') {
            $this->db->where('h.name_of_tourist_area', $search_district);
        }
        if ($search_entity_establishment_type != '') {
            $this->db->where('h.entity_establishment_type', $search_entity_establishment_type);
        }
        if ($search_logged_user_detail != '') {
            $where = "(u.applicant_name LIKE '%$search_logged_user_detail%' OR "
                    . "u.mobile_number  LIKE '%$search_logged_user_detail%')";
            $this->db->where($where);
        }
        if ($search_applicant_detail != '') {
            $where = "(h.name_of_hotel  LIKE '%$search_applicant_detail%' OR "
                    . "h.category_of_hotel  LIKE '%$search_applicant_detail%')";
            $this->db->where($where);
        }
        if ($search_app_timing != '') {
            $query_module_array = $this->config->item('query_module_array');
            $qm_data = isset($query_module_array[VALUE_SIX]) ? $query_module_array[VALUE_SIX] : array();
            if (isset($qm_data['day'])) {
                if ($search_app_timing == VALUE_ONE) {
                    $this->db->where('h.processing_days <= ' . $qm_data['day']);
                } else if ($search_app_timing == VALUE_TWO) {
                    $this->db->where('h.processing_days > ' . $qm_data['day']);
                }
            }
        }
        if ($search_status != '') {
            if ($search_status == VALUE_TEN) {
                $this->db->where("(h.query_status='" . VALUE_ONE . "' OR h.query_status='" . VALUE_TWO . "')");
                $this->db->where("h.status !=" . VALUE_FIVE);
                $this->db->where("h.status !=" . VALUE_SIX);
            } else {
                if ($search_status != VALUE_FIVE && $search_status != VALUE_SIX) {
                    $this->db->where("(h.query_status='" . VALUE_ZERO . "' OR h.query_status='" . VALUE_THREE . "')");
                }
                $this->db->where('h.status', $search_status);
            }
        }
        if ($search_query_status != '') {
            $this->db->where('h.query_status', $search_query_status);
        }
        $this->db->where('h.is_delete !=' . IS_DELETE);
        $this->db->where('h.status != ' . VALUE_ZERO);
        $this->db->where('h.status != ' . VALUE_ONE);
        $this->db->from('hotel AS h');
        $this->db->join('users as u', 'u.user_id = h.user_id');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_records_for_excel($search_district) {
        $this->db->select('h.hotelregi_id, h.name_of_tourist_area,h.entity_establishment_type, u.applicant_name, u.mobile_number, h.name_of_hotel, '
                . 'h.category_of_hotel, h.submitted_datetime, h.status, h.query_status, sau.name, h.status_datetime, h.remarks');
        if ($search_district != VALUE_ZERO) {
            $this->db->where('h.name_of_tourist_area', $search_district);
        }
        $this->db->where('h.is_delete !=' . IS_DELETE);
        $this->db->where('h.status != ' . VALUE_ZERO);
        $this->db->where('h.status != ' . VALUE_ONE);
        $this->db->from('hotel AS h');
        $this->db->join('users as u', 'u.user_id = h.user_id');
        $this->db->join('sa_users as sau', 'sau.sa_user_id = h.updated_by', 'left');
        $this->db->order_by('h.hotelregi_id', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }

}

/*
 * EOF: ./application/models/BOCW_model.php
 */