<div class="table-responsive">
    <table id="employee_datatable" class="table table-bordered table-hover">
        <thead>
            <tr class="bg-light-gray">
                <th class="text-center" style="width: 20px;">No.</th>
                <th class="text-center" style="max-width: 80px;">District</th>
                <th class="text-center" style="min-width: 110px;">Department Name</th>
                <th class="text-center" style="min-width: 110px;">Employee Name</th>
                <th class="text-center" style="min-width: 110px;">Designation</th>
                <th class="text-center" style="min-width: 100px;">Role</th>
                <th class="text-center" style="min-width: 90px;">Mobile Number</th>
                <th class="text-center" style="width: 60px;">Status</th>
                <th class="text-center" style="width: 60px;">Action</th>
            </tr>
            <tr>
                <td></td>
                <td>
                    <?php if (is_admin()) { ?>
                        <select id="district_for_employee_list" name="district_for_employee_list" class="form-control select2"
                                onchange="Employee.listview.districtChangeEvent($(this), 'employee_list');"
                                data-placeholder="Select District" style="width: 100%;">
                        </select>
                    <?php } ?>
                </td>
                <td>
                    <?php if (is_admin()) { ?>
                        <select id="department_id_for_employee_list" name="department_id_for_employee_list" class="form-control select2"
                                data-placeholder="Select Department" style="width: 100%;">
                        </select>
                    <?php } ?>
                </td>
                <td></td>
                <td colspan="2"></td>
                <td></td>
                <td colspan="2"></td>
            </tr>
        </thead>
    </table>
</div>