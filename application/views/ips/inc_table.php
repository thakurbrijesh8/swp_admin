<div class="card">
    <div class="card-header">
        {{{s_display_text}}}
        <button type="button" class="btn btn-sm btn-success pull-right" style="padding: 2px 7px;"
                onclick="$('#generate_excel_for_incentives').submit();">
            <i class="fas fa-file-excel" style="margin-right: 2px;"></i>&nbsp; Download Excel</button>
    </div>
    <div class="card-body" id="incentives_datatable_container">
        <div class="table-responsive">
            <table id="incentives_datatable" class="table table-bordered table-hover">
                <thead>
                    <tr class="bg-light-gray">
                        <th class="text-center" style="width: 30px;">No.</th>
                        <th class="text-center" style="width: 80px;">Incentive App. No.
                            <?php if (is_admin() || is_view_all_district_user()) { ?>
                                <hr>District
                            <?php } ?></th>
                        <th class="text-center" style="min-width: 120px;">Registered User</th>
                        <th class="text-center" style="min-width: 120px;">Scheme Details</th>
                        <th class="text-center" style="min-width: 140px;">CAF Number / Ownership Details</th>
                        <th class="text-center" style="min-width: 140px;">Manufacturing Unit / Service Unit Details</th>
                        <th class="text-center" style="min-width: 50px;">Submitted On</th>
                        <th class="text-center" style="width: 90px;">Status</th>
                        <th class="text-center" style="width: 130px;">Query Status</th>
                        <th class="text-center" style="min-width: 130px;">Approve / Rejection Details</th>
                        <th class="text-center" style="width: 50px;">Action</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th>
                            <?php if (is_admin() || is_view_all_district_user()) { ?>
                                <select id="district_for_incentives_list" class="form-control"
                                        data-placeholder="District !">
                                    <option value="">All</option>
                                </select>
                            <?php } ?>
                        </th>
                        <th>
                            <input type="text" class="form-control" placeholder="User Name or Mobile Number" />
                        </th>
                        <th>
                            <select id="scheme_for_incentives_list" class="form-control">
                                <option value="">All</option>
                            </select>
                        </th>
                        <th>
                            <input type="text" class="form-control" placeholder="Ownership Details" />
                        </th>
                        <th>
                            <input type="text" class="form-control" placeholder="Manufacturing Unit / Service Unit Details" />
                        </th>
                        <th>
                            <select id="app_timing_for_incentives_list" class="form-control">
                                <option value="">All</option>
                            </select>
                        </th>
                        <th>
                            <select id="status_for_incentives_list" class="form-control"
                                    data-placeholder="Status !">
                                <option value="">All</option>
                            </select>
                        </th>
                        <th>
                            <select id="query_status_for_incentives_list" class="form-control"
                                    data-placeholder="Query Status!">
                                <option value="">All</option>
                            </select>
                        </th>
                        <th colspan="2"></th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</div>