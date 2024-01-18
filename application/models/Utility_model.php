<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Utility_model extends CI_Model {

    function get_by_id($id, $compare_id, $table_name, $second_id = NULL, $second_value = NULL) {
        $this->db->where($id, $compare_id);
        if ($second_id != NULL && $second_value != NULL) {
            $this->db->where($second_id, $second_value);
        }
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->from($table_name);
        $resc = $this->db->get();
        return $resc->row_array();
    }

    function get_by_id_with_applicant_name($id, $compare_id, $table_name) {
        $this->db->select('t.*, u.applicant_name, u.mobile_number AS applicant_mobile');
        $this->db->where("t.$id", $compare_id);
        $this->db->where('t.is_delete !=' . IS_DELETE);
        $this->db->from("$table_name AS t");
        $this->db->join('users as u', 'u.user_id = t.user_id');
        $resc = $this->db->get();
        return $resc->row_array();
    }

    function insert_data($table_name, $table_data) {
        $this->db->insert($table_name, $table_data);
        return $this->db->insert_id();
    }

    function insert_data_batch($table_name, $table_data) {
        $this->db->insert_batch($table_name, $table_data);
    }

    function update_data($id, $id_value, $table_name, $table_data, $where_id = NULL, $where_id_text = NULL) {
        $this->db->where($id, $id_value);
        if ($where_id != NULL && $where_id_text != NULL) {
            $this->db->where($where_id, $where_id_text);
        }
        $this->db->update($table_name, $table_data);
    }

    function update_data_not_in($id, $id_value, $id2, $ids2, $table_name, $table_data, $where_id = NULL, $where_id_text = NULL) {
        $this->db->where($id, $id_value);
        if (!empty($ids2)) {
            $this->db->where_not_in($id2, $ids2);
        }
        if ($where_id != NULL && $where_id_text != NULL) {
            $this->db->where($where_id, $where_id_text);
        }
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->update($table_name, $table_data);
    }

    function update_data_batch($id, $table_name, $table_data) {
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->update_batch($table_name, $table_data, $id);
    }

    function get_result_data($table_name, $order_by_id = NULL, $order_by = NULL) {
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->from($table_name);
        if ($order_by_id != NULL && $order_by != NULL) {
            $this->db->order_by($order_by_id, $order_by);
        }
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_result_data_by_id($id_text, $id, $table_name, $id_text2 = NULL, $id2 = NULL) {
        $this->db->where($id_text, $id);
        if ($id_text2 != NULL && $id2 != NULL) {
            $this->db->where($id_text2, $id2);
        }
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->from($table_name);
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_result_data_by_ids($id_text, $ids, $table_name, $id_text2 = NULL, $id2 = NULL, $order_by_id = NULL, $order_by = NULL) {
        if (is_array($ids)) {
            $this->db->where_in($id_text, $ids);
        } else {
            $this->db->where($id_text, $ids);
        }
        if ($id_text2 != NULL && $id2 != NULL) {
            $this->db->where($id_text2, $id2);
        }
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->from($table_name);
        if ($order_by_id != NULL && $order_by != NULL) {
            $this->db->order_by($order_by_id, $order_by);
        }
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function check_field_value_exists_or_not($field_name, $field_value, $table_name, $id = NULL, $id_value = NULL, $field_name2 = NULL, $field_value2 = NULL) {
        $this->db->where('is_delete !=', IS_DELETE);
        $this->db->where($field_name, $field_value);
        if ($field_name2 != NULL && $field_value2 != NULL) {
            $this->db->where($field_name2, $field_value2);
        }
        if ($id != NULL && $id_value != NULL) {
            $this->db->where("$id != $id_value");
        }
        $this->db->from($table_name);
        $resc = $this->db->get();
        return $resc->row_array();
    }

    function is_valid_post_data($key_post_id, $post_id, $table_name) {
        $this->db->where($key_post_id, $post_id);
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->from($table_name);
        $resc = $this->db->get();
        return $resc->row_array();
    }

    function query_data_by_type_id($module_type, $module_id) {
        $this->db->select("q.*, date_format(q.query_datetime, '%d-%m-%Y %H:%i:%s') AS display_datetime, "
                . "qd.query_document_id, qd.doc_name, qd.document");
        $this->db->where('q.module_type', $module_type);
        $this->db->where('q.module_id', $module_id);
        $this->db->where('q.is_delete != ' . IS_DELETE);
        $this->db->from('query AS q');
        $this->db->join('query_document AS qd', 'qd.query_id = q.query_id AND qd.is_delete != ' . IS_DELETE, 'LEFT');
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_plot_result_data($table_name, $order_by_id = NULL, $order_by = NULL) {
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->where('is_vacant =' . VALUE_ONE);
        $this->db->from($table_name);
        if ($order_by_id != NULL && $order_by != NULL) {
            $this->db->order_by($order_by_id, $order_by);
        }
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_user_data_for_query_management($id_text, $id, $table_name) {
        $this->db->select('u.mobile_number, u.email, u.user_id');
        $this->db->where('m.' . $id_text, $id);
        $this->db->where('m.is_delete !=' . IS_DELETE);
        $this->db->from($table_name . ' AS m');
        $this->db->join('users AS u', 'u.user_id = m.user_id');
        $resc = $this->db->get();
        return $resc->row_array();
    }

    function check_registration_number($field_name, $field_value, $table_name) {
        $this->db->select($field_name);
        $this->db->where($field_name, $field_value);
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->from($table_name);
        $resc = $this->db->get();
        return $resc->row_array();
    }

    function get_result_by_id($column, $column_value, $table_name, $sec_column = NULL, $sec_value = NULL, $third_column = NULL, $third_value = NULL, $is_sort_field = NULL) {
        $this->db->where($column, $column_value);
        if ($sec_column != NULL && $sec_value != NULL) {
            $this->db->where($sec_column, $sec_value);
        }
        if ($third_column != NULL && $third_value != NULL) {
            $this->db->where($third_column, $third_value);
        }
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->from($table_name);
        if ($is_sort_field != NULL) {
            $this->db->order_by($is_sort_field);
        }
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_officer_data() {
        $this->db->select('o.*, s.type AS department_name');
        $this->db->where('o.is_delete != ' . IS_DELETE);
        $this->db->from('officer AS o');
        $this->db->join('sa_user_type AS s', 's.sa_user_type_id = o.department_id');
        $this->db->order_by('o.department_id, o.officer_name');
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_rand_officer_id($department) {
        $this->db->select('officer_id, officer_name');
        $this->db->limit(1);
        $this->db->where('department_id', $department);
        $this->db->where('status', VALUE_ONE);
        $this->db->where('is_delete != ' . IS_DELETE);
        $this->db->from('officer');
        $this->db->order_by('RAND()');
        $resc = $this->db->get();
        return $resc->row_array();
    }

    function get_result_data_or_ids($id_text, $ids, $table_name, $id_text2 = NULL, $id2 = NULL, $order_by_id = NULL, $order_by = NULL) {
        if (!empty($ids)) {
            $this->db->where_in($id_text, $ids);
        }
        if ($id_text2 != NULL && $id2 != NULL) {
            $this->db->where($id_text2, $id2);
        }
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->from($table_name);
        if ($order_by_id != NULL && $order_by != NULL) {
            $this->db->order_by($order_by_id, $order_by);
        }
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_details_for_feedback_rating($qm_data, $module_id) {
        $this->db->select($qm_data['key_id_text'] . " AS module_id, rating, feedback, fr_datetime");
        $this->db->where($qm_data['key_id_text'], $module_id);
        $this->db->where_in('status', array(VALUE_FIVE, VALUE_SIX));
        $this->db->where('is_delete != ' . IS_DELETE);
        $this->db->from($qm_data['tbl_text']);
        $resc = $this->db->get();
        return $resc->row_array();
    }
}

/*
 * EOF: ./application/models/Utility_model.php
 */