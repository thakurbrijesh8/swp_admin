<div class="card">
    <div class="card-header">
        {{{s_display_text}}}
        <button type="button" class="btn btn-sm btn-success pull-right" style="padding: 2px 7px;"
                onclick="$('#generate_excel_for_repairer_renewal').submit();">
            <i class="fas fa-file-excel" style="margin-right: 2px;"></i>&nbsp; Download Excel</button>
    </div>
    <div class="card-body" id="repairer_renewal_datatable_container">
        <div class="table-responsive">
            <table id="repairer_renewal_datatable" class="table table-bordered table-hover">
                <thead>
                    <tr class="bg-light-gray">
                        <th class="text-center" style="width: 30px;">No.</th>
                        <th class="text-center" style="width: 30px;">Application Number
                            <?php if(is_admin() || is_view_all_district_user()){ ?>
                                <hr>District
                            <?php } ?></th>
                        <th class="text-center" style="width: 50px;">Entity / Establishment Type</th>
                        <th class="text-center" style="width: 180px;">Registered User</th>
                        <th class="text-center" style="width: 180px;">Repairer Details</th>
                        <th class="text-center" style="width: 50px;">Submitted On</th>
                        <th class="text-center" style="width: 50px;">Status</th>
                        <th class="text-center" style="width: 130px;">Query Status</th>
                        <th class="text-center" style="width: 130px;">Approve / Rejection Details</th>
                        <th class="text-center" style="width: 50px;">Action</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th>
                            <?php if(is_admin() || is_view_all_district_user()){ ?>
                                <select id="district_for_repairer_renewal_list" class="form-control"
                                        data-placeholder="District !">
                                    <option value="">All</option>
                                </select>
                            <?php } ?>
                        </th>
                        <th>
                            <select id="entity_establishment_type_for_repairer_renewal_list" class="form-control"
                                    data-placeholder="Entity / Establishment Type !">
                                <option value="">All</option>
                            </select>
                        </th>
                        <th>
                            <input type="text" class="form-control" placeholder="User Name or Mobile Number" />
                        </th>
                        <th>
                            <input type="text" class="form-control" placeholder="Repairer Name or Address" />
                        </th>
                        <th>
                            <select id="app_timing_for_repairer_renewal_list" class="form-control">
                                <option value="">All</option>
                            </select>
                        </th>
                        <th>
                            <select id="status_for_repairer_renewal_list" class="form-control"
                                    data-placeholder="Status !">
                                <option value="">All</option>
                            </select>
                        </th>
                        <th>
                            <select id="query_status_for_repairer_renewal_list" class="form-control"
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