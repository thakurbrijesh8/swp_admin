<div class="card">
    <div class="card-header">
        <button type="button" class="btn btn-sm btn-success" style="padding: 2px 7px;"
                onclick="$('#generate_excel_for_ismw').submit();">
            <i class="fas fa-file-excel" style="margin-right: 2px;"></i>&nbsp; Download Excel</button>
        <h3 class="card-title pull-right">
            <button type="button" class="btn btn-sm btn-primary" onclick="ISMW.listview.newISMWForm(false, {});">Apply I.S.M.W Returnees</button>
        </h3>
    </div>
    <div class="card-body" id="ismw_datatable_container">
        <div class="table-responsive">
            <table id="ismw_datatable" class="table table-bordered table-hover">
                <thead>
                    <tr class="bg-light-gray">
                        <th class="text-center" style="width: 30px;">No.</th>
                        <th class="text-center" style="width: 30px;">Application Number</th>
                        <?php if (is_admin() || is_view_all_district_user()) { ?>
                            <th class="text-center" style="min-width: 80px;">District</th>
                        <?php } ?>
                        <th class="text-center" style="min-width: 120px;">Name</th>
                        <th class="text-center" style="min-width: 80px;">Mobile Number</th>
                        <th class="text-center" style="min-width: 80px;">Submitted On</th>
                        <th class="text-center" style="width: 100px;">Status</th>
                        <!--<th class="text-center" style="width: 100px;">Query Status</th>-->
                        <th class="text-center" style="width: 50px;">Action</th>
                    </tr>
                    <tr>
                        <th colspan="2"></th>
                        <?php if (is_admin() || is_view_all_district_user()) { ?>
                            <th>
                                <select id="district_for_ismw_list" class="form-control"
                                        data-placeholder="District !">
                                    <option value="">All</option>
                                </select>
                            </th>
                        <?php } ?>
                        <th>
                            <input type="text" class="form-control" placeholder="Applicant Name" />
                        </th>
                        <th>
                            <input type="text" id="mobile_number_for_ismw_list" class="form-control" placeholder="Mobile Number"  maxlength="10" />
                        </th>
                        <th colspan="1"></th>
                        <th>
                            <select id="status_for_ismw_list" class="form-control"
                                    data-placeholder="Status !">
                                <option value="">All</option>
                            </select>
                        </th>
                        <!--<th></th>-->
                        <th></th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</div>